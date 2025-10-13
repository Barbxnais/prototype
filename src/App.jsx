import { useState, useRef, useEffect } from "react";
import "./App.css";
import Contador from "./pages/Contador";
import novios from "./assets/novios.png";
import { motion } from "framer-motion";
import musica from "./assets/musica.mp3";
import ceremonia from "./assets/ceremonia.png";
import vestimenta from "./assets/vestimenta.png";
import festcode from "./assets/festcode.png";
import regalos from "./assets/regalos.png";
import confirmacion from "./assets/confirmacion.png";
import foto1 from "./assets/foto1.jpg";
import foto2 from "./assets/foto2.jpg";
import foto3 from "./assets/foto3.jpg";
import foto4 from "./assets/foto4.jpg";
import foto7 from "./assets/foto7.jpg";
import foto12 from "./assets/foto12.jpg";
import foto15 from "./assets/foto15.jpg";
import foto21 from "./assets/foto21.jpg";
import foto18 from "./assets/foto18.jpg";
import foto22 from "./assets/foto22.jpg";
import foto24 from "./assets/foto24.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import decofinal from "./assets/decofinal.png"


const codigosValidos = {
  FAM01: { nombre: "Familia De La Fuente Riquelme", invitados: 2 },
  FAM02: { nombre: "Familia Fernández De La Fuente", invitados: 4 },
  FAM03: { nombre: "Familia Méndez De La Fuente", invitados: 3},
  FAM04: { nombre: "Familia Méndez Aedo", invitados: 3},
  FAM05: { nombre: "Familia Mendez Muñoz", invitados: 3},
  FAM06: { nombre: "Familia Mundaca De La Fuente", invitados: 3},
  FAM07: { nombre: "Familia Acuña De La Fuente", invitados: 5},
  FAM08: { nombre: "Familia Morales Riquelme", invitados: 2},
  FAM09: { nombre: "Familia Betancourt Riquelme", invitados: 2},
  FAM10: { nombre: "Familia Castillo Riquelme", invitados: 2},
  FAM11: { nombre: "Familia Olavarría Jofré", invitados: 2},
  FAM12: { nombre: "Familia Varas Jofré", invitados: 2},
  FAM13: { nombre: "Familia Martínez Delgado", invitados: 2},
  FAM14: { nombre: "Familia ??Treufu", invitados: 1},
  FAM15: { nombre: "Familia Sotomayor", invitados: 2},
  FAM16: { nombre: "Familia jairo y novia???", invitados: 2},
  FAM17: { nombre: "Familia Aguilar???", invitados: 1},
  FAM18: { nombre: "Familia Bahamondes Aravena", invitados: 4},
  FAM19: { nombre: "Familia Bahamondes Ramírez", invitados: 2},
  FAM20: { nombre: "Familia Maquehue Mujica", invitados: 2},
  FAM21: { nombre: "Familia Castro Mendiguren", invitados: 2},
  FAM22: { nombre: "Elevyn Ruiz y Raúl ??", invitados: 2},
  FAM23: { nombre: "Francisca Carrillo ", invitados: 1},
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
            <h1>Hola {nombre}</h1>
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

          <div className="seccion musica" syle={{ textAlign: "center", marginTop: "20px"}}>
            <audio src={musica} autoPlay loop style={{ width: "300px" }} />
          </div>

            <div className="seccion">
              <h1>¡Estás Invitado!</h1>
              <p className="parrafo-montserrat">
                Nos encantaría que seas parte de este momento tan especial para
                nosotros.
              </p>
            </div>

            <div className="seccion">
              <h1>Esto falta para nuestra boda:</h1>
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
              <h1>¿Dónde será el evento?</h1>
              <p><strong>Ver aquí:</strong></p>
              <div className="mapa-container">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d745.5830640659888!2d-71.81517183302694!3d-36.35164805255087!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x966f31003ceeaf25%3A0xc4d8cccecda72365!2sla%20posada%20de%20burgos!5e1!3m2!1ses-419!2scl!4v1760303316092!5m2!1ses-419!2scl"
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
              <p className="parrafo-montserrat">
                Por favor confirma tu asistencia antes del 30 de noviembre.</p>
              <a
                href="https://forms.office.com/Pages/ResponsePage.aspx?id=oeChOLG26UKzqVl2JmcLF_JwtzCeoyRDunc9P2IxQV1UQVEyOTkyQ0xOR1NEUlM4RUg1NlgwUVQ3Wi4u"
                target="_blank"
                className="boton"
                rel="noreferrer"
              >
                Confirmar en Google Forms
              </a>
            </div>


            <div className="seccion galeria">
              <h1>Nuestros momentos</h1>
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={20}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                className="mySwiper"
                style={{ width: "100%", maxWidth: "1000px", margin: "0 auto", height: "32rem" }} 
              >
                {[
                  foto1, foto2, foto3, foto4,
                  foto7, foto12, foto15, foto21,
                  foto18, foto22, foto24
                ].map((f, i) => (
                  <SwiperSlide key={i}>
                    {/* contenedor que centra vertical y horizontalmente */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        height: "70vh",
                        overflow: "hidden",
                        background: "transparent", // opcional: #f7f7f7 para ver el á
                        borderRadius: 12,
                      }}
                    >
                      <img
                        src={f}
                        alt={`foto ${i + 1}`}
                        style={{
                          maxWidth: "100%",
                          maxHeight: "100%",
                          objectFit: "contain", // usa "cover" si prefieres recortar y llenar
                          display: "block",     // importante para eliminar espacios en línea
                        }}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

   
            <div className="seccion final">
              <p>¡Gracias por ser parte de este momento tan especial!</p>
              < motion.img
              src={decofinal}
              alt="deco final"
              className="mx-auto max-w-xs opacity-90 block"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              viewport={{ once: true }}
              />
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default App;
