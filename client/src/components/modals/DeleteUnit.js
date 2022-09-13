import React, { useState, useContext, useEffect } from "react";
import { ListGroup, Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { Context } from "../../index";
import { observer } from "mobx-react-lite";
import { createUnitLogs, fetchUnits, deleteUnit } from "../../http/dbDataAPI";

const DeleteUnit = observer(({ show, onHide }) => {
  const { dbData } = useContext(Context);
  const [count, setCount] = useState(0);
  const [isUnit, setIsUnit] = useState(false);

  // useEffect(() => {
  //   fetchUnits().then((data) => dbData.setUnits(data));
  // }, []);

  useEffect(() => {
    fetchUnits().then((data) => dbData.setUnits(data));
  }, [count]);

  const destroyUnit = () => {
    debugger;
    let id = dbData.selectedUnit.id;
    let title_sub = dbData.selectedUnit.title_sub;
    let section = dbData.selectedUnit.section;
    let nomer = id;
    let reason = "Видаляється підрозділ";
    createUnitLogs({ reason, nomer, title_sub, section });
    deleteUnit(id)
      .then(setCount(count + 1))
      .then(fetchUnits().then((data) => dbData.setUnits(data)));
    setIsUnit(false);
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Тут можна видалити підрозділ
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div>
          {count > 0 ? (
            <div>Кількість видалених підрозділів: {count}</div>
          ) : (
            <div> </div>
          )}
          <ListGroup>
            {dbData.units.map((unit) => (
              <ListGroup.Item
                style={{ cursor: "pointer" }}
                active={unit.id === dbData.selectedUnit.id}
                onClick={() => {
                  setIsUnit(true);
                  dbData.setSelectedUnit(unit);
                }}
                key={unit.id}
              >
                <div className="d-flex d-column justify-content-between">
                  <div>{unit.title_sub}</div>
                  <div>ID: {unit.id}</div>
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
        {isUnit && (
          <Button variant={"outline-success"} onClick={() => destroyUnit()}>
            Видалити
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
});
export default DeleteUnit;
