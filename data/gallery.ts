import type { Metadata } from "next";

export const galleryImages = [
  {
    id: "img-2602",
    src: "/images/IMG_2602.JPG.jpeg",
    alt: "Wedding photograph 1",
    width: 1920,
    height: 1280,
    priority: true,
  },
  {
    id: "img-2606",
    src: "/images/IMG_2606.JPG.jpeg",
    alt: "Wedding photograph 2",
    width: 1920,
    height: 1280,
  },
  {
    id: "img-2611",
    src: "/images/IMG_2611.JPG.jpeg",
    alt: "Wedding photograph 3",
    width: 1920,
    height: 1280,
  },
  {
    id: "img-2619",
    src: "/images/IMG_2619.JPG.jpeg",
    alt: "Wedding photograph 4",
    width: 1920,
    height: 1280,
  },
  {
    id: "img-2621",
    src: "/images/IMG_2621.JPG.jpeg",
    alt: "Wedding photograph 5",
    width: 1920,
    height: 1280,
  },
  {
    id: "img-3253",
    src: "/images/IMG_3253.JPG.jpeg",
    alt: "Wedding photograph 6",
    width: 1920,
    height: 1280,
  },
  {
    id: "img-3256",
    src: "/images/IMG_3256.JPG.jpeg",
    alt: "Wedding photograph 7",
    width: 1920,
    height: 1280,
  },
  {
    id: "img-3260",
    src: "/images/IMG_3260.JPG.jpeg",
    alt: "Wedding photograph 8",
    width: 1920,
    height: 1280,
  },
  {
    id: "img-3618",
    src: "/images/IMG_3618.JPG.jpeg",
    alt: "Wedding photograph 9",
    width: 1920,
    height: 1280,
  },
  {
    id: "img-3620",
    src: "/images/IMG_3620.JPG.jpeg",
    alt: "Wedding photograph 10",
    width: 1920,
    height: 1280,
  },
  {
    id: "img-3621",
    src: "/images/IMG_3621.JPG.jpeg",
    alt: "Wedding photograph 11",
    width: 1920,
    height: 1280,
  },
] as const;

export const heroImage = {
  src: "/images/IMG_2606.JPG.jpeg",
  alt: "Noufiya and Mansoor",
  width: 1920,
  height: 1280,
  priority: true,
} as const;

export const finalImage = {
  src: "/images/IMG_3618.JPG.jpeg",
  alt: "Noufiya and Mansoor",
  width: 1920,
  height: 1280,
  priority: false,
} as const;

export type GalleryImage = (typeof galleryImages)[number];
