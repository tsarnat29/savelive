// import classes from '../../styles/FormError.module.css';
//{classes.formError}
export const FormErrors = ({ formErrors }) => {
  console.log("formErr=", formErrors);
  return (
    <div className="errorForm">
      {Object.keys(formErrors).map((fieldName, index) => {
        if (formErrors[fieldName].length > 0) {
          return <p key={index}> {formErrors[fieldName]}</p>;
        } else {
          return "";
        }
      })}
    </div>
  );
};
