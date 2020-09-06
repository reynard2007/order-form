import React, { useMemo, useContext, FC } from 'react';
import { Form, Field, useFormikContext } from 'formik';

import Combobox from 'components/combobox/Combobox';

import ProductConfiguratorContext from '../ProductConfiguratorContext';
import { getProductSizes, getProductColours } from '../helpers';
import { ProductConfiguratorFormValue } from '../types';

import RadioInput from 'components/radioInput/RadioInput';
import QuantityInput from 'components/quantityInput/QuantityInput';
import AddToCartButton from './addToCartButton/AddToCartButton';
import Variant from 'types/Variant';
import Price from './price/Price';

type Props = {
  matchedVariant: Variant | null;
};

const OrderForm: FC<Props> = ({ matchedVariant }) => {
  const { product } = useContext(ProductConfiguratorContext);

  const { values } = useFormikContext<ProductConfiguratorFormValue>();

  const sizeOptions = useMemo(
    () => (product ? getProductSizes(product, values.colour) : null),
    [product, values.colour]
  );

  const colourOptions = useMemo(
    () => (product ? getProductColours(product, values.size) : null),
    [product, values.size]
  );

  const quantityFieldDisabled = matchedVariant && !matchedVariant.available;

  // For some reason, the type declaration for formik's Form requires the `unknown` property `translate`
  return (
    <Form translate={null}>
      <Field
        name="colour"
        component={Combobox}
        labelText="Colour"
        options={colourOptions}
      />
      <Field
        name="size"
        labelText="Size"
        component={RadioInput}
        options={sizeOptions}
      />
      <Field
        name="quantity"
        labelText="Quantity"
        component={QuantityInput}
        disabled={quantityFieldDisabled}
      />

      <Price matchedVariant={matchedVariant} />

      <AddToCartButton matchedVariant={matchedVariant} />
    </Form>
  );
};

export default OrderForm;
