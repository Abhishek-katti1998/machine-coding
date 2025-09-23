import { useState } from "react";

export default function PracticeForm({ onSubmit, validate, errors, initialValues, resetError }) {
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleBlur = () => {
    validate?.(values);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validate?.(values);
    onSubmit?.(values);
  };

  return (
    <form onSubmit={handleSubmit} aria-label="Form input">
      {["name", "email", "phone", "age"].map((field) => (
        <div key={field}>
          <input
            placeholder={field}
            name={field}
            type={field === "age" ? "number" : field === "email" ? "email" : "text"}
            value={values[field]}
            onChange={handleChange}
            onFocus={() => {
              setTouched((t) => ({ ...t, [field]: true }));
              resetError();
            }}
            onBlur={handleBlur}
            aria-label={`${field} input`}
          />
          {touched[field] && errors[field] && <p>{errors[field]}</p>}
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
}
