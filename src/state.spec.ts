import { IInput, Input } from './input';
import { IState, State } from './state';

describe('State', () => {
  let state: IState;
  beforeEach(() => {
    state = new State('foo', 'bar', []);
  });

  it('should exist', () => {
    expect(state).toBeTruthy();
  });

  it('should set the id', () => {
    const expected = 'baz';
    state.id = expected;
    expect(expected).toBe(state.id);
  });

  it('should set the nextStateId', () => {
    const expected = 'baz';
    state.nextStateId = expected;
    expect(expected).toBe(state.nextStateId);
  });

  describe('Input', () => {
    let first: IInput;
    let second: IInput;
    beforeEach(() => {
      first = new Input(0, 'baz');
      second = new Input(1, 'qux');
    });

    it('add one', () => {
      const expected = state.addInput(first).nextStateIdByInput;
      expect(expected).toStrictEqual({ [first.value]: first });
    });

    it('add many', () => {
      const expected = state.addInputs([first, second]).nextStateIdByInput;
      expect(expected).toStrictEqual({
        [first.value]: first,
        [second.value]: second,
      });
    });

    it('remove one', () => {
      state.addInputs([first, second]).removeInput(first.value);
      const expected = state.nextStateIdByInput;
      expect(expected).toStrictEqual({ [second.value]: second });
    });

    it('remove many', () => {
      state
        .addInputs([first, second])
        .removeInputs([first.value, second.value]);
      const expected = state.nextStateIdByInput;
      expect(expected).toStrictEqual({});
    });

    it('get all', () => {
      const expected = state.addInputs([first, second]).allInputs;
      expect(expected).toStrictEqual([first, second]);
    });
  });
});
