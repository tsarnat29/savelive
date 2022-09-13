import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { observer } from "mobx-react-lite";

// import UpdateUser from "../components/modals/UpdateUser";
import CreateUnit from "../components/modals/CreateUnit";
import ChangeStatusOrder from "../components/modals/ChangeStatusOrder";
import ChangeStatusUser from "../components/modals/ChangeStatusUser";
import DeleteUnit from "../components/modals/DeleteUnit";
import DeleteUser from "../components/modals/DeleteUser";
import DeleteOrder from "../components/modals/DeleteOrder";

const Admin = observer(() => {
  const [unitVisible, setUnitVisible] = useState(false);
  const [userVisible, setUserVisible] = useState(false);
  const [basketVisible, setBasketVisible] = useState(false);
  const [delUnitVisible, setDelUnitVisible] = useState(false);
  const [delUserVisible, setDelUserVisible] = useState(false);
  const [delOrderVisible, setDelOrderVisible] = useState(false);

  return (
    <Container className="d-flex flex-column align-items-center">
      <div className="forModal d-flex flex-column">
        {/* UNIT */}
        <Button
          variant={"outline-dark"}
          className="mt-4 p-2"
          onClick={() => setUnitVisible(true)}
        >
          Додати підрозділ в таблицю
        </Button>
        {/* BASKET */}
        <Button
          variant={"outline-dark"}
          className="mt-4 p-2"
          onClick={() => setBasketVisible(true)}
        >
          Перегляд заявок (Тут можна змінити статус заявки)
        </Button>
        {/* USER */}
        <Button
          variant={"outline-dark"}
          className="mt-4 p-2"
          onClick={() => setUserVisible(true)}
        >
          Змінити статус User
        </Button>
        <Button
          variant={"outline-dark"}
          className="mt-4 p-2"
          onClick={() => setDelUnitVisible(true)}
        >
          Видалити підрозділ
        </Button>
        <Button
          variant={"outline-dark"}
          className="mt-4 p-2"
          onClick={() => setDelOrderVisible(true)}
        >
          Видалити заяву
        </Button>
        <Button
          variant={"outline-dark"}
          className="mt-4 p-2"
          onClick={() => setDelUserVisible(true)}
        >
          Видалити user
        </Button>
      </div>
      <CreateUnit show={unitVisible} onHide={() => setUnitVisible(false)} />
      <ChangeStatusOrder
        show={basketVisible}
        onHide={() => setBasketVisible(false)}
      />
      <ChangeStatusUser
        show={userVisible}
        onHide={() => setUserVisible(false)}
      />
      <DeleteUnit
        show={delUnitVisible}
        onHide={() => setDelUnitVisible(false)}
      />
      <DeleteOrder
        show={delOrderVisible}
        onHide={() => setDelOrderVisible(false)}
      />
      <DeleteUser
        show={delUserVisible}
        onHide={() => setDelUserVisible(false)}
      />
    </Container>
  );
});
export default Admin;
