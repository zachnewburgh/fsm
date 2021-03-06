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
      const expected = machine.addState(first).getState('foo');
      expect(expected).toBe(first);
    });

    it('should add many', () => {
      machine.addStates(states);
      const expected = ['foo', 'bar'].map((id: string) => machine.getState(id));
      expect(expected).toStrictEqual(states);
    });
  });

  describe('Remove', () => {
    it('should remove one', () => {
      const expected = machine
        .addStates(states)
        .removeState('foo')
        .getState('foo');
      expect(expected).toBeUndefined();
    });

    it('should remove many', () => {
      const expected = machine.addStates(states).removeStates(['foo', 'bar'])
        .allStates;
      expect(expected).not.toStrictEqual(states);
    });
  });

  describe('Next', () => {
    it('should get the next state', () => {
      const expected = machine.addStates(states).build('foo').next().current;
      expect(expected).toBe('bar');
    });

    it('should not change the current state if the next state is unavailable', () => {
      const expected = machine.addStates(states).build('foo').next().next()
        .current;
      expect(expected).toBe('bar');
    });
  });

  describe('Build', () => {
    it('should set the current state', () => {
      const expected = machine.addState(first).build('foo').current;
      expect(expected).toBe('foo');
    });

    it('should not set the current state if unavailable', () => {
      const expected = machine.addState(first).build('baz').current;
      expect(expected).toBe('');
    });
  });
});
