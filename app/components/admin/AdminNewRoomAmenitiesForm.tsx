import React from 'react';

type Props = {};

export default function AdminNewRoomAmenitiesForm({}: Props) {
  return (
    <div className='flex flex-col'>
      <div className='form-control'>
        <label className='label cursor-pointer'>
          <span className='label-text'>WiFi</span>
          <input type='checkbox' className='toggle toggle-accent' />
        </label>
      </div>
      <div className='form-control'>
        <label className='label cursor-pointer'>
          <span className='label-text'>Kitchenette</span>
          <input type='checkbox' className='toggle toggle-accent' />
        </label>
      </div>
      <div className='form-control'>
        <label className='label cursor-pointer'>
          <span className='label-text'>Cleaning</span>
          <input type='checkbox' className='toggle toggle-accent' />
        </label>
      </div>
      <div className='form-control'>
        <label className='label cursor-pointer'>
          <span className='label-text'>Air Conditioning</span>
          <input type='checkbox' className='toggle toggle-accent' />
        </label>
      </div>
      <div className='form-control'>
        <label className='label cursor-pointer'>
          <span className='label-text'>Pets</span>
          <input type='checkbox' className='toggle toggle-accent' />
        </label>
      </div>
      <div className='form-control'>
        <label className='label cursor-pointer'>
          <span className='label-text'>TV</span>
          <input type='checkbox' className='toggle toggle-accent' />
        </label>
      </div>
      <div className='form-control'>
        <label className='label cursor-pointer'>
          <span className='label-text'>Breakfast</span>
          <input type='checkbox' className='toggle toggle-accent' />
        </label>
      </div>
      <div className='form-control'>
        <label className='label cursor-pointer'>
          <span className='label-text'>Entertainment</span>
          <input type='checkbox' className='toggle toggle-accent' />
        </label>
      </div>
      <div className='form-control'>
        <label className='label cursor-pointer'>
          <span className='label-text'>Refrigerator</span>
          <input type='checkbox' className='toggle toggle-accent' />
        </label>
      </div>
      <div className='form-control'>
        <label className='label cursor-pointer'>
          <span className='label-text'>Safe</span>
          <input type='checkbox' className='toggle toggle-accent' />
        </label>
      </div>
      <div className='form-control'>
        <label className='label cursor-pointer'>
          <span className='label-text'>Clothing Care</span>
          <input type='checkbox' className='toggle toggle-accent' />
        </label>
      </div>
      <div className='form-control'>
        <label className='label cursor-pointer'>
          <span className='label-text'>Swimming Pool</span>
          <input type='checkbox' className='toggle toggle-accent' />
        </label>
      </div>
    </div>
  );
}
