/** Somada Hookah — workshop & contact (edit before production deploy) */

export const siteConfig = {
  name: "Somada Hookah",
  tagline: "Desi premium handcrafted brass hookahs",
  description:
    "Somada Hookah crafts premium desi brass hookahs in Somda, Rajasthan—heritage silhouettes, bespoke weddings, and lounge-grade hospitality lines for collectors and partners across India and abroad.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://somadahookah.com",
  locale: "en_IN",
  contact: {
    email: "smdmahendra@gmail.com",
    whatsappE164: "919571620501",
    phoneDisplay: "+91 95716 20501",
    phoneTel: "+919571620501",
    /** Workshop proprietor */
    ownerName: "Mahendra Kumar Jangid",
    addressLine1: "Somada Hookah, Village Somda",
    addressLine2: "Behind Thakur Ji Temple",
    city: "Somda",
    region: "Rajasthan",
    postalCode: "303313",
    country: "India",
    /** Google Maps embed — replace with exact pin from Maps → Share → Embed if needed */
    googleMapsEmbedSrc:
      "https://maps.google.com/maps?q=Somda%2C+Rajasthan+303313&hl=en&z=13&output=embed",
    businessHours: [
      { days: "Monday – Saturday", hours: "10:00 – 19:00 IST" },
      { days: "Sunday", hours: "By appointment" },
    ],
  },
  formSubmitAction: "https://formsubmit.co/hello@somadahookah.com",
  social: {
    instagram: "https://instagram.com/somadahookah",
  },
} as const;

export type SiteConfig = typeof siteConfig;
