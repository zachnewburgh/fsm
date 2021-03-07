import { IInput, Input } from './input';

describe('Input', () => {
  let input: IInput;
  beforeEach(() => {
    input = new Input(0, 'foo');
  });

  it('should exist', () => {
    expect(input).toBeTruthy();
  });

  it('should set the value', () => {
    const expected = 1;
    input.value = expected;
    expect(expected).toBe(input.value);
  });

  it('should set the nextStateId', () => {
    const expected = 'bar';
    input.nextStateId = expected;
    expect(expected).toBe(input.nextStateId);
  });
});
