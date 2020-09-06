import React, { FC, useContext, useMemo } from 'react';
import { FormikProps } from 'formik';

import ProductConfiguratorContext from '../ProductConfiguratorContext';
import { getMatchedVariantWithSizeAndColor } from '../helpers';
import { ProductConfiguratorFormValue } from '../types';

import ProductImage from './productImage/ProductImage';
import ProductTitle from './productTitle/ProductTitle';
import OrderForm from './OrderForm';
import styles from './Configurator.module.scss';

// Formik uses the render pattern and injects additional helper methods to this component
type InjectedProps = FormikProps<Partial<ProductConfiguratorFormValue>>;

type OwnProps = {};

type Props = InjectedProps & OwnProps;

const Configurator: FC<Props> = ({ values }) => {
  const { product } = useContext(ProductConfiguratorContext);

  const matchedVariant = useMemo(
    () =>
      product
        ? getMatchedVariantWithSizeAndColor(product, values.colour, values.size)
        : null,
    [product, values.colour, values.size]
  );

  if (!product) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.imageSection}>
        <ProductImage matchedVariant={matchedVariant} />
      </div>

      <div className={styles.configSection}>
        <ProductTitle matchedVariant={matchedVariant} />

        <OrderForm matchedVariant={matchedVariant} />
      </div>
    </div>
  );
};

export default Configurator as FC<OwnProps>;
