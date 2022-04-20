export function validateRoomName(room_name: string) {
  if (room_name.length < 3) {
    return 'Room name must be at least 3 characters long';
  }
  if (room_name.length > 30) {
    return 'Room name must be less than 30 characters long';
  }
  if (room_name.length === 0) {
    return 'Room Name is required';
  }
}

export function validateRoomNumber(room_number: string) {
  if (room_number === '0') {
    return 'Room number must be greater than 0';
  }
  if (room_number.length === 0) {
    return 'Room Number is required';
  }
}

export function validatePricePerNight(price_per_night: string) {
  if (price_per_night.length === 0) {
    return 'Price Per Night is required';
  }
}

export function validateRoomCapacity(room_capacity: string) {
  if (room_capacity.length === 0) {
    return 'Room capacity is required';
  }
}

export function validateRoomDescription(description: string) {
  if (description.length < 10) {
    return 'Room description must be at least 10 characters long';
  }
  if (description.length > 500) {
    return 'Room description must be less than 500 characters long';
  }
  if (description.length === 0) {
    return 'Room description is required';
  }
}

export function validateNumOfBeds(num_of_beds: string) {
  if (num_of_beds.length === 0) {
    return 'Number of beds is required';
  }
}

export function validateBedCategory(bed_category: string) {
  if (bed_category.length === 0) {
    return 'Bed category is required';
  }
}

export function validateNumOfBaths(num_of_bathrooms: string) {
  if (num_of_bathrooms.length === 0) {
    return 'Number of Bathrooms is required';
  }
}
