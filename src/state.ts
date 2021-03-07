import { IInput, InputValue } from './input';

export interface IState {
  id: string;
  inputs: IInput[];
  nextStateId: string;
  addInput: (input: IInput) => IState;
  addInputs: (inputs: IInput[]) => IState;
  removeInput: (value: InputValue) => IState;
  removeInputs: (values: InputValue[]) => IState;
  getInput: (value: InputValue) => IInput;
}

export class State implements IState {
  private _id: string;

  private _nextStateId: string;

  private _nextStateIdByInput: Record<InputValue, IInput>;

  constructor(id: string, next: string, inputs: IInput[]) {
    this._id = id;
    this._nextStateId = next;
    this._nextStateIdByInput = {};
    this.addInputs(inputs);
  }

  get id(): string {
    return this._id;
  }

  set id(id: string) {
    this._id = id;
  }

  get nextStateId(): string {
    return this._nextStateId;
  }

  set nextStateId(next: string) {
    this._nextStateId = next;
  }

  get inputs(): IInput[] {
    return Object.values(this._nextStateIdByInput);
  }

  public addInput = (input: IInput): IState => {
    const { value } = input;
    this._nextStateIdByInput[value] = input;
    return this;
  };

  public addInputs = (inputs: IInput[]): IState => {
    inputs.forEach(this.addInput);
    return this;
  };

  public removeInput = (value: InputValue): IState => {
    delete this._nextStateIdByInput[value];
    return this;
  };

  public removeInputs = (values: InputValue[]): IState => {
    values.forEach(this.removeInput);
    return this;
  };

  public getInput = (value: InputValue): IInput =>
    this._nextStateIdByInput[value];
}
