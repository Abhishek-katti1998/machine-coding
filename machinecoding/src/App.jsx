import React, { useState } from "react";
import PracticeForm from "./components/TextInput/FormInput";

function App() {
  const [errors, setErrors] = useState({ name: "", email: "", phone: "", age: "" });

  const validate = (values) => {
    const errorObj = { name: "", email: "", phone: "", age: "" };
    if (!values.name) errorObj.name = "Enter name";
    if (!values.email) errorObj.email = "Enter email";
    if (!values.phone) errorObj.phone = "Enter phone";
    if (values.age === "" || values.age === null) errorObj.age = "Enter age";
    setErrors(errorObj);
  };

  const handleSubmit = (values) => {
    console.log("Form submitted ✅", values);
  };

  return (
    <PracticeForm
      initialValues={{ name: "", email: "", phone: "", age: "" }}
      validate={validate}
      errors={errors}
      resetError={() => setErrors({ name: "", email: "", phone: "", age: "" })}
      onSubmit={handleSubmit}
    />
  );
}

export default App;
