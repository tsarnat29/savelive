import React, { useContext } from "react";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import { ListGroup } from "react-bootstrap";
const UnitBar = observer(() => {
  const { dbData } = useContext(Context);

  return (
    <div>
      <ListGroup>
        {dbData.units.map((unit) => (
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
