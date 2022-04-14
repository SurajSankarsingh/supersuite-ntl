import { useField } from 'remix-validated-form';
import type { InputProps } from '~/components/types';

export const CheckboxInput = ({ name, label, type }: InputProps) => {
  const { error, getInputProps } = useField(name);

  return (
    <div className='form-control align-middle justify-center'>
      <label className='label cursor-pointer ' htmlFor={name}>
        <span className='label-text text-slate-900 dark:text-slate-100'>
          {label}
        </span>
        <input
          {...getInputProps({
            id: name,
            type,
          })}
          className='toggle toggle-accent'
        />
      </label>
      {error && (
        <p className='text-xs text-red-600 mt-2' role='alert'>
          {error}
        </p>
      )}
    </div>
  );
};
