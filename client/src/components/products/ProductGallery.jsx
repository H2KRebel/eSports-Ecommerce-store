import { useState } from 'react';

export default function ProductGallery({ images, name }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const gallery = images?.length ? images : ['https://placehold.co/600x600/12121a/00f0ff?text=No+Image'];

  return (
    <div className="space-y-4">
      <div className="aspect-square overflow-hidden rounded-xl border border-dark-border bg-dark">
        <img
          src={gallery[activeIndex]}
          alt={name}
          className="h-full w-full object-cover"
        />
      </div>

      {gallery.length > 1 && (
        <div className="flex gap-3">
          {gallery.map((src, index) => (
            <button
              key={src}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`aspect-square w-16 overflow-hidden rounded-lg border transition-colors sm:w-20 ${
                index === activeIndex
                  ? 'border-accent-cyan ring-1 ring-accent-cyan'
                  : 'border-dark-border hover:border-accent-cyan/50'
              }`}
            >
              <img src={src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
