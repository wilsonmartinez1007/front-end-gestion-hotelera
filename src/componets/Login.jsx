
import React, { useState } from 'react';
import imagenLogin from '../assets/3094352.jpg'; // Imagen para inicio de sesión
import imagenRegistro from '../assets/registro.jpg'; // Imagen para registro
import imagenProfile from '../assets/goku.jpg';
import appFirebase from '../credenciales';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
//vdssb
const auth = getAuth(appFirebase);

const Login = () => {
    const [registrando, setRegistrando] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [cedula, setCedula] = useState('');

    const handleAuthentication = async (e) => {
        e.preventDefault();
        try {
            if (registrando) {
                if (!nombre || !apellido || !cedula) {
                    alert('Por favor completa todos los campos.');
                    return;
                }
                await createUserWithEmailAndPassword(auth, email, password);
                alert('Usuario registrado exitosamente');
                console.log(`Nombre: ${nombre}, Apellido: ${apellido}, Cédula: ${cedula}`);
            } else {
                await signInWithEmailAndPassword(auth, email, password);
                alert('Inicio de sesión exitoso');
            }
        } catch (error) {
            console.error(error);
            alert('Error: ' + error.message);
        }
    };

    return (
        <div className='container'>
            <div className='row'>
                {/* Columna para el formulario */}
                <div className='col-md-4'>
                    <div className='padre'>
                        <div className='card card-body shadow-lg'>
                            <img src={imagenProfile} alt='' className='estilo-profile' />
                            <form onSubmit={handleAuthentication}>
                                {registrando && (
                                    <>
                                        <input
                                            type='text'
                                            placeholder='Ingrese Nombre'
                                            className='cajatexto'
                                            value={nombre}
                                            onChange={(e) => setNombre(e.target.value)}
                                        />
                                        <input
                                            type='text'
                                            placeholder='Ingrese Apellido'
                                            className='cajatexto'
                                            value={apellido}
                                            onChange={(e) => setApellido(e.target.value)}
                                        />
                                        <input
                                            type='text'
                                            placeholder='Ingrese Cédula'
                                            className='cajatexto'
                                            value={cedula}
                                            onChange={(e) => setCedula(e.target.value)}
                                        />
                                    </>
                                )}
                                <input
                                    type='email'
                                    placeholder='Ingrese Email'
                                    className='cajatexto'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <input
                                    type='password'
                                    placeholder='Ingrese Contraseña'
                                    className='cajatexto'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button type='submit' className='btnform'>
                                    {registrando ? 'Registrarse' : 'Iniciar sesión'}
                                </button>
                            </form>
                            <button
                                onClick={() => setRegistrando(!registrando)}
                                className='btnSwitch'
                            >
                                {registrando ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Columna para la imagen dinámica */}
                <div className='col-md-8'>
                    <img
                        src={registrando ? imagenRegistro : imagenLogin}
                        alt=''
                        className='tamaño-imagen'
                    />
                </div>
            </div>
        </div>
    );
};

export default Login;
