import { Input } from './input';
import { IMachine, Machine } from './machine';
import { IState, State } from './state';

describe('Machine', () => {
  let machine: IMachine;
  let first: IState;
  let second: IState;
  let third: IState;
  let states: IState[];

  beforeEach(() => {
    machine = new Machine();
    first = new State('foo', 'bar', [new Input(0, 'bar'), new Input(1, 'qux')]);
    second = new State('bar', 'baz', [new Input(0, 'qux')]);
    third = new State('qux', 'quux', [new Input(0, 'foo')]);
    states = [first, second, third];
  });

  it('should exist', () => {
    expect(machine).toBeTruthy();
  });

  it('should get the states as an array', () => {
    const expected = machine.addStates(states).states;
    expect(expected).toStrictEqual(states);
  });

  describe('Add', () => {
    it('should add one', () => {
      const expected = machine.addState(first).getState(first.id);
      expect(expected).toBe(first);
    });

    it('should add many', () => {
      machine.addStates(states);
      const ids = [first.id, second.id, third.id];
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
        .removeStates([first.id, second.id]).states;
      expect(expected).not.toStrictEqual(states);
    });
  });

  describe('Next', () => {
    it('should get the next state with the correct input', () => {
      const goodInput = 0;
      machine.addStates(states);
      const expected = machine.build(first.id).next(goodInput).current;
      expect(expected).toBe(second.id);
    });

    it('should get the next state with a second input', () => {
      const goodInput = 1;
      machine.addStates(states);
      const expected = machine.build(first.id).next(goodInput).current;
      expect(expected).toBe(third.id);
    });

    it('should not get the next state without the correct input', () => {
      const badInput = 2;
      machine.addStates(states);
      const expected = machine.build(first.id).next(badInput).current;
      expect(expected).toBe(first.id);
    });

    it('should handle multiple inputs', () => {
      machine.addStates(states);
      const expected = machine.build(first.id).next(1).next(0).current;
      expect(expected).toBe(first.id);
    });

    it('should call onChange when it is set', () => {
      const spy = jest.spyOn(console, 'log');
      // eslint-disable-next-line no-console
      machine.addStates(states).onChange = console.log;
      machine.build(first.id).next(1);
      expect(spy).toHaveBeenCalledWith('qux');
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
