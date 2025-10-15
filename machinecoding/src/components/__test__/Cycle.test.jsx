import { act, renderHook } from '@testing-library/react';

import useCycle from "../../hooks/Cycle/useCycle";

describe('useCycle', () => {
  test('return values', () => {
    const modes = ['low', 'medium', 'high'];
    const { result } = renderHook(() => useCycle(...modes));

    expect(result.current[0]).toBe(modes[0]);
    expect(typeof result.current[1]).toBe('function');
  });

  test('cycle', () => {
    const modes = ['low', 'medium', 'high'];
    const { result } = renderHook(() => useCycle(...modes));

    act(() => {
      result.current[1]();
    });

    expect(result.current[0]).toBe(modes[1]);
  });


  test('cycle should reset to first element', () => {
    const modes = ['low', 'medium', 'high'];
    const { result } = renderHook(() => useCycle(...modes));
  
    // initial state
    expect(result.current[0]).toBe('low');
  
    // move to medium
    act(() => {
      result.current[1]();
    });
    expect(result.current[0]).toBe('medium');
  
    // move to high
    act(() => {
      result.current[1]();
    });
    expect(result.current[0]).toBe('high');
  
    // move back to low
    act(() => {
      result.current[1]();
    });
    expect(result.current[0]).toBe('low');
  });


});
