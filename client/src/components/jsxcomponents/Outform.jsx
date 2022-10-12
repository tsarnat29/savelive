// перегляд заявки користувачем
import React from "react";
import { Container, Card, Col, Row } from "react-bootstrap";

const OutForm = ({ basket, isBasket, fail }) => {
  return (
    <Container className="container">
      {isBasket ? (
        <Row>
          <Col md={2}>
            {/* <Image width={600} height={900} src={filejpg.jpg} /> */}
          </Col>
          <Col md={10}>
            <Card className="m-auto pl-3 pr-3">
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
                Контактна інформація (номер телефону особи, яка залишила заявку)
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
              <h5>Перелік потреб</h5>
              {basket.potrebs.map((t, index) => (
                <Row className="mt-3 pl-3 pr-3" key={t.id}>
                  {t.name}: {t.amount} | {t.status} | {t.comment}
                  <hr />
                </Row>
              ))}
              <hr />
              <div>
                чи зможете ви оформити акти прийому-передачі гербовою печаткою
                в/ч, та підписом командира в/ч з подальшою постановкою на облік
                майно
              </div>
              <div>{basket.form_act}</div>
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
          </Col>
        </Row>
      ) : (
        <Row>{fail}</Row>
      )}
    </Container>
  );
};
export default OutForm;
