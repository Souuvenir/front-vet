'use client'
import "keen-slider/keen-slider.min.css"
import React, { useEffect, useState } from 'react';



export default function Login() {
    const [redirecting, setRedirecting] = useState(false);

  const register = async (event) => {
    event.preventDefault();

    const nombreUsuario = document.getElementById('nombre_usuario').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const confirmPassword = document.getElementById('Cpassword').value;

    const data = { nombreUsuario, email, password};

    // Validar que todos los campos obligatorios estén llenos
    if (!nombreUsuario || !nombre || !apellido || !email || !password || !confirmPassword) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    console.log(data);
    try {
      const res = await fetch('https://dull-pear-scallop-tux.cyclic.app/SV/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (res.ok) {
        setRedirecting(true);
      } else {
        alert(json.message);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('An unexpected error occurred. Please try again.');
    }
  };
  useEffect(() => {
    const handleLogin = async () => {
      try {
        if (redirecting) {
          window.location.href = '/login';
        }
      } catch (error) {
        console.error('Error handling redirection:', error);
      }
    };

    handleLogin();
  }, [redirecting]);
  return (
<main className="flex flex-col items-center justify-between p-24" >
    <div className="container h-full p-10">
      <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
        <div className="w-full">
          <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
            <div className="g-0 lg:flex lg:flex-wrap">
              <div className="px-4 md:px-0 lg:w-6/12">
                <div className="md:mx-6 md:p-12">
                  <div className="text-center">
                    <h4 className="mb-3 mt-2 pb-1 text-xl">
                      Vet Plus Registro
                    </h4>
                  </div>

                  <form>
                    
                    <div className="relative mb-4" data-te-input-wrapper-init>
                      <label
                        htmlFor="exampleFormControlInput1"
                        className=""
                      >
                        Nombre de usuario:
                      </label>
                      <input
                        type="text"
                        className=" peer block min-h-[auto] w-full rounded border-0 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                        id="nombre_usuario"
                        placeholder="Nombre de Usuario"
                      />
                    </div>
                    <div className="relative mb-4" data-te-input-wrapper-init>
                      <label
                        htmlFor="exampleFormControlInput1"
                        className=""
                      >
                        Nombre: 
                      </label>
                      <input
                        type="text"
                        className="peer block min-h-[auto] w-full rounded border-0 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                        id="nombre"
                        placeholder="Nombre"
                      />
                    </div>
                    <div className="relative mb-4" data-te-input-wrapper-init>
                      <label
                        htmlFor="exampleFormControlInput1"
                        className=""
                      >
                        Apellido: 
                      </label>
                      <input
                        type="text"
                        className="peer block min-h-[auto] w-full rounded border-0  px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                        id="apellido"
                        placeholder="Apellido"
                      />
                    </div>
                    <div className="relative mb-4" data-te-input-wrapper-init>
                      <label
                        htmlFor="exampleFormControlInput1"
                        className=""
                      >
                        Email 
                      </label>
                      <input
                        type="email"
                        className="peer block min-h-[auto] w-full rounded border-0  px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                        id="email"
                        placeholder="Email"
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
                        className="peer block min-h-[auto] w-full rounded border-0  px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                        id="password"
                        placeholder="Password"
                      />
                    </div>
                    <div className="relative mb-4" data-te-input-wrapper-init>
                      <label
                        htmlFor="exampleFormControlInput11"
                        className=""
                      >
                        Confirmar Contraseña
                      </label>
                      <input
                        type="password"
                        className="peer block min-h-[auto] w-full rounded border-0 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                        id="Cpassword"
                        placeholder="Confirmar Contraseña"
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
                        onClick={register}
                      >
                        Registrarse
                      </button>

                      
                    </div>

                    <div className="flex items-center justify-between pb-6">
                      <p className="mb-0 mr-2">Ya tienes una cuenta?</p>
                      <button
                        type="button"
                        className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                        data-te-ripple-init
                        data-te-ripple-color="light"
                        onClick={() => {
                          window.location.href = "/login";
                        }}
                      >
                        Inicia Sesion
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none">
                       <img
                      className="mx-auto w-35"
                      src="/RegistroVector.png"
                      alt="logo"
                    />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</main>
  )
}
