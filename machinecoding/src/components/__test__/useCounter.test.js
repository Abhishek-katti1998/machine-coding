import { renderHook, act } from "@testing-library/react"
import useCounter from "../../hooks/Counter/useCounter"

jest.useFakeTimers()

describe("useCounter Hook", () => {
  test("initial state is set correctly", () => {
    const { result } = renderHook(() =>
      useCounter({ initialSec: 10, initialMin: 1, initialHr: 0 })
    )

    expect(result.current.timerState).toEqual({ counter: 10, minCounter: 1, hrCounter: 0 })
    expect(result.current.format).toBe("minutes")
  })

  test("decrements seconds automatically when autoStart is true", () => {
    const { result } = renderHook(() =>
      useCounter({ initialSec: 5, initialMin:0, initialHr:0, step:1, autoStart:true})
    )
    
    act(() => {
      jest.advanceTimersByTime(2000)
    })
    expect(result.current.timerState.counter).toBe(3)
  })

  test("pause and resume works", () => {
    const { result } = renderHook(() =>
      useCounter({ initialSec: 5, initialMin:0, initialHr:0, step:1, autoStart:true })
    )

    act(() => {
      jest.advanceTimersByTime(2000)
    })
    expect(result.current.timerState.counter).toBe(3)

    act(() => {
      result.current.pauseBtnHandler({ preventDefault: jest.fn() })
      jest.advanceTimersByTime(2000)
    })
    expect(result.current.timerState.counter).toBe(3) // unchanged

    act(() => {
      result.current.resumeBtnHandler({ preventDefault: jest.fn() })
      jest.advanceTimersByTime(2000)
    })
    expect(result.current.timerState.counter).toBe(1)
  })

  test("reset works", () => {
    const { result } = renderHook(() =>
      useCounter({ initialSec: 5, initialMin:0, initialHr:0, step:1, autoStart:true })
    )

    act(() => {
      jest.advanceTimersByTime(3000)
    })
    expect(result.current.timerState.counter).toBe(2)

    act(() => {
      result.current.resetHandler({ preventDefault: jest.fn() })
    })
    expect(result.current.timerState.counter).toBe(5)
  })

  test("calls onComplete when finished", () => {
    const onComplete = jest.fn()
    renderHook(() =>
      useCounter({ initialSec: 2,initialMin:0, initialHr:0, step:1, autoStart:true ,onComplete})
    )
    act(() => {
      jest.advanceTimersByTime(2000)
    })
    expect(onComplete).toHaveBeenCalledWith('timer')
  })

  test("step >1 seconds", () => {
    const {result}=renderHook(() =>
      useCounter({ initialSec: 40,initialMin:0, initialHr:0, step:4, autoStart:true})
    )
    act(() => {
      jest.advanceTimersByTime(1000)
    })
    expect(result.current.timerState.counter).toBe(36)
  })
  test("step >1 minutes", () => {
    const {result}=renderHook(() =>
      useCounter({ initialSec: 1,initialMin:1, initialHr:0, step:3, autoStart:true})
    )
    act(() => {
      jest.advanceTimersByTime(1000)
    })
    expect(result.current.timerState.counter).toBe(58);
    expect(result.current.timerState.minCounter).toBe(0);
  })
  test("step >1 hour", () => {
    const {result}=renderHook(() =>
      useCounter({ initialSec: 1,initialMin:1, initialHr:1, step:10, autoStart:true})
    )
    act(() => {
      jest.advanceTimersByTime(1000*7)
    })
    expect(result.current.timerState.counter).toBe(51);
    expect(result.current.timerState.minCounter).toBe(59);
    expect(result.current.timerState.hrCounter).toBe(0);
  })

})


// 60min 61sec -70sec=59min
// 60 min 1
