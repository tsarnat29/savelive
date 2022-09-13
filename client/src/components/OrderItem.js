import React from "react";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import { useNavigate } from "react-router-dom";

const OrderItem = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const { dbData } = useContext(Context);
  const searchOrder = () => {
    selectedOrder = dbData.basket.filter();
  };
  return (
    <Form>
      <Form.Control
        placeholder="номер заявки"
        className="mb-3"
        onChange={(e) => setNameHead(e.target.value)}
        onClick={() => navigate(LOGIN_ROUTE)}
      />
    </Form>
  );
});
export default OrderItem;
