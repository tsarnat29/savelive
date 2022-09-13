// перегляд заявки користувачем
import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Container,
  Card,
  Col,
  Image,
  Row,
} from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { viewingOrder } from "../http/dbDataAPI";

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

      {isBasket ? (
        <Row>
          <Col md={2}>
            {/* <Image width={600} height={900} src={filejpg.jpg} /> */}
          </Col>
          <Col md={10}>
            <Card className="m-auto pl-3 pr-3">
              <div>
                Контактна інформація (номер телефону особи, яка залишила заявку)
              </div>
              <div>{basket.phone_contacter}</div>
              <hr />
              <div>ПІБ командира підрозділу</div>
              <div>{basket.head}</div>
              <hr />
              <div>Посада та звання</div>
              <div>{basket.title_head}</div>
              <hr />
              <div>Номер бригади</div>
              <div>{basket.name_sub}</div>
              <hr />
              <div>Назва підрозділу та № В/Ч</div>
              <div>{basket.name_unit}</div>
              <hr />
              <h5>Перелік потреб</h5>
              {basket.potrebs.map((t, index) => (
                <Row className="mt-3 pl-3 pr-3" key={t.id}>
                  {t.name}: {t.amount} | {t.status} | {t.comment}
                  <hr />
                </Row>
              ))}
              <hr />
              <div>Коментарі</div>
              <div>{basket.comment}</div>
              <hr />
              <Image
                width={600}
                style={{
                  height: "auto",
                  objectFit: "cover",
                }}
                src={process.env.REACT_APP_API_URL + basket.img}
              />
              <hr />
            </Card>
          </Col>
        </Row>
      ) : (
        <Row>{fail}</Row>
      )}
    </Container>
  );
});
export default ViewingOrder;
