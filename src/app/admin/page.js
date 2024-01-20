'use client'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHouse, faUserNurse, faClipboardUser, faRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import * as React from 'react';
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
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Button from '@mui/material/Button';


export default function Dashboard() {

  const [activeNavItem, setActiveNavItem] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [nombre, setNombre] = useState(''); // Actualizado a 'nombre'
  const [rut, setRut] = useState(''); // Actualizado a 'rut'
  const [edad, setEdad] = useState(''); // Actualizado a 'edad'
  const [especialidad, setEspecialidad] = useState(''); // Actualizado a 'especialidad'
  const [rows, setRows] = useState([]);
  const [item, setItem] = useState('');
  const handleNavItemClick = (index) => {
    setActiveNavItem(index);
  };
   const data = [
    {
      "year": "2016",
      "Vet Felinos": 150,
      "Vet Caninos": 200
    },
    {
      "year": "2017",
      "Vet Felinos": 100,
      "Vet Caninos": 300
    },
    
   ]
    const logOut = async (event) => {
    console.log("entro");
    console.log(localStorage.getItem('userId'));
    console.log(localStorage.getItem('username'));
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    window.location.href = '/';
  }

  useEffect(() => {
   setItem(localStorage.getItem('username'))
  }, []);

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
      setRows(dataCitas);
      console.log('Citas del usuario:', citasUsuario);
    } else {
      alert("error al obtener las citas"); 
    }
    
  } catch (error) {
    console.error('Error during getDates:', error);
    alert('An unexpected error occurred. Please try again.');
  }
};

  const addVet = async (event) => {
    try {
      if (event) {
        event.preventDefault();
      }
      const idUsuario = localStorage.getItem('userId');
      const data = { nombre, rut, edad, especialidad};
      console.log(data);

      const res = await fetch('https://dull-pear-scallop-tux.cyclic.app/SV/veterinario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (res.ok) {
        console.log(data);
        alert("Vet Agregado Exitosamente");
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
                    Agregar nuevo Veterinario
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
                    En este componente puedes agregar un veterinario a la base de datos.
                    Recuerda completar todos los campos!
                  </p>
                  <div className="mb-4 mt-4">
                    <label
                      htmlFor="Nombre"
                      className="block text-sm font-semibold text-gray-800"
                    >
                      Nombre
                    </label>
                    <input
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      id="Nombre"
                      type="text"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-800 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="Rut"
                      className="block text-sm font-semibold text-gray-800"
                    >
                      Rut
                    </label>
                    <input
                      value={rut}
                      onChange={(e) => setRut(e.target.value)}
                      id="Rut"
                      type="text"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-800 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="Edad"
                      className="block text-sm font-semibold text-gray-800"
                    >
                      Edad
                    </label>
                    <input
                      value={edad}
                      onChange={(e) => setEdad(e.target.value)}
                      id="edad"
                      type="number"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-800 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                  <FormLabel className="color" id="demo-radio-buttons-group-label">Especialidad</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                    id="especialidad"
                    value = {especialidad}
                    onChange = {(e) => setEspecialidad(e.target.value)}
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
                      addVet();
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
                     Agregar Recetas Medicas
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
                              <TableCell align="right">Test</TableCell>
                              <TableCell align="right">{row.idVeterinario}</TableCell>
                              <Button variant="contained" color="primary" onClick={() => handleAgregarReceta(row)}>
                                Agregar Receta
                            </Button>
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
                <FontAwesomeIcon className="nav-icon" icon={faClipboardUser} />
                <span className="nav-text">Citas</span>
              </a>
            </li>
            <li className={`nav-item ${activeNavItem === 2 ? 'active' : ''}`} onClick={() => handleNavItemClick(2)}>
              <b></b>
              <b></b>
              <a onClick={() => setShowModal(true)}>
                <FontAwesomeIcon className="nav-icon" icon={faUserNurse} />
                <span className="nav-text">Agregar Vet</span>
              </a>
            </li>
            <li className={`nav-item ${activeNavItem === 3 ? 'active' : ''}`} onClick={() => handleNavItemClick(3)}>
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
          <div className="left-content">
            <div className="activities">
              <h1>Dashboard Admin</h1>
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
                    <h2 className="color">Citas totales</h2>
                    <section className="flex justify-evenly my-4 px-4 gap-3">
                        <div className="w-5/6 h-[300px] bg-gray-700 rounded">
                             <>
                                <ResponsiveContainer width="100%" height="100%" >
                                <AreaChart width={730} height={250} data={data}
                                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <defs>
                                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                                    </linearGradient>
                                    </defs>
                                    <XAxis dataKey="year" />
                                    <YAxis />
                                    <Tooltip />
                                    <Area type="monotone" dataKey="Vet Felinos" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                                    <Area type="monotone" dataKey="Vet Caninos" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                                </AreaChart>
                                </ResponsiveContainer>
                            </>
                        </div>
                    </section>
                </div>          
              </div>
            </div>
          </div>
      </section>
    </main>
  </div>
    )
}