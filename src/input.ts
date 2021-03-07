export interface IInput {
  value: number | string;
  nextStateId: string;
}

export class Input implements IInput {
  private _value: number | string;

  private _nextStateId: string;

  constructor(value: number | string, nextStateId: string) {
    this._value = value;
    this._nextStateId = nextStateId;
  }

  get value(): number | string {
    return this._value;
  }

  set value(value: number | string) {
    this._value = value;
  }

  get nextStateId(): string {
    return this._nextStateId;
  }

  set nextStateId(nextStateId: string) {
    this._nextStateId = nextStateId;
  }
}
