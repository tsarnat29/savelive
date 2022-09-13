import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import Modal from "react-bootstrap/Modal";
import { Container, Row, Form, Button } from "react-bootstrap";
import { viewingUserLogs } from "../../../http/dbDataAPI";

const ViewingLogsUser = observer(({ show, onHide }) => {
  const [user, setUser] = useState([]);
  const [isUser, setIsUser] = useState(false);
  const [nomer, setId] = useState(0);
  const [fieldId, setFieldId] = useState(0);
  const [fail, setFail] = useState(false);
  const [btnAccess, setBtnAccess] = useState(false);

  debugger;
  useEffect(() => {
    setIsUser(false);
    if (nomer) {
      setBtnAccess(true);
      viewingUserLogs(nomer).then((data) => {
        setUser(data);
        console.log("logUnit.data=", data);
        if (data.length) {
          if (data[0].nomer !== nomer) {
            setFail(true);
          } else {
            setFail(false);
          }
          setIsUser(true);
        } else {
          setId(0);
          setFail(true);
          setIsUser(false);
        }
      });
    } else setBtnAccess(false);
  }, [nomer, fail]);

  const resetParams = () => {
    setFieldId(0);
    setIsUser(false);
    setId(0);
    setUser([]);
    setFail(false);
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Перегляд логів таблиці користвачів
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div>
          <Container>
            <Row className="d-flex flex-row">
              <Form.Control
                required
                placeholder="Введіть номер підрозділу"
                name="fieldId"
                value={fieldId}
                type="number"
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
                  setId(+fieldId);
                }}
              >
                Ввести
              </Button>
            </Row>
            {fail && (
              <div>Статус користувача з таким номером не змінювався</div>
            )}
          </Container>
          {isUser && (
            <Container className="m-auto pl-3 pr-3">
              {user.map((u) => (
                <Row key={u.id}>
                  <div className="p-2">{u.reason}</div>
                  <div className="p-2">{u.email}</div>
                  <div className="p-2">
                    ID користвача в таблиці користувачів
                  </div>
                  <div className="p-2">{u.nomer}</div>
                  <div className="p-2">номер запису в таблиці логів</div>
                  <div>{u.id}</div>
                  <div className="p-2">Дата зміни:</div>
                  <div className="p-2">{u.updatedAt.substr(0, 10)}</div>
                </Row>
              ))}
            </Container>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant={"outline-danger"} onClick={onHide}>
          Закрити
        </Button>
        <Button variant={"outline-success"} onClick={resetParams}>
          Переглянути іншого користувача
        </Button>
      </Modal.Footer>
    </Modal>
  );
});
export default ViewingLogsUser;
