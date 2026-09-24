import { galleryItems, gallerySection } from "@/content/gallery";
import { sectionIds } from "@/content/nav";
import { cn } from "@/lib/cn";
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
      <ul className="grid auto-rows-[160px] grid-cols-2 gap-3 md:auto-rows-[200px] md:grid-cols-3 md:gap-4 lg:auto-rows-[220px]">
        {galleryItems.map((item) => (
          <li
            key={item.image}
            className={cn(
              "overflow-hidden rounded-card",
              item.tall && "md:row-span-2",
              item.wide && "md:col-span-2",
            )}
            data-gallery-item
          >
            <SiteImage
              image={item.image}
              sizes="(min-width: 768px) 33vw, 50vw"
              wrapperClassName="h-full"
              className="transition-transform duration-500 hover:scale-[1.03]"
            />
          </li>
        ))}
      </ul>
    </Section>
  );
}
