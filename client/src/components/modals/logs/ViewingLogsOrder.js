import React, { useState, useEffect } from "react";
import { Form, Container, Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { viewingLogs } from "../../../http/dbDataAPI";

const ViewingLogsOrder = observer(({ show, onHide }) => {
  const [basket, setBasket] = useState([]);
  const [isBasket, setIsBasket] = useState(false);
  const [nomer, setId] = useState(0);
  const [fieldId, setFieldId] = useState("");
  const [fail, setFail] = useState(false);
  const [btnAccess, setBtnAccess] = useState(false);

  useEffect(() => {
    setIsBasket(false);
    debugger;
    if (nomer) {
      setBtnAccess(true);
      viewingLogs(nomer).then((data) => {
        setBasket(data);
        if (data.length) {
          setFail(false);
          setIsBasket(true);
        } else {
          setId(0);
          setFail(true);
          setIsBasket(false);
        }
      });
    } else setBtnAccess(false);
  }, [nomer, fail]);

  const resetParams = () => {
    setFieldId("");
    setId(0);
    // setBasket([]);
    setFail(false);
    setIsBasket(false);
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Перегляд логів таблиці заяв
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
            {fail && <div>Заяви з таким номером в таблиці не існує</div>}
          </Container>
          {isBasket && (
            <Container className="m-auto pl-3 pr-3">
              {basket.map((item) => (
                <Container key={item.id}>
                  <Row>
                    <div className="p-2">{item.reason}</div>
                    <div className="p-2">{item.nomer}</div>
                  </Row>
                  <Row>
                    <div className="p-2">{item.phone_contacter}</div>
                    <div className="p-2">{item.head}</div>
                    <div className="p-2">{item.title_head}</div>
                    <div className="p-2">{item.name_sub}</div>
                    <div className="p-2">{item.name_unit}</div>
                  </Row>
                  <Row>
                    <div className="p-2">{item.potrebs} </div>
                  </Row>
                  <Row>
                    <div className="p-2">Дата зміни:</div>
                    <div className="p-2">{item.updatedAt.substr(0, 10)}</div>
                  </Row>
                  <Row className="p-2">
                    <a
                      href={process.env.REACT_APP_API_URL + item.img}
                      target="_blank"
                      rel="noopener nofollow noreferrer"
                    >
                      файл заяви
                    </a>
                  </Row>
                </Container>
              ))}

              <hr />
            </Container>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant={"outline-danger"} onClick={() => onHide()}>
          Закрити
        </Button>
        {isBasket && (
          <Button variant={"outline-success"} onClick={() => resetParams()}>
            Переглянути іншу заяву
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
});
export default ViewingLogsOrder;
