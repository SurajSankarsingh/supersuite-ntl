import AdminNewRoomAmenitiesForm from '~/components/admin/AdminNewRoomAmenitiesForm';

type Props = {};

export default function NewRoom({}: Props) {
  return (
    <section>
      <div className='py-10 md:py-16'>
        <div className='px-10 mx-auto max-w-7xl md:px-16'>
          <div className='max-w-3xl mx-auto mb-10 md:mb-16'>
            <p className='text-xs font-bold text-blue-500 uppercase'>
              Create A New Room
            </p>
          </div>
          <form className='grid max-w-3xl gap-4 mx-auto sm:grid-cols-2'>
            <div>
              <label
                htmlFor='room-name'
                className='inline-block mb-2 text-sm font-medium text-gray-500 sm:text-base'
              >
                Room name
              </label>
              <input
                name='room-name'
                className='w-full px-3 py-2 text-gray-800 transition duration-100 border rounded-md outline-none bg-gray-50 focus:ring ring-blue-300'
              />
            </div>

            <div>
              <label
                htmlFor='room-number'
                className='inline-block mb-2 text-sm font-medium text-gray-500 sm:text-base'
              >
                Room Number
              </label>
              <input
                name='room-number'
                type='number'
                className='w-full px-3 py-2 text-gray-800 transition duration-100 border rounded-md outline-none bg-gray-50 focus:ring ring-blue-300'
              />
            </div>

            <div>
              <label
                htmlFor='price-per-night'
                className='inline-block mb-2 text-sm font-medium text-gray-500 sm:text-base'
              >
                Price Per Night
              </label>
              <input
                name='price-per-night'
                type='number'
                className='w-full px-3 py-2 text-gray-800 transition duration-100 border rounded-md outline-none bg-gray-50 focus:ring ring-blue-300'
              />
            </div>

            <div>
              <label
                htmlFor='capacity'
                className='inline-block mb-2 text-sm font-medium text-gray-500 sm:text-base'
              >
                Capacity
              </label>
              <input
                name='capacity'
                type='number'
                className='w-full px-3 py-2 text-gray-800 transition duration-100 border rounded-md outline-none bg-gray-50 focus:ring ring-blue-300'
              />
            </div>

            <div className='sm:col-span-2'>
              <label
                htmlFor='description'
                className='inline-block mb-2 text-sm font-medium text-gray-500 sm:text-base'
              >
                Description
              </label>
              <textarea
                name='description'
                className='w-full h-64 px-3 py-2 text-gray-800 transition duration-100 border rounded-md outline-none bg-gray-50 focus:ring ring-blue-300'
              ></textarea>
            </div>

            <div>
              <label
                htmlFor='num-of-beds'
                className='inline-block mb-2 text-sm font-medium text-gray-500 sm:text-base'
              >
                Number of Beds
              </label>
              <input
                name='num-of-beds'
                type='number'
                className='w-full px-3 py-2 text-gray-800 transition duration-100 border rounded-md outline-none bg-gray-50 focus:ring ring-blue-300'
              />
            </div>

            <div>
              <label
                htmlFor='bed-category'
                className='inline-block mb-2 text-sm font-medium text-gray-500 sm:text-base'
              >
                Bed Category
              </label>
              <select
                name='bed-category'
                className='w-full px-3 py-2 text-gray-800 transition duration-100 border rounded-md outline-none bg-gray-50 focus:ring ring-blue-300'
              >
                <option value='King'>King</option>
                <option value='Queen'>Queen</option>
                <option value='Single'>Single</option>
                <option value='Double'>Double</option>
                <option value='Suite'>Suite</option>
              </select>
            </div>

            <div>
              <label
                htmlFor='num-of-bathrooms'
                className='inline-block mb-2 text-sm font-medium text-gray-500 sm:text-base'
              >
                Number of Bathrooms
              </label>
              <input
                name='num-of-bathrooms'
                type='number'
                className='w-full px-3 py-2 text-gray-800 transition duration-100 border rounded-md outline-none bg-gray-50 focus:ring ring-blue-300'
              />
            </div>

            <div className='form-control align-middle justify-center'>
              <label className='label cursor-pointer'>
                <span className='label-text'>Featured</span>
                <input type='checkbox' className='toggle toggle-accent' />
              </label>
            </div>

            <AdminNewRoomAmenitiesForm />

            <div className='flex items-center justify-end sm:col-span-2'>
              <button className='btn btn-outline btn-accent'>
                Create Room
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
