import { IInput, Input } from './input';
import { IState, State } from './state';

describe('State', () => {
  let state: IState;
  beforeEach(() => {
    state = new State('foo', []);
  });

  it('should exist', () => {
    expect(state).toBeTruthy();
  });

  it('should set the id', () => {
    const expected = 'baz';
    state.id = expected;
    expect(expected).toBe(state.id);
  });

  describe('Input', () => {
    let first: IInput;
    let second: IInput;
    beforeEach(() => {
      first = new Input(0, 'baz');
      second = new Input(1, 'qux');
    });

    it('add one', () => {
      const expected = state.addInput(first).getInput(first.value);
      expect(expected).toBe(first);
    });

    it('add many', () => {
      const expected = state.addInputs([first, second]).inputs;
      expect(expected).toStrictEqual([first, second]);
    });

    it('remove one', () => {
      state.addInputs([first, second]).removeInput(first.value);
      const expected = state.inputs;
      expect(expected).toStrictEqual([second]);
    });

    it('remove many', () => {
      state
        .addInputs([first, second])
        .removeInputs([first.value, second.value]);
      const expected = state.inputs;
      expect(expected).toStrictEqual([]);
    });

    it('get all', () => {
      const expected = state.addInputs([first, second]).inputs;
      expect(expected).toStrictEqual([first, second]);
    });
  });
});
