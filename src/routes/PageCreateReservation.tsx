import Drawer from '../components/Drawer'
import React from 'react';
import { useEffect, useContext, useState } from 'react'
import { getDaysHabilitationReservation, getCourtsReservations, saveReservations } from '../api/reservations'
import AddIcon from '@mui/icons-material/Add';
import { enqueueSnackbar } from 'notistack'
import { getItems } from '../api/items/item'
import { EmployeeContext } from '../contexts/EmployeeContext'
import LoadingWrapper from '../components/LoadingWrapper'
import { getUsers } from '../api/users/user'
import { NewReservation, ClientReservation, Day, GetLocationReservation } from '../types/reservation'
import { Item } from '../types/item'
import { useNavigate } from 'react-router-dom'

import {
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogActions,
    Grid,
    InputLabel,
    FormControl,
    TextField,
    Select,
    MenuItem,
    IconButton, 
    Typography,
    SelectChangeEvent,
    Avatar,
  } from '@mui/material'

const objetReservation: NewReservation = {
    dateInit: '',
    priceFinal: 0,
    documentUrl: null,
    startTime: '',
    dayinit: '',
    intervalItem: null,
    establishmentId: null
  }

  const objectCient: ClientReservation = {
    firstName: '',
    lastName: '',
    documentType: '',
    email: null,
    documentNumber: null,
  }

