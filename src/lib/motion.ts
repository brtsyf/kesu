export const premiumEase = [0.22, 1, 0.36, 1] as const;

export const productImageLayoutId = (slug: string) => `product-image-${slug}`;

export const sharedImageTransition = {
  layout: {
    duration: 0.85,
    ease: premiumEase,
  },
};

export const detailContentTransition = {
  duration: 0.65,
  ease: premiumEase,
};
