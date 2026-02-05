import { useEffect, useState } from "react";
import "../src/app.css";
import {
  deleteEmpleados,
  getEmpleadoById,
  getEmpleados,
  patchEmpleados,
  postEmpleados,
  putEmpleados,
} from "./api/empleado.service.js";

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
  //esta funcion es para el put(editar)
  const [editarEmpleado, setEditarEmpleado] = useState(null);
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
      if (editarEmpleado) {
        await putEmpleados(editarEmpleado, formEmpleado);
        setEditarEmpleado(null);
      } else {
        await postEmpleados(formEmpleado);
      }
      setFormEmpleado({ nombre: "", puesto: "", contacto: "", estado: "" });
      fetchEmpleados();
    } catch (error) {
      console.error("error al crear empleado", error);
    }
  };
  const handleDelete = async (id, nombre) => {
    if (!window.confirm(`estas seguro que deseas eliminar "${nombre}"`)) return;
    try {
      await deleteEmpleados(id);
      alert("empleado eliminado con exito");
      fetchEmpleados();
    } catch (error) {
      console.error("error al intentar eliminar empleado", error);
    }
  };
  const handleEdit = async (id) => {
    try {
      const { data } = await getEmpleadoById(id);
      setFormEmpleado({
        nombre: data.empleado.nombre || "",
        puesto: data.empleado.puesto || "",
        contacto: data.empleado.contacto || "",
        estado: data.empleado.estado || "",
      });
      setEditarEmpleado(id);
    } catch (error) {
      console.error("error al obtener empleado", error);
    }
  };
  const handlePatch = async (id, nuevoEstado) => {
    if (nuevoEstado === "inactivo") {
      const ok = window.confirm(
        "el empleado pasara a inactivo y no se mostrara, ¿estas seguro?",
      );
      if (!ok) return;
    }

    try {
      await patchEmpleados(id, nuevoEstado);
      fetchEmpleados();
    } catch (error) {
      console.error("error al intentar cambiar de estado", error);
    }
  };
  return (
    <div>
      <h2>Gestion de empleados</h2>
      {/* metodo Post */}
      <div>
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
            disabled={!!editarEmpleado}
            onChange={(e) =>
              setFormEmpleado({ ...formEmpleado, estado: e.target.value })
            }
          />
          <button type="submit" onClick={handleSubmit}>
            {editarEmpleado ? "guardar cambios" : "crear empleado"}
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
              {empleado.nombre} - {empleado.puesto}- {empleado.estado} -
              {empleado.contacto}
              <div className="btn-map">
                <button
                  onClick={() => handleDelete(empleado._id, empleado.nombre)}
                >
                  eliminar
                </button>
                <button onClick={() => handleEdit(empleado._id)}>editar</button>
              </div>
              {empleado.estado === "activo" && (
                <>
                  <button
                    onClick={() => handlePatch(empleado._id, "suspendido")}
                  >
                    Suspender
                  </button>
                  <button onClick={() => handlePatch(empleado._id, "inactivo")}>
                    Dar de baja
                  </button>
                </>
              )}
              {empleado.estado === "suspendido" && (
                <>
                  <button onClick={() => handlePatch(empleado._id, "activo")}>
                    Activar
                  </button>
                  <button onClick={() => handlePatch(empleado._id, "inactivo")}>
                    Dar de baja
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default App;
