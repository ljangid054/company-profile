/** Site-wide photography used for backgrounds */
export const SITE_COVER_IMAGE = "/images/cover.png" as const;

/** Brand mark — header, footer, favicon, JSON-LD */
export const SITE_LOGO_IMAGE = "/images/logo.png" as const;

/** Workshop lineup photography */
export const LINEUP_IMAGE_PRIMARY = "/images/all_product.png" as const;
export const LINEUP_IMAGE_SECONDARY = "/images/all_product2.png" as const;

/** Nawabi Khas / first catalog SKU — real product shot */
export const PRIMARY_PRODUCT_IMAGE = "/images/p1.png" as const;

/** Fallback when a product has no `images` yet */
export const DEFAULT_PRODUCT_IMAGE = LINEUP_IMAGE_PRIMARY;
