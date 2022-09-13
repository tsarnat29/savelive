import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import Modal from "react-bootstrap/Modal";
import { Container, Row, Form, Button } from "react-bootstrap";
import { viewingUnitLogs } from "../../../http/dbDataAPI";

const ViewingLogsUnit = observer(({ show, onHide }) => {
  const [unit, setUnit] = useState([]);
  const [isUnit, setIsUnit] = useState(false);
  const [nomer, setId] = useState(0);
  const [fieldId, setFieldId] = useState(0);
  const [fail, setFail] = useState(false);
  const [btnAccess, setBtnAccess] = useState(false);
  debugger;
  useEffect(() => {
    debugger;
    setIsUnit(false);
    // nomer має type===string
    if (nomer) {
      setBtnAccess(true);
      viewingUnitLogs(nomer).then((data) => {
        setUnit(data);
        debugger;
        console.log("logUnit.data=", data);
        if (data.length) {
          if (data[0].nomer !== +nomer) {
            setFail(true);
          } else {
            setFail(false);
          }
          setIsUnit(true);
        } else {
          setId(0);
          setFail(true);
          setIsUnit(false);
        }
      });
    } else setBtnAccess(false);
  }, [nomer, fail]);

  const resetParams = () => {
    setFieldId(0);
    setIsUnit(false);
    setId(0);
    setUnit([]);
    setFail(false);
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Перегляд логів таблиці підрозділів
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
                  setFail(false);
                  setId(fieldId);
                }}
              >
                Ввести
              </Button>
            </Row>
            {fail && <div>Підрозділу з таким номером не існує</div>}
          </Container>
          {isUnit && (
            <Container className="m-auto pl-3 pr-3">
              {unit.map((u, index) => (
                <Row key={u.id}>
                  <div className="p-2">units</div>
                  <div className="p-2">{u.reason}</div>
                  <div className="p-2">{u.nomer}</div>
                  <div className="p-2">{u.title_sub}</div>
                  <div className="p-2">{u.section}</div>
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
          Переглянути інший підрозділ
        </Button>
      </Modal.Footer>
    </Modal>
  );
});
export default ViewingLogsUnit;
