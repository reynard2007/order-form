import React, { FC, useContext } from 'react';

import styles from './AddToCartButton.module.scss';
import Variant from 'types/Variant';
import ProductConfiguratorContext from '../../ProductConfiguratorContext';

type Props = {
  matchedVariant: Variant | null;
};

const AddToCartButton: FC<Props> = ({ matchedVariant }) => {
  const { product } = useContext(ProductConfiguratorContext);

  const disabled = !matchedVariant || !matchedVariant.available;

  const buttonLabel =
    matchedVariant && !matchedVariant.available
      ? 'Out of Stock'
      : 'Add to Cart';

  if (!product) {
    return null;
  }

  return (
    <button className={styles.button} disabled={disabled}>
      {buttonLabel}
    </button>
  );
};

export default AddToCartButton;
