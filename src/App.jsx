import { useState, useRef, useEffect } from "react";
import "./App.css";
import Contador from "./pages/Contador";
import novios from "./assets/novios.png";
import { motion } from "framer-motion";
import ceremonia from "./assets/ceremonia.png";
import vestimenta from "./assets/vestimenta.png";
import festcode from "./assets/festcode.png";
import regalos from "./assets/regalos.png";
import confirmacion from "./assets/confirmacion.png";

const codigosValidos = {
  FAM01: { nombre: "Familia Méndez De La Fuente", invitados: 3 },
  FAM02: { nombre: "Familia Fernández De La Fuente", invitados: 4 },
};

function App() {
  const [codigo, setCodigo] = useState("");
  const [error, setError] = useState("");
  const [accesoPermitido, setAccesoPermitido] = useState(false);
  const [nombre, setNombre] = useState("");
  const [invitados, setInvitados] = useState(0);

  const invitacionRef = useRef(null);
  const [tiempoRestante, setTiempoRestante] = useState({
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0,
  });

  const fechaBoda = new Date("2026-01-24T17:00:00");

  useEffect(() => {
    const interval = setInterval(() => {
      const ahora = new Date();
      const diferencia = fechaBoda.getTime() - ahora.getTime();

      if (diferencia <= 0) {
        setTiempoRestante({ dias: 0, horas: 0, minutos: 0, segundos: 0 });
        clearInterval(interval);
      } else {
        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const horas = Math.floor(
          (diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);
        setTiempoRestante({ dias, horas, minutos, segundos });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const manejarIngreso = () => {
    const codigoLimpio = codigo.trim().toUpperCase();
    const datos = codigosValidos[codigoLimpio];

    if (datos) {
      setNombre(datos.nombre);
      setInvitados(datos.invitados);
      setAccesoPermitido(true);
      setError("");
    } else {
      setError("Código no válido. Intenta nuevamente.");
    }
  };

  const irAInvitacion = () => {
    invitacionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="app">
      {!accesoPermitido ? (
        <section className="login">
          <h1 className="titulo">Liliana & Josué</h1>
          <p className="subtitulo">Ingresa tu código de familia</p>

          <input
            type="text"
            value={codigo}
            onChange={(e) => {
              setCodigo(e.target.value);
              setError("");
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
            <p>
              Estás invitado con <strong>{invitados}</strong> personas.
            </p>
            <button onClick={irAInvitacion}>Ver invitación</button>
          </section>

          <section ref={invitacionRef} className="invitacion">
            <div className="flex justify-center">
              <div className="w-full max-w-md p-4">
                <motion.img
                  src={novios}
                  alt="Liliana y Josué"
                  className="w-full max-w-[400px] h-auto object-cover rounded-xl shadow-lg mx-auto"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  viewport={{ once: true }}
                />
              </div>
            </div>

            <div className="seccion">
              <h1>¡Estás Invitado!</h1>
              <h3>
                Nos encantaría que seas parte de este momento tan especial para
                nosotros.
              </h3>
            </div>

            <div className="seccion">
              <h2>Esto falta para nuestra boda:</h2>
              <Contador {...tiempoRestante} />
            </div>

            <div className="seccion info">
              <motion.img
                src={ceremonia} 
                alt="ceremonia" 
                style={{
                  display:"block",
                  margin:"20px auto",
                  maxWidth:"600px",
                  width:"90%",
                  borderRadius:"20px",
                }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              viewport={{ once: true }}
              />
            </div>

            <div className="seccion lugar">
              <h2>¿Dónde será el evento?</h2>
              <p><strong>Ver aquí:</strong></p>
              <div className="mapa-container">
                <iframe
                  src="https://www.google.com/maps/embed?pb=..."
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación del evento"
                ></iframe>
              </div>
            </div>

            <div className="seccion info">
              <motion.img
                src={vestimenta}
                alt="vestimenta"
                style={{
                  display: "block",
                  margin: "20px auto",
                  maxWidth: "600px",
                  width: "90%",
                  borderRadius: "20px",
                }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              viewport={{ once: true }}

              />
            </div>

            <div className="seccion info">
              <motion.img 
                src={festcode} 
                alt="festcode" 
                style={{
                  display:"block",
                  margin:"20px auto",
                  maxWidth:"600px",
                  width:"90%",
                  borderRadius:"20px"
                }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              viewport={{ once: true }}
              />
            </div>


            <div className="seccion regalos">
              <motion.img
                src={regalos}
                alt="regalos"
                style={{
                  display: "block",
                  margin: "20px auto",
                  maxWidth: "600px",
                  width: "90%",
                  borderRadius: "20px",
                }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              viewport={{ once: true }}
              />
              <a
                href="https://milistadenovios.cl/invitados/29182"
                target="_blank"
                className="boton"
                rel="noreferrer"
              >
                Ir a la lista de regalos :)
              </a>
            </div>

            <div className="seccion info">
              <motion.img 
                src={confirmacion} 
                alt="confirmacion" 
                style={{
                  display:"block",
                  margin:"20px auto",
                  maxWidth:"600px",
                  width:"90%",
                  borderRadius:"20px",
                }}                              
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              viewport={{ once: true }}
              />
            </div>

            <div className="seccion confirmar">
              <p>Por favor confirma tu asistencia antes del 30 de noviembre.</p>
              <a
                href="https://forms.office.com/Pages/ResponsePage.aspx?id=oeChOLG26UKzqVl2JmcLF_JwtzCeoyRDunc9P2IxQV1UQVEyOTkyQ0xOR1NEUlM4RUg1NlgwUVQ3Wi4u"
                target="_blank"
                className="boton"
                rel="noreferrer"
              >
                Confirmar en Google Forms
              </a>
            </div>
            
            <div className="seccion fotos">
              <h2>Nuestros momentos 💕</h2>
            </div>  



            <div className="seccion final">
              <p>Gracias por ser parte de este momento tan especial 💛</p>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default App;
