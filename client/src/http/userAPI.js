import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (email, password) => {
  const { data } = await $host.post("api/users/registration", {
    email,
    password,
    role: "ADMIN",
  });
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};

export const login = async (email, password) => {
  const { data } = await $host.post("api/users/login", { email, password });
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};

export const check = async () => {
  const { data } = await $authHost.get("api/users/auth");
  console.log("check: data userApi=", data);
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};

export const fetchUsers = async () => {
  const { data } = await $authHost.get("api/users/users");
  return data;
};

export const changeStatusUser = async (id) => {
  const { data } = await $authHost.get("api/users/" + id);
  return data;
};

export const updateUser = async (id, role) => {
  const { data } = await $authHost.put(
    `api/users/update?id=${id}&role=${role}`
  );
  return data;
};

export const deleteUser = async (id) => {
  const { data } = await $authHost.delete(`api/users/delete?id=${id}`);
  return data;
};
