// для користувача
import React from "react";
import ViewingOrder from "../components/ViewingOrder";
import { observer } from "mobx-react-lite";
const Basket = observer(() => {
  return <ViewingOrder />;
});
export default Basket;
