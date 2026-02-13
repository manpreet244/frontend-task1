// custom error class for API errors
export class ApiError extends Error {
  code: string;
  status: number;

  constructor(message: string, code: string = 'UNKNOWN', status: number = 500) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.status = status;
  }

  
  isRetryable() {
    return this.status >= 500 || this.status === 408 || this.status === 429;
  }
}
