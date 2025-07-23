import { useState, useRef, useEffect } from 'react'
import './App.css'
import Contador from './pages/Contador'
import novios from './assets/novios.png';
import {motion} from "framer-motion";

const codigosValidos = {
  FAM01: { nombre: "Familia Méndez De La Fuente", invitados: 3 },
  FAM02: { nombre: "Familia Fernández De La Fuente", invitados: 4 }
}

function App() {
  const [codigo, setCodigo] = useState('')
  const [error, setError] = useState('')
  const [accesoPermitido, setAccesoPermitido] = useState(false)
  const [nombre, setNombre] = useState('')
  const [invitados, setInvitados] = useState(0)

  const invitacionRef = useRef(null)
  const [tiempoRestante, setTiempoRestante] = useState({ dias: 0, horas: 0, minutos: 0, segundos: 0 })

  const fechaBoda = new Date("2026-01-24T17:00:00") // ajusta la fecha real

  useEffect(() => {
    const interval = setInterval(() => {
      const ahora = new Date();
      const diferencia = fechaBoda.getTime() - ahora.getTime();

      if (diferencia <= 0) {
        setTiempoRestante({ dias: 0, horas: 0, minutos: 0, segundos: 0 });
    clearInterval(interval);
  } else {
    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);
    setTiempoRestante({ dias, horas, minutos, segundos });
  }
  }, 1000);

  return () => clearInterval(interval);

}, []);

const manejarIngreso = () => {
  const codigoLimpio = codigo.trim().toUpperCase()
  const datos = codigosValidos[codigoLimpio]

  if (datos) {
    setNombre(datos.nombre)
    setInvitados(datos.invitados)
    setAccesoPermitido(true)
    setError('')
  } else {
    setError('Código no válido. Intenta nuevamente.')
  }
}

const irAInvitacion = () => {
  invitacionRef.current.scrollIntoView({ behavior: 'smooth' })
}

return (
  <div className="app">
    {!accesoPermitido ? (
      <section className="login">
        <h1 className="titulo" >Liliana & Josué</h1>
        <p className="subtitulo">Ingresa tu código de familia</p>

        <input
          type="text"
          value={codigo}
          onChange={(e) => {
            setCodigo(e.target.value)
            setError('')
          }}
          placeholder="Ej: FAM01"
        />
        <button onClick={manejarIngreso}>Ingresar</button>
        {error && <p className="error">{error}</p>}
      </section>
    ) : (
      <>
        <section className="verificar">
          <h1>Hola {nombre} 👋</h1>
          <p>Estás invitado con <strong>{invitados}</strong> personas.</p>
          <button onClick={irAInvitacion}>Ver invitación</button>
        </section>

        <section ref={invitacionRef} className="invitacion">
              <div className="flex justify-center">
                <div className="w-full max-w-md p-4">
                <motion.img 
                  src={novios} 
                  alt="Liliana y Josué" 
                  className="w-full max-w-[400px] h-auto object-cover rounded-x1 shadow-lg mx-auto"
                  initial={{ opacity: 0, y: 50}}
                  whileInView={{ opacity: 1, y: 0}}
                  transition={{ duration: 1}}
                  viewport={{ once: true}}
                />
                </div>
              </div>

          <div className="seccion">
            <h2>Esto falta para nuestra boda:</h2>
            <Contador {...tiempoRestante}/>
          </div>

          <div className="seccion info">
            <h2>Detalles del evento</h2>
          <div className="seccion lugar">
            <h2>¿Dónde será el evento?</h2>
            <p><strong>Ver aquí:</strong></p>
            <div className="mapa-container">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2049.762622834383!2d-71.81700018616951!3d-36.35384748264627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x966f31003ceeaf25%3A0xc4d8cccecda72365!2sPosada%20los%20burgos!5e1!3m2!1ses-419!2scl!4v1753302968630!5m2!1ses-419!2scl" 
                width="100%" 
                height="300" 
                style={{ border : 0}}
                allowfullscreen=""
                loading="lazy" 
                referrerpolicy="no-referrer-when-downgrade"
                title="Ubicación del evento">
              </iframe>
            </div>
          </div>
            <div className="info-secciones">
              <motion.div
              className="info-box"
              initial={{ opacity: 0, y: 30}}
              whileInView={{ opacity: 1, y: 0}}
              viewport={{ once: true}}
              transition={{ duration: 0.6 }}
            >
            <i className="fas fa-clock icono"></i>
              <p><strong>Horario:</strong> 17:00 hrs</p>
            </motion.div>

              <motion.div
              className="info-box"
              initial={{ opacity: 0, y: 30}}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <i className="fas fa-tshirt icono"></i>
              <p><strong>Dress code:</strong> Formal</p>
            </motion.div>

              <motion.div
              className="info-box"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <i className="fas fa-music icono"></i>
              <p><strong>Fest code:</strong> Niños dulces sueños 💤 Gracias por su comprensión</p>
            </motion.div>
            </div>
          </div>

          <div className="seccion regalos">
            <h2>Regalos</h2>
            <p>Tu presencia es nuestro mejor regalo. Pero si quieres regalarnos algo, está bien ❤️</p>
            <a href="https://milistadenovios.com" target="_blank" className="boton">Ir a la lista de regalos</a>
          </div>

          <div className="seccion confirmar">
            <h2>Confirmar asistencia</h2>
            <p>Por favor confirma tu asistencia antes del 30 de noviembre.</p>
            <a href="https://forms.gle/tu-formulario" target="_blank" className="boton">Confirmar en Google Forms</a>
          </div>

          <div className="seccion final">
            <p>Gracias por ser parte de este momento tan especial 💛</p>
          </div>
        </section>
      </>
    )}
  </div>
)
}

export default App