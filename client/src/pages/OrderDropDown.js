import React from "react";
import CreateOrder from "../components/createTables/CreateOrder";
import { observer } from "mobx-react-lite";
const Order = observer(() => {
  return <CreateOrder />;
});
export default Order;
