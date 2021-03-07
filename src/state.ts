import { IInput } from './input';

export interface IState {
  id: string;
  nextStateId: string;
  nextStateIdByInput: Record<number | string, IInput>;
  allInputs: IInput[];
  addInput: (input: IInput) => IState;
  addInputs: (inputs: IInput[]) => IState;
  removeInput: (value: number | string) => IState;
  removeInputs: (values: (number | string)[]) => IState;
}

export class State implements IState {
  private _id: string;

  private _nextStateId: string;

  private _nextStateIdByInput: Record<number | string, IInput>;

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

  get nextStateIdByInput(): Record<number | string, IInput> {
    return this._nextStateIdByInput;
  }

  get allInputs(): IInput[] {
    return Object.values(this._nextStateIdByInput);
  }

  public addInput = (input: IInput): IState => {
    const { value } = input;
    this.nextStateIdByInput[value] = input;
    return this;
  };

  public addInputs = (inputs: IInput[]): IState => {
    inputs.forEach(this.addInput);
    return this;
  };

  public removeInput = (value: number | string): IState => {
    delete this.nextStateIdByInput[value];
    return this;
  };

  public removeInputs = (values: (number | string)[]): IState => {
    values.forEach(this.removeInput);
    return this;
  };
}
