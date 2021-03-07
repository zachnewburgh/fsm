import { InputValue } from './input';
import { IState } from './state';

type onStateChangeProps =
  | ((previous: string, current: string) => void)
  | undefined;

export interface IMachine {
  active: string;
  states: IState[];
  addState: (state: IState) => IMachine;
  addStates: (state: IState[]) => IMachine;
  removeState: (id: string) => IMachine;
  removeStates: (ids: string[]) => IMachine;
  getState: (id: string) => IState;
  next: (input: InputValue) => IMachine;
  build: (id: string) => IMachine;
  onStateChange: onStateChangeProps;
}

export class Machine implements IMachine {
  private _active: string;

  private _statesById: Record<string, IState> = {};

  private _onStateChange: onStateChangeProps;

  constructor(
    active = '',
    states: IState[] = [],
    onStateChange?: onStateChangeProps,
  ) {
    this._active = active;
    this.addStates(states);
    this._onStateChange = onStateChange;
  }

  public addState = (state: IState): IMachine => {
    const { id } = state;
    this._statesById[id] = state;
    return this;
  };

  public addStates = (states: IState[]): IMachine => {
    states.forEach(this.addState);
    return this;
  };

  public removeState = (id: string): IMachine => {
    delete this._statesById[id];
    return this;
  };

  public removeStates = (ids: string[]): IMachine => {
    ids.forEach(this.removeState);
    return this;
  };

  public next = (input: InputValue): IMachine => {
    const active = this._statesById[this.active];
    const next = active.getInput(input);
    this.active = next?.nextStateId;
    this.handleStateChanged(active.id, this.active);
    return this;
  };

  public build = (id: string): IMachine => {
    this.active = id;
    return this;
  };

  public get active(): string {
    return this._active;
  }

  public set active(id: string) {
    const nextState = this._statesById[id];
    if (nextState) this._active = id;
  }

  public getState = (id: string): IState => this._statesById[id];

  public get states(): IState[] {
    return Object.values(this._statesById);
  }

  private handleStateChanged(previous: string, current: string) {
    if (previous === current) return;
    if (typeof this._onStateChange === 'function') {
      this._onStateChange(previous, current);
    }
  }

  public set onStateChange(fn: onStateChangeProps) {
    this._onStateChange = fn;
  }
}
