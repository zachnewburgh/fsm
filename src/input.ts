export type InputValue = number | string;

export interface IInput<T = string> {
  value: InputValue;
  nextStateId: T;
}

export class Input<T> implements IInput<T> {
  private _value: InputValue;

  private _nextStateId: T;

  constructor(value: InputValue, nextStateId: T) {
    this._value = value;
    this._nextStateId = nextStateId;
  }

  public get value(): InputValue {
    return this._value;
  }

  public set value(value: InputValue) {
    this._value = value;
  }

  public get nextStateId(): T {
    return this._nextStateId;
  }

  public set nextStateId(nextStateId: T) {
    this._nextStateId = nextStateId;
  }
}
