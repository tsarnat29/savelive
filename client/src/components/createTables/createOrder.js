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

  const [name_unit, setNameUnit] = useState("");
  const [contacter, setContacter] = useState("");
  const [title_contacter, setTitleContacter] = useState("");
  const [phone_contacter, setPhoneContacter] = useState("");
  const [head, setHead] = useState("");
  const [phone_head, setPhoneHead] = useState("");
  const [title_region, setTitleRegion] = useState("");
  const [potrebs, setPotrebs] = useState([]);
  const [formAct, setFormAct] = useState("так");
  const [file, setFile] = useState(null);
  const [comment, setComment] = useState("");
  const [psw, setPsw] = useState("");

  const [showErrDemands, setShowErrDemands] = useState(false);
  const [errDemands, setErrDemands] = useState({ demand: "" });

  const [nameUnitValid, setNameUnitValid] = useState(false);
  const [contacterValid, setContacterValid] = useState(false);
  const [titleContacterValid, setTitleContacterValid] = useState(false);
  const [phoneContacterValid, setPhoneContacterValid] = useState(false);
  const [headValid, setHeadValid] = useState(false);
  const [phoneHeadValid, setPhoneHeadValid] = useState(false);
  const [titleRegionValid, setTitleRegionValid] = useState(true);
  const [potrebaValid, setPotrebaValid] = useState(false);
  const [amountValid, setAmountValid] = useState(false);
  const [fileValid, setFileValid] = useState(false);
  const [commentValid, setCommentValid] = useState(true);
  const [pswValid, setPswValid] = useState(true);

  const [formValid, setFormValid] = useState(false);
  const [formErrors, setFormErrors] = useState({
    text: "",
    name_unit: "",
    title_sub: "",
    contacter: "",
    title_contacter: "",
    phone_contacter: "",
    head: "",
    phone_head: "",
    title_region: "",
    potreba: "",
    amount: "",
    file: "",
    comment: "",
    psw: "",
  });

  const clearSet = () => {
    setNameUnit("");
    dbData.setSelectedUnit({});
    setContacter("");
    setPhoneContacter("");
    setHead("");
    setPhoneHead("");
    setTitleRegion("");
    setPotrebs([]);
    setFile(null);
    setComment("");
    setPsw("");
    setFormValid(false);
    document.getElementById("orderFile").value = "";
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
        return { ...formErrors, title_sub: "", text: "" };
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

  const handleActChange = (e) => {
    console.log("formAct=", e.target.value);

    setFormAct(() => e.target.value);
    console.log(setFormAct(() => e.target.value));
  };

  const fValidateForm = () => {
    if (
      nameUnitValid &&
      dbData.selectedUnit.title_sub !== undefined &&
      contacterValid &&
      titleContacterValid &&
      phoneContacterValid &&
      headValid &&
      phoneHeadValid &&
      titleRegionValid &&
      potrebaValid &&
      amountValid &&
      fileValid &&
      commentValid &&
      pswValid
    ) {
      setFormValid(true);
    }
  };

  const fValidateField = (fieldName, value) => {
    let textErr;

    const isNameUnitV = (str) => /^[0-9A-ZА-ЯЁіїІЇєЄ() -]+$/i.test(str);
    const isContacterV = (str) => /^[0-9A-ZА-ЯЁіїІЇєЄ() -]+$/i.test(str);
    const isTitleContacterV = (str) => /^[0-9A-ZА-ЯЁіїІЇєЄ() -]+$/i.test(str);
    const isPhoneContacterV = (str) =>
      /^\+38\s\(\d{3}\)\s\d{3}\s\d{2}\s\d{2}$/.test(str);
    const isHeadV = (str) => /^[0-9A-ZА-ЯЁіїІЇєЄ() -]+$/i.test(str);
    const isPhoneHeadV = (str) =>
      /^\+38\s\(\d{3}\)\s\d{3}\s\d{2}\s\d{2}$/.test(str);
    const isTitleRegionV = (str) => /^[0-9A-ZА-ЯЁіїІЇєЄ() -]+$/i.test(str);
    const isPotrebaV = (str) => /^[0-9A-ZА-ЯЁіїІЇєЄ() -]+$/i.test(str);
    const isAmountV = (str) => /^[0-9]\d*(\.\d+)?$/.test(str);
    const isCommentV = (str) => /^[0-9A-ZА-ЯЁіїІЇєЄ() -]+$/i.test(str);
    const isPswV = (str) => /^[0-9A-ZА-ЯЁіїІЇєЄ() -]+$/i.test(str);
    let field;

    switch (fieldName) {
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

      case "contacter":
        if (value === "") {
          field = true;
        } else {
          field = isContacterV(value);
        }
        textErr =
          field === true ? "" : "ПІБ: Тут мають бути букви, цифри, (, ), -";
        setFormErrors((formErrors) => ({ ...formErrors, contacter: textErr }));
        setContacterValid(field);
        fValidateForm();
        break;

      case "title_contacter":
        field = isTitleContacterV(value);
        textErr =
          field === true
            ? ""
            : "Посада контактної особи: Тут мають бути букви, цифри, (, ), -";
        setFormErrors((formErrors) => ({
          ...formErrors,
          title_contacter: textErr,
        }));
        setTitleContacterValid(field);
        fValidateForm();
        break;

      case "phone_contacter":
        field = isPhoneContacterV(value);
        textErr = field === true ? "" : "Телефон: введіть номер за шаблоном";
        setFormErrors((formErrors) => ({
          ...formErrors,
          phone_contacter: textErr,
        }));
        setPhoneContacterValid(field);
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

      case "phone_head":
        field = isPhoneHeadV(value);
        textErr = field === true ? "" : "Телефон: введіть номер за шаблоном";
        setFormErrors((formErrors) => ({ ...formErrors, phone_head: textErr }));
        setPhoneHeadValid(field);
        fValidateForm();
        break;

      case "title_region":
        field = isTitleRegionV(value);
        textErr =
          field === true ? "" : "Посада: Тут мають бути букви, цифри, (, ), -";
        setFormErrors((formErrors) => ({
          ...formErrors,
          title_region: textErr,
        }));
        setTitleRegionValid(field);
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

      case "file":
        field = Boolean(value);
        textErr = field === true ? "" : "Файл з заявою не завантажений";
        setFormErrors((formErrors) => ({ ...formErrors, file: textErr }));
        setFileValid((old) => (old = false || field));
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

      formData.append("name_unit", name_unit);
      formData.append("title_sub", dbData.selectedUnit.title_sub);
      formData.append("contacter", contacter);
      formData.append("title_contacter", title_contacter);
      formData.append("phone_contacter", `${phone_contacter}`);
      formData.append("head", head);
      formData.append("phone_head", `${phone_head}`);
      formData.append("title_region", title_region);
      formData.append("potrebs", JSON.stringify(potrebs));
      formData.append("formAct", formAct);
      formData.append("img", file);
      formData.append("comment", comment);
      formData.append("psw", psw);
      formData.append("unitId", dbData.selectedUnit.id);
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
        <h5>
          Будь ласка, заповніть уважно усі пункти. Чим більше детальної
          інформації ви надасте - тим швидше отримаєте відповідь по вашому
          запиту.
        </h5>
        <Form.Group className="mb-1" controlId="formUnit">
          <Form.Label>Номер військової частини А____ *</Form.Label>
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

        <Dropdown className="mt-1 mb-1">
          <Dropdown.Toggle variant="outline-dark">
            {dbData.selectedUnit.title_sub ||
              "Виберіть підрозділ (колонка ліворуч / нагорі)"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {
              <Dropdown.Item>
                Номер в/ч, деталізована назва підрозділу *
              </Dropdown.Item>
            }
          </Dropdown.Menu>
        </Dropdown>

        <Form.Group className="mb-1" controlId="contacter">
          <Form.Label>
            ПІБ того, хто звертається (далі - контактер) *
          </Form.Label>
          <Form.Control
            required
            type="text"
            name="contacter"
            value={contacter}
            placeholder="ПІБ того, хто звертається"
            className="mt-1"
            onChange={(e) => {
              setContacter(e.target.value);
              let value = e.target.value;
              fValidateField("contacter", value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-1" controlId="title_contacter">
          <Form.Label>
            Просимо вказати ваші (тобто, контактера) звання та посаду. *
          </Form.Label>
          <Form.Control
            required
            type="text"
            name="title_contacter"
            value={title_contacter}
            placeholder="Звання та посада того, хто звертається"
            className="mt-1"
            onChange={(e) => {
              setTitleContacter(e.target.value);
              let value = e.target.value;
              fValidateField("title_contacter", value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-1" controlId="Phone">
          <Form.Label>
            Номер телефону особи, яка залишає заявку +38 (0XX) XXX XX XX *
          </Form.Label>
          <Form.Control
            required
            type="tel"
            name="phone_contacter"
            value={phone_contacter}
            placeholder="Введить номер телефону в потрібному форматі"
            className="mt-1"
            onChange={(e) => {
              setPhoneContacter(e.target.value);
              let value = e.target.value;
              fValidateField("phone_contacter", value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-1" controlId="formHead">
          <Form.Label>
            ПІБ командира військової частини \ підрозділу *
          </Form.Label>
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

        <Form.Group className="mb-1" controlId="PhoneHead">
          <Form.Label>
            Контактний номер командира в/ч \ підрозділу +38 (0XX) XXX XX XX *
          </Form.Label>
          <Form.Control
            required
            type="tel"
            name="phone_head"
            value={phone_head}
            placeholder="Введить номер телефону в потрібному форматі"
            className="mt-1"
            onChange={(e) => {
              setPhoneHead(e.target.value);
              let value = e.target.value;
              fValidateField("phone_head", value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-1" controlId="formTitle">
          <Form.Label>
            Назва ОТУ, ОУВ або області, де наразі (фізично) знаходиться
            підрозділ *
          </Form.Label>
          <Form.Control
            required
            type="text"
            name="title_region"
            value={title_region}
            className="mt-1"
            onChange={(e) => {
              setTitle(e.target.value);
              let value = e.target.value;
              fValidateField("title_region", value);
            }}
          />
        </Form.Group>

        <hr />
        <h5>
          Перелік потреб підрозділу. Просимо зважати на пріоритетні напрямки
          роботи Фонду.
        </h5>
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

        <Form.Group controlId="formAct">
          <Form.Label>
            Вкажіть, чи зможете ви оформити акти прийому-передачі гербовою
            печаткою в/ч, та підписом командира в/ч з подальшою постановкою на
            облік майно *
          </Form.Label>
          <Form.Check
            value="так"
            type="radio"
            aria-label="radio 1"
            label="Так"
            onChange={handleActChange}
            checked={formAct === "так"}
          />
          <Form.Check
            value="ні"
            type="radio"
            aria-label="radio 2"
            label="Ні"
            onChange={handleActChange}
            checked={formAct === "ні"}
          />
        </Form.Group>

        <Form.Group className="mb-1 pt-3" controlId="orderFile">
          <Form.Label>
            Просимо додавати скан\фото копію заявки, оформленої на бланку з
            печаткою та за підписом командира *
          </Form.Label>
          <Form.Control
            required
            className="mt-2"
            name="img"
            type="file"
            onChange={(e) => {
              setFile(e.target.files[0]);
              setFileValid((old) => {
                return (old = true || true);
              });
              let value = e.target.files[0];
              fValidateField("file", value);
            }}
          />
        </Form.Group>
        <textarea
          name="comment"
          type="text"
          placeholder="Додаткові коментарі"
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
