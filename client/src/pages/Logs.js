import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";

import ViewingLogsUnit from "../components/modals/logs/ViewingLogsUnit";
import ViewingLogsOrder from "../components/modals/logs/ViewingLogsOrder";
import ViewingLogsUser from "../components/modals/logs/ViewingLogsUser";

import { observer } from "mobx-react-lite";

const Logs = observer(() => {
  const [logsVisible, setLogsVisible] = useState(false);
  const [logsUnitVisible, setLogsUnitVisible] = useState(false);
  const [logsUserVisible, setLogsUserVisible] = useState(false);

  return (
    <Container className="d-flex flex-column">
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

      <Button
        variant={"outline-dark"}
        className="mt-4 p-2"
        onClick={() => setLogsUserVisible(true)}
      >
        Перегляд логів користувачів
      </Button>

      <ViewingLogsUnit
        show={logsUnitVisible}
        onHide={() => setLogsUnitVisible(false)}
      />

      <ViewingLogsOrder
        show={logsVisible}
        onHide={() => setLogsVisible(false)}
      />

      <ViewingLogsUser
        show={logsUserVisible}
        onHide={() => setLogsUserVisible(false)}
      />
    </Container>
  );
});
export default Logs;
