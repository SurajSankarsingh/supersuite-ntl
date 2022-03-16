import type { Review, Room } from '@prisma/client';

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
};

export type TextAreaProps = {
  name: string;
  label: string;
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
