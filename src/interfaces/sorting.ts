export enum ESortingType {
  ASC = "По возрастанию",
  DESC = "По убыванию",
}

export enum ESortingField {
  id = "id",
  createdAt = "Дата создания",
  updatedAt = "Дата обновления",
  name = "Имя",
  date = "Дата"
}

export interface ISorting {
  type: ESortingType;
  field: ESortingField;
}