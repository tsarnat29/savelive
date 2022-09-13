import React, { useContext, useState } from "react";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import { ListGroup, Form } from "react-bootstrap";
const UnitBar = observer(() => {
  const { dbData } = useContext(Context);
  const [value, setValue] = useState("");
  const [filterUnit, setFilterUnit] = useState([]);

  const filterValues = (field) => {
    return dbData.units.filter((item) => {
      let stroka = item["title_sub"];
      return stroka.toLowerCase().indexOf(field.toLowerCase()) > -1;
    });
  };

  const fFormCheck = (e) => {
    e.preventDefault();
    let value = e.target.value;
    setValue(value);
    setFilterUnit(filterValues(value));
    // setValue("");
  };

  return (
    <div>
      <Form.Group>
        <Form.Label>Почніть набирати назву підрозділу</Form.Label>
        <Form.Control
          id="search"
          type="text"
          name="title_sub"
          value={value}
          onChange={(e) => fFormCheck(e)}
        ></Form.Control>
      </Form.Group>

      <ListGroup>
        {filterUnit.length > 0
          ? filterUnit.map((unit) => (
              <ListGroup.Item
                style={{ cursor: "pointer" }}
                active={unit.id === dbData.selectedUnit.id}
                onClick={() => {
                  dbData.setSelectedUnit(unit);
                  setValue(dbData.selectedUnit.title_sub);
                }}
                key={unit.id}
              >
                {unit.title_sub}
              </ListGroup.Item>
            ))
          : dbData.units.map((unit) => (
              <ListGroup.Item
                style={{ cursor: "pointer" }}
                active={unit.id === dbData.selectedUnit.id}
                onClick={() => dbData.setSelectedUnit(unit)}
                key={unit.id}
              >
                {unit.title_sub}
              </ListGroup.Item>
            ))}
      </ListGroup>
    </div>
  );
});
export default UnitBar;
