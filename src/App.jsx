import { useEffect, useState } from "react";
import axios from "axios";
import { getEmpleados } from "./api/empleado.service.js";

function App() {
  //esta funcion realiza un get de empleados
  const [empleados, setEmpleados] = useState([]);
  const fecthEmpleados = async () => {
    try {
      const response = await getEmpleados();
      setEmpleados(response.data.datos);
    } catch (error) {
      console.error("error al obtener empleados", error);
    }
  };
  useEffect(() => {
    fecthEmpleados();
  }, []);
  //--------------------------------------------
  
  return (
    <div>
      <h1>empleados</h1>
      {empleados.length === 0 ? (
        <p>no hay empleados</p>
      ) : (
        <ul>
          {empleados.map((empleado) => (
            <li key={empleado._id}>
              {empleado.nombre} - {empleado.puesto}- {empleado.estado}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default App;
