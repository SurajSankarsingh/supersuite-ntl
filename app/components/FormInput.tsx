type FormInputProps = {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  title?: string;
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: string;
  ariaInvalid?: boolean;
  ariaErrormessage?: string;
  errorData?: string;
};

export default function FormInput({
  label,
  name,
  type,
  required,
  title,
  min,
  max,
  step,
  defaultValue,
  ariaInvalid,
  ariaErrormessage,
  errorData,
}: FormInputProps) {
  return (
    <div>
      <label
        className='block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200'
        htmlFor={name}
      >
        {label}:
        <input
          id={name}
          type={type}
          defaultValue={defaultValue}
          name={name}
          required={required}
          title={title}
          min={min}
          max={max}
          step={step}
          aria-invalid={ariaInvalid}
          aria-errormessage={ariaErrormessage}
          className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300'
        />
      </label>
      {errorData ? (
        <p className='text-xs text-red-600 mt-2' role='alert' id='name-error'>
          {errorData}
        </p>
      ) : null}
    </div>
  );
}
