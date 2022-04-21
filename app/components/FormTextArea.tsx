type FormTextAreaProps = {
  label: string;
  name: string;
  required?: boolean;
  title?: string;
  rows?: number;
  actionData?: any;
  defaultValue?: string;
  ariaInvalid?: boolean;
  ariaErrormessage?: string;
  errorData?: string;
};

export default function FormTextArea({
  label,
  name,
  required,
  title,
  rows,
  defaultValue,
  ariaInvalid,
  ariaErrormessage,
  errorData,
}: FormTextAreaProps) {
  return (
    <div>
      <label
        className='block mb-2 text-sm font-medium text-slate-700 dark:text-slate-200'
        htmlFor={name}
      >
        {label}:
        <textarea
          id={name}
          defaultValue={defaultValue}
          name={name}
          required={required}
          title={title}
          rows={rows}
          aria-invalid={ariaInvalid}
          aria-errormessage={ariaErrormessage}
          className='textarea textarea-bordered w-full bg-slate-200 dark:bg-slate-800'
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
