// CustomTextField.tsx
import React from 'react';
import { Field } from 'react-final-form';

type CustomTextFieldProps = {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
};

export const CustomField: React.FC<CustomTextFieldProps> = ({
  name,
  label,
  placeholder,
  type = 'text',
  required = false,
}) => {
  return (
    <Field name={name}>
      {({ input, meta }) => (
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor={name} style={{ display: 'block', fontWeight: 'bold' }}>
            {label}
            {required && <span style={{ color: 'red' }}> *</span>}
          </label>
          <input
            {...input}
            id={name}
            placeholder={placeholder}
            type={type}
            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: 4 }}
          />
          {meta.touched && meta.error && (
            <span style={{ color: 'red', fontSize: '0.8rem' }}>{meta.error}</span>
          )}
        </div>
      )}
    </Field>
  );
};
