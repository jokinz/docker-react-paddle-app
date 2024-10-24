import { DataGridProps, GridColDef } from '@mui/x-data-grid'

export const areValuesDifferent = <T extends object>(
  obj: T,
  partialObj: Partial<T>
): boolean => {
  for (const key in partialObj) {
    if (Object.hasOwn(partialObj, key)) {
      const value = partialObj[key]
      const originalValue = obj[key]

      if (
        typeof value === 'object' &&
        value !== null &&
        originalValue !== null
      ) {
        if (areValuesDifferent(originalValue as T, value as Partial<T>)) {
          return true
        }
      } else if (value !== originalValue) {
        return true
      }
    }
  }
  return false
}

export const getDifferences = <T extends object>(original: T, modified: T): Partial<T> => {
  const differences: Partial<T> = {}

  for (const key in modified) {
    if (Object.hasOwn(modified, key)) {
      const originalValue = original[key]
      const modifiedValue = modified[key]

      if (
        typeof modifiedValue === 'object' &&
        modifiedValue !== null &&
        originalValue !== null
      ) {
        const nestedDifferences = getDifferences(originalValue as T, modifiedValue as T)
        if (Object.keys(nestedDifferences).length > 0) {
          differences[key] = nestedDifferences as T[Extract<keyof T, string>]
        }
      } else if (modifiedValue !== originalValue) {
        differences[key] = modifiedValue
      }
    }
  }

  return differences
}

export const getDataGridProps = <T extends object>(
  rows: T[],
  columns: GridColDef<T>[]
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
