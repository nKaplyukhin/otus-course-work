
export interface ValidationErrors {
  errors: Array<{ message: string }>;
}

export interface ValidationErrorsResponse {
  data: {
    errors: Array<{ message: string }>;
  }
  status: number;
}