const PageCreateReservation = () => {
    const [objectReservation, setItem] = useState<NewReservation>(objetReservation)
    const [daysList, setDaysHabilitation] = useState<Day[]>([])
    const [establishmentNumber, setEstablishment] = useState<number>(0)
    const [playingLocationList, setPlaying] = useState<GetLocationReservation[]>([])
    const [dayinit, setDayItem] = useState<string>('')
    const [ startTime, setStartTime ] = useState<string>('')
    const [location, setLocation] = useState<number | null>(null)
    const [priceBracketId, setPriceBracket] = useState<number | null>(null)
    const [intervalItem, setIntervalItem] = useState<number | null>(null)
    const [itemsList, setItemsList] = useState<Item[]>([])
    const employeeContext = useContext(EmployeeContext)
    const token = employeeContext?.token
    const [horas, setHoras] = useState<String[]>([]);
    const [showModal, setShowModal] = useState(false)
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingLocation, setLoadingLocation] = useState<boolean>(false);
    const [updateLoading, setUpdateLoading] = useState(false)
    const [client, setClient] = useState(objectCient);
    const [productsAdd, setProductsAdd] = useState([]);
    const [ showClient, setShowClient ] = useState<boolean>(false);
    const navigate = useNavigate()

    useEffect(() => {
        const getDays = async () => {
            if (token) {
                try {
                    const response = await getDaysHabilitationReservation({ establishmentId: 1, count: 14, interval: 90 }, token)
                    if (response) {
                        setDaysHabilitation(response.days);
                        setEstablishment(response.establishmentId);
                    } else {
                        setDaysHabilitation([])
                    }
                } catch (error) {
                    throw error
                }
            }
            }
            getDays()
    }, [])

    const handleRegister = async () => {
        try {
            if (token && token !== '') {
                setUpdateLoading(true)
                const result = await saveReservations({
                    participants: [client],
                    establishmentId: establishmentNumber,
                    playingFieldId: location,
                    priceBracketId: priceBracketId,
                    date: dayinit,
                    amount: objectReservation.priceFinal,
                    startTime: startTime,
                    interval: intervalItem,
                    evidence: objectReservation.documentUrl,
                    course: false,
                    returning: false,
                    items: productsAdd.map((product: Item) => {
                        return {
                            id: product.id,
                            qty: product.quantity,
                        }
                    }),
                }, token);
                if (result) {
                    enqueueSnackbar('Reserva creada correctamente.', { variant: 'success' })
                    setShowModal(false)
                    navigate(`/reservations`)
                }
            }
        } catch (error) {
            enqueueSnackbar('Error al registrar reserva', { variant: 'error' })
        } finally {
            setUpdateLoading(false)
        }
    }

    const convertDateFormat = (dateString: string) => {
        const [datePart, timePart] = dateString.split(' ');
        const [day, month, year] = datePart.split('-');
        const newDateString = `${month}-${day}-${year} ${timePart}`;
      
        return new Date(newDateString);
      };

    const setDay = (newValue: Day) => {
        setDayItem(newValue.date);
        setIntervalItem(newValue.interval)
        const startDate = convertDateFormat(newValue.startTime);
        const endDate = convertDateFormat(newValue.endTime);
        const horasGeneradas = generarHoras(startDate.toString(), endDate.toString(), newValue.interval);
        setHoras(horasGeneradas);
    }

    const generarHoras = (inicio: string, fin: string, intervalo: number) => {
        const fechaInicio = new Date(inicio);
        const fechaFin = new Date(fin);
        const totalIntervalos = Math.floor((fechaFin - fechaInicio) / (intervalo * 60 * 1000)) + 1;
    
        return Array.from({ length: totalIntervalos }, (_, index) => {
          const nuevaFecha = new Date(fechaInicio);
          nuevaFecha.setMinutes(nuevaFecha.getMinutes() + index * intervalo);
          return nuevaFecha.toTimeString().slice(0, 5);
        });
      };

    const setHour = async (newValue: String) => {
        setStartTime(`${newValue}:00`);
        if (token) {
            try {
                setLoadingLocation(true);
                const response = await getCourtsReservations(establishmentNumber, {
                    establishmentId: establishmentNumber,
                    date: dayinit,
                    startTime: `${newValue}:00`,
                    interval: intervalItem
                },
                token);
                if (response) {
                    setPlaying(response);
                } else {
                    setPlaying([]);
                }
            } catch (error) {
                throw error
            } finally {
                setLoadingLocation(false)
            }
        }
    }

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setItem((objetReservation) => {
                    return { ...objetReservation, documentUrl: reader.result as string }
                })
            }
            reader.readAsDataURL(file)
        } else {
            setItem((objetReservation) => {
                return { ...objetReservation, documentUrl: null }
            }) 
        }
    }

    const setPlayingLocation = async (item: GetLocationReservation) => {
        debugger;
        setLocation(item.id)
        setPriceBracket(item.priceBracket.id)
        setShowClient(true);
        setItem({ ...objetReservation, priceFinal: item.price + item.priceBracket.priceOffset });
    }

    useEffect(() => {
        if (location !== null) {
            const useGetItems = async () => {
                try {
                    if (token && token !== '') {
                        setLoading(true)
                        const result = await getItems(
                            {
                              includeDisabled: 1,
                              search: '',
                            },
                            token
                          )
                          if (result) {
                            setItemsList(result)
                          } else {
                            setItemsList([])
                          }
                    }
                } catch (error) {
                    throw error
                } finally {
                    setLoading(false)
                }
        
            }
            useGetItems()
        }
    }, [location])

    const handleDocumentTypeChange = (event: SelectChangeEvent) => {
        setClient({ ...objectCient, documentType: event.target.value })
      }

    
  const addItems = (producto: Item) => {
    setProductsAdd((prevCarrito: any) => {
      const productoExistente = prevCarrito.find((item: Item) => item.id == producto.id);
      if (productoExistente) {
        return prevCarrito.map((item: any) =>
          item.id === producto.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCarrito, { ...producto, quantity: 1 }];
      }
    });
    setItem({ ...objetReservation, priceFinal: objectReservation.priceFinal + producto.price });
  };

  useEffect(() => {
    setProductsAdd(productsAdd)
}, [productsAdd])

    const setDocumentClient = (value: string) => {
        setClient((prev) => {
            return { ...prev, documentNumber: value }
        })
    }

    const isReservationValid = (): boolean => {
        if (
            location === null ||
          establishmentNumber === 0 ||
          priceBracketId === 0 ||
          dayinit === '' ||
          startTime === '' ||
          objectReservation.documentUrl === null
        ) {
          return false
        } else {
          return true
        }
      }

    const handleSearchUsers = async () => {
        if (client.documentNumber && token) {
            try {
                const result = await getUsers({ search: client.documentNumber, includeUnRegistered: 1 }, token);
                if (result && result.length > 0) {
                    const responseClient = result[0];
                    setClient(
                        {
                            firstName: responseClient.firstName,
                            lastName: responseClient.lastName,
                            documentType: responseClient.documentType,
                            email:  responseClient.email,
                            documentNumber: responseClient.documentNumber,
                        }
                    );
                } else { 
                    setClient((prev) => {
                        return { ...prev, documentNumber: client.documentNumber }
                    });
                    enqueueSnackbar('No se encontraron resultados.', { variant: 'warning' })
                }
    
            } catch (error) {
                throw error
            }
        }
    }

    return (
        <Drawer>
            <h1>Registrar reserva</h1>
            <h1>Dias</h1>
            <Box>
                {daysList.map((item, index) => (
                    <Button
                    key={index}
                    variant="contained"
                    sx={{ margin: '8px', type: 'submit' }}
                    onClick={() => setDay(item) }
                    >
                    {item.date}
                    </Button>
                ))}
            </Box>
            {horas.length > 0 && (
                <Box>
                    <h1>Horario</h1>
                    {horas.map((item, index) => (
                        <Button
                        key={index}
                        autoFocus
                        variant="contained"
                        sx={{ margin: '8px' }}
                        onClick={() => setHour(item) }
                        >
                        {item}
                        </Button>
                    ))}
                </Box>
            )}
            <LoadingWrapper
        loading={loadingLocation}
      >
            {playingLocationList.length > 0 && (
                <Grid>
                <h1>Canchas</h1>
                <Box  display="flex">
                {playingLocationList.map((item, index) => (
                        <Button
                        onClick={() => setPlayingLocation(item) }
                        variant="contained"
                        key={index}
                        sx={{
                            ml: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            borderRadius: '4px',
                            backgroundColor: '#ffffff',
                            color: 'black',
                            '&:hover': {
                                backgroundColor: '#1565c0',
                            },
                            }}
                        >
                            <img
                            src={item.thumbnail}
                            alt={item.name}
                            style={{ marginRight: '8px', width: '120px', height: '120px' }}
                        />
                            {item.name} - Precio: {item.price}
                        </Button>
                    ))}
                </Box>
                </Grid>
            )}
      </LoadingWrapper>
            <LoadingWrapper
        loading={loading}
      >
            {itemsList.length > 0 && (
                <Box>
                    <h1>Productos adicionales</h1>
                    <Grid
                        item
                        xs={12}
                        display={'flex'}>
                        {itemsList.map((item, index) => (
                            <Box key={index} sx={{ position: 'relative', padding: '16px', border: '1px solid #ccc', borderRadius: '8px', ml: 2}}>
                                <IconButton
                                    sx={{
                                    zIndex: 10,
                                    position: 'absolute',
                                    top: '16px',
                                    right: '16px',
                                    backgroundColor: '#1976d2',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: '#1565c0',
                                    },
                                    }}
                                    onClick={() => addItems(item)}
                                >
                                    <AddIcon />
                                </IconButton>
                                
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <Avatar
                                    src={item.thumbnail ? item.thumbnail : ''}
                                    sx={{ width: 100, height: 100 }}
                                    />
                                    <Typography variant="h6">{ item.name }</Typography>
                                </Box>
                            </Box>
                        ))}
                        </Grid>
                </Box>
            )}
      </LoadingWrapper>
            { showClient && (
            <Box>
                <h1>Registrar Cliente</h1>
                <Grid container spacing={2} mt={2}>
                    <Grid item xs={6}>
                        <FormControl fullWidth variant="standard">
                        <InputLabel id="demo-simple-select-label">
                            Tipo de documento
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Tipo Documento"
                            value={client.documentType}
                            onChange={handleDocumentTypeChange}
                        >
                            <MenuItem value={'DNI'}>DNI</MenuItem>
                            <MenuItem value={'CE'}>Carnet Extranjeria</MenuItem>
                            <MenuItem value={'Pasaporte'}>Pasaporte</MenuItem>
                        </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                        fullWidth
                        id="documentNumber"
                        value={client.documentNumber}
                        label="Número de Documento"
                        variant="filled"
                        type="number"
                        required
                        onChange={ (e) =>
                            setDocumentClient(e.target.value)
                        }
                        onBlur={handleSearchUsers} 
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                        value={client.firstName}
                        fullWidth
                        id="firstName"
                        label="Nombre"
                        variant="filled"
                        required
                        onChange={(e) => {
                            setClient({ ...client, firstName: e.target.value })
                            }
                        }
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                        fullWidth
                        value={client.lastName}
                        id="lastName"
                        label="Apellido"
                        variant="filled"
                        required
                        onChange={(e) =>
                            {
                                setClient({ ...client, lastName: e.target.value })
                            }
                        }
                        />
                    </Grid>
                </Grid>
                <Grid item xs={4} mt={2}>
                    <TextField
                    type="email"
                    id="email"
                    label="Correo electrónico"
                    variant="filled"
                    value={client.email}
                    fullWidth
                    onChange={(e) =>
                        {
                            setClient({ ...client, email: e.target.value })
                        }
                    }
                    />
                </Grid>
                <Grid item xs={6} mt={2}>
                    <TextField
                    id="priceFinal"
                    value={objectReservation.priceFinal}
                    label="Precio final"
                    variant="filled"
                    type="number"
                    onChange={(e) =>
                        setClient(() => {
                            if (e.target.value === '') {
                            return { ...client, priceFinal: 0 }
                            } else {
                            return { ...client, priceFinal: parseInt(e.target.value) }
                            }
                        })
                    }
                    />
                </Grid>
                <Grid item xs={6} mt={2}>
                    <input
                    type="file"
                    accept=".png, .jpeg, .jpg"
                    onChange={handleImageChange}
                    />
                </Grid>
            </Box>
            )}
            <Grid item xs={12} textAlign={'center'} mt={8}>
                <Button
                    variant="contained"
                    disabled={!isReservationValid()}
                    onClick={() => setShowModal(true)}
                >
                    Registrar reserva
                </Button>
                <Button>Cancelar</Button>
            </Grid>
            <Dialog
                open={showModal}
                onClose={() => setShowModal(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {'¿Desea registrar una reserva?'}
                </DialogTitle>
                <DialogActions>
                <Button
                    disabled={updateLoading}
                    onClick={handleRegister}
                    autoFocus
                >
                    <LoadingWrapper loading={updateLoading}> </LoadingWrapper>
                    Sí, crear
                </Button>
                <Button onClick={() => setShowModal(false)}>Cancelar</Button>
                </DialogActions>
            </Dialog>
        </Drawer>
    )
}

export default PageCreateReservation;