'use client'

import {
  ImageComparison,
  ImageComparisonImage,
  ImageComparisonSlider,
} from '@/components/motion-primitives/image-comparison'

const comparisons = [
  {
    id: 'code-polish',
    title: 'Plain screenshot → Polished snippet',
    description: 'Start with a raw capture and finish with gradients, padding, and shadows.',
    before: '/images/before/before_image_1.png',
    after: '/images/after/after_image_1.png',
  },
  {
    id: 'social-ready',
    title: 'Browser capture → Social-ready card',
    description: 'Drop in a URL screenshot and style it for LinkedIn or Twitter in seconds.',
    before: '/images/before/before_image_2.png',
    after: '/images/after/after_image_2.png',
  },
  {
    id: 'product-mock',
    title: 'Product UI → Launch graphic',
    description: 'Blend overlays, stickers, and typography for announcement imagery.',
    before: '/images/before/before_image_1.png',
    after: '/images/after/after_image_3.png',
  },
]

export function ImageComparisonShowcase() {
  return (
    <section className="w-full bg-muted/40 px-4 py-16 md:py-24">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            See The Difference
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Realistic before/after snapshots
          </h2>
          <p className="mt-3 text-base text-muted-foreground sm:text-lg">
            Drag the slider to compare a raw capture with its Snippet makeover. Perfect for helping
            visitors understand the value instantly.
          </p>
        </div>

        <div className="space-y-10">
          {comparisons.map((comparison) => (
            <div key={comparison.id} className="space-y-4">
              <div className="flex flex-col gap-2 text-center sm:flex-row sm:items-baseline sm:justify-between sm:text-left">
                <h3 className="text-xl font-semibold sm:text-2xl">{comparison.title}</h3>
                <p className="text-sm text-muted-foreground sm:max-w-sm">{comparison.description}</p>
              </div>
              <ImageComparison className="aspect-video w-full" enableHover>
                <div className="pointer-events-none absolute left-4 top-4 rounded-full border border-white/30 bg-black/40 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
                  Before
                </div>
                <div className="pointer-events-none absolute right-4 top-4 rounded-full border border-white/30 bg-black/40 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
                  After
                </div>
                <ImageComparisonImage
                  src={comparison.before}
                  alt={`${comparison.title} before`}
                  position="left"
                />
                <ImageComparisonImage
                  src={comparison.after}
                  alt={`${comparison.title} after`}
                  position="right"
                />
                <ImageComparisonSlider className="bg-primary text-primary-foreground shadow-primary/50" />
              </ImageComparison>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

