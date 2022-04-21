type FormSelectInputProps = {
  label: string;
  name: string;
  required?: boolean;
  title?: string;
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
  defaultValue,
  ariaInvalid,
  ariaErrormessage,
  errorData,
}: FormSelectInputProps) {
  return (
    <div>
      <label
        className='block mb-2 text-sm font-medium text-slate-700 dark:text-slate-200'
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
          className='select select-bordered w-full bg-slate-200 dark:bg-slate-800'
        >
          <option value='off'>No</option>
          <option value='on'>Yes</option>
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
