import React, { useContext } from "react";
import { Context } from "..";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { useNavigate } from "react-router-dom";
import {
  ORDER_ROUTE,
  ADMIN_ROUTE,
  LOGIN_ROUTE,
  OPER_ROUTE,
  LOGS_ROUTE,
  BASKET_ROUTE,
} from "../utils/consts";
import { Button, Container } from "react-bootstrap";
import { observer } from "mobx-react-lite";

import { saveAs } from "file-saver";
import filePattern from "../pattern/pattern.pdf";

const NavBar = observer(() => {
  const { user } = useContext(Context);
  console.log("NavBar: user.role=", user.role);
  const navigate = useNavigate();
  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);
  };
  const saveFile = () => {
    saveAs(filePattern, "Zayava.pdf");
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container className="container">
        <Nav>
          <Button onClick={saveFile} variant={"outline-light"} className="mr-2">
            Завантажити шаблон заяви
          </Button>
          <Button
            variant={"outline-light"}
            onClick={() => navigate(ORDER_ROUTE)}
            className="mr-2"
          >
            Оформити заяву
          </Button>
        </Nav>
        {user.isAuth && user.role === "ADMIN" && (
          <Nav className="ml-auto" style={{ color: "white" }}>
            <Button
              variant={"outline-light"}
              onClick={() => navigate(ADMIN_ROUTE)}
              className="mr-2"
            >
              Таблиці
            </Button>
            <Button
              variant={"outline-light"}
              onClick={() => navigate(LOGS_ROUTE)}
              className="mr-2"
            >
              Логі
            </Button>
            {/* <Button
              variant={"outline-light"}
              onClick={() => navigate(BASKET_ROUTE)}
              className="mt-2"
            >
              Basket
            </Button> */}
            <Button
              variant={"outline-light"}
              onClick={() => logOut()}
              className="mr-2"
            >
              Вийти
            </Button>
          </Nav>
        )}
        {user.isAuth && user.role === "OPER" && (
          <Nav className="ml-auto" style={{ color: "white" }}>
            <Button
              variant={"outline-light"}
              onClick={() => navigate(OPER_ROUTE)}
              className="mr-2"
            >
              Оператор
            </Button>

            <Button
              variant={"outline-light"}
              onClick={() => logOut()}
              className="mr-2"
            >
              Вийти
            </Button>
          </Nav>
        )}
        {user.isAuth && user.role === "USER" && (
          <Nav className="ml-auto" style={{ color: "white" }}>
            <Button
              id="viewing"
              variant={"outline-light"}
              onClick={() => navigate(BASKET_ROUTE)}
              className="mr-2"
            >
              Перегляд заяви
            </Button>
            <Button
              variant={"outline-light"}
              onClick={() => logOut()}
              className="mr-2"
            >
              Вийти
            </Button>
          </Nav>
        )}
        {user.isAuth === false && (
          <Nav className="ml-auto" style={{ color: "white" }}>
            <Button
              variant={"outline-light"}
              onClick={() => navigate(LOGIN_ROUTE)}
            >
              Авторізація
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
});

export default NavBar;
