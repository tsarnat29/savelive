import { $authHost, $host } from "./index";

export const createUnit = async (unit) => {
  const { data } = await $authHost.post("api/unit", unit);
  return data;
};

export const fetchUnits = async () => {
  const { data } = await $host.get("api/unit");
  return data;
};

export const deleteUnit = async (id) => {
  console.log("dbDataAPI.id=", id);
  debugger;
  const { data } = await $authHost.delete(`api/unit/?id=${id}`);
  return data;
};

//_______________________________________________

export const createOrderAuth = async (order) => {
  console.log("order=", order);
  try {
    const { data } = await $authHost.post("api/order", order);
    return data;
  } catch (error) {
    console.log("Something went wrong: ", error);
  }
};

export const createOrder = async (order) => {
  console.log("order=", order);
  try {
    const { data } = await $host.post("api/order", order);
    return data;
  } catch (error) {
    console.log("Something went wrong: ", error);
  }
};

export const fetchOrders = async () => {
  const { data } = await $host.get("api/basket");
  return data;
};

export const fetchOneBasket = async (id) => {
  const { data } = await $host.get("api/basket/" + id);
  return data;
};

export const changeStatusOrder = async (id) => {
  const { data } = await $authHost.get("api/basket/" + id);
  return data;
};

export const viewingOrder = async (id) => {
  const { data } = await $authHost.get("api/basket/" + id);
  return data;
};

export const updateOrder = async (id, status) => {
  const { data } = await $authHost.put(`api/basket/?id=${id}&status=${status}`);
  return data;
};

export const commentOrder = async (id, comment) => {
  const { data } = await $authHost.put(
    `api/comment/?id=${id}&comment=${comment}`
  );
  return data;
};

export const deleteOrder = async (id) => {
  console.log("dbDataAPI.id=", id);
  debugger;
  const { data } = await $authHost.delete(`api/basket/?id=${id}`);
  return data;
};

//____________________________________________________________

// створення логів  при роботі з таблицею адміна чи оператора
export const createLogsAuth = async (dataLog) => {
  const { data } = await $authHost.post("api/logsOrder", dataLog);
  return data;
};
// створеня логів при вводі заяви контактера-заявника
export const createLogs = async (dataLog) => {
  const { data } = await $host.post("api/logsOrder", dataLog);
  return data;
};

export const viewingLogs = async (nomer) => {
  const { data } = await $authHost.get(`api/logsOrder/?nomer=${nomer} `);
  return data;
};

export const createUnitLogs = async (dataLog) => {
  const { data } = await $authHost.post("api/logsUnit", dataLog);
  return data;
};

export const viewingUnitLogs = async (nomer) => {
  const { data } = await $authHost.get(`api/logsUnit/?nomer=${nomer} `);
  return data;
};

export const createUserLogs = async (dataLog) => {
  const { data } = await $authHost.post("api/logsUser", dataLog);
  return data;
};

export const viewingUserLogs = async (nomer) => {
  const { data } = await $authHost.get(`api/logsUser/?nomer=${nomer}`);
  return data;
};
