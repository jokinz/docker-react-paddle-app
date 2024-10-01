import Drawer from '../components/Drawer'
import React from 'react';
import { useEffect, useContext, useState } from 'react'
import { getDaysHabilitationReservation, getCourtsReservations } from '../api/reservations'
import AddIcon from '@mui/icons-material/Add';
import { enqueueSnackbar } from 'notistack'
import { useNavigate } from 'react-router-dom'
import { getItems } from '../api/items/item'
import { EmployeeContext } from '../contexts/EmployeeContext'
import LoadingWrapper from '../components/LoadingWrapper'
import { getUsers } from '../api/users/user'
import {
    Box,
    Button,
    Grid,
    InputLabel,
    FormControl,
    TextField,
    Select,
    MenuItem,
    IconButton, 
    Typography,
    Avatar,
  } from '@mui/material'

const objetReservation: any = {
    dateInit: '',
    priceFinal: '',
    name: '',
    lastName: '',
    typeDocument: '',
    numberDocument: null,
    email: null,
    documentUrl: null,
  }

const PageCreateReservation = () => {
    const navigate = useNavigate()
    const [objectReservation, setItem] = useState<any>(objetReservation)
    const [daysList, setDaysHabilitation] = useState<any[]>([])
    const [establishmentNumber, setEstablishment] = useState<number>(0)
    const [playingLocationList, setPlaying] = useState<any[]>([])
    const [dayinit, setDayItem] = useState<any[]>([])
    const [location, setLocation] = useState<string>('')
    const [intervalItem, setIntervalItem] = useState<any[]>([])
    const [itemsList, setItemsList] = useState<any[]>([])
    const employeeContext = useContext(EmployeeContext)
    const token = employeeContext?.token
    const [horas, setHoras] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingLocation, setLoadingLocation] = useState(false);
    const [client, setClient] = useState({
        firstName: '',
        lastName: '',
        typeDocument: null,
        email: null,
        numberDocument: null,
      });

    useEffect(() => {
        const getDays = async () => {
            try {
                const response = await getDaysHabilitationReservation({ establishmentId: 1, count: 14, interval: 90 }, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbnRpdHkiOiJVc2VyIiwiZW50aXR5SWQiOjMsImlhdCI6MTcyNzQ4Mzc5NSwiZXhwIjoxNzU5MDQxMzk1fQ.UwylSnIcgXB7Ywuoy89LV5e5y-9IkerVfgPN_mcm_wk')
                if (response) {
                    setDaysHabilitation(response.days);
                    setEstablishment(response.establishmentId);
                } else {
                    setDaysHabilitation([])
                }
            } catch (error) {
                console.log(error);
            }
        }
        getDays()
    }, [])


    const handleRegister = () => {
        enqueueSnackbar('Reserva creada correctamente.', { variant: 'success' })
    }

    const convertDateFormat = (dateString: string) => {
        const [datePart, timePart] = dateString.split(' ');
        const [day, month, year] = datePart.split('-');
        const newDateString = `${month}-${day}-${year} ${timePart}`;
      
        return new Date(newDateString);
      };

    const setDay = (newValue: string) => {
        setDayItem(newValue.date);
        setIntervalItem(newValue.interval)
        const startDate = convertDateFormat(newValue.startTime);
        const endDate = convertDateFormat(newValue.endTime);
        const horasGeneradas = generarHoras(startDate, endDate, newValue.interval);
        setHoras(horasGeneradas);
    }

    const generarHoras = (inicio: string, fin: string, intervalo: string) => {
        const fechaInicio = new Date(inicio);
        const fechaFin = new Date(fin);
        const totalIntervalos = Math.floor((fechaFin - fechaInicio) / (intervalo * 60 * 1000)) + 1;
    
        return Array.from({ length: totalIntervalos }, (_, index) => {
          const nuevaFecha = new Date(fechaInicio);
          nuevaFecha.setMinutes(nuevaFecha.getMinutes() + index * intervalo);
          return nuevaFecha.toTimeString().slice(0, 5);
        });
      };

    const setHour = async (newValue: number) => {
        try {
            setLoadingLocation(true);
            const response = await getCourtsReservations(establishmentNumber, {
                establishmentId: establishmentNumber,
                date: dayinit,
                startTime: `${newValue}:00`,
                interval: intervalItem
            },
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbnRpdHkiOiJVc2VyIiwiZW50aXR5SWQiOjMsImlhdCI6MTcyNzQ4Mzc5NSwiZXhwIjoxNzU5MDQxMzk1fQ.UwylSnIcgXB7Ywuoy89LV5e5y-9IkerVfgPN_mcm_wk');
            if (response) {
                setPlaying(response);
            } else {
                setPlaying([]);
            }
        } catch (error) {
            setPlaying([]);
        } finally {
            setLoadingLocation(false)
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

    const setPlayingLocation = async (item: any) => {
        setLocation(item.id)
        setItem({ ...objetReservation, priceFinal: item.price + item.priceBracket.priceOffset });
    }

    useEffect(() => {
        if (location !== null) {
            const useGetItems = async () => {
                try {
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
                } catch (error) {
                    console.log(error);
                } finally {
                    setLoading(false)
                }
        
            }
            useGetItems()
        }
    }, [location])

    const handleDocumentTypeChange = (event: any) => {
        setItem({ ...objetReservation, typeDocument: event.target.value })
      }

    const addItems = (item: any) => {
        setItem({ ...objetReservation, priceFinal: objectReservation.priceFinal + item.price });
    }

    const handleSearchUsers = async (newValue: string) => {
        setItem((prev) => {
            return { ...prev, numberDocument: newValue }
        })
        try {
            const result = await getUsers({ search: newValue }, token);
            if (result) {
                setClient(result[0]);
            } else { 
                setClient({});
                enqueueSnackbar('No se encontraron resultados.', { variant: 'warning' })
            }

        } catch (error) {
            console.log(error);
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
                    <h1>Items</h1>
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
                                    src={item.thumbnail}
                                    alt={item.name}
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
            <h1>Registrar Cliente</h1>
            <Grid container spacing={2} mt={2}>
                <Grid item xs={6}>
                    <FormControl fullWidth variant="standard">
                    <InputLabel id="demo-simple-select-label">
                        Tipo de documento
                    </InputLabel>
                    {/* onChange={handleDocumentTypeChange} */}
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Tipo Documento"
                        value={client.typeDocument}
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
                    id="numberDocument"
                    value={client.numberDocument}
                    label="Número de Documento"
                    variant="filled"
                    type="number"
                    required
                    onChange={(e) =>
                        handleSearchUsers(e.target.value)
                      }
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
                    onChange={(e) =>
                        setClient((prev) => {
                          return { ...prev, firstName: e.target.value }
                        })
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
                        setClient((prev) => {
                          return { ...prev, lastName: e.target.value }
                        })
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
                    setClient((prev) => {
                      return { ...prev, email: e.target.value }
                    })
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
                    setClient((prev) => {
                        if (e.target.value === '') {
                          return { ...prev, priceFinal: 0 }
                        } else {
                          return { ...prev, priceFinal: parseInt(e.target.value) }
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
            <Grid item xs={12} textAlign={'center'} mt={8}>
                <Button
                    variant="contained"
                    onClick={handleRegister}
                >
                    Registrar reserva
                </Button>
                <Button>Cancelar</Button>
            </Grid>
        </Drawer>
    )
}

export default PageCreateReservation;