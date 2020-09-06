import React, { useContext, FC } from 'react';

import styles from './Price.module.scss';
import Variant from 'types/Variant';
import ProductConfiguratorContext from '../../ProductConfiguratorContext';
import { useFormikContext } from 'formik';
import { ProductConfiguratorFormValue } from '../../types';

type Props = {
  matchedVariant: Variant | null;
};

const multiplyWithCurrency = (quantity: number, price: number) =>
  Math.round(Math.ceil(quantity) * price * 100) / 100;

const Price: FC<Props> = ({ matchedVariant }) => {
  const { product } = useContext(ProductConfiguratorContext);

  const { values } = useFormikContext<ProductConfiguratorFormValue>();

  const priceRange = `${product?.minPrice} - ${product?.maxPrice} each`;

  const totalPrice = multiplyWithCurrency(
    values.quantity,
    matchedVariant?.price ?? 0
  );

  if (!product) {
    return null;
  }

  return (
    <div>
      <div className={styles.label}>Price</div>

      <div className={styles.price}>
        &#3647; {matchedVariant ? totalPrice : priceRange}
      </div>
    </div>
  );
};

export default Price;
