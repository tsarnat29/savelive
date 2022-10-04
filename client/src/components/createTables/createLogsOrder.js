import { createLogsAuth, createLogs } from "../../http/dbDataAPI";
export const createLogsOrder = (data, potrebs, paramAuth, paramCause) => {
  let nomer = data.id;
  let reason = paramCause;

  let {
    name_unit,
    title_sub,
    contacter,
    title_contacter,
    phone_contacter,
    head,
    phone_head,
    title_region,
    form_act,
    img,
    comment,
    psw,
  } = data;

  debugger;
  if (paramAuth) {
    debugger;
    createLogsAuth({
      reason,
      nomer,
      name_unit,
      title_sub,
      contacter,
      title_contacter,
      phone_contacter,
      head,
      phone_head,
      title_region,
      form_act,
      potrebs,
      img,
      comment,
      psw,
    });
  } else {
    debugger;
    createLogs({
      reason,
      nomer,
      name_unit,
      title_sub,
      contacter,
      title_contacter,
      phone_contacter,
      head,
      phone_head,
      title_region,
      form_act,
      potrebs,
      img,
      comment,
      psw,
    });
  }
};
