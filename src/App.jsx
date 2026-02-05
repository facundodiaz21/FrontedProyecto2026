import { useEffect, useState } from "react";
import "../src/app.css";
import { getEmpleados, postEmpleados } from "./api/empleado.service.js";

function App() {
  //esta funcion realiza un get de empleados
  const [empleados, setEmpleados] = useState([]);
  //funcion para el post
  const [formEmpleado, setFormEmpleado] = useState({
    nombre: "",
    puesto: "",
    contacto: "",
    estado: "",
  });
  const fetchEmpleados = async () => {
    try {
      const response = await getEmpleados();
      setEmpleados(response.data.datos);
    } catch (error) {
      console.error("error al obtener empleados", error);
    }
  };
  useEffect(() => {
    fetchEmpleados();
  }, []);
  //--------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await postEmpleados(formEmpleado);
      setFormEmpleado({ nombre: "", puesto: "", contacto: "", estado: "" });
      fetchEmpleados();
    } catch (error) {
      console.error("error al crear empleado", error);
    }
  };
  return (
    <div>
      <h2>Gestion de empleados</h2>
      {/* metodo Post */}
      <div >
        <form className="cont-form">
          <input
            placeholder="Nombre Completo"
            value={formEmpleado.nombre}
            onChange={(e) =>
              setFormEmpleado({ ...formEmpleado, nombre: e.target.value })
            }
          />
          <input
            placeholder="Puesto"
            value={formEmpleado.puesto}
            onChange={(e) =>
              setFormEmpleado({ ...formEmpleado, puesto: e.target.value })
            }
          />
          <input
            placeholder="Contacto"
            value={formEmpleado.contacto}
            onChange={(e) =>
              setFormEmpleado({ ...formEmpleado, contacto: e.target.value })
            }
          />
          <input
            type=""
            placeholder="Estado"
            value={formEmpleado.estado}
            onChange={(e) =>
              setFormEmpleado({ ...formEmpleado, estado: e.target.value })
            }
          />
          <button type="submit" onClick={handleSubmit}>
            Crear Empleado
          </button>
        </form>
      </div>

      <h1>empleados</h1>
      {empleados.length === 0 ? (
        <p>no hay empleados</p>
      ) : (
        <ul>
          {empleados.map((empleado) => (
            <li key={empleado._id}>
              {empleado.nombre} - {empleado.puesto}- {empleado.estado} -{empleado.contacto}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default App;
