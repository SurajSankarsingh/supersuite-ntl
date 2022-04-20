import type { ActionFunction, UploadHandler } from '@remix-run/node';
import { json, unstable_parseMultipartFormData } from '@remix-run/node';
import { Form, useActionData } from '@remix-run/react';

import { uploadImage } from '~/utils/upload.server';

type ActionData = {
  errorMsg?: string;
  imgSrc?: string[];
};

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

  const imgSrc = formData.getAll('img');
  if (!imgSrc) {
    return json({
      error: 'something wrong',
    });
  }

  const images = imgSrc.toString().split(',');

  console.log(images);

  return json({
    imgSrc,
  });
};

export default function Index() {
  const data = useActionData<ActionData>();

  return (
    <>
      <Form method='post' encType='multipart/form-data'>
        <div className='max-w-xl'>
          <h2 className='text-sm mb-2'>Upload Images</h2>
          {/* <label className='flex justify-center w-full h-32 px-4 transition bg-slate-900 border-2 border-slate-600 border-dashed rounded-md appearance-none cursor-pointer hover:border-slate-200 focus:outline-none'>
            <span className='flex items-center space-x-2'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='w-6 h-6 text-cyan-600'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                stroke-width='2'
              >
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
                />
              </svg>
              <span className='font-medium text-slate-600'>
                Drop images to attach, or
                <span className='text-cyan-600 underline ml-2'>browse</span>
              </span>
            </span> */}
          <input type='file' name='img' accept='image/*' multiple />
          {/* </label> */}
          <button type='submit'>upload to cloudinary</button>
        </div>
      </Form>
      {data?.errorMsg && <h2>{data.errorMsg}</h2>}
      {data?.imgSrc && (
        <>
          <h2>uploaded image</h2>
          {data.imgSrc.map((src) => (
            <p>{src}</p>
          ))}
          {/* <img src={data.imgSrc} alt={data.imgDesc || 'Upload result'} /> */}
        </>
      )}
    </>
  );
}
