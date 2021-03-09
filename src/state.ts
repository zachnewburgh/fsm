import { IInput, InputValue } from './input';

export interface IState<T = string> {
  id: T;
  inputs: IInput<T>[];
  addInput: (input: IInput<T>) => IState<T>;
  addInputs: (inputs: IInput<T>[]) => IState<T>;
  removeInput: (value: InputValue) => IState<T>;
  removeInputs: (values: InputValue[]) => IState<T>;
  getInput: (value: InputValue) => IInput<T>;
}

export class State<T> implements IState<T> {
  private _id: T;

  private _nextStateIdByInput: Record<InputValue, IInput<T>>;

  constructor(id: T, inputs: IInput<T>[]) {
    this._id = id;
    this._nextStateIdByInput = {};
    this.addInputs(inputs);
  }

  public get id(): T {
    return this._id;
  }

  public set id(id: T) {
    this._id = id;
  }

  public get inputs(): IInput<T>[] {
    return Object.values(this._nextStateIdByInput);
  }

  public addInput = (input: IInput<T>): IState<T> => {
    const { value } = input;
    this._nextStateIdByInput[value] = input;
    return this;
  };

  public addInputs = (inputs: IInput<T>[]): IState<T> => {
    inputs.forEach(this.addInput);
    return this;
  };

  public removeInput = (value: InputValue): IState<T> => {
    delete this._nextStateIdByInput[value];
    return this;
  };

  public removeInputs = (values: InputValue[]): IState<T> => {
    values.forEach(this.removeInput);
    return this;
  };

  public getInput = (value: InputValue): IInput<T> =>
    this._nextStateIdByInput[value];
}
