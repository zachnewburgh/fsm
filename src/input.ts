export type InputValue = number | string;

export interface IInput {
  value: InputValue;
  nextStateId: string;
}

export class Input implements IInput {
  private _value: InputValue;

  private _nextStateId: string;

  constructor(value: InputValue, nextStateId: string) {
    this._value = value;
    this._nextStateId = nextStateId;
  }

  public get value(): InputValue {
    return this._value;
  }

  public set value(value: InputValue) {
    this._value = value;
  }

  public get nextStateId(): string {
    return this._nextStateId;
  }

  public set nextStateId(nextStateId: string) {
    this._nextStateId = nextStateId;
  }
}
