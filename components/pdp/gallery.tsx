"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

interface GalleryImage {
  src: string;
  alt: string;
}

export function SignatureGallery({ images }: { images: GalleryImage[] }) {
  // Every uploaded image must be reachable. Previously thumbs sliced from
  // index 1 while the hero started at index 1 too, which made image[0]
  // (the Shopify featured image) impossible to view.
  const [activeIndex, setActiveIndex] = useState(0);
  const active = images[activeIndex] ?? images[0];
  if (!active) return null;
  return (
    <div className="flex flex-col gap-stack-md">
      <div className="aspect-[3/4] bg-surface-container-high overflow-hidden relative group">
        <Image
          src={active.src}
          alt={active.alt}
          fill
          priority
          quality={95}
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover grayscale brightness-90 group-hover:grayscale-0 transition-all duration-700 ease-in-out"
        />
      </div>
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-stack-md">
          {images.map((img, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={img.src}
                type="button"
                onClick={() => setActiveIndex(i)}
                className={cn(
                  "relative aspect-square bg-surface-container-high overflow-hidden transition-opacity",
                  isActive ? "border border-primary" : "hover:opacity-80",
                )}
                aria-label={img.alt}
              >
                <Image
                  src={img.src}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 12vw, 25vw"
                  className="object-cover grayscale transition-all duration-500"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function EssentialsGallery({ images }: { images: GalleryImage[] }) {
  const [hero, ...rest] = images;
  return (
    <div className="grid grid-cols-1 gap-1">
      <div className="relative w-full aspect-[4/5] overflow-hidden">
        <Image
          src={hero.src}
          alt={hero.alt}
          fill
          priority
          quality={95}
          sizes="(min-width: 768px) 58vw, 100vw"
          className="object-cover"
        />
      </div>
      {rest.length > 0 && (
        <div className="grid grid-cols-2 gap-1">
          {rest.slice(0, 2).map((img) => (
            <div key={img.src} className="relative aspect-square overflow-hidden">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                quality={90}
                sizes="(min-width: 768px) 29vw, 50vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
