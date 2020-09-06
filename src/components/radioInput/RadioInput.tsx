import React, { FC, useCallback } from 'react';
import { FieldProps } from 'formik';
import classnames from 'classnames';

import styles from './RadioInput.module.scss';

type Props = FieldProps<string> & {
  options: Array<string>;
  labelText: string;
};

const RadioInput: FC<Props> = ({ options, field, form, labelText }) => {
  const handleChange = useCallback(
    (val: string) => () => {
      form.setFieldValue(field.name, val);
    },
    [form, field.name]
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.groupLabel}>{labelText}</div>

      {options.map((opt) => (
        <div className={styles.radioRow} key={opt}>
          <input
            className={styles.hiddenInput}
            type="radio"
            id={`${field.name}_${opt}`}
            key={`${field.name}_${opt}`}
            checked={opt === field.value}
            onChange={handleChange(opt)}
          />

          <label
            className={styles.optionLabel}
            htmlFor={`${field.name}_${opt}`}
          >
            <div
              className={classnames(styles.customRadio, {
                [styles.active]: opt === field.value,
              })}
            />
            <div>{opt}</div>
          </label>
        </div>
      ))}
    </div>
  );
};

export default RadioInput;
