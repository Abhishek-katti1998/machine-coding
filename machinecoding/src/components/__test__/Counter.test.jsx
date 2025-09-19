import {expect, jest, test,describe} from '@jest/globals';
import Counter from '../Counter';
import userEvent from '@testing-library/user-event';
import { screen,render } from '@testing-library/react';

test("uncontrolled: increments and decrements correctly",async()=>{

    render(<Counter initialValue={5} step={2}/>)
    const incBtn=screen.getByText(/increment/i);
    const decBtn=screen.getByText(/decrement/i);
    const resetBtn=screen.getByText(/reset/i);

    const displayedValue=screen.getByRole('status');
   

    await userEvent.click(incBtn);
    expect(displayedValue.textContent).toBe("7");
    await userEvent.click(decBtn);
    expect(displayedValue.textContent).toBe("5");
    await userEvent.click(resetBtn);
    expect(displayedValue.textContent).toBe("5");


})

test("Calls onchange instead of internal state",async()=>{
    const handleChange=jest.fn();
    render(<Counter value={10} step={1} onChange={handleChange}/>);
    const incBtn=screen.getByText(/increment/i);
    const displayValue=screen.getByRole('status');

    await userEvent.click(incBtn);
    expect(handleChange).toHaveBeenCalledWith(11);
    expect(displayValue.textContent).toBe("10");
})

test("throws error on step<=0 case",()=>{
    expect(()=>render(<Counter step={-1}/>)).toThrow("Invalid Step")
})

test('Counter switch warn test',()=>{

const warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});

const { rerender } = render(<Counter initialValue={5} />); // uncontrolled

// Switch to controlled mode by giving `value` prop
rerender(<Counter value={5} onChange={() => {}} />);

expect(warnSpy).toHaveBeenCalledWith(
  expect.stringContaining("changed from uncontrolled to controlled")
);

warnSpy.mockRestore();


})