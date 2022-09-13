import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../index";
import { Form, Container, Card, Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { Dropdown, Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { createUserLogs } from "../../http/dbDataAPI";
import { changeStatusUser, updateUser } from "../../http/userAPI";

const ChangeUser = observer(({ show, onHide }) => {
  const { user } = useContext(Context);
  const [oneUser, setUser] = useState({});
  const [userOld, setUserOld] = useState({});
  const [role, setRole] = useState("");
  const [isUser, setIsUser] = useState(false);
  const [id, setId] = useState(0);
  const [fieldId, setFieldId] = useState("");
  const [fail, setFail] = useState(false);
  const [btnAccess, setBtnAccess] = useState(false);

  useEffect(() => {
    setIsUser(false);
    if (id) {
      setBtnAccess(true);
      changeStatusUser(id).then((data) => {
        setUser(data);
        if (data) {
          setFail(false);
          setUserOld(data);
          setIsUser(true);
        } else {
          setFail(true);
          setId(0);
          setIsUser(false);
          console.log("fail=", fail);
        }
      });
    } else setBtnAccess(false);
  }, [id, fail]);

  const selectUser = (s) => {
    user.setSelectedUser(s);
    setRole(user.selectedUser.role);
  };
  const changeUser = () => {
    //id перевіряємо на випадок повторного натискання кнопки "зберегти"
    if (id && role !== userOld.role) {
      updateUser(id, role);
      let nomer = id;
      let reason = `Зміна статусу user ${userOld.role} <=> ${role}`;
      let email = userOld.email;
      let passw = userOld.password;
      createUserLogs({ reason, nomer, email, passw, role });
      console.log("role=", role);
      setRole("");
      setUserOld({});
    }
    //  onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Тут можна змінити статус user
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div>
          <Container>
            <Row>
              <Form.Control
                placeholder="Заміна статусу user. Введіть ID user *"
                required
                className="mt-3"
                type="number"
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
                Submit
              </Button>
            </Row>
            {fail && <div>Користувача з таким ID не існує</div>}
          </Container>
          {isUser && (
            <div>
              <Card className="m-auto pl-3 pr-3">
                <div>email:</div>
                <div>{oneUser.email}</div>
                <hr />
                <div>Статус користувача</div>
                {/* (dbData.statusOrder) */}
                <Dropdown className="mt-2 mb-2">
                  <Dropdown.Toggle>
                    {user.selectedUser.role || userOld.role}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {user.statusUsers.map((s) => (
                      <Dropdown.Item onClick={() => selectUser(s)} key={s.id}>
                        {s.role}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Card>
            </div>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant={"outline-danger"} onClick={() => onHide()}>
          Закрити
        </Button>
        {isUser && (
          <Button
            variant={"outline-success"}
            onClick={() => changeUser(id, role)}
          >
            Зберегти
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
});
export default ChangeUser;
