import type { ActionFunction, UploadHandler } from '@remix-run/node';
import {
  json,
  unstable_parseMultipartFormData,
  redirect,
} from '@remix-run/node';
import { uploadImage } from '~/utils/upload.server';
import { Form, useActionData, useTransition } from '@remix-run/react';
import FormInput from '~/components/FormInput';
import FormTextArea from '~/components/FormTextArea';
import FormSelectInput from '~/components/FormSelectInput';
import { validateNumOfBaths } from '../../../components/formValidation';
import {
  validateRoomName,
  validateRoomNumber,
  validatePricePerNight,
  validateRoomCapacity,
  validateRoomDescription,
  validateNumOfBeds,
  validateBedCategory,
} from '~/components/formValidation';
import { createRoom } from '~/utils/mutations.server';
import { getUser } from '~/utils/session.server';

type ActionData = {
  formError?: string;
  fieldErrors?: {
    room_name: string | undefined;
    room_number: string | undefined;
    price_per_night: string | undefined;
    room_capacity: string | undefined;
    description: string | undefined;
    num_of_beds: string | undefined;
    bed_category: string | undefined;
    num_of_bathrooms: string | undefined;
  };
  fields?: {
    room_name: string;
    room_number: string;
    price_per_night: string;
    room_capacity: string;
    description: string;
    num_of_beds: string;
    bed_category: string;
    num_of_bathrooms: string;
    featured: string;
    wifi: string;
    kitchenette: string;
    cleaning: string;
    air_conditioning: string;
    pets: string;
    tv: string;
    breakfast: string;
    entertainment: string;
    refrigerator: string;
    safe: string;
    clothing_care: string;
    swimming_pool: string;
  };
};

const badRequest = (data: ActionData) => json(data, { status: 400 });

function toBool(value: string): boolean {
  if (value === 'on') {
    return true;
  } else {
    return false;
  }
}

export const action: ActionFunction = async ({ request }) => {
  const uploadHandler: UploadHandler = async ({ name, stream }) => {
    if (name !== 'img') {
      stream.resume();
      return;
    }
    const uploadedImage: any = await uploadImage(stream);
    return uploadedImage.secure_url;
  };

  const formData = await unstable_parseMultipartFormData(
    request,
    uploadHandler
  );

  const user = await getUser(request);

  const room_name = formData.get('room_name');
  const room_number = formData.get('room_number');
  const price_per_night = formData.get('price_per_night');
  const room_capacity = formData.get('room_capacity');
  const description = formData.get('description');
  const num_of_beds = formData.get('num_of_beds');
  const bed_category = formData.get('bed_category');
  const num_of_bathrooms = formData.get('num_of_bathrooms');
  const featured = formData.get('featured');
  const wifi = formData.get('wifi');
  const kitchenette = formData.get('kitchenette');
  const cleaning = formData.get('cleaning');
  const air_conditioning = formData.get('air_conditioning');
  const pets = formData.get('pets');
  const tv = formData.get('tv');
  const breakfast = formData.get('breakfast');
  const entertainment = formData.get('entertainment');
  const refrigerator = formData.get('refrigerator');
  const safe = formData.get('safe');
  const clothing_care = formData.get('clothing_care');
  const swimming_pool = formData.get('swimming_pool');
  const imgSrc = formData.getAll('img');
  if (!imgSrc) {
    return json({
      error: 'something went wrong',
    });
  }

  if (
    typeof room_name !== 'string' ||
    typeof room_number !== 'string' ||
    typeof price_per_night !== 'string' ||
    typeof room_capacity !== 'string' ||
    typeof description !== 'string' ||
    typeof num_of_beds !== 'string' ||
    typeof bed_category !== 'string' ||
    typeof num_of_bathrooms !== 'string' ||
    typeof featured !== 'string' ||
    typeof wifi !== 'string' ||
    typeof kitchenette !== 'string' ||
    typeof cleaning !== 'string' ||
    typeof air_conditioning !== 'string' ||
    typeof pets !== 'string' ||
    typeof tv !== 'string' ||
    typeof breakfast !== 'string' ||
    typeof entertainment !== 'string' ||
    typeof refrigerator !== 'string' ||
    typeof safe !== 'string' ||
    typeof clothing_care !== 'string' ||
    typeof swimming_pool !== 'string'
  ) {
    return badRequest({
      formError: `Oops! Something went wrong. Please try again.`,
    });
  }

  const fieldErrors = {
    room_name: validateRoomName(room_name),
    room_number: validateRoomNumber(room_number),
    price_per_night: validatePricePerNight(price_per_night),
    room_capacity: validateRoomCapacity(room_capacity),
    description: validateRoomDescription(description),
    num_of_beds: validateNumOfBeds(num_of_beds),
    bed_category: validateBedCategory(bed_category),
    num_of_bathrooms: validateNumOfBaths(num_of_bathrooms),
  };

  const fields = {
    room_name,
    room_number,
    price_per_night,
    room_capacity,
    description,
    num_of_beds,
    bed_category,
    num_of_bathrooms,
    featured,
    wifi,
    kitchenette,
    cleaning,
    air_conditioning,
    pets,
    tv,
    breakfast,
    entertainment,
    refrigerator,
    safe,
    clothing_care,
    swimming_pool,
  };
  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({
      fieldErrors,
      fields,
    });
  }

  if (user && user.role === 'ADMIN') {
    const room = await createRoom({
      userId: user.id,
      name: room_name,
      room_num: parseInt(room_number),
      price_per_night: parseFloat(price_per_night),
      capacity: parseInt(room_capacity),
      description,
      beds: parseInt(num_of_beds),
      category: bed_category,
      bathrooms: parseInt(num_of_bathrooms),
      featured: toBool(featured),
      wifi: toBool(wifi),
      kitchenette: toBool(kitchenette),
      cleaning: toBool(cleaning),
      air_conditioning: toBool(air_conditioning),
      pets: toBool(pets),
      tv: toBool(tv),
      breakfast: toBool(breakfast),
      entertainment: toBool(entertainment),
      refrigerator: toBool(refrigerator),
      safe: toBool(safe),
      clothing_care: toBool(clothing_care),
      swimming_pool: toBool(swimming_pool),
      images: imgSrc.toString().split(','),
    });

    if (!room) {
      return badRequest({
        formError: `Oops! Something went wrong. Please try again.`,
      });
    }
    return redirect(`admin/rooms`);
  }
};

export default function NewRoom() {
  const actionData = useActionData<ActionData>();
  const transition = useTransition();

  return (
    <section>
      <div className='py-10 md:py-16'>
        <div className='px-10 mx-auto max-w-7xl md:px-16'>
          <div className='max-w-3xl mx-auto mb-10 md:mb-16'>
            <p className='text-xs font-bold text-blue-500 uppercase'>
              Create A New Room
            </p>
          </div>
          <Form
            className='grid max-w-3xl gap-4 mx-auto sm:grid-cols-2'
            method='post'
            encType='multipart/form-data'
          >
            <FormInput
              name='room_name'
              label='Room Name'
              required
              title='Please enter a Room Name'
              defaultValue={actionData?.fields?.room_name}
              aria-invalid={
                Boolean(actionData?.fieldErrors?.room_name) || undefined
              }
              aria-errormessage={
                actionData?.fieldErrors?.room_name ? 'name-error' : undefined
              }
              errorData={actionData?.fieldErrors?.room_name}
            />

            <FormInput
              name='room_number'
              label='Room Number'
              type='number'
              min={0}
              required
              title='Please enter a Room Number'
              defaultValue={actionData?.fields?.room_number}
              aria-invalid={
                Boolean(actionData?.fieldErrors?.room_number) || undefined
              }
              aria-errormessage={
                actionData?.fieldErrors?.room_number
                  ? 'number-error'
                  : undefined
              }
              errorData={actionData?.fieldErrors?.room_number}
            />

            <FormInput
              name='price_per_night'
              label='Price Per Night'
              type='number'
              min={0}
              step={0.01}
              required
              title='Please enter a Price Per Night'
              defaultValue={actionData?.fields?.price_per_night}
              aria-invalid={
                Boolean(actionData?.fieldErrors?.price_per_night) || undefined
              }
              aria-errormessage={
                actionData?.fieldErrors?.price_per_night
                  ? 'price-error'
                  : undefined
              }
              errorData={actionData?.fieldErrors?.price_per_night}
            />

            <FormInput
              name='room_capacity'
              label='Room Capcity'
              type='number'
              min={0}
              required
              title='Please enter the Room Capacity'
              defaultValue={actionData?.fields?.room_capacity}
              aria-invalid={
                Boolean(actionData?.fieldErrors?.room_capacity) || undefined
              }
              aria-errormessage={
                actionData?.fieldErrors?.room_capacity
                  ? 'capacity-error'
                  : undefined
              }
              errorData={actionData?.fieldErrors?.room_capacity}
            />

            <div className='sm:col-span-2'>
              <FormTextArea
                name='description'
                label='Description'
                rows={5}
                required
                title='Please enter a Room Description'
                defaultValue={actionData?.fields?.description}
                aria-invalid={
                  Boolean(actionData?.fieldErrors?.description) || undefined
                }
                aria-errormessage={
                  actionData?.fieldErrors?.description
                    ? 'description-error'
                    : undefined
                }
                errorData={actionData?.fieldErrors?.description}
              />
            </div>

            <FormInput
              name='num_of_beds'
              label='Number of Beds'
              type='number'
              min={0}
              required
              title='Please enter the Number of Beds'
              defaultValue={actionData?.fields?.num_of_beds}
              aria-invalid={
                Boolean(actionData?.fieldErrors?.num_of_beds) || undefined
              }
              aria-errormessage={
                actionData?.fieldErrors?.num_of_beds ? 'beds-error' : undefined
              }
              errorData={actionData?.fieldErrors?.num_of_beds}
            />

            <FormInput
              name='bed_category'
              label='Bed Category'
              required
              title='Bed Category should King, Queen, Single, Double etc'
              defaultValue={actionData?.fields?.room_name}
              aria-invalid={
                Boolean(actionData?.fieldErrors?.room_name) || undefined
              }
              aria-errormessage={
                actionData?.fieldErrors?.room_name ? 'name-error' : undefined
              }
              errorData={actionData?.fieldErrors?.room_name}
            />

            <FormInput
              name='num_of_bathrooms'
              label='Number of Bathrooms'
              type='number'
              min={0}
              required
              title='Please enter the Number of Bathrooms'
              defaultValue={actionData?.fields?.num_of_bathrooms}
              aria-invalid={
                Boolean(actionData?.fieldErrors?.num_of_bathrooms) || undefined
              }
              aria-errormessage={
                actionData?.fieldErrors?.num_of_bathrooms
                  ? 'bathrooms-error'
                  : undefined
              }
              errorData={actionData?.fieldErrors?.num_of_bathrooms}
            />

            <FormSelectInput name='featured' label='Featured' />

            <div className='flex flex-col'>
              <FormSelectInput name='wifi' label='WiFi' />
              <FormSelectInput name='kitchenette' label='Kitchenette' />
              <FormSelectInput name='cleaning' label='Cleaning' />
              <FormSelectInput
                name='air_conditioning'
                label='Air Conditioning'
              />
              <FormSelectInput name='pets' label='Pets' />
              <FormSelectInput name='tv' label='TV' />
              <FormSelectInput name='breakfast' label='Breakfast' />
              <FormSelectInput name='entertainment' label='Entertainment' />
              <FormSelectInput name='refrigerator' label='Refrigerator' />
              <FormSelectInput name='safe' label='Safe' />
              <FormSelectInput name='clothing_care' label='Clothing Care' />
              <FormSelectInput name='swimming_pool' label='Swimming Pool' />
            </div>
            <div className='max-w-xl'>
              <label htmlFor='uploadBtn' className='btn btn-outline btn-accent'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-5 h-5 mx-1'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
                  />
                </svg>
                <span className='mx-1'>Upload Images</span>
              </label>
              <input
                type='file'
                name='img'
                accept='image/*'
                multiple
                id='uploadBtn'
                hidden
              />
            </div>

            <button
              type='submit'
              className='btn btn-outline btn-accent'
              disabled={transition.state === 'submitting'}
            >
              {transition.state === 'submitting'
                ? 'Creating Room...'
                : 'Create Room'}
            </button>
          </Form>
        </div>
      </div>
    </section>
  );
}
