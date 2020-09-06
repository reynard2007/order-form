import Variant from './Variant';

export default interface Product {
  available: boolean;
  content: string;
  description: string;
  mediaUrls: Array<string>;
  featuredImageUrl: string;
  options: Array<string>;
  title: string;
  variants: Array<Variant>;
  minPrice: number;
  maxPrice: number;
}
