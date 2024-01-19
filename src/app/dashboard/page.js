'use client'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHouse, faCalendarCheck, faCalendar,faRightFromBracket, faBone} from "@fortawesome/free-solid-svg-icons";
import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import dayjs from 'dayjs';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
import { Salsa } from 'next/font/google'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const openSans = Salsa({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export default function Dashboard() {

  const [activeNavItem, setActiveNavItem] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [nombre, setNombre] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [edad, setEdad] = useState('');
  const [race, setRace] = useState('');
  const [reason, setReason] = useState('');
  const [especie, setEspecie] = useState('');
  const [rows, setRows] = useState([]);
  const [item, setItem] = useState('');
  const [pacientes, setPacientes] = useState([]);
  const [selectedPaciente, setSelectedPaciente] = useState('');


  const handleNavItemClick = (index) => {
    setActiveNavItem(index);
  };
  
   const handlePaciente = (event) => {
    setSelectedPaciente(event.target.value);
  };

  const handleChangePaciente =  async () => {
    const idUsuario = localStorage.getItem('userId');
    var dataPacientes = [];
    console.log('entro handleChangePaciente');
    const res = await fetch('https://dull-pear-scallop-tux.cyclic.app/SV/paciente', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await res.json();

    if (res.ok) {
      console.log(json, 'json');
      dataPacientes = json;
      const pacientesUsuario = dataPacientes.filter((paciente) => paciente.idUsuario === idUsuario);
      setPacientes(pacientesUsuario);
      console.log('pacientes:', pacientesUsuario);
    } else {
      alert("error al obtener mascotas"); 
    }
  };

  useEffect(() => {
   setItem(localStorage.getItem('username'))
  }, []);

  const onChangeDate = (date) => {
    setSelectedDate(date);
  };

  const onChangeSpecies = (event) => {
    setEspecie(event.target.value);
  };

  const getDates = async () => {
  try {
    const idUsuario = localStorage.getItem('userId');
    var dataCitas = [];
    const res = await fetch('https://dull-pear-scallop-tux.cyclic.app/SV/cita/all', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const json = await res.json();

    if (res.ok) {
      dataCitas = json.citas;
      console.log(json);
      const citasUsuario = dataCitas.filter((cita) => cita.idUsuario === idUsuario);
      setRows(citasUsuario);
      console.log('Citas del usuario:', citasUsuario);
    } else {
      alert("error al obtener las citas"); 
    }
    
  } catch (error) {
    console.error('Error during getDates:', error);
    alert('An unexpected error occurred. Please try again.');
  }
};
  const logOut = async (event) => {
    console.log("entro");
    console.log(localStorage.getItem('userId'));
    console.log(localStorage.getItem('username'));
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    window.location.href = '/';
  }


const savePet = async (event) => {
  try {
    if (event) {
      event.preventDefault();
    }

    if (!nombre || !fechaNacimiento || !edad || !especie) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    const idUsuario = localStorage.getItem('userId');
    const data = {
      idUsuario: idUsuario,
      nombre: nombre,
      fechaNacimiento: fechaNacimiento,
      edad: edad,
      especie: especie,
    };
    console.log(data);
    const res = await fetch('https://dull-pear-scallop-tux.cyclic.app/SV/paciente', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      console.log(data);
      alert('Mascota Agregada Exitosamente');
    } else {
      alert('Error al crear mascota');
    }
  } catch (error) {
    console.error('Error during savePet:', error);
    alert('An unexpected error occurred. Please try again.');
  }
};

  const addDate = async (event) => {
    try {
      if (event) {
        event.preventDefault();
      }
      const formatedDate = dayjs(selectedDate).format('YYYY-MM-DD HH:mm:ss');
      const idUsuario = localStorage.getItem('userId');
      const data = { date: formatedDate, nombre, race, reason, especie, idUsuario };
      console.log(data);

      const res = await fetch('https://dull-pear-scallop-tux.cyclic.app/SV/createCita', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (res.ok) {
        console.log(data);
        alert("Cita Agendada Exitosamente");
      } else {
        alert(json.message);
      }
    } catch (error) {
      console.error('Error during addDate:', error);
      alert('An unexpected error occurred. Please try again.');
    }
  };
  return (
    <div className="body2">
        {showModal3 ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative min-w-12 my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold color">
                    Agregar Mascota
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="relative p-6 w-45">
                  <p className="my-4 text-blueGray-500 text-lg leading-relaxed color">
                    I always felt like I could do anything. That’s the main
                    thing people are 
                  </p>
                  <div className="mb-4 mt-4">
                    <label
                      htmlFor="nombre"
                      className="block text-sm font-semibold text-gray-800"
                    >
                      Nombre de la Mascota
                    </label>
                    <input
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      id="nombre"
                      type="text"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-800 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="fechaNacimiento"
                      className="block text-sm font-semibold text-gray-800"
                    >
                      Fecha de Nacimiento
                    </label>
                    <input
                      value={fechaNacimiento}
                      onChange={(e) => setFechaNacimiento(e.target.value)}
                      id="fechaNacimiento"
                      type="text"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-800 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="edad"
                      className="block text-sm font-semibold text-gray-800"
                    >
                      Edad
                    </label>
                    <input
                      value={edad}
                      onChange={(e) => setEdad(e.target.value)}
                      id="edad"
                      type="text"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-800 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                  <FormLabel className="color" id="demo-radio-buttons-group-label">Especie</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="Canino"
                    name="radio-buttons-group"
                    id="especie"
                    value = {especie}
                    onChange = {onChangeSpecies}
                  >
                    <FormControlLabel className="color" value="Canino" control={<Radio />} label="Canino" />
                    <FormControlLabel className="color" value="Felino" control={<Radio />} label="Felino" />
                    <FormControlLabel className="color" value="Exotico" control={<Radio />} label="Exotico" />
                  </RadioGroup>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal3(false)}
                  >
                    Cerrar
                  </button>
                  <button
                    className="font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    style={{
                          background:
                            "linear-gradient(to right, #01C2FF, #B829EB)",
                        }}
                    onClick={() => {
                      setShowModal3(false);
                      savePet();
                    }}
                  >
                    Agregar Mascota
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative min-w-12 my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold color">
                    Reservar una Cita
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="relative p-6 w-45">
                  <p className="my-4 text-blueGray-500 text-lg leading-relaxed color">
                    I always felt like I could do anything. That’s the main
                    thing people are 
                  </p>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer 
                      components={['DateTimePicker']}>
                      <DateTimePicker label="Escoge Una Cita" 
                      value={selectedDate}
                      onChange={(newValue) => onChangeDate(newValue)}/>
                    </DemoContainer>
                  </LocalizationProvider>

                  <div className="mb-4 mt-4">
                    <Box sx={{ minWidth: 120 }}>
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Nombre Mascota</InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              label="pacientes"
                              value={selectedPaciente}
                              onChange={handlePaciente}
                            >
                          <MenuItem value="">Selecciona un paciente</MenuItem>
                          {pacientes ? pacientes.map(paciente=> {
                            return <MenuItem 
                            value={paciente._id}
                            key={paciente._id}>
                                <em>{paciente.nombre}</em>
                            </MenuItem>
                            }) : null
                          }
                        </Select>
                          </FormControl>
                        </Box>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="race"
                      className="block text-sm font-semibold text-gray-800"
                    >
                      Raza
                    </label>
                    <input
                      value={race}
                      onChange={(e) => setRace(e.target.value)}
                      id="race"
                      type="text"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-800 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="reason"
                      className="block text-sm font-semibold text-gray-800"
                    >
                      Motivo de la consulta
                    </label>
                    <input
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      id="reason"
                      type="text"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-800 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                  <FormLabel className="color" id="demo-radio-buttons-group-label">Especie</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                    id="especie"
                    value = {especie}
                    onChange = {onChangeSpecies}
                  >
                    <FormControlLabel className="color" value="Canino" control={<Radio />} label="Canino" />
                    <FormControlLabel className="color" value="Felino" control={<Radio />} label="Felino" />
                    <FormControlLabel className="color" value="Exotico" control={<Radio />} label="Exotico" />
                  </RadioGroup>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    style={{
                          background:
                            "linear-gradient(to right, #01C2FF, #B829EB)",
                        }}
                    onClick={() => {
                      setShowModal(false);
                      addDate();
                    }}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      {showModal2 ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative min-w-12 my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold color">
                     Mostrar Citas de Usuario: {item}
                  </h3>
                </div>
                <div className="relative p-6 w-45">
                  <p className="my-4 text-blueGray-500 text-lg leading-relaxed color">
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>Fecha Cita</TableCell>
                            <TableCell align="right">Hora Inicio</TableCell>
                            <TableCell align="right">Hora Final</TableCell>
                            <TableCell align="right">Nombre Mascota</TableCell>
                            <TableCell align="right">Veterinario Asignado</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows.map((row) => (
                            <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                              <TableCell component="th" scope="row">
                                {row.fecha}
                              </TableCell>
                              <TableCell align="right">{row.hora_inicio}</TableCell>
                              <TableCell align="right">{row.hora_fin}</TableCell>
                              <TableCell align="right">{}</TableCell>
                              <TableCell align="right">{row.idVeterinario}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </p>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    style={{
                      background: "linear-gradient(to right, #01C2FF, #B829EB)",
                    }}
                    onClick={getDates}
                  >
                    Ver Citas
                  </button>
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal2(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      <main className="main">
        <nav className="main-menu">
          <h1 className={openSans.className} >Vet Plus</h1>
          <img className="logo" src="LogoBlanco.png" alt="" />
          <ul>
            <li className={`nav-item ${activeNavItem === 0 ? 'active' : ''}`} onClick={() => handleNavItemClick(0)}>
              <b></b>
              <b></b>
              <a href="#"
              >
                <FontAwesomeIcon className="nav-icon" icon={faHouse} />
                <span className="nav-text">Dashboard</span>
              </a>
            </li>

            <li className={`nav-item ${activeNavItem === 1 ? 'active' : ''}`} onClick={() => handleNavItemClick(1)}>
              <b></b>
              <b></b>
              <a onClick={() =>setShowModal2(true)}>
                <FontAwesomeIcon className="nav-icon" icon={faCalendar} />
                <span className="nav-text">Citas</span>
              </a>
            </li>
            <li className={`nav-item ${activeNavItem === 2 ? 'active' : ''}`} onClick={() => handleNavItemClick(2)}>
              <b></b>
              <b></b>
              <a onClick={() => {setShowModal(true); handleChangePaciente();}}>
                <FontAwesomeIcon className="nav-icon" icon={faCalendarCheck} />
                <span className="nav-text">Tomar Cita</span>
              </a>
            </li>
            <li className={`nav-item ${activeNavItem === 3 ? 'active' : ''}`} onClick={() => handleNavItemClick(3)}>
              <b></b>
              <b></b>
              <a onClick={() => { setShowModal3(true) }}>
                <FontAwesomeIcon className="nav-icon" icon={faBone} />
                <span className="nav-text"> Mascota</span>
              </a>
            </li>
            <li className={`nav-item ${activeNavItem === 4 ? 'active' : ''}`} onClick={() => handleNavItemClick(4)}>
              <b></b>
              <b></b>
              <a onClick={() => logOut()}>
                <FontAwesomeIcon className="nav-icon" icon={faRightFromBracket} />
                <span className="nav-text">Cerrar Sesion</span>
              </a>
            </li>
          </ul>
        </nav>
        <section className="content">
          <div className="">
            <div className="">
              <div className="wrapper">
                <div className="home-hero">
                  <div className="feature color">
                    <h3>Noticias:</h3>
                      <a className="a" href="https://www.eltiempo.com/vida/mascotas/cientifico-japones-desarrollo-un-medicamento-que-podria-extender-la-vida-de-los-gatos-835991" target="_blank">
                        Científico desarrolló vacuna que extendería la vida de los gatos hasta el doble
                      </a>
                  </div>
                  <div className="special">
                    <h3 className="a2">Tips para este verano:</h3>
                    <a className="a2" href="https://www.hundshop.cl/blogs/consejos-para-dog-lovers-en-hundshop/consejos-para-ir-a-la-playa-con-perro" target="_blank">
                      8 Consejos para ir a la PLAYA con tu perro
                    </a>
                  </div>
                  <div className="amazing">
                      <a className="a2" href="https://www.biobiochile.cl/especial/aqui-tierra/noticias/2023/12/27/divisan-en-atacama-ejemplar-de-la-chinchilla-de-cola-corta-animal-que-se-creia-extinto-hace-12-anos.shtml" target="_blank">
                        Divisan en Atacama ejemplar de la chinchilla de cola corta
                      </a>
                  </div>
                  <div className="news">
                    <p className="a" >Los mejores juguetes para tu mascota!</p>
                  </div>
                  <div className="cta">
                    <p className="a2">Inscribete al Newsletter de los mejores Veterinarios</p>
                    <a className="spam-button" href="/spam-machine">
                      Inscribeme!
                    </a>
                  </div>
                  <div className="cta2">
                    <p className="a2">Encuentra el veterinario ideal para tu mascota!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </section>
    </main>
  </div>
  )
}``