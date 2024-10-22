export interface ApiErrorItem {
  message: string;
  field: string;
}

export class ApiError extends Error {
  constructor(message: string, public status: string, public errors: ApiErrorItem[]) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
}