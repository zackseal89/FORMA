import { PLACEHOLDERS } from "@/lib/placeholders";

export const measurementSteps = [
  {
    step: "01",
    label: "Bust",
    description:
      "Measure around the fullest part of your chest, arms relaxed at your sides.",
    image: PLACEHOLDERS.measureBust,
    alt: "Editorial bust measurement demonstration in warm terracotta light.",
  },
  {
    step: "02",
    label: "Waist",
    description: "Measure around your natural waist, one inch above your navel.",
    image: PLACEHOLDERS.measureWaist,
    alt: "Editorial waist measurement against a dark, textured background.",
  },
  {
    step: "03",
    label: "Hips",
    description: "Measure around the fullest part of your hips and seat.",
    image: PLACEHOLDERS.measureHips,
    alt: "Hip measurement silhouette, cinematic and high-contrast.",
  },
] as const;

export const sizeChart = [
  { size: "S", bust: "82 - 86", waist: "64 - 68", hips: "90 - 94" },
  { size: "M", bust: "87 - 91", waist: "69 - 73", hips: "95 - 99" },
  { size: "L", bust: "92 - 96", waist: "74 - 78", hips: "100 - 104" },
  { size: "XL", bust: "97 - 101", waist: "79 - 83", hips: "105 - 109" },
  { size: "XXL", bust: "102 - 106", waist: "84 - 88", hips: "110 - 114" },
  { size: "2XL", bust: "107 - 111", waist: "89 - 93", hips: "115 - 119" },
] as const;
