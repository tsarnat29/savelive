import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  OPER_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  UNIT_ROUTE,
  ORDER_ROUTE,
  LOGS_ROUTE,
} from "./utils/consts";
import Admin from "./pages/Admin";
import Oper from "./pages/Oper";
import Basket from "./pages/Basket";
import Auth from "./pages/Auth";
import Order from "./pages/Order";
import Logs from "./pages/Logs";
import SecUnit from "./pages/SecUnit";

export const adminRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: Admin,
  },
  {
    path: OPER_ROUTE,
    Component: Oper,
  },
  {
    path: BASKET_ROUTE,
    Component: Basket,
  },
  {
    path: ORDER_ROUTE,
    Component: Order,
  },
  {
    path: UNIT_ROUTE,
    Component: SecUnit,
  },
  {
    path: LOGS_ROUTE,
    Component: Logs,
  },
];

export const operRoutes = [
  {
    path: OPER_ROUTE,
    Component: Oper,
  },
  {
    path: BASKET_ROUTE,
    Component: Basket,
  },
  {
    path: ORDER_ROUTE,
    Component: Order,
  },
  {
    path: UNIT_ROUTE,
    Component: SecUnit,
  },
];

export const userRoutes = [
  {
    path: BASKET_ROUTE,
    Component: Basket,
  },
  {
    path: ORDER_ROUTE,
    Component: Order,
  },
  {
    path: UNIT_ROUTE,
    Component: SecUnit,
  },
];

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    Component: Auth,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Auth,
  },
  {
    path: ORDER_ROUTE,
    Component: Order,
  },
  {
    path: UNIT_ROUTE,
    Component: SecUnit,
  },
];
