export enum ESortingType {
  ASC = "ASC",
  DESC = "DESC",
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