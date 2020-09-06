import React, { useContext, FC, useMemo } from 'react';

import styles from './ProductTitle.module.scss';
import ProductConfiguratorContext from '../../ProductConfiguratorContext';
import Variant from 'types/Variant';

type Props = {
  matchedVariant: Variant | null;
};

const ProductTitle: FC<Props> = ({ matchedVariant }) => {
  const { product } = useContext(ProductConfiguratorContext);

  const variantSuffix = useMemo(
    () => (matchedVariant ? ` - ${matchedVariant.title}` : ''),
    [matchedVariant]
  );

  if (!product) {
    return null;
  }

  return (
    <div className={styles.title}>
      {product.title}
      {variantSuffix}
    </div>
  );
};

export default ProductTitle;
