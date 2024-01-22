export enum EOperation {
  Cost,
  Profit,
}

export interface ICategory {
  id: string;
  name: string;
  photo?: string;
}

export interface IOperation {
  id: string;
  createdAt: string;
  name: string;
  desc?: string;
  amount: number;
  category: ICategory;
  type: EOperation;
}
