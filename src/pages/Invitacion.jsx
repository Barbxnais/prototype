import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Invitacion() {
  const navigate = useNavigate()
  const [nombre, setNombre] = useState('')
  const [invitados, setInvitados] = useState(0)

  useEffect(() => {
    const codigo = localStorage.getItem('codigo')
    const nombre = localStorage.getItem('nombre')
    const invitados = localStorage.getItem('invitados')

    if (!codigo) {
      navigate('/')
    } else {
      setNombre(nombre)
      setInvitados(invitados)
    }
  }, [navigate])

  return (
    <div className="container">
      <h1 className="titulo">Liliana & Josué</h1>
      <p className="subtitulo">¡Hola {nombre}!</p>
      <p>Estás invitado con <strong>{invitados}</strong> personas.</p>

      <div className="tarjeta">
        <p>🎁 <a href="https://milistadenovios.com" target="_blank">Ver lista de regalos</a></p>
        <p>📍 <a href="https://maps.google.com" target="_blank">Ubicación de la ceremonia</a></p>
        <p>📝 <a href="https://docs.google.com/forms" target="_blank">Confirmar asistencia</a></p>
        <p>📸 <a href="https://drive.google.com/folderview?id=CARPETA" target="_blank">Subir fotos</a></p>
      </div>
    </div>
  )
}
