import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../index";
import { Form, Container, Card, Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { Dropdown, Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { FormErrors } from "../../components/err/FormErrors";
import { statusForm } from "../err/statusForm";
import { createLogsOrder } from "../createTables/createLogsOrder";
import {
  changeStatusOrder,
  updateOrder,
  commentOrder,
} from "../../http/dbDataAPI";

const ChangeStatusOrder = observer(({ show, onHide }) => {
  const { dbData } = useContext(Context);
  const [basket, setBasket] = useState({ potrebs: [] });
  const [demands, setDemands] = useState([]);
  let isChanged = false;
  const [err, setErr] = useState(false);
  const [formError, setFormError] = useState({ emptyComment: "" });
  const [isBasket, setIsBasket] = useState(false);
  const [id, setId] = useState(0);
  const [fieldId, setFieldId] = useState("");
  const [fail, setFail] = useState(false);
  const [btnAccess, setBtnAccess] = useState(false);
  let potrebsOld;

  const fetchOrder = (id) => {
    console.log("id=", id);
    changeStatusOrder(id).then((data) => {
      setBasket(data);
      debugger;
      if (data) {
        setFail(false);
        setDemands(data.potrebs);
        setIsBasket(true);
      } else setFail(true);
    });
  };

  useEffect(() => {
    setIsBasket(false);
    // тут id -строка, тобто при id="0" if(id)===true
    // перевірка: чи щось вводилось
    // id=0 обробляється так само, як і id, якого не знайдено
    if (id) {
      console.log("idEffect=", id);
      setBtnAccess(true);
      fetchOrder(id);
    } else {
      setBtnAccess(false);
    }
  }, [id, fail]);

  const resetData = () => {
    isChanged = false;
    setBasket({ potrebs: [] });
    setDemands([]);
    setErr(false);
    setFail(false);
    // setFieldId("");
    setFormError({ emptyComment: "" });
    setIsBasket(false);
  };

  const selectOrder = (s, nomer) => {
    dbData.setSelectedOrder(s);
    setDemands(
      demands.map((i) =>
        i.id === nomer ? { ...i, status: dbData.selectedOrder.status } : i
      )
    );
  };

  const changeDemand = (value, number) => {
    setDemands(
      demands.map((i) => (i.id === number ? { ...i, comment: value } : i))
    );
  };

  const changeOrder = () => {
    let paramChanged = "";
    potrebsOld = [...basket.potrebs];
    demands.forEach((d, index) => {
      if (true) {
        let id = d.id;
        let status = d.status;
        let statusOld = potrebsOld[index].status;
        // тут перевіряємо, чи оновлювався коментар
        // якщо так, будемо зберігати оновлений коментар
        let comment = potrebsOld[index].comment === d.comment ? "" : d.comment;
        const data = statusForm(status, statusOld, comment);

        if (data.showErr) {
          setErr(true);
          isChanged = false;
          setFormError((t) => ({
            ...t,
            emptyComment:
              'При зміні статусу на "відхилено" введіть новий коментар',
          }));
        } else {
          if (data.saveComment) {
            setErr(false);
            console.log("save. comment: ", potrebsOld[index].comment, comment);
            paramChanged = `Comment: ${potrebsOld[index].comment} <=> ${comment} `;
            commentOrder(id, comment);
            isChanged = true;
          }
          if (data.saveStatus) {
            setErr(false);
            paramChanged =
              paramChanged +
              `Status: ${potrebsOld[index].status} <=> ${status} `;
            updateOrder(id, status);
            isChanged = true;
          }
        }
      } else console.log("basket is empty");
    });
    if (isChanged) {
      debugger;
      setBasket({
        ...basket,
        potrebs: [...demands],
      });
      let paramAuth = true;
      let paramCause = `Зміни. ${paramChanged} `;
      debugger;
      let potrebsString = JSON.stringify(demands);
      createLogsOrder(basket, potrebsString, paramAuth, paramCause);
      fetchOrder(id);
      resetData();
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Тут можна змінити статус
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div>
          <Container>
            <Row className="d-flex flex-row">
              <Form.Control
                required
                placeholder="Введіть реєстраційний номер заяви"
                type="number"
                name="fieldId"
                value={fieldId}
                className="mt-2"
                onChange={(e) => {
                  setBtnAccess(true);
                  setFieldId(e.target.value);
                }}
              />
              <Button
                variant={"outline-success"}
                className="mb-2"
                disabled={!btnAccess}
                type="submit"
                onClick={() => {
                  setId(fieldId);
                }}
              >
                Ввести
              </Button>
            </Row>
            {fail && <div>Заяви з таким номером не існує</div>}
          </Container>
          {isBasket && (
            <div>
              <Card className="m-auto pl-3 pr-3">
                <h4>Перелік потреб</h4>
                {demands.map((t, index) => (
                  <Container key={t.id}>
                    <Row className="mt-3 pl-3 pr-3">
                      {t.name}: {t.amount}
                    </Row>
                    <Dropdown className="mt-2 mb-2">
                      <Dropdown.Toggle>{t.status}</Dropdown.Toggle>
                      <Dropdown.Menu>
                        {dbData.statusOrders.map((s) => (
                          <Dropdown.Item
                            onClick={() => {
                              dbData.setSelectedOrder(s);
                              selectOrder(s, t.id);
                            }}
                            key={s.id}
                          >
                            {s.status}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                    <textarea
                      name="comment"
                      type="text"
                      placeholder={t.comment}
                      value={t.comment}
                      className="mt-2"
                      onClick={(e) => {
                        changeDemand("", t.id);
                      }}
                      onChange={(e) => {
                        changeDemand(e.target.value, t.id);
                      }}
                    />
                  </Container>
                ))}
                {err && (
                  <div className="error">
                    <FormErrors className="errorForm" formErrors={formError} />
                  </div>
                )}
                <Button
                  variant={"outline-success"}
                  onClick={() => changeOrder()}
                >
                  Змінити
                </Button>
                <hr />
                <div>Назва підрозділу та № В/Ч</div>
                <div>{basket.name_unit}</div>
                <hr />
                <div>Номер в/ч, деталізована назва підрозділу</div>
                <div>{basket.title_sub}</div>
                <hr />
                <div>ПІБ того, хто звертається (далі - контактер)</div>
                <div>{basket.contacter}</div>
                <hr />
                <div>звання та посада контактера</div>
                <div>{basket.title_contacter}</div>
                <hr />
                <div>
                  Контактна інформація (номер телефону особи, яка залишила
                  заявку)
                </div>
                <div>{basket.phone_contacter}</div>
                <hr />
                <div>ПІБ командира військової частини \ підрозділу</div>
                <div>{basket.head}</div>
                <hr />
                <div>Контактний номер командира в/ч \ підрозділу</div>
                <div>{basket.phone_head}</div>
                <hr />
                <div>
                  Назва ОТУ, ОУВ або області, де наразі (фізично) знаходиться
                  підрозділ
                </div>
                <div>{basket.title_region}</div>
                <hr />

                <div>скан\фото копії заявки</div>
                <Row className="p-2">
                  <a
                    href={process.env.REACT_APP_API_URL + basket.img}
                    target="_blank"
                    rel="noopener nofollow noreferrer"
                  >
                    файл заяви
                  </a>
                </Row>
                <hr />
                <div>Коментарі</div>
                <div>{basket.comment}</div>
                <hr />
              </Card>
            </div>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant={"outline-danger"} onClick={() => onHide()}>
          Закрити
        </Button>
        {isBasket && (
          <Button variant={"outline-success"} onClick={() => resetData()}>
            Переглянути іншу заяву
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
});
export default ChangeStatusOrder;
