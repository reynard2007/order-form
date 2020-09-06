import React, { FC, useCallback, ChangeEvent } from 'react';
import { FieldProps } from 'formik';
import { isNumber } from 'util';

import styles from './QuantityInput.module.scss';

type Props = FieldProps<number> & {
  min?: number;
  max?: number;
  disabled?: boolean;
  labelText: string;
};

const QuantityInput: FC<Props> = ({
  field,
  form,
  labelText,
  disabled = false,
  min = 1,
  max = 1000,
}) => {
  const reduceQuantity = useCallback(() => {
    if (field.value > min) {
      form.setFieldValue(field.name, field.value - 1);
    }
  }, [field.value, field.name, min, form]);

  const increaseQuantity = useCallback(() => {
    if (field.value || field.value === 0) {
      form.setFieldValue(field.name, field.value + 1);
    }
  }, [field.value, field.name, form]);

  const constrainValue = useCallback(
    (val: number) => Math.max(min, Math.min(val, max)),
    [min, max]
  );

  const parseValue = useCallback(
    (val: unknown) => {
      const numberValue = Number(val);

      if (isNaN(numberValue)) {
        return field.value;
      }

      if (isNumber(numberValue)) {
        return constrainValue(numberValue);
      }

      return min;
    },
    [field.value, constrainValue, min]
  );

  const handleChange = useCallback(
    (ev: ChangeEvent<HTMLInputElement>) => {
      form.setFieldValue(field.name, ev.target.value);
    },
    [field.name, form]
  );

  const handleBlur = useCallback(
    (ev: ChangeEvent<HTMLInputElement>) => {
      const newValue = parseValue(ev.target.value);

      form.setFieldValue(field.name, Math.ceil(newValue));
    },
    [field.name, form, parseValue]
  );

  const fieldId = `FORM_${field.name}`;

  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor={fieldId}>
        {labelText}
      </label>

      <div className={styles.inputGroup}>
        <button
          className={styles.action}
          onClick={reduceQuantity}
          type="button"
          disabled={disabled}
        >
          -
        </button>

        <input
          className={styles.numberField}
          name={field.name}
          id={fieldId}
          type="number"
          value={field.value}
          min={min}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={disabled}
          formNoValidate
        />

        <button
          className={styles.action}
          onClick={increaseQuantity}
          type="button"
          disabled={disabled}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default QuantityInput;
