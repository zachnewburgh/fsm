import { IMachine, Machine } from './machine';
import { IState, State } from './state';

describe('Machine', () => {
  let machine: IMachine;
  let first: IState;
  let second: IState;
  let states: IState[];

  beforeEach(() => {
    machine = new Machine();
    first = new State('foo', 'bar');
    second = new State('bar', 'baz');
    states = [first, second];
  });

  it('should exist', () => {
    const expected = Machine;
    expect(expected).toBeTruthy();
  });

  it('should get the states as an array', () => {
    const expected = machine.addStates(states).allStates;
    expect(expected).toStrictEqual(states);
  });

  describe('Add', () => {
    it('should add one', () => {
      const expected = machine.addState(first).getState(first.id);
      expect(expected).toBe(first);
    });

    it('should add many', () => {
      machine.addStates(states);
      const ids = [first.id, second.id];
      const expected = ids.map((id: string) => machine.getState(id));
      expect(expected).toStrictEqual(states);
    });
  });

  describe('Remove', () => {
    it('should remove one', () => {
      const expected = machine
        .addStates(states)
        .removeState(first.id)
        .getState(first.id);
      expect(expected).toBeUndefined();
    });

    it('should remove many', () => {
      const expected = machine
        .addStates(states)
        .removeStates([first.id, second.id]).allStates;
      expect(expected).not.toStrictEqual(states);
    });
  });

  describe('Next', () => {
    it('should get the next state with the correct input', () => {
      const goodInput = 'qux';
      first.input = goodInput;
      machine.addStates(states);
      const expected = machine.build(first.id).next(goodInput).current;
      expect(expected).toBe(second.id);
    });

    it('should not get the next state without the correct input', () => {
      const goodInput = 'qux';
      const badInput = 'quux';
      first.input = goodInput;
      machine.addStates(states);
      const expected = machine.build(first.id).next(badInput).current;
      expect(expected).toBe(first.id);
    });

    it('should not change the current state if the next state is unavailable', () => {
      machine.addStates(states);
      const expected = machine.build(first.id).next().next().current;
      expect(expected).toBe(second.id);
    });
  });

  describe('Build', () => {
    it('should set the current state', () => {
      const expected = machine.addState(first).build(first.id).current;
      expect(expected).toBe(first.id);
    });

    it('should not set the current state if unavailable', () => {
      const expected = machine.addState(first).build('baz').current;
      expect(expected).toBe('');
    });
  });
});
