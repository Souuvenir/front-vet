'use client'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHouse, faCalendarCheck, faCalendar} from "@fortawesome/free-solid-svg-icons";
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


export default function Dashboard() {

  const [activeNavItem, setActiveNavItem] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [petName, setPetName] = useState('');
  const [race, setRace] = useState('');
  const [reason, setReason] = useState('');
  const [species, setSpecies] = useState('');
  const [rows, setRows] = useState([]);
  const [item, setItem] = useState('');
  const handleNavItemClick = (index) => {
    setActiveNavItem(index);
  };

  useEffect(() => {
   setItem(localStorage.getItem('username'))
  }, []);

  const onChangeDate = (date) => {
    setSelectedDate(date);
  };

  const onChangeSpecies = (event) => {
    setSpecies(event.target.value);
  };

  const getDates = async () => {
  try {
    const idUsuario = localStorage.getItem('userId');
    var dataCitas = [];
    const res = await fetch('http://localhost:3001/SV/cita/all', {
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

  const addDate = async (event) => {
    console.log(petName);
    console.log(selectedDate);
    console.log(race);
    console.log(reason);
    console.log(species);
    try {
      if (event) {
        event.preventDefault();
      }
      const formatedDate = dayjs(selectedDate).format('YYYY-MM-DD HH:mm:ss');
      const idUsuario = localStorage.getItem('userId');
      const data = { date: formatedDate, petName, race, reason, species, idUsuario };
      console.log(data);

      const res = await fetch('http://localhost:3001/SV//createCita', {
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
    <div className="body">
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
                    <label
                      htmlFor="petName"
                      className="block text-sm font-semibold text-gray-800"
                    >
                      Nombre de la Mascota
                    </label>
                    <input
                      value={petName}
                      onChange={(e) => setPetName(e.target.value)}
                      id="petName"
                      type="text"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-800 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
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
                    id="species"
                    value = {species}
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
          <h1>Vet Plus</h1>
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
              <a onClick={() => setShowModal(true)}>
                <FontAwesomeIcon className="nav-icon" icon={faCalendarCheck} />
                <span className="nav-text">Tomar Cita</span>
              </a>
            </li>
          </ul>
        </nav>

        <section className="content">
          <div className="left-content">
            <div className="activities">
              <h1>Perfil Mascota</h1>
              <div className="activity-container">
                <div className="image-container img-one">
                  <img src="/Poopy2.jpg" alt="perrito" />
                  <div className="overlay">
                    <h3>Poopy</h3>
                  </div>
                </div>

                <div className="image-container img-two">
                  <img src="Poopy1.jpeg" alt="gatito" />
                  <div className="overlay">
                    <h3>Poopy</h3>
                  </div>
                </div>

                <div className="image-container img-three">
                  <a className="block max-w-m p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Mascota test</h5>
                  <p className="font-normal text-gray-700 dark:text-gray-400 pt-2 pl-3">Edad:</p>
                  <p className="font-normal text-gray-700 dark:text-gray-400 pt-2 pl-3">Raza:</p>
                  <p className="font-normal text-gray-700 dark:text-gray-400 pt-2 pl-3">Genero:</p>
                  <p className="font-normal text-gray-700 dark:text-gray-400 pt-2 pl-3">Peso:</p>
                  <p className="font-normal text-gray-700 dark:text-gray-400 pt-2 pl-3">Altura:</p>
                  <p className="font-normal text-gray-700 dark:text-gray-400 pt-2 pl-3">Color:</p>
                  <p className="font-normal text-gray-700 dark:text-gray-400 pt-2 pl-3">Especie:</p>
                  <p className="font-normal text-gray-700 dark:text-gray-400 pt-2 pl-3">Dueño:</p>
                  <p className="font-normal text-gray-700 dark:text-gray-400 pt-2 pb-5 pl-3">Telefono:</p>
                  </a>
                </div>
              
              </div>
            </div>
          </div>
    
          <div className="right-content">
            <div className="user-info">
              <div className="icon-container">
              </div>
              <h4 className="color">Bienvenido</h4>
              <h1 className="color">{item}</h1>
          </div>
          <div className="active-calories color">
            <h1 >Dates</h1>
            <div className="active-calories-container">
              <div className="box" >
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
    )
}