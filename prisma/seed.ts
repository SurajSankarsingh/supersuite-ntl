import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();

async function seed() {
  const superadmin = await db.user.create({
    data: {
      username: 'Superadmin',
      email: 'admin@email.com',
      role: 'ADMIN',
      password: {
        create: {
          hash: '$2y$10$worF2NxPeUerbjAhOItO0eRBkHZc3IFl2fg79eO9J7pDOzWLOrtLq',
        },
      },
    },
  });

  await Promise.all(
    getRooms().map((room) => {
      const data = { userId: superadmin.id, ...room };
      return db.room.create({
        data,
      });
    })
  );
}

seed();

function getRooms() {
  return [
    {
      name: 'Happy Room',
      room_num: 1,
      price_per_night: 89,
      description:
        'A friendly atmosphere and natural delights await your visit to the town of Wells! Stay at this well-equipped 1-bath studio and enjoy easy access to several beaches, including Wells Beach and Drakes Island Beach, as well as Rachel Carson National Wildlife Refuge',
      capacity: 1,
      beds: 1,
      category: 'King',
      bathrooms: 1,
      wifi: true,
      kitchenette: false,
      cleaning: true,
      air_conditioning: true,
      pets: false,
      tv: true,
      breakfast: true,
      entertainment: true,
      refrigerator: true,
      safe: false,
      clothing_care: false,
      swimming_pool: false,
      images: [
        'https://res.cloudinary.com/bookit/image/upload/v1618590762/bookit/rooms/1_bzynlv.jpg',
        'https://res.cloudinary.com/bookit/image/upload/v1618590761/bookit/rooms/2_s1u52n.jpg',
      ],
      featured: true,
    },
    {
      name: 'Luxury Room',
      room_num: 2,
      price_per_night: 390,
      description:
        'Our largest room with a queen bed and foldable sofa. Comfortably fits 2-3 adults, four adults maximum. Decorated with Irish-themed colors and arts. It has a private bathroom with a shower, equipped with smart TV, mini-fridge, desk, chairs. Enjoy City views at the sitting area by the window. Located on the 3rd floor with no elevator.',
      capacity: 3,
      beds: 2,
      category: 'Queen',
      bathrooms: 2,
      wifi: true,
      kitchenette: true,
      cleaning: true,
      air_conditioning: true,
      pets: true,
      tv: true,
      breakfast: true,
      entertainment: true,
      refrigerator: true,
      safe: true,
      clothing_care: true,
      swimming_pool: true,
      images: [
        'https://res.cloudinary.com/bookit/image/upload/v1618590762/bookit/rooms/3_quuli7.jpg',
      ],
      featured: true,
    },
    {
      name: 'Super Room',
      room_num: 3,
      price_per_night: 390,
      description:
        'Absolutely the best location in Portsmouth! Beautifully furnished, this spacious and private home is perfectly suited for taking in all of the must-see sights and historic landmarks that make this vibrant city so unique. Situated near the banks of the Piscataqua River just minutes away from Strawbery Banke Museum, Prescott Park, USS Albacore Museum, Market Square and more!',
      capacity: 3,
      beds: 1,
      category: 'King',
      bathrooms: 2,
      wifi: true,
      kitchenette: true,
      cleaning: true,
      air_conditioning: true,
      pets: false,
      tv: true,
      breakfast: true,
      entertainment: true,
      refrigerator: true,
      safe: false,
      clothing_care: true,
      swimming_pool: true,
      images: [
        'https://res.cloudinary.com/bookit/image/upload/v1618590765/bookit/rooms/4_sju0ql.jpg',
      ],
      featured: true,
    },
    {
      name: 'Paradise Room',
      room_num: 4,
      price_per_night: 290,
      description:
        'A room with a queen bed and foldable sofa. Comfortably fits 2-3 adults, four adults maximum. Decorated with Irish-themed colors and arts. It has a private bathroom with a shower, equipped with smart TV, mini-fridge, desk, chairs. Enjoy City views at the sitting area by the window. Located on the 3rd floor with no elevator.',
      capacity: 3,
      beds: 1,
      category: 'Queen',
      bathrooms: 2,
      wifi: true,
      kitchenette: false,
      cleaning: true,
      air_conditioning: true,
      pets: false,
      tv: true,
      breakfast: true,
      entertainment: true,
      refrigerator: true,
      safe: false,
      clothing_care: true,
      swimming_pool: true,
      images: [
        'https://res.cloudinary.com/bookit/image/upload/v1618590762/bookit/rooms/5_jmydt6.jpg',

        'https://res.cloudinary.com/bookit/image/upload/v1618590764/bookit/rooms/6_nwmr5f.jpg',
      ],
      featured: true,
    },
    {
      name: 'Chippy Room',
      room_num: 5,
      price_per_night: 180,
      description:
        'A friendly atmosphere and natural delights await your visit to the town of Wells! Stay at this well-equipped 1-bath studio and enjoy easy access to several beaches, including Wells Beach and Drakes Island Beach, as well as Rachel Carson National Wildlife Refuge',
      capacity: 2,
      beds: 1,
      category: 'Suite',
      bathrooms: 1,
      wifi: true,
      kitchenette: false,
      cleaning: true,
      air_conditioning: true,
      pets: false,
      tv: true,
      breakfast: true,
      entertainment: true,
      refrigerator: true,
      safe: false,
      clothing_care: false,
      swimming_pool: true,
      images: [
        'https://res.cloudinary.com/bookit/image/upload/v1618590764/bookit/rooms/7_hshhzq.jpg',
      ],
      featured: false,
    },
    {
      name: 'Hillview Room',
      room_num: 6,
      price_per_night: 156,
      description:
        'A friendly atmosphere and natural delights await your visit to the town of Wells! Stay at this well-equipped 1-bath studio and enjoy easy access to several beaches, including Wells Beach and Drakes Island Beach, as well as Rachel Carson National Wildlife Refuge',
      capacity: 2,
      beds: 1,
      category: 'Double',
      bathrooms: 1,
      wifi: true,
      kitchenette: false,
      cleaning: true,
      air_conditioning: true,
      pets: false,
      tv: true,
      breakfast: true,
      entertainment: true,
      refrigerator: true,
      safe: false,
      clothing_care: false,
      swimming_pool: false,
      images: [
        'https://res.cloudinary.com/bookit/image/upload/v1618590765/bookit/rooms/8_crn0xy.jpg',
      ],
      featured: false,
    },
    {
      name: 'Savannah Room',
      room_num: 7,
      price_per_night: 102,
      description:
        'A friendly atmosphere and natural delights await your visit to the town of Wells! Stay at this well-equipped 1-bath studio and enjoy easy access to several beaches, including Wells Beach and Drakes Island Beach, as well as Rachel Carson National Wildlife Refuge',
      capacity: 1,
      beds: 1,
      category: 'King',
      bathrooms: 1,
      wifi: true,
      kitchenette: false,
      cleaning: true,
      air_conditioning: true,
      pets: false,
      tv: true,
      breakfast: true,
      entertainment: true,
      refrigerator: true,
      safe: false,
      clothing_care: false,
      swimming_pool: false,
      images: [
        'https://res.cloudinary.com/bookit/image/upload/v1618590764/bookit/rooms/6_nwmr5f.jpg',
      ],
      featured: false,
    },
    {
      name: 'Palm Room',
      room_num: 8,
      price_per_night: 200,
      description:
        'A friendly atmosphere and natural delights await your visit to the town of Wells! Stay at this well-equipped 1-bath studio and enjoy easy access to several beaches, including Wells Beach and Drakes Island Beach, as well as Rachel Carson National Wildlife Refuge',
      capacity: 3,
      beds: 2,
      category: 'King',
      bathrooms: 1,
      wifi: true,
      kitchenette: false,
      cleaning: true,
      air_conditioning: true,
      pets: false,
      tv: true,
      breakfast: true,
      entertainment: true,
      refrigerator: true,
      safe: false,
      clothing_care: true,
      swimming_pool: true,
      images: [
        'https://res.cloudinary.com/bookit/image/upload/v1618590764/bookit/rooms/6_nwmr5f.jpg',
      ],
      featured: false,
    },
  ];
}
