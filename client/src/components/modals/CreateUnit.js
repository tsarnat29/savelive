import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import Modal from "react-bootstrap/Modal";
import { Form, Button } from "react-bootstrap";
import { createUnit, createUnitLogs } from "../../http/dbDataAPI";

const CreateUnit = observer(({ show, onHide }) => {
  const [title_sub, setTitle] = useState("");
  const [section, setSection] = useState("");

  const addUnit = () => {
    createUnit({ title_sub: title_sub, section: section }).then((data) => {
      debugger;
      let { title_sub, section } = data;
      let nomer = data.id;
      let reason = "Додається новий підрозділ";
      createUnitLogs({ reason, nomer, title_sub, section });
      setTitle("");
      setSection("");
      // onHide();
    });
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Додати підрозділ
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Control
            value={title_sub}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Введить найменування підрозділу"
            className="mb-3"
          />
          <Form.Control
            value={section}
            onChange={(e) => setSection(e.target.value)}
            placeholder="Введить найменування батьківського підрозділу"
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant={"outline-danger"} onClick={onHide}>
          Закрити
        </Button>
        <Button variant={"outline-success"} onClick={addUnit}>
          Додати
        </Button>
      </Modal.Footer>
    </Modal>
  );
});
export default CreateUnit;
