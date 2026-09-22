export const premiumEase = [0.22, 1, 0.36, 1] as const;

export const productImageLayoutId = (slug: string) => `product-image-${slug}`;

/** Shared card → detail morph (mobile + desktop) */
export const SHARED_IMAGE_MS = 1450;

export const sharedImageTransition = {
  layout: {
    duration: SHARED_IMAGE_MS / 1000,
    ease: premiumEase,
  },
};

export const detailContentTransition = {
  duration: 0.8,
  ease: premiumEase,
};
