type FormCheckBoxInputProps = {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string;
  ariaInvalid?: boolean;
  ariaErrormessage?: string;
  errorData?: string;
};

export default function FormCheckBoxInput({
  label,
  name,
  type,
  defaultValue,
  ariaInvalid,
  ariaErrormessage,
  errorData,
}: FormCheckBoxInputProps) {
  return (
    <div className='form-control align-middle justify-center'>
      <label className='label cursor-pointer ' htmlFor={name}>
        <span className='label-text text-slate-900 dark:text-slate-100'>
          {label}:
        </span>
        <input
          id={name}
          type={type}
          value='1'
          defaultValue={defaultValue}
          name={name}
          aria-invalid={ariaInvalid}
          aria-errormessage={ariaErrormessage}
          className='toggle toggle-accent'
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
