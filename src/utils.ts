import { DataGridProps, GridColDef } from '@mui/x-data-grid'

export const areValuesDifferent = <T>(
  obj: T,
  partialObj: Partial<T>
): boolean => {
  for (const key in partialObj) {
    if (partialObj.hasOwnProperty(key)) {
      const value = partialObj[key]
      const originalValue = obj[key]

      if (
        typeof value === 'object' &&
        value !== null &&
        originalValue !== null
      ) {
        if (areValuesDifferent(originalValue, value)) {
          return true
        }
      } else if (value !== originalValue) {
        return true
      }
    }
  }
  return false
}

export const getDifferences = <T>(original: T, modified: T): Partial<T> => {
  const differences: Partial<T> = {}

  for (const key in modified) {
    if (modified.hasOwnProperty(key)) {
      const originalValue = original[key]
      const modifiedValue = modified[key]

      if (
        typeof modifiedValue === 'object' &&
        modifiedValue !== null &&
        originalValue !== null
      ) {
        // Recursively get differences for nested objects
        const nestedDifferences = getDifferences(originalValue, modifiedValue)
        if (Object.keys(nestedDifferences).length > 0) {
          differences[key] = nestedDifferences as any
        }
      } else if (modifiedValue !== originalValue) {
        differences[key] = modifiedValue
      }
    }
  }

  return differences
}

export const getDataGridProps = (
  rows: any[],
  columns: GridColDef<any>[]
): DataGridProps => {
  return {
    rows,
    columns,
    pageSizeOptions: [10],
    disableRowSelectionOnClick: true,
    disableColumnMenu: true,
    disableColumnResize: true,
  }
}
