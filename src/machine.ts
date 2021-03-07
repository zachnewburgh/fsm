import { InputValue } from './input';
import { IState } from './state';

type onChangeType = ((id: string) => void) | undefined;

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
  onChange: onChangeType;
}

export class Machine implements IMachine {
  private _active: string;

  private _statesById: Record<string, IState> = {};

  private _onChange: onChangeType;

  constructor(active = '', states: IState[] = [], onChange?: onChangeType) {
    this._active = active;
    this.addStates(states);
    this._onChange = onChange;
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
    const next = active.nextStateIdByInput[input];
    this.active = next?.nextStateId;
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
    if (nextState) {
      this._active = id;
      this.handleChange(id);
    }
  }

  public getState = (id: string): IState => this._statesById[id];

  public get states(): IState[] {
    return Object.values(this._statesById);
  }

  private handleChange(id: string) {
    if (typeof this._onChange === 'function') {
      this._onChange(id);
    }
  }

  public set onChange(fn: onChangeType) {
    this._onChange = fn;
  }
}
