import clientAxios from "./clientAxios.js";

export const getEmpleados = () => clientAxios.get("/empleados");
