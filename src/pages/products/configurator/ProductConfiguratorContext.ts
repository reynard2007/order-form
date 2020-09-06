import { createContext } from 'react';
import Product from 'types/Product';

interface ProductConfiguratorContextValue {
  product: Product | null;
}

const ProductConfiguratorContext = createContext<
  ProductConfiguratorContextValue
>({
  product: null,
});

export default ProductConfiguratorContext;
