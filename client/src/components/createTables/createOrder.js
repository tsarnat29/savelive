import React, { useContext, useState } from "react";
import { Context } from "../../index";
import {
  Container,
  Dropdown,
  Button,
  Form,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import { createOrder, createOrderAuth } from "../../http/dbDataAPI";
import { observer } from "mobx-react-lite";
import { createLogsOrder } from "./createLogsOrder";
import { FormErrors } from "../../components/err/FormErrors";
import "../../App.css";

const CreateOrder = observer(() => {
  const { dbData } = useContext(Context);
  const { user } = useContext(Context);

  const [psw, setPsw] = useState("");
  const [phone_contacter, setTel] = useState("");
  const [head, setHead] = useState("");
  const [title_head, setTitle] = useState("");
  const [name_unit, setNameUnit] = useState("");
  const [file, setFile] = useState(null);
  const [comment, setComment] = useState("");
  const [potrebs, setPotrebs] = useState([]);

  const [showErrDemands, setShowErrDemands] = useState(false);
  const [errDemands, setErrDemands] = useState({ demand: "" });

  const [pswValid, setPswValid] = useState(true);
  const [phoneValid, setPhoneValid] = useState(false);
  const [headValid, setHeadValid] = useState(false);
  const [titleValid, setTitleValid] = useState(false);
  const [nameUnitValid, setNameUnitValid] = useState(false);
  const [fileValid, setFileValid] = useState(false);
  const [commentValid, setCommentValid] = useState(true);
  const [potrebaValid, setPotrebaValid] = useState(false);
  const [amountValid, setAmountValid] = useState(false);

  const [formValid, setFormValid] = useState(false);
  const [formErrors, setFormErrors] = useState({
    text: "",
    psw: "",
    phone: "",
    head: "",
    title: "",
    name_unit: "",
    file: "",
    comment: "",
    potreba: "",
    amount: "",
    unit: "",
  });

  const clearSet = () => {
    setPsw("");
    setTel("");
    setHead("");
    setTitle("");
    setNameUnit("");
    setFile(null);
    setComment("");
    setPotrebs([]);
    setFormValid(false);
    document.getElementById("orderFile").value = "";
    dbData.setSelectedUnit({});
  };

  const addDemand = () => {
    setShowErrDemands(false);
    setPotrebs([
      ...potrebs,
      {
        id: Date.now(),
        potreba: "",
        amount: 0,
        status: "нова заявка",
        comment: "",
      },
    ]);
  };
  const removeDemand = (number) => {
    setShowErrDemands(false);
    setPotrebs(potrebs.filter((i) => i.id !== number));
  };
  const changeDemand = (key, value, number) => {
    setShowErrDemands(false);
    setPotrebs(
      potrebs.map((i) => (i.id === number ? { ...i, [key]: value } : i))
    );
  };
  const fChecking = () => {
    fValidateForm();

    if (!potrebaValid) {
      setFormErrors((formErrors) => ({
        ...formErrors,
        potreba: "Перевірте поле з потребою",
        text: "Перевірте обов'язкові поля",
      }));
    } else
      setFormErrors((formErrors) => ({ ...formErrors, potreba: "", text: "" }));
    if (!amountValid) {
      setFormErrors((formErrors) => ({
        ...formErrors,
        amount: "Перевірте поле з кількістю",
        text: "Перевірте обов'язкові поля",
      }));
    } else
      setFormErrors((formErrors) => ({ ...formErrors, amount: "", text: "" }));
    if (dbData.selectedUnit.title_sub !== undefined) {
      setFormErrors((formErrors) => {
        return { ...formErrors, unit: "", text: "" };
      });
    } else {
      setFormErrors((formErrors) => {
        return {
          ...formErrors,
          text: "Перевірте обов'язкові поля",
          unit: 'Виберіть підрозділ та натисніть "Завершити ввод"',
        };
      });
    }
  };

  const fValidateForm = () => {
    if (
      fileValid &&
      pswValid &&
      phoneValid &&
      headValid &&
      titleValid &&
      nameUnitValid &&
      commentValid &&
      potrebaValid &&
      amountValid &&
      dbData.selectedUnit.title_sub !== undefined
    ) {
      setFormValid(true);
    }
  };

  const fValidateField = (fieldName, value) => {
    let textErr;
    const isPswV = (str) => /^[0-9A-ZА-ЯЁіїІЇєЄ() -]+$/i.test(str);
    const isHeadV = (str) => /^[0-9A-ZА-ЯЁіїІЇєЄ() -]+$/i.test(str);
    const isTitleV = (str) => /^[0-9A-ZА-ЯЁіїІЇєЄ() -]+$/i.test(str);
    const isNameUnitV = (str) => /^[0-9A-ZА-ЯЁіїІЇєЄ() -]+$/i.test(str);
    const isCommentV = (str) => /^[0-9A-ZА-ЯЁіїІЇєЄ() -]+$/i.test(str);
    const isPotrebaV = (str) => /^[0-9A-ZА-ЯЁіїІЇєЄ() -]+$/i.test(str);
    const isAmountV = (str) => /^[0-9]\d*(\.\d+)?$/.test(str);
    const isPhoneV = (str) =>
      /^\+38\s\(\d{3}\)\s\d{3}\s\d{2}\s\d{2}$/.test(str);
    let field;
    switch (fieldName) {
      case "psw":
        if (value === "") {
          field = true;
        } else {
          field = isPswV(value);
        }
        textErr =
          field === true ? "" : "Пароль: Тут мають бути букви, цифри, (, ), -";
        setFormErrors((formErrors) => ({ ...formErrors, psw: textErr }));
        setPswValid(field);
        fValidateForm();
        break;
      case "head":
        field = isHeadV(value);
        textErr =
          field === true ? "" : "ПІБ: Тут мають бути букви, цифри, (, ), -";
        setFormErrors((formErrors) => ({ ...formErrors, head: textErr }));
        setHeadValid(field);
        fValidateForm();
        break;
      case "title_head":
        field = isTitleV(value);
        textErr =
          field === true ? "" : "Посада: Тут мають бути букви, цифри, (, ), -";
        setFormErrors((formErrors) => ({ ...formErrors, title: textErr }));
        setTitleValid(field);
        fValidateForm();
        break;
      case "name_unit":
        field = isNameUnitV(value);
        textErr =
          field === true
            ? ""
            : "Найменування підрозділу: Тут мають бути букви, цифри, (, ), -";
        setFormErrors((formErrors) => ({ ...formErrors, name_unit: textErr }));
        setNameUnitValid(field);
        fValidateForm();
        break;
      case "comment":
        if (value === "") {
          field = true;
        } else {
          field = isCommentV(value);
        }
        textErr =
          field === true
            ? ""
            : "Коментарій: Тут мають бути букви, цифри, (, ), -";
        setFormErrors((formErrors) => ({ ...formErrors, comment: textErr }));
        setCommentValid(field);
        fValidateForm();
        break;
      case "file":
        field = Boolean(value);
        textErr = field === true ? "" : "Файл з заявою не завантажений";
        setFormErrors((formErrors) => ({ ...formErrors, file: textErr }));
        setFileValid((old) => (old = field));
        fValidateForm();
        break;
      case "potreba":
        field = isPotrebaV(value);
        textErr =
          field === true
            ? ""
            : "Найенування потреби: Тут мають бути букви, цифри, (, ), -";
        setFormErrors((formErrors) => ({ ...formErrors, potreba: textErr }));
        setPotrebaValid(field);
        fValidateForm();
        break;
      case "amount":
        field = isAmountV(value);
        textErr =
          field === true && value > 0 ? "" : "Кількість має бути більше 0";
        setFormErrors((formErrors) => ({ ...formErrors, amount: textErr }));
        setAmountValid(field);
        fValidateForm();
        break;
      case "phone_contacter":
        field = isPhoneV(value);
        textErr = field === true ? "" : "Телефон: введіть номер за шаблоном";
        setFormErrors((formErrors) => ({ ...formErrors, phone: textErr }));
        setPhoneValid(field);
        fValidateForm();
        break;
      default:
        fValidateForm();
        break;
    }
  };

  const addBasket = () => {
    const formData = new FormData();
    let potrebValid = true;
    setShowErrDemands(false);
    debugger;
    potrebs.map((t) => {
      if (
        (t.potreba === "" && t.amount <= 0) ||
        (t.potreba === "" && t.amount > 0) ||
        (t.potreba !== "" && t.amount <= 0)
      ) {
        debugger;
        potrebValid = potrebValid && false;
      } else {
        debugger;
        potrebValid = potrebValid && true;
      }
    });
    if (!potrebValid) {
      setShowErrDemands(true);
      setErrDemands((t) => ({
        ...t,
        demand: "Перевірте потреби та кількісті",
      }));
    } else {
      setShowErrDemands(false);
      setErrDemands((t) => ({ ...t, demand: "" }));

      let potrebLogs = JSON.stringify(potrebs);
      formData.append("psw", psw);
      formData.append("phone_contacter", `${phone_contacter}`);
      formData.append("head", head);
      formData.append("title_head", title_head);
      formData.append("name_sub", dbData.selectedUnit.title_sub);
      formData.append("name_unit", name_unit);
      formData.append("potrebs", JSON.stringify(potrebs));
      formData.append("img", file);
      formData.append("unitId", dbData.selectedUnit.id);
      formData.append("comment", comment);

      if (user.isAuth) {
        createOrderAuth(formData).then((data) => {
          let paramAuth = true;
          let paramCause = "Створення нової заявки";
          createLogsOrder(data, potrebLogs, paramAuth, paramCause);
          alert(`Ваша заявка зареєстрована за номером ${data.id}`);
          clearSet();
        });
      } else {
        createOrder(formData).then((data) => {
          let paramAuth = false;
          let paramCause = "Створення нової заявки";
          createLogsOrder(data, potrebLogs, paramAuth, paramCause);
          alert(`Ваша заявка зареєстрована за номером ${data.id}`);
          clearSet();
        });
      }

      clearSet();
    }
  };

  return (
    <Container className="container">
      <Card className="m-auto pl-3 pr-3">
        <Form.Group className="mb-1" controlId="Phone">
          <Form.Label>
            Контактна інформація (номер телефону особи, яка залишає заявку) +38
            (0XX) XXX XX XX *
          </Form.Label>
          <Form.Control
            required
            type="tel"
            name="phone_contacter"
            value={phone_contacter}
            placeholder="Введить номер телефону в потрібному форматі"
            className="mt-1 ${errorClass(formErrors.title)"
            onChange={(e) => {
              setTel(e.target.value);
              let value = e.target.value;
              fValidateField("phone_contacter", value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-1" controlId="formHead">
          <Form.Label>ПІБ командира підрозділу *</Form.Label>
          <Form.Control
            required
            type="text"
            name="head"
            value={head}
            className="mt-1"
            onChange={(e) => {
              setHead(e.target.value);
              let value = e.target.value;
              fValidateField("head", value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-1" controlId="formTitle">
          <Form.Label>
            Посада та звання (наприклад: командир батальйону, полковник) *
          </Form.Label>
          <Form.Control
            required
            type="text"
            name="title_head"
            value={title_head}
            className="mt-1"
            onChange={(e) => {
              setTitle(e.target.value);
              let value = e.target.value;
              fValidateField("title_head", value);
            }}
          />
        </Form.Group>
        <Dropdown className="mt-1 mb-1">
          <Dropdown.Toggle variant="outline-dark">
            {dbData.selectedUnit.title_sub ||
              "Виберіть підрозділ (колонка ліворуч / нагорі)"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {<Dropdown.Item>Оберіть підрозділ</Dropdown.Item>}
          </Dropdown.Menu>
        </Dropdown>

        <Form.Group className="mb-1" controlId="formUnit">
          <Form.Label>
            Назва підрозділу та № В/Ч (наприклад: А1302) *
          </Form.Label>
          <Form.Control
            required
            type="text"
            name="name_unit"
            value={name_unit}
            className="mt-1"
            onChange={(e) => {
              setNameUnit(e.target.value);
              let value = e.target.value;
              fValidateField("name_unit", value);
            }}
          />
        </Form.Group>

        <hr />
        <Button className="btn btn-secondary" type="submit" onClick={addDemand}>
          Додати потребу
        </Button>

        {potrebs.map((t) => (
          <Row className="mt-1" key={t.id}>
            <Col md={4}>
              <Form.Control
                required
                type="text"
                placeholder="Назва потреби *"
                name="potreba"
                value={t.potreba}
                onChange={(e) => {
                  changeDemand("potreba", e.target.value, t.id);
                  let value = e.target.value;
                  fValidateField("potreba", value);
                }}
              />
            </Col>
            <Col md={4}>
              <Form.Control
                required
                type="number"
                placeholder="Кількість *"
                name="amount"
                value={t.amount}
                onChange={(e) => {
                  changeDemand("amount", e.target.value, t.id);
                  let value = e.target.value;
                  fValidateField("amount", value);
                }}
              />
            </Col>
            <Col md={4}>
              <Button
                className="btn btn-danger"
                onClick={() => removeDemand(t.id)}
              >
                Видалити
              </Button>
            </Col>
          </Row>
        ))}
        <Form.Group className="mb-1 pt-3" controlId="orderFile">
          <Form.Label>Завантажити файл jpg з заявою *</Form.Label>
          <Form.Control
            required
            className="mt-2"
            name="img"
            type="file"
            onChange={(e) => {
              setFile(e.target.files[0]);
              setFileValid((old) => {
                return (old = true);
              });
              let value = e.target.files[0];
              fValidateField("file", value);
            }}
          />
        </Form.Group>
        <textarea
          name="comment"
          type="text"
          placeholder="Тут можна залишити коментарі"
          value={comment}
          className="mt-1"
          onChange={(e) => {
            setComment(e.target.value);
            let value = e.target.value;
            fValidateField("comment", value);
          }}
        />
        <Form.Control
          type="text"
          placeholder="Пароль, якщо хочете відстежувати стан заяви"
          name="psw"
          value={psw}
          className="mt-1 mb-1"
          onChange={(e) => {
            setPsw(e.target.value);
            let value = e.target.value;
            fValidateField("psw", value);
          }}
        />
        <Button
          variant={"outline-dark"}
          className="mb-1"
          type="submit"
          onClick={() => fChecking()}
        >
          Завершити ввод заяви
        </Button>
        {!formValid && (
          <div className="error mt-1">
            <div style={{ borderTop: "red solid 1px" }}></div>
            <FormErrors className="errorForm" formErrors={formErrors} />
            <div style={{ borderTop: "red solid 1px" }}></div>
          </div>
        )}
        {showErrDemands && (
          <div className="error mt-1">
            errDemands
            <FormErrors className="errorForm" formErrors={errDemands} />
            <div style={{ borderTop: "red solid 1px" }}></div>
          </div>
        )}
        <Button
          variant={"outline-success"}
          className="mb-2"
          type="submit"
          disabled={!formValid}
          onClick={addBasket}
        >
          Зареєструвати
        </Button>
      </Card>
    </Container>
  );
});

export default CreateOrder;
