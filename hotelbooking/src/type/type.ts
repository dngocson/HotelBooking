export interface CabinForm {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
}

export interface Cabin extends CabinForm {
  created_at?: string;
  id: number;
  image?: string;
}

export interface IApiError {
  message: string;
  description: string;
  statusCode: string | number;
}

export interface ButtonProps {
  variation?: "primary" | "secondary" | "danger";
  size?: "small" | "medium" | "large";
}
