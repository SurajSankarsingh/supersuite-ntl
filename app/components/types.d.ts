import type { Booking, Review, Room, User } from '@prisma/client';

export type UserProps = {
  user: {
    id: string;
    username: string;
    email: string;
    role: string;
  } | null;
};

export type InputProps = {
  name: string;
  label: string;
  type?: string;
  min?: number;
  max?: number;
  required?: boolean;
};

export type TextAreaProps = {
  name: string;
  label: string;
};

export type BtnProps = {
  name: string;
};

export type GoogleBtnProps = {
  name: string;
};

export type ListReviewProps = {
  reviews: Review[];
};

export type RoomAmenitiesProps = {
  room: Room;
};

export type RoomCardItemProps = {
  room: Room & { reviews: Review[] };
};

export type BookingTableProps = {
  bookings: (Booking & { room: Room })[];
};

export type AdminBookingTableProps = {
  bookings: (Booking & { room: Room; user: User })[];
};

export type BookingDetailsProps = {
  booking: (Booking & { room: Room; user: User }) | null;
};

export type AdminRoomTableProps = {
  rooms: Room[];
};

export type AdminRoomDetailsProps = {
  room: Room;
};

export type AdminUserTableProps = {
  users: User[];
};

export type AdminUserDetailsProps = {
  user: User;
};

export type AdminReviewTableProps = {
  reviews: (Review & { room: Room | null; user: User })[];
};

export type AdminReviewDetailsProps = {
  review: (Review & { user: User; room: Room | null }) | null;
};
