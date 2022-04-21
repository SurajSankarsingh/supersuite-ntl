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
        className='block mb-2 text-sm font-medium text-slate-700 dark:text-slate-200'
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
          className='input input-bordered w-full bg-slate-200 dark:bg-slate-800'
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
