import React, { useState, useEffect } from "react";
import { Button, Form, Container, Card, Image, Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { observer } from "mobx-react-lite";
import { createLogsOrder } from "../createTables/createLogsOrder";
import { changeStatusOrder, deleteOrder } from "../../http/dbDataAPI";

const DeleteOrder = observer(({ show, onHide }) => {
  const [basket, setBasket] = useState({ potrebs: [] });
  const [isBasket, setIsBasket] = useState(false);
  const [id, setId] = useState(0);
  const [fieldId, setFieldId] = useState("");
  const [fail, setFail] = useState(false);
  const [btnAccess, setBtnAccess] = useState(false);

  useEffect(() => {
    setIsBasket(false);
    if (id) {
      setBtnAccess(true);
      changeStatusOrder(id).then((data) => {
        setBasket(data);
        if (data) {
          setFail(false);
          setIsBasket(true);
        } else {
          setFail(true);
          setId(0);
          setIsBasket(false);
        }
      });
    } else setBtnAccess(false);
  }, [id, fail]);

  const destroyOrder = () => {
    let paramAuth = true;
    let paramCause = `Видалено заяву за номером `;
    let potrebs = [];
    potrebs = basket.potrebs.map(function (item) {
      return { name: item.name, amount: item.amount };
    });
    debugger;
    let potrebsString = JSON.stringify(potrebs);
    createLogsOrder(basket, potrebsString, paramAuth, paramCause);
    deleteOrder(id)
      .then(setBasket({ potrebs: [] }))
      .then(setIsBasket(false))
      .then(setId(0));
    setFail(false);
    setFieldId("");
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Тут можна видалити заяву
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div>
          <Container>
            <Row className="d-flex flex-row">
              <Form.Control
                required
                placeholder="Введіть реєстраційний номер заяви"
                type="number"
                name="fieldId"
                value={fieldId}
                className="mt-2"
                onChange={(e) => {
                  setBtnAccess(true);
                  setFieldId(e.target.value);
                }}
              />
              <Button
                variant={"outline-success"}
                className="mb-2"
                disabled={!btnAccess}
                type="submit"
                onClick={() => {
                  setId(fieldId);
                }}
              >
                Ввести
              </Button>
            </Row>
            {fail && <div>Заяви з таким номером не існує</div>}
          </Container>
          {isBasket && (
            <div>
              <Card className="m-auto pl-3 pr-3">
                <div>
                  Контактна інформація (номер телефону особи, яка залишила
                  заявку)
                </div>
                <div>{basket.phone_contacter}</div>
                <hr />
                <div>ПІБ командира підрозділу</div>
                <div>{basket.head}</div>
                <hr />
                <div>Посада та звання</div>
                <div>{basket.title_head}</div>
                <hr />
                <div>Номер бр1игади</div>
                <div>{basket.name_sub}</div>
                <hr />
                <div>Назва підрозділу та № В/Ч</div>
                <div>{basket.name_unit}</div>
                <hr />
                <h4>Перелік потреб</h4>
                <Container>
                  {basket.potrebs.map((t, index) => (
                    <Row className="mt-3 pl-3 pr-3" key={t.id}>
                      {t.name}: {t.amount}
                      <hr />
                    </Row>
                  ))}
                </Container>
                <div>{basket.status}</div>
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
              </Card>
            </div>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant={"outline-danger"} onClick={() => onHide()}>
          Закрити
        </Button>
        {isBasket && (
          <Button variant={"outline-success"} onClick={() => destroyOrder(id)}>
            Видалити
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
});
export default DeleteOrder;
