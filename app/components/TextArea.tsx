import { useField } from 'remix-validated-form';
import type { TextAreaProps } from '~/components/types';

export const TextArea = ({
  name,
  label,
  required,
  rows,
  title,
}: TextAreaProps) => {
  const { error, getInputProps } = useField(name);

  return (
    <div className='mt-4'>
      <label
        className='block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200'
        htmlFor={name}
      >
        {label}
      </label>
      <textarea
        {...getInputProps({ id: name, required, rows, title })}
        className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300'
      />
      {error && (
        <p className='text-xs text-red-600 mt-2' role='alert'>
          {error}
        </p>
      )}
    </div>
  );
};
