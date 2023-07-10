export interface CabinForm {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image?: any;
}

export interface Cabin extends CabinForm {
  created_at?: string;
  id?: number;
}

export interface IApiError {
  message: string;
  description: string;
  statusCode: string | number;
}

export interface FormRowProps {
  label?: string;
  error?: string;
  disabled?: boolean;
  children: any;
}
