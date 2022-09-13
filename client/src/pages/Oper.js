import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import CreateUnit from "../components/modals/CreateUnit";
import ChangeStatusOrder from "../components/modals/ChangeStatusOrder";
import ViewingLogsUnit from "../components/modals/logs/ViewingLogsUnit";
import ViewingLogsOrder from "../components/modals/logs/ViewingLogsOrder";

import { observer } from "mobx-react-lite";

const Oper = observer(() => {
  const [unitVisible, setUnitVisible] = useState(false);
  const [basketVisible, setBasketVisible] = useState(false);
  const [logsVisible, setLogsVisible] = useState(false);
  const [logsUnitVisible, setLogsUnitVisible] = useState(false);

  return (
    <Container className="d-flex flex-column">
      <Button
        variant={"outline-dark"}
        className="mt-4 p-2"
        onClick={() => setUnitVisible(true)}
      >
        Додати підрозділ в таблицю
      </Button>
      <Button
        variant={"outline-dark"}
        className="mt-4 p-2"
        onClick={() => setBasketVisible(true)}
      >
        Перегляд всіх заявок (Тут можна змінити статус заявки)
      </Button>

      <Button
        variant={"outline-dark"}
        className="mt-4 p-2"
        onClick={() => setLogsUnitVisible(true)}
      >
        Перегляд логів підрозділів
      </Button>

      <Button
        variant={"outline-dark"}
        className="mt-4 p-2"
        onClick={() => setLogsVisible(true)}
      >
        Перегляд логів заяв
      </Button>

      <CreateUnit show={unitVisible} onHide={() => setUnitVisible(false)} />

      <ChangeStatusOrder
        show={basketVisible}
        onHide={() => setBasketVisible(false)}
      />

      <ViewingLogsUnit
        show={logsUnitVisible}
        onHide={() => setLogsUnitVisible(false)}
      />
      <ViewingLogsOrder
        show={logsVisible}
        onHide={() => setLogsVisible(false)}
      />
    </Container>
  );
});
export default Oper;
