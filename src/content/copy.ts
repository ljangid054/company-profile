import {
  PRIMARY_PRODUCT_IMAGE,
  SITE_COVER_IMAGE,
  LINEUP_IMAGE_PRIMARY,
  LINEUP_IMAGE_SECONDARY,
} from "@/config/visual";

export const capabilities = [
  {
    title: "Hand forming & assembly",
    body: "Stems, bowls, and base plates are balanced at the bench—no soulless line assembly. Every Somada hookah is signed off for weight, wobble, and feel before it leaves our Somda workshop.",
  },
  {
    title: "Desi finishing discipline",
    body: "Patinas, mirror collars, and soft satin bodies are built through layered hand finishing, not factory dips alone—your hookah should glow under lounge lighting.",
  },
  {
    title: "Export-ready packing",
    body: "Handmade brass deserves crates that survive freight—tray separators, moisture-safe wraps, and labeling help distributors trust each arrival.",
  },
  {
    title: "Bespoke craft intake",
    body: "Wedding pairs, naam engraving, and hospitality batches move through Somada craft leads so timelines stay honest and storytelling stays human.",
  },
] as const;

export const industries = [
  "Premium hookah lounges",
  "Destination weddings & gifting houses",
  "Hospitality & hotel terraces",
  "Collectors & boutique retail",
  "International handcrafted brass buyers",
] as const;

export const certifications = [
  {
    name: "Bench QA rituals",
    detail: "Each Somada hookah passes draw-feel checks, stability pulls, and visual finish grading before packing.",
  },
  {
    name: "Material honesty",
    detail: "Solid brass construction standards—no disguised alloys posing as handcrafted heirlooms.",
  },
  {
    name: "Export packing playbooks",
    detail: "Anti-tarnish wraps, reinforced cartons, and distributor-friendly documentation on request.",
  },
] as const;

export const testimonials = [
  {
    quote:
      "Somada delivered a brass line that feels heirloom-grade—repeat customers specifically ask for the Somada finish.",
    name: "Aman Verma",
    role: "Owner, Cloud Nine Lounge — Dubai",
  },
  {
    quote:
      "We needed handcrafted desi hookahs that could travel—Somada’s packing and finish consistency made our import program painless.",
    name: "Elena Rossi",
    role: "Boutique Importer — EU",
  },
  {
    quote:
      "We run a boutique gifting line—the engraved wedding pair became the hero SKU of our Diwali edit.",
    name: "Priya Nambiar",
    role: "Founder, Atelier Indika — Bengaluru",
  },
] as const;

export const galleryImages = [
  {
    src: PRIMARY_PRODUCT_IMAGE,
    alt: "Nawabi Khas heritage tall brass hookah — Somada handcrafted finish",
    caption: "Heritage silhouette — hand-hammered collar rings and satin brass body",
  },
  {
    src: LINEUP_IMAGE_PRIMARY,
    alt: "Somada brass hookah lineup — multiple handcrafted desi silhouettes",
    caption: "Bench lineup — heritage profiles finished for lounge and export programs",
  },
  {
    src: LINEUP_IMAGE_SECONDARY,
    alt: "Handcrafted brass hookahs — alternate workshop lineup angle",
    caption: "Somada craft — consistent stems, trays, and hand-polished collars",
  },
  {
    src: SITE_COVER_IMAGE,
    alt: "Somada brass finishing atmosphere and craft detail",
    caption: "Finishing pass — patina depth, stance, and export-ready presentation",
  },
] as const;
