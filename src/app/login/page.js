'use client'
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import React, { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

export default function Login() {
  const [sliderRef] = useKeenSlider({ loop: true });
  const [redirecting, setRedirecting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const login = async (event) => {
    setShowModal(true);
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const data = { username, password };

    try {
      const res = await fetch('https://dull-pear-scallop-tux.cyclic.app/SV/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (res.ok) {
        console.log('hola');
        localStorage.setItem('userId', json.userId);
        localStorage.setItem('username', json.usuario);
        console.log(json.usuario);
        setRedirecting(true);
        setShowModal(false);
      } else {
        alert(json.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An unexpected error occurred. Please try again.');
    }
  };

  useEffect(() => {
    const handleLogin = async () => {
      var userId = localStorage.getItem('userId', userId);
      const isAdmin = '65977ee931af0d0f68bdfe18';

      try {
        if (redirecting && userId === isAdmin) {
          window.location.href = '/admin';
        } if(redirecting && userId !== isAdmin) {
          window.location.href = '/dashboard';
        }
      } catch (error) {
        console.error('Error handling redirection:', error);
      }
    };

    handleLogin();
  }, [redirecting]);
  return (
  <main className="flex flex-col items-center justify-between p-24">
        {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative min-w-12 mx-auto max-w-3xl">
              <div className="">
                <div className="">
                <div className="">
                  <div className="" > 
                  <div className="" style={{ borderRadius: '10px',display: 'flex', justifyContent: 'center', alignItems:"center",height:"200px", background:'white', width: '200px' }}>
                      <div className="dog">
                        <div className="dog-body">
                          <div className="dog-tail">
                            <div className="dog-tail">
                              <div className="dog-tail">
                                <div className="dog-tail">
                                  <div className="dog-tail">
                                    <div className="dog-tail">
                                      <div className="dog-tail">
                                        <div className="dog-tail"></div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="dog-torso"></div>
                        <div className="dog-head">
                          <div className="dog-ears">
                            <div className="dog-ear"></div>
                            <div className="dog-ear"></div>
                          </div>
                          <div className="dog-eyes">
                            <div className="dog-eye"></div>
                            <div className="dog-eye"></div>
                          </div>
                          <div className="dog-muzzle">
                            <div className="dog-tongue"></div>
                          </div>
                        </div>
                      </div>
                    <div className="ball" tabIndex="0"></div>
                </div>
              </div>
              </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    <div className="container h-full p-10">
      <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
        <div className="w-full">
          <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
            <div className="g-0 lg:flex lg:flex-wrap">
              <div className="px-4 md:px-0 lg:w-6/12">
                <div className="md:mx-6 md:p-12">
                  <div className="text-center">
                    <img
                      className="mx-auto w-40"
                      src="/LogoBlanco.png"
                      alt="logo"
                    />
                    <h4 className="mb-12 mt-2 pb-1 text-xl">
                      Vet Plus
                    </h4>
                  </div>

                  <form>
                    <p className="mb-4 text-center">Iniciar Sesion</p>
                    <div className="relative mb-4" data-te-input-wrapper-init>
                      <label
                        htmlFor="exampleFormControlInput1"
                        className=""
                      >
                        Usuario
                      </label>
                      <input
                        type="text"
                        className="peer block min-h-[auto] w-full rounded border-0 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                        id="username"
                        placeholder=""
                      />
                    </div>

                    <div className="relative mb-4" data-te-input-wrapper-init>
                      <label
                        htmlFor="exampleFormControlInput11"
                        className=""
                      >
                        Contraseña
                      </label>
                      <input
                        type="password"
                        className="peer block min-h-[auto] w-full rounded border-0 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-03333339333ikm06"
                        id="password"
                        placeholder=""
                      />
                    </div>

                    <div className="mb-12 pb-1 pt-1 text-center">
                      <button
                        className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                        type="button"
                        data-te-ripple-init
                        data-te-ripple-color="light"
                        style={{
                          background:
                            "linear-gradient(to right, #01C2FF, #B829EB)",
                        }}
                        onClick={login}
                      >
                        Iniciar Sesion
                      </button>

                      
                    </div>

                    <div className="flex items-center justify-between pb-6">
                      <p className="mb-0 mr-2">No tienes una cuenta?</p>
                      <button
                        type="button"
                        className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                        data-te-ripple-init
                        data-te-ripple-color="light"
                        onClick={() => {
                          window.location.href = "/register";
                        }}
                      >
                        Registro
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              <div className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none">
                <div ref={sliderRef} className="keen-slider">
                <div className="keen-slider__slide number-slide6"><img src="perrito doctor.png" alt="slide1"/></div>
                <div className="keen-slider__slide number-slide6"><img src="Poopy1.jpeg" alt="slide2"/></div>
                <div className="keen-slider__slide number-slide6"><img src="Poopy2.jpg" alt="slide3"/></div>
                <div className="keen-slider__slide number-slide4"><img src="PerritoVeterninario.png" alt="slide3"/></div>
                <div className="keen-slider__slide number-slide5"><img src="VetGatitoChico.png" alt="slide3"/></div>
                <div className="keen-slider__slide number-slide6"><img src="VetMapache.png" alt="slide3"/></div>
              </div> 
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</main>
  )
}
