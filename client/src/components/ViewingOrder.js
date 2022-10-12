// перегляд заявки користувачем
import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { viewingOrder } from "../http/dbDataAPI";
import OutForm from "./jsxcomponents/Outform";

const ViewingOrder = observer(() => {
  const [basket, setBasket] = useState({ potrebs: [] });
  const [isBasket, setIsBasket] = useState(false);
  const [id, setId] = useState("");
  const [fieldId, setFieldId] = useState("");
  const [psw, setPsw] = useState("");
  const [fieldPsw, setFieldPsw] = useState("");
  const [showPsw, setShowPsw] = useState(false);
  const [fail, setFail] = useState("");

  useEffect(() => {
    setFail("");
    setIsBasket(false);
    if (id !== "") {
      viewingOrder(id).then((data) => {
        setBasket(data);
        console.log(data);
        if (data) {
          // setFieldId("");
          // setFieldPsw("");
          setShowPsw(true);
          if (psw !== "") {
            if (psw !== data.psw) {
              setFail("Пароль некоректний");
            } else setIsBasket(true);
          }
        } else setFail("Заяви з таким номером не існує");
      });
    }
  }, [id, psw]);

  return (
    <Container className="container">
      <Container>
        <Row className="d-flex flex-row">
          <Form.Control
            required
            placeholder="Введіть реєстраційний номер заяви"
            type="text"
            name="fieldId"
            value={fieldId}
            className="mt-2"
            onChange={(e) => {
              setFieldId(e.target.value);
            }}
          />
          <Button
            variant={"outline-success"}
            className="mb-2"
            type="submit"
            onClick={() => {
              setPsw("");
              setFieldPsw("");
              setId(fieldId);
            }}
          >
            Ввести
          </Button>
        </Row>
      </Container>
      {showPsw && (
        <Container>
          <Row className="d-flex flex-row">
            <Form.Control
              variant={"outline-dark"}
              required
              placeholder="Введіть пароль для перегляду заяви"
              type="text"
              name="fieldPsw"
              value={fieldPsw}
              className="mt-2"
              onChange={(e) => {
                setFieldPsw(e.target.value);
              }}
            />
            <Button
              variant={"outline-success"}
              className="mb-2"
              type="submit"
              onClick={() => setPsw(fieldPsw)}
            >
              Ввести
            </Button>
          </Row>
        </Container>
      )}

      <OutForm basket={basket} isBasket={isBasket} fail={fail} />
    </Container>
  );
});
export default ViewingOrder;
