import Size from './Size';

export default interface Variant {
  available: boolean;
  size: Size;
  colour: string;
  price: number;
  title: string;
  featuredImageUrl: string;
}
