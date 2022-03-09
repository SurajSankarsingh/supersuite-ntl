import { useIsSubmitting } from 'remix-validated-form';

export const SubmitBtn = () => {
  const isSubmitting = useIsSubmitting();

  return (
    <div className='mt-8'>
      <button
        type='submit'
        disabled={isSubmitting}
        className='w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600'
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </div>
  );
};
