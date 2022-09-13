export const statusForm = (status, old_status, comment) => {
  debugger;
  const data = { saveStatus: false, saveComment: false, showErr: false };
  if (status === old_status && comment === "") {
    data.saveStatus = false;
    data.saveComment = false;
    data.showErr = false;
  } else if (status === old_status && comment !== "") {
    data.saveStatus = false;
    data.saveComment = true;
    data.showErr = false;
  } else if (
    status !== old_status &&
    status !== "відхилено" &&
    comment === ""
  ) {
    data.saveStatus = true;
    data.saveComment = false;
    data.showErr = false;
  } else if (
    status !== old_status &&
    status !== "відхилено" &&
    comment !== ""
  ) {
    data.saveStatus = true;
    data.saveComment = true;
    data.showErr = false;
  } else if (
    status !== old_status &&
    status === "відхилено" &&
    comment !== ""
  ) {
    data.saveStatus = true;
    data.saveComment = true;
    data.showErr = false;
  } else {
    //"відхилено" && comment === ''
    data.saveStatus = false;
    data.saveComment = false;
    data.showErr = true;
  }

  return data;
};
