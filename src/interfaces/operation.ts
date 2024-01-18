export enum EOperation {
  Cost,
  Profit,
}

export interface ICategory {
  id: string,
  name: string
  photo?: string
}

export interface IOperation {
  id: string;
  createdAt: string;
  name: string;
  desc?: string;
  price: number;
  category: ICategory
  type: EOperation
};

export interface IOperationShort extends Omit<IOperation, "createdAt"> { }