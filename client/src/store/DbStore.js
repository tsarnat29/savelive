import { makeAutoObservable } from "mobx";

export default class DbStore {
  constructor() {
    this._units = [{ id: 0, title_sub: "", section: "" }];
    this._baskets = [];
    this._demands = [];
    // status:  нова заявка, прийнято, в очікуванні, відхилено, опрацьовано
    this._statusOrders = [
      {
        id: 1,
        status: "нова заявка",
      },
      {
        id: 2,
        status: "прийнято",
      },
      {
        id: 3,
        status: "в очікуванні",
      },
      {
        id: 4,
        status: "відхилено",
      },
      {
        id: 5,
        status: "опрацьовано",
      },
    ];

    this._selectedOrder = {};
    this._selectedUnit = {};
    // this._selectedFile = {};

    makeAutoObservable(this);
  }
  setStatusOrders(statusOrders) {
    this._statusOrders = statusOrders;
  }
  byField = function (field) {
    return (a, b) => a[field].localeCompare(b[field]);
  };
  setUnits(units) {
    this._units = [...units].sort(this.byField("title_sub"));
  }
  setSelectedOrder(order) {
    this._selectedOrder = order;
  }
  setSelectedUnit(unit) {
    this._selectedUnit = unit;
  }
  // setSelectedFile(file) {
  //   this._selectedFile = file;
  // }
  setBaskets(baskets) {
    this._baskets = baskets;
  }
  setDemands(demands) {
    this._demands = demands;
  }

  get statusOrders() {
    return this._statusOrders;
  }
  get units() {
    return this._units;
  }
  get selectedUnit() {
    return this._selectedUnit;
  }
  get selectedOrder() {
    return this._selectedOrder;
  }
  get baskets() {
    return this._baskets;
  }
  get demands() {
    return this._demands;
  }
}
