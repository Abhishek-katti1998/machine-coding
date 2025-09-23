import {describe,expect,test} from '@jest/globals';
import { screen,render, fireEvent,act } from '@testing-library/react';
import '@testing-library/jest-dom'
import TimerCounter from '../Counter/TimerCounter';


jest.useFakeTimers()
describe('Timer Tester',()=>{

    test('render with default props',()=>{
        render(<TimerCounter/>);
        expect(screen.getByRole("group",{name:/count down timer/i})).toBeInTheDocument();
        expect(screen.getByText(/time remaining/i)).toBeInTheDocument();
    })

    test('throws error for inital -ve values',()=>{
        const spy = jest.spyOn(console, "error").mockImplementation(() => {})
        expect(()=>render(<TimerCounter initialSec={-5}/>)).toThrow('Provide valid initial counter format');
        spy.mockRestore();
    })

    test('start btn test',()=>{
        render(<TimerCounter initialSec={5} autoStart={false}/>)
        const startBtn=screen.getByRole('button',{name:/start/i});
        fireEvent.click(startBtn);
        act(()=>{
            jest.advanceTimersByTime(2000)
        })
        expect(screen.getByText(/time remaining:3/i)).toBeInTheDocument()
    })
    test('pause btn test',()=>{
        render(<TimerCounter autoStart={false} initialSec={5}/>);
        const pauseBtn=screen.getByRole('button',{name:/pause/i});
        fireEvent.click(pauseBtn);
        expect(screen.getByText(/time remaining:5/i)).toBeInTheDocument();
    })
    test('pause and resume works',()=>{
        render(<TimerCounter initialSec={5} autoStart />)
        const pauseBtn = screen.getByRole("button", { name: /pause/i })
        const resumeBtn = screen.getByRole("button", { name: /resume/i })
    
        act(() => {
          jest.advanceTimersByTime(2000)
        })
        expect(screen.getByText(/time remaining:3/i)).toBeInTheDocument()
    
        fireEvent.click(pauseBtn)
        act(() => {
          jest.advanceTimersByTime(2000)
        })
        // Still 3 because paused
        expect(screen.getByText(/time remaining:3/i)).toBeInTheDocument()
    
        fireEvent.click(resumeBtn)
        act(() => {
          jest.advanceTimersByTime(2000)
        })
        expect(screen.getByText(/time remaining:1/i)).toBeInTheDocument()
    })
    test('reset btn test',()=>{
        render(<TimerCounter initialSec={5} autoStart />)
        const resetBtn = screen.getByRole("button", { name: /reset/i })
    
        act(() => {
          jest.advanceTimersByTime(3000)
        })
        expect(screen.getByText(/time remaining:2/i)).toBeInTheDocument()
    
        fireEvent.click(resetBtn)
        expect(screen.getByText(/time remaining:5/i)).toBeInTheDocument()
    })

    test("on tick verification", () => {
     
        const onTick=jest.fn();
        render(<TimerCounter initialSec={40} onTick={onTick}/>);
        act(() => {
            jest.advanceTimersByTime(2000)
          })
        expect(onTick).toBeCalledWith({"counter": 38, "hrCounter": 0, "minCounter": 0})

      })


})