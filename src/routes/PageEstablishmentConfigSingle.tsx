import { useContext, useEffect, useState } from 'react'
import { EmployeeContext } from '../contexts/EmployeeContext'
import { enqueueSnackbar } from 'notistack'
import Drawer from '../components/Drawer'
import LoadingWrapper from '../components/LoadingWrapper'
import { getEstablishmentConfig } from '../api/establishments'
import { EstablishmentConfig } from '../types/establishment'
import EstablishmentConfigDetails from '../components/Establishments/EstablishmentConfigDetails'

const PageEstablishmentConfigSingle = () => {
  const employeeContext = useContext(EmployeeContext)
  const token = employeeContext?.token || ''
  const defaultEstablishmentId = 1

  const [loading, setLoading] = useState<boolean>(true)
  const [reload, setReload] = useState<boolean>(false)
  const [config, setConfig] = useState<EstablishmentConfig | null>(null)

  const updateConfig = (updatedConfig: EstablishmentConfig) => {
    setConfig(updatedConfig)
  }
  
  const reloadPage = () => {
    setReload((prev) => !prev);
  };

  useEffect(() => {
    const getConfigData = async () => {
      const result = await getEstablishmentConfig(token, defaultEstablishmentId)
      result && setConfig(result)
      setLoading(false)
    };
    getConfigData().catch(
      () => enqueueSnackbar(`Error cargando la configuracion`, { variant: 'error' })
    )
  }, [reload])

  return (
    <Drawer>
      <LoadingWrapper loading={loading}>
        {config && (
          <EstablishmentConfigDetails
            config={config}
            updateConfig={updateConfig}
            reloadPage={reloadPage}
          />
        ) || (
          <h1>Configuracion no encontrada</h1>
        )}
      </LoadingWrapper>
    </Drawer>
  )
}

export default PageEstablishmentConfigSingle
