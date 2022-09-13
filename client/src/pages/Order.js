import React, { useContext, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import UnitBar from "../components/UnitBar";
import CreateOrder from "../components/createTables/createOrder";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { fetchUnits } from "../http/dbDataAPI";

const Order = observer(() => {
  const { dbData } = useContext(Context);

  useEffect(() => {
    fetchUnits().then((data) => dbData.setUnits(data));
  }, []);

  debugger;
  return (
    <Container>
      <Row className="mt-2">
        <Col sm={4} className="scroll-container">
          <UnitBar />
        </Col>
        <Col sm={8} className="scroll-container">
          <CreateOrder />
        </Col>
      </Row>
    </Container>
  );
});

export default Order;
