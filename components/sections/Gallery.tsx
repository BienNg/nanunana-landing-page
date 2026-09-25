import { galleryItems, gallerySection } from "@/content/gallery";
import { sectionIds } from "@/content/nav";
import { cn } from "@/lib/cn";
import { GalleryGrid } from "@/components/sections/GalleryGrid";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SiteImage } from "@/components/ui/SiteImage";

export function Gallery() {
  return (
    <Section id={sectionIds.gallery}>
      <SectionHeading
        id={`${sectionIds.gallery}-title`}
        eyebrow={gallerySection.eyebrow}
        title={gallerySection.title}
        intro={gallerySection.intro}
      />
      <GalleryGrid>
        {galleryItems.map((item) => (
          <li
            key={item.image}
            className={cn(
              "overflow-hidden rounded-card",
              item.span === "third" ? "md:col-span-2" : "md:col-span-3",
            )}
          >
            <SiteImage
              image={item.image}
              fill
              sizes={
                item.span === "half"
                  ? "(min-width: 768px) 50vw, 100vw"
                  : "(min-width: 768px) 34vw, 100vw"
              }
              draggable={false}
              wrapperClassName={cn("w-full", item.frameClassName)}
              className="pointer-events-none select-none [-webkit-touch-callout:none] [-webkit-user-drag:none]"
            />
          </li>
        ))}
      </GalleryGrid>
    </Section>
  );
}
