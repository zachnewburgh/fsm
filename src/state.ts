export interface IState {
  id: string;
  next: string;
  input: unknown;
}

export class State implements IState {
  private _id: string;

  private _next: string;

  private _input: unknown;

  constructor(id: string, next: string, input?: unknown) {
    this._id = id;
    this._next = next;
    this._input = input;
  }

  get id(): string {
    return this._id;
  }

  set id(id: string) {
    this._id = id;
  }

  get next(): string {
    return this._next;
  }

  set next(next: string) {
    this._next = next;
  }

  get input(): unknown {
    return this._input;
  }

  set input(input: unknown) {
    this._input = input;
  }
}
