import type { ReactNode } from "react";
import { Star } from "lucide-react";
import {
  reviewCountLabel,
  starsLabel,
  testimonialsSection as testimonialsByLocale,
} from "@/content/testimonials";
import { sectionIds } from "@/content/nav";
import { getLocale } from "@/lib/i18n/get-locale";
import { dateLocale } from "@/lib/i18n/locale";
import { cn } from "@/lib/cn";
import { getGoogleReviews, type GoogleReview, type GoogleReviews } from "@/lib/google/reviews";
import { Avatar } from "@/components/ui/Avatar";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TestimonialCarousel } from "./TestimonialCarousel";

const externalLink = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;

/** Public Google reviews. Hidden when Places API is unset or returns nothing. */
export async function Testimonials() {
  const locale = await getLocale();
  const copy = testimonialsByLocale[locale];
  const data = await getGoogleReviews(locale);
  if (!data) return null;

  return (
    <ReviewsFrame locale={locale}>
      <ReviewSummary data={data} locale={locale} />
      <TestimonialCarousel
        label={copy.title}
        slides={data.reviews.map((review) => (
          <ReviewCard key={review.id} review={review} locale={locale} />
        ))}
      />
    </ReviewsFrame>
  );
}

function ReviewsFrame({ children, locale }: { children: ReactNode; locale: "vi" | "de" }) {
  const testimonialsSection = testimonialsByLocale[locale];
  return (
    <Section id={sectionIds.testimonials} tone="white">
      <SectionHeading
        id={`${sectionIds.testimonials}-title`}
        eyebrow={testimonialsSection.eyebrow}
        title={testimonialsSection.title}
        intro={testimonialsSection.intro}
      />
      {children}
    </Section>
  );
}

function ReviewSummary({ data, locale }: { data: GoogleReviews; locale: "vi" | "de" }) {
  const copy = testimonialsByLocale[locale];
  const numberLocale = dateLocale(locale);
  const rating =
    data.rating == null
      ? null
      : data.rating.toLocaleString(numberLocale, {
          minimumFractionDigits: 1,
          maximumFractionDigits: 1,
        });
  const count = data.ratingCount?.toLocaleString(numberLocale);

  return (
    <p className="-mt-4 mb-space-lg flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-body-sm text-ink-muted">
      {rating ? (
        <span className="inline-flex items-center gap-1.5 text-label-lg text-ink">
          <Star aria-hidden className="size-4 fill-accent-coral text-accent-coral" />
          {rating}
        </span>
      ) : null}
      {count && data.ratingCount != null ? (
        <span>{reviewCountLabel(locale, data.ratingCount)}</span>
      ) : null}
      {data.mapsUri ? (
        <a
          href={data.mapsUri}
          {...externalLink}
          className="inline-flex items-center gap-1.5 rounded-control text-brand-teal-dark underline-offset-2 hover:underline focus-visible:ring-[3px] focus-visible:ring-teal/30 focus-visible:outline-none"
        >
          <GoogleMark />
          {copy.allReviews}
          <span className="sr-only"> {copy.newTab}</span>
        </a>
      ) : (
        <span className="inline-flex items-center gap-1.5">
          <GoogleMark />
          Google
        </span>
      )}
    </p>
  );
}

function ReviewCard({ review, locale }: { review: GoogleReview; locale: "vi" | "de" }) {
  const copy = testimonialsByLocale[locale];
  const when = review.relativeTime ?? formatPublished(review.publishedAt, locale);
  return (
    <figure className="flex h-full flex-col rounded-card border border-border-subtle bg-surface-canvas p-space-lg">
      <Stars rating={review.rating} locale={locale} />
      <blockquote className="mt-3 flex-1 text-body-md text-ink">
        <p className="line-clamp-6">{review.text}</p>
      </blockquote>
      {review.reviewUri ? (
        <a
          href={review.reviewUri}
          {...externalLink}
          className="mt-3 self-start text-body-sm text-brand-teal-dark underline-offset-2 hover:underline focus-visible:ring-[3px] focus-visible:ring-teal/30 focus-visible:outline-none"
        >
          {copy.readOnGoogle}
          <span className="sr-only"> {copy.newTab}</span>
        </a>
      ) : null}
      <figcaption className="mt-6 flex items-center gap-3">
        <Avatar name={review.authorName} photo={review.authorPhotoUri ?? undefined} size={48} />
        <div className="min-w-0">
          <AuthorName name={review.authorName} href={review.authorUri} locale={locale} />
          {when ? (
            <p className="text-body-sm text-ink-subtle">
              {review.publishedAt ? <time dateTime={review.publishedAt}>{when}</time> : when}
            </p>
          ) : null}
        </div>
      </figcaption>
    </figure>
  );
}

function AuthorName({
  name,
  href,
  locale,
}: {
  name: string;
  href: string | null;
  locale: "vi" | "de";
}) {
  if (!href) return <p className="truncate text-label-lg text-ink">{name}</p>;
  return (
    <a
      href={href}
      {...externalLink}
      className="block truncate text-label-lg text-ink underline-offset-2 hover:underline focus-visible:ring-[3px] focus-visible:ring-teal/30 focus-visible:outline-none"
    >
      {name}
      <span className="sr-only"> {testimonialsByLocale[locale].onGoogle}</span>
    </a>
  );
}

function Stars({ rating, locale }: { rating: number; locale: "vi" | "de" }) {
  const filled = Math.max(0, Math.min(5, Math.round(rating)));
  return (
    <div className="flex gap-0.5" aria-label={starsLabel(locale, filled)}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          aria-hidden
          className={cn(
            "size-4",
            i < filled
              ? "fill-accent-coral text-accent-coral"
              : "fill-transparent text-border-subtle",
          )}
        />
      ))}
    </div>
  );
}

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-4 shrink-0">
      <path
        fill="#4285F4"
        d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.4h6.5c-.3 1.5-1.1 2.8-2.4 3.6v3h3.9c2.3-2.1 3.5-5.2 3.5-8.7z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.9-3c-1.1.7-2.4 1.2-4 1.2-3.1 0-5.7-2.1-6.6-4.9H1.4v3.1C3.4 21.3 7.4 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.4 14.4c-.2-.7-.4-1.4-.4-2.4s.1-1.7.4-2.4V6.5H1.4C.5 8.3 0 10.1 0 12s.5 3.7 1.4 5.5l4-3.1z"
      />
      <path
        fill="#EA4335"
        d="M12 4.8c1.7 0 3.3.6 4.5 1.8l3.4-3.4C17.9 1.1 15.2 0 12 0 7.4 0 3.4 2.7 1.4 6.5l4 3.1C6.3 6.8 8.9 4.8 12 4.8z"
      />
    </svg>
  );
}

function formatPublished(iso: string | null, locale: "vi" | "de") {
  if (!iso) return null;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat(dateLocale(locale), { dateStyle: "medium" }).format(date);
}
