import React, { useContext, FC } from 'react';

import styles from './ProductImage.module.scss';
import ProductConfiguratorContext from '../../ProductConfiguratorContext';
import Variant from 'types/Variant';

type Props = {
  matchedVariant: Variant | null;
};

const ProductImage: FC<Props> = ({ matchedVariant }) => {
  const { product } = useContext(ProductConfiguratorContext);

  if (!product) {
    return null;
  }

  return (
    <img
      className={styles.image}
      src={
        matchedVariant
          ? matchedVariant.featuredImageUrl
          : product.featuredImageUrl
      }
      alt={product.title}
    />
  );
};

export default ProductImage;
