import clientAxios from "./clientAxios.js";

export const getEmpleados = () => clientAxios.get("/empleados");
export const getEmpleadoById = (id) => clientAxios.get(`/empleados/${id}`);
export const postEmpleados = (data) =>
  clientAxios.post("/empleados/registro", data);
export const deleteEmpleados = (id) => clientAxios.delete(`/empleados/${id}`);
export const putEmpleados = (id, data) =>
  clientAxios.put(`/empleados/${id}`, data);
export const patchEmpleados = (id, nuevoEstado) =>
  clientAxios.patch(`/empleados/${id}/estado`, { estado: nuevoEstado });
