
export interface ReturnValue {
  message?: string;
  data?: any | Record<any, any>;
}

export interface ApiResponse extends ReturnValue {
  code?: number;
}
