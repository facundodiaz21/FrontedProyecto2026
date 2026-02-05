import clientAxios from "./clientAxios.js";

export const getEmpleados = () => clientAxios.get("/empleados");
export const postEmpleados = (data) => clientAxios.post("/empleados/registro", data);
