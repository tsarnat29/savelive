import { createLogsAuth, createLogs } from "../../http/dbDataAPI";
export const createLogsOrder = (data, potrebs, paramAuth, paramCause) => {
  let nomer = data.id;
  let reason = paramCause;
  let {
    psw,
    head,
    title_head,
    phone_contacter,
    name_sub,
    name_unit,
    comment,
    img,
  } = data;

  debugger;
  if (paramAuth) {
    debugger;
    createLogsAuth({
      reason,
      nomer,
      psw,
      head,
      title_head,
      phone_contacter,
      name_sub,
      name_unit,
      comment,
      potrebs,
      img,
    });
  } else {
    debugger;
    createLogs({
      reason,
      nomer,
      psw,
      head,
      title_head,
      phone_contacter,
      name_sub,
      name_unit,
      comment,
      potrebs,
      img,
    });
  }
};
