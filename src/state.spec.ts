import { IState, State } from './state';

describe('State', () => {
  let state: IState;
  beforeEach(() => {
    state = new State('foo', 'bar', 'baz');
  });

  it('should exist', () => {
    expect(state).toBeTruthy();
  });

  it('should set the id', () => {
    const expected = 'baz';
    state.id = expected;
    expect(expected).toBe(state.id);
  });

  it('should set the next', () => {
    const expected = 'baz';
    state.next = expected;
    expect(expected).toBe(state.next);
  });

  it('should set the input', () => {
    const expected = 'qux';
    state.input = expected;
    expect(expected).toBe(state.input);
  });
});
