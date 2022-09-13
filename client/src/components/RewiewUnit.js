import React from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";
import { Container } from "react-bootstrap/lib/tab";
import { Row } from "react-bootstrap";

const ReviewUnit = observer(() => {
  const { dbData } = useContext(Context);

  return (
    <div>
      {dbData.units.map((t) => (
        <Container key={t.id}>
          <Row className="m-3">
            <div className="pr-2"> {dbData.units.title}</div>
            <div>{dbData.units.section}</div>
          </Row>
        </Container>
      ))}
    </div>
  );
});
export default ReviewUnit;
