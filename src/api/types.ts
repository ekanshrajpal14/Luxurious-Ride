export interface BackendError {
  success: false;
  message: string;
  errName: string;
  statusCode: number;
  errors: any[];
}


export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
  statusCode: number;
};