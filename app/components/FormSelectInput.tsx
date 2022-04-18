type FormSelectInputProps = {
  label: string;
  name: string;
  required?: boolean;
  title?: string;
  values: string[];
  defaultValue?: string;
  ariaInvalid?: boolean;
  ariaErrormessage?: string;
  errorData?: string;
};

export default function FormSelectInput({
  label,
  name,
  required,
  title,
  values,
  defaultValue,
  ariaInvalid,
  ariaErrormessage,
  errorData,
}: FormSelectInputProps) {
  return (
    <div>
      <label
        className='block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200'
        htmlFor={name}
      >
        {label}:
        <select
          id={name}
          defaultValue={defaultValue}
          name={name}
          required={required}
          title={title}
          aria-invalid={ariaInvalid}
          aria-errormessage={ariaErrormessage}
          className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300'
        >
          <option value='' disabled>
            ---Select an option---
          </option>
          {values.map((value, i) => (
            <option value={value} key={i}>
              {value}
            </option>
          ))}
        </select>
      </label>
      {errorData ? (
        <p className='text-xs text-red-600 mt-2' role='alert' id='name-error'>
          {errorData}
        </p>
      ) : null}
    </div>
  );
}
