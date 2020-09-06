import React, { useMemo } from 'react';
import { Formik } from 'formik';

import mockProduct from 'mockData/product.json';

import styles from './ProductConfiguratorPage.module.scss';
import Configurator from './configurator/Configurator';
import { mapMockPayloadToProduct } from './helpers';
import ProductConfiguratorContext from './ProductConfiguratorContext';
import { ProductConfiguratorFormValue } from './types';

const noop = () => {};

const ProductConfiguratorPage = () => {
  const product = useMemo(() => mapMockPayloadToProduct(mockProduct), []);

  return (
    <ProductConfiguratorContext.Provider
      value={{
        product,
      }}
    >
      <div className={styles.wrapper}>
        <Formik<Partial<ProductConfiguratorFormValue>>
          initialValues={{
            quantity: 1,
          }}
          onSubmit={noop}
          component={Configurator}
        />
      </div>
    </ProductConfiguratorContext.Provider>
  );
};

export default ProductConfiguratorPage;
