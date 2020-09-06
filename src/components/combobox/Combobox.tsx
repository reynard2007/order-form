import React, { FC, useCallback } from 'react';
import Select, { ValueType } from 'react-select';
import { Option } from 'react-select/src/filters';
import { FieldProps } from 'formik';

import styles from './Combobox.module.scss';

type Props = FieldProps<string> & {
  options: Array<Option>;
  labelText: string;
};

const Combobox: FC<Props> = ({ options, field, form, labelText }) => {
  const handleChange = useCallback(
    (selectedOption: ValueType<Option>) => {
      if (selectedOption) {
        /**
         * The library's type declaration expects an array of options to be passed here
         * Our usage however only allows for one so no need to handle that
         */
        // @ts-ignore
        form.setFieldValue(field.name, selectedOption.value);
      }
    },
    [form, field.name]
  );

  const isOptionDisabled = useCallback((opt: Option) => opt.data?.disabled, []);

  const isOptionSelected = useCallback(
    (opt: Option) => opt.value === field.value,
    [field.value]
  );

  // For styling the Select component, enable `defaultMenuIsOpen` to prevent the combobox from collapsing
  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor={field.name}>
        {labelText}
      </label>

      <Select
        name={field.name}
        id={field.name}
        classNamePrefix="combobox"
        options={options}
        onChange={handleChange}
        isOptionDisabled={isOptionDisabled}
        isOptionSelected={isOptionSelected}
      />
    </div>
  );
};

export default Combobox;
