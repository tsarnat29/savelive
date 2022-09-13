import { makeAutoObservable } from "mobx";

export default class UserStore {
  constructor() {
    this._isAuth = false;
    this._user = {};
    this._role = "";

    this._users = [];

    this._statusUsers = [
      { id: 1, role: "ADMIN" },
      { id: 2, role: "OPER" },
      { id: 3, role: "USER" },
    ];
    this._selectedUser = {};

    makeAutoObservable(this);
  }
  setIsAuth(bool) {
    this._isAuth = bool;
  }
  setUser(user) {
    this._user = user;
  }
  setRole(role) {
    this._role = role;
  }

  setUsers(users) {
    this._users = users;
  }
  // setSelectedUsersOne(user) {
  //   this._selectedUsersOne = user;
  // }

  setStatusUsers(statusUsers) {
    this._statusUsers = statusUsers;
  }
  setSelectedUser(user) {
    this._selectedUser = user;
  }
  get isAuth() {
    return this._isAuth;
  }
  get user() {
    return this._user;
  }
  get role() {
    return this._role;
  }
  get statusUsers() {
    return this._statusUsers;
  }
  get selectedUser() {
    return this._selectedUser;
  }
  get users() {
    return this._users;
  }

  // get selectedUsersOne() {
  //   return this._selectedUsersOne;
  // }
}
