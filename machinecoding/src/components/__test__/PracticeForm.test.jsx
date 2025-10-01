import {describe,expect,jest,test} from "@jest/globals";
import { screen,render, fireEvent,act } from '@testing-library/react';
import '@testing-library/jest-dom'
import PracticeForm from "../TextInput/FormInput";
import userEvent from "@testing-library/user-event";


// test suit to test form submit
describe('Practice Form test',()=>{
    
    const handleSubmit=jest.fn();
    const validate=jest.fn();
    const resetError=jest.fn();
    test('Enter all inputs',async()=>{

    render(<PracticeForm  initialValues={ {name: "", email: "", phone: "", age: ""}} 
        onSubmit={handleSubmit}
        validate={validate}
        resetError={resetError}
        errors={{name:"",email:"",phone:"",age:""}}
    />)

    const user = userEvent.setup();
    const nameIp=screen.getByLabelText('name input');
    const emailIp=screen.getByPlaceholderText('email');
    const phoneIp=screen.getByPlaceholderText('phone');
    const ageIp=screen.getByPlaceholderText('age');
    await user.type(nameIp,"Abhishek");
    await user.type(emailIp,"abhishekmkatti@gmail.com");
    await user.type(phoneIp,"7204303909");
    await user.type(ageIp,"20");
    await user.click(screen.getByRole('button',{name:/submit/i}));
    expect(handleSubmit).toBeCalledWith({name:"Abhishek",email:"abhishekmkatti@gmail.com",phone:"7204303909",age:20})
    })


test("shows error when email is invalid", async () => {
  const user = userEvent.setup();

  render(
    <PracticeForm
      initialValues={{ name: "", email: "", phone: "", age: "" }}
      handleSubmit={jest.fn()}
      validate={() => ({ email: "Invalid email" })} // mock validation result
      resetError={jest.fn()}
      errors={{ email: "Invalid email" }}
    />
  );

  const emailInput = screen.getByRole("textbox", { name: /email input/i });

  // type invalid email and blur (user action)
  await user.type(emailInput, "not-an-email");
  await user.tab(); // move focus away to trigger blur

  expect(await screen.findByText("Invalid email")).toBeInTheDocument();
});

test("calls resetError when focusing on input", async () => {
    const resetError = jest.fn();
    const user = userEvent.setup();
  
    render(
      <PracticeForm
        initialValues={{ name: "", email: "", phone: "", age: "" }}
        handleSubmit={jest.fn()}
        validate={jest.fn()}
        resetError={resetError}
        errors={{}}
      />
    );
  
    const nameInput = screen.getByRole("textbox", { name: /name input/i });
  
    await user.click(nameInput); // focus input
  
    expect(resetError).toHaveBeenCalled();
  });




})

// validation errors triggered on  errors