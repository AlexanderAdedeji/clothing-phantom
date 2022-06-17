import "./form-input.styles.scss";

const FormInput = ({ label, ...inputAttributes }) => {
  return (
    <div className="group">
      <input className="form-input" {...inputAttributes} />
      {label && (
        <label
          className={`${
            inputAttributes.value.length ? "shrink" : ""
          } form-input-label`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default FormInput;
