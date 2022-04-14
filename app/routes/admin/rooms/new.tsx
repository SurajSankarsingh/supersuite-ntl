import { ValidatedForm } from 'remix-validated-form';
import { z } from 'zod';
import { withZod } from '@remix-validated-form/with-zod';
import { Input } from '~/components/Input';
import { TextArea } from '~/components/TextArea';
import { SelectInput } from '~/components/SelectInput';
import { CheckboxInput } from '~/components/CheckboxInput';
import { SubmitBtn } from '~/components/Submit';

export const validateNewRoom = withZod(
  z.object({
    room_name: z
      .string()
      .nonempty('Room name is required')
      .max(50, 'Room name is too long'),
    room_number: z.string().nonempty('Room number is required'),
    price_per_night: z.string().nonempty('Price per night is required'),
    room_capacity: z.string().nonempty('Room capacity is required'),
    description: z
      .string()
      .nonempty('Description is required')
      .min(10, 'Description must be at least 10 characters')
      .max(500, 'Description must be at most 500 characters'),
    num_of_beds: z.string().nonempty('Number of beds is required'),
    num_of_bathrooms: z.string().nonempty('Number of bathrooms is required'),
  })
);

export default function NewRoom() {
  return (
    <section>
      <div className='py-10 md:py-16'>
        <div className='px-10 mx-auto max-w-7xl md:px-16'>
          <div className='max-w-3xl mx-auto mb-10 md:mb-16'>
            <p className='text-xs font-bold text-blue-500 uppercase'>
              Create A New Room
            </p>
          </div>
          <ValidatedForm
            validator={validateNewRoom}
            className='grid max-w-3xl gap-4 mx-auto sm:grid-cols-2'
            method='post'
          >
            <Input
              name='room_name'
              label='Room Name'
              required
              title='Please enter a Room Name'
            />

            <Input
              name='room_number'
              label='Room Number'
              type='number'
              min={0}
              required
              title='Please enter a Room Number'
            />

            <Input
              name='price_per_night'
              label='Price Per Night'
              type='number'
              min={0}
              step={0.01}
              required
              title='Please enter a Price Per Night'
            />

            <Input
              name='room_capacity'
              label='Room Capcity'
              type='number'
              min={0}
              required
              title='Please enter the Room Capacity'
            />

            <div className='sm:col-span-2'>
              <TextArea
                name='description'
                label='Description'
                rows={5}
                required
                title='Please enter a Room Description'
              />
            </div>

            <Input
              name='num_of_beds'
              label='Number of Beds'
              type='number'
              min={0}
              required
              title='Please enter the Number of Beds'
            />

            <SelectInput
              name='bed_category'
              label='Bed Category'
              values={['King', 'Queen', 'Single', 'Double', 'Suite']}
              title='Please select a bed category'
            />

            <Input
              name='num_of_bathrooms'
              label='Number of Bathrooms'
              type='number'
              min={0}
              required
              title='Please enter the Number of Bathrooms'
            />

            <CheckboxInput name='featured' label='Featured' type='checkbox' />

            <div className='flex flex-col'>
              <CheckboxInput name='wifi' label='WiFi' type='checkbox' />
              <CheckboxInput
                name='kitchenette'
                label='Kitchenette'
                type='checkbox'
              />
              <CheckboxInput name='cleaning' label='Cleaning' type='checkbox' />
              <CheckboxInput
                name='air_conditioning'
                label='Air Conditioning'
                type='checkbox'
              />
              <CheckboxInput name='pets' label='Pets' type='checkbox' />
              <CheckboxInput name='tv' label='TV' type='checkbox' />
              <CheckboxInput
                name='breakfast'
                label='Breakfast'
                type='checkbox'
              />
              <CheckboxInput
                name='entertainment'
                label='Entertainment'
                type='checkbox'
              />
              <CheckboxInput
                name='refrigerator'
                label='Refrigerator'
                type='checkbox'
              />
              <CheckboxInput name='safe' label='Safe' type='checkbox' />
              <CheckboxInput
                name='clothing_care'
                label='Clothing Care'
                type='checkbox'
              />
              <CheckboxInput
                name='swimming_pool'
                label='Swimming Pool'
                type='checkbox'
              />
            </div>

            <div className='flex items-center justify-end sm:col-span-2'>
              <SubmitBtn name='Create Room' />
            </div>
          </ValidatedForm>
        </div>
      </div>
    </section>
  );
}
