import { site } from "@/content/site";
import { courses, type Course } from "@/content/courses";
import { courseHref } from "@/content/course-levels";
import { careerHref, type Role } from "@/content/careers";
import { localePath, type Locale } from "@/lib/i18n/locale";

export function officeAddresses() {
  return [
    {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      postalCode: site.address.postalCode,
      addressCountry: "VN",
    },
    {
      "@type": "PostalAddress",
      streetAddress: site.addressHanoi.street,
      addressLocality: site.addressHanoi.city,
      addressCountry: "VN",
    },
  ];
}

export function courseData(locale: Locale, base: string, course: Course) {
  const url = `${base}${localePath(locale, courseHref(course.id))}`;
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "@id": `${url}${url.includes("#") ? "" : "#course"}`,
    url,
    name: course.title,
    description: course.description.value,
    courseCode: course.level,
    provider: {
      "@type": "EducationalOrganization",
      "@id": `${base}/#organization`,
      name: site.name,
      sameAs: base,
    },
  };
}

export function courseListData(locale: Locale, base: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: courses[locale]
      .filter((course) => course.description.status === "ok")
      .map((course, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${base}${localePath(locale, courseHref(course.id))}`,
        item: courseData(locale, base, course),
      })),
  };
}

const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]!,
  );

/** First publication of the confirmed openings: commit 7bf1d24 (2026-10-29).
 * Keep this date stable; a copy edit is not a new job posting.
 */
const jobDetails: Record<
  string,
  { title: string; datePosted: string; remote: boolean; employmentType: string[] }
> = {
  "giao-vien-sai-gon-ha-noi": {
    title: "Deutschlehrkraft",
    datePosted: "2026-10-29",
    remote: false,
    employmentType: ["FULL_TIME", "PART_TIME"],
  },
  "giao-vien-online": {
    title: "Online-Deutschlehrkraft",
    datePosted: "2026-10-29",
    remote: true,
    employmentType: ["PART_TIME"],
  },
  "cham-soc-khach-hang": {
    title: "Kundenservice",
    datePosted: "2026-10-29",
    remote: false,
    employmentType: ["FULL_TIME", "PART_TIME"],
  },
};

export function jobPostingData(role: Role, locale: Locale, base: string) {
  const details = jobDetails[role.slug];
  if (!details || role.open.status !== "ok" || !role.open.value || role.summary.status !== "ok")
    return null;
  const description = [`<p>${escapeHtml(role.summary.value)}</p>`];
  for (const fact of role.facts ?? []) {
    if (fact.value.status === "ok")
      description.push(`<p>${escapeHtml(fact.label)}: ${escapeHtml(fact.value.value)}</p>`);
  }
  for (const section of role.sections) {
    const body: string[] = [];
    if (section.intro?.status === "ok") body.push(`<p>${escapeHtml(section.intro.value)}</p>`);
    if (section.items?.status === "ok")
      body.push(
        `<ul>${section.items.value.map((item) => `<li>${escapeHtml(typeof item === "string" ? item : `${item.text} (${item.tag})`)}</li>`).join("")}</ul>`,
      );
    if (section.crossedOut?.status === "ok")
      body.push(
        `<p>${escapeHtml(section.crossedOutLabel ?? "")}</p><ul>${section.crossedOut.value.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`,
      );
    if (body.length) description.push(`<h2>${escapeHtml(section.heading)}</h2>${body.join("")}`);
  }
  if (role.application) {
    for (const claim of [role.application.send, role.application.steps]) {
      if (claim.status === "ok")
        description.push(
          `<ul>${claim.value.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`,
        );
    }
  }
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "@id": `${base}${localePath(locale, careerHref(role.slug))}#job`,
    url: `${base}${localePath(locale, careerHref(role.slug))}`,
    title: locale === "de" ? details.title : role.title.split(" – ")[0].replace(" (m/w/d)", ""),
    description: description.join(""),
    datePosted: details.datePosted,
    employmentType: details.employmentType,
    hiringOrganization: {
      "@type": "Organization",
      "@id": `${base}/#organization`,
      name: site.name,
      sameAs: base,
      logo: `${base}/brand/logo-full.png`,
    },
    ...(details.remote
      ? {
          jobLocationType: "TELECOMMUTE",
          applicantLocationRequirements: { "@type": "Country", name: "Germany" },
        }
      : { jobLocation: officeAddresses().map((address) => ({ "@type": "Place", address })) }),
  };
}
