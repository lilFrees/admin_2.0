export interface ICategory {
  category_id: number;
  created_at: Date;
  category_name: string;
  category_description: string;
  category_slug: string;
  total_products: number;
}

export interface ICategoryWithCount {
  categories: ICategory[];
  count: number;
}
