export interface BackendError {
  success: false;
  message: string;
  errName: string;
  statusCode: number;
  errors: any[];
}
