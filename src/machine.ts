import { InputValue } from './input';
import { IState } from './state';

type onStateChangeProps<T> = ((previous: T, current: T) => void) | undefined;

export interface IMachine<T = string> {
  active: T | undefined;
  states: IState<T>[];
  addState: (state: IState<T>) => IMachine<T>;
  addStates: (state: IState<T>[]) => IMachine<T>;
  removeState: (id: T) => IMachine<T>;
  removeStates: (ids: T[]) => IMachine<T>;
  getState: (id: T) => IState<T>;
  next: (input: InputValue) => IMachine<T>;
  build: (id: T) => IMachine<T>;
  onStateChange: onStateChangeProps<T>;
}

export class Machine<T> implements IMachine<T> {
  private _active: T | undefined;

  private _statesById: Record<string, IState<T>> = {};

  private _onStateChange: onStateChangeProps<T>;

  constructor(
    active?: T,
    states: IState<T>[] = [],
    onStateChange?: onStateChangeProps<T>,
  ) {
    this._active = active;
    this.addStates(states);
    this._onStateChange = onStateChange;
  }

  public addState = (state: IState<T>): IMachine<T> => {
    const { id } = state;
    this._statesById[`${id}`] = state;
    return this;
  };

  public addStates = (states: IState<T>[]): IMachine<T> => {
    states.forEach(this.addState);
    return this;
  };

  public removeState = (id: T): IMachine<T> => {
    delete this._statesById[`${id}`];
    return this;
  };

  public removeStates = (ids: T[]): IMachine<T> => {
    ids.forEach(this.removeState);
    return this;
  };

  public next = (input: InputValue): IMachine<T> => {
    const active = this._statesById[`${this.active}`];
    const next = active.getInput(input);
    this.active = next?.nextStateId;
    this.handleStateChanged(active.id, this.active);
    return this;
  };

  public build = (id: T): IMachine<T> => {
    this.active = id;
    return this;
  };

  public get active(): T | undefined {
    return this._active;
  }

  public set active(id: T | undefined) {
    const nextState = this._statesById[`${id}`];
    if (nextState) this._active = id;
  }

  public getState = (id: T): IState<T> => this._statesById[`${id}`];

  public get states(): IState<T>[] {
    return Object.values(this._statesById);
  }

  private handleStateChanged(previous: T, current: T) {
    if (previous === current) return;
    if (typeof this._onStateChange === 'function') {
      this._onStateChange(previous, current);
    }
  }

  public set onStateChange(fn: onStateChangeProps<T>) {
    this._onStateChange = fn;
  }
}
