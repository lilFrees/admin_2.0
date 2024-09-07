export interface IBrand {
  brand_id: number;
  brand_name: string;
  total_products: number;
}

export interface IBrandWithCount {
  brands: IBrand[];
  count: number;
}
