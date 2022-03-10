export const motionCardContainer = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.05,
    },
  },
};

export const motionCardItem = {
  hidden: { y: 60, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export const motionPageContainer = {
  beginning: {},
  final: { transition: { staggerChildren: 0.2 } },
  exit: { opacity: 0 },
};

export const motionPageItem = {
  beginning: { opacity: 0, y: 100 },
  final: { opacity: 1, y: 0 },
};
