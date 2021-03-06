export interface IState {
  id: string;
  next: string;
}

export class State implements IState {
  private _id: string;

  private _next: string;

  constructor(id: string, next: string) {
    this._id = id;
    this._next = next;
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
}
