import { IState } from './state';

export interface IMachine {
  current: string;
  statesById: Record<string, IState>;
  allStates: IState[];
  addState: (state: IState) => IMachine;
  addStates: (state: IState[]) => IMachine;
  removeState: (id: string) => IMachine;
  removeStates: (ids: string[]) => IMachine;
  getState: (id: string) => IState;
  next: () => IMachine;
  build: (id: string) => IMachine;
}

export class Machine implements IMachine {
  private _current = '';

  private _statesById: Record<string, IState> = {};

  public addState = (state: IState): IMachine => {
    const { id } = state;
    this.statesById[id] = state;
    return this;
  };

  public addStates = (states: IState[]): IMachine => {
    states.forEach(this.addState);
    return this;
  };

  public removeState = (id: string): IMachine => {
    delete this.statesById[id];
    return this;
  };

  public removeStates = (ids: string[]): IMachine => {
    ids.forEach(this.removeState);
    return this;
  };

  public next = (): IMachine => {
    const current = this.statesById[this.current];
    const next = current?.next;
    this.current = next;
    return this;
  };

  public build = (id: string): IMachine => {
    this.current = id;
    return this;
  };

  public get current(): string {
    return this._current;
  }

  public set current(id: string) {
    const nextState = this.statesById[id];
    if (nextState) this._current = id;
  }

  public getState = (id: string): IState => this.statesById[id];

  public get statesById(): Record<string, IState> {
    return this._statesById;
  }

  public get allStates(): IState[] {
    return Object.values(this.statesById);
  }
}
