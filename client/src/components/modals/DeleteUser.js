import React, { useState, useContext, useEffect } from "react";
import { ListGroup, Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { Context } from "../../index";
import { observer } from "mobx-react-lite";
import { createUserLogs } from "../../http/dbDataAPI";
import { fetchUsers, deleteUser } from "../../http/userAPI";

const DeleteUser = observer(({ show, onHide }) => {
  const { user } = useContext(Context);
  const [count, setCount] = useState(0);
  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    fetchUsers().then((data) => user.setUsers(data));
  }, [count]);

  const destroyUser = () => {
    debugger;
    let id = user.selectedUser.id;
    let email = user.selectedUser.email;
    let role = user.selectedUser.role;
    let nomer = id;
    let reason = "Видаляється з таблиці користувачей ";
    let passw = user.selectedUser.password;
    createUserLogs({ reason, nomer, email, passw, role });
    deleteUser(id)
      .then(setCount(count + 1))
      .then(fetchUsers().then((data) => user.setUsers(data)));
    setIsUser(false);
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Тут можна видалити user
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div>
          {count > 0 ? (
            <div>Кількість видалених users: {count}</div>
          ) : (
            <div> </div>
          )}
          <ListGroup>
            {user.users.map((u) => (
              <ListGroup.Item
                style={{ cursor: "pointer" }}
                active={u.id === user.selectedUser.id}
                onClick={() => {
                  setIsUser(true);
                  user.setSelectedUser(u);
                }}
                key={u.id}
              >
                <div className="d-flex d-column justify-content-between">
                  <div className="w-75">{u.email}</div>
                  <div>{u.role}</div>
                  <div>ID: {u.id}</div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant={"outline-danger"} onClick={() => onHide()}>
          Закрити
        </Button>
        {isUser && (
          <Button variant={"outline-success"} onClick={() => destroyUser()}>
            Видалити
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
});
export default DeleteUser;
