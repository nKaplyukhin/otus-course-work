import { ICategory } from "./category";

export enum EOperation {
  Cost = 'Cost',
  Profit = 'Profit',
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
