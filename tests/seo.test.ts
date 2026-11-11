import assert from "node:assert/strict";
import { test } from "node:test";
import { openRoles } from "../content/careers";
import { courseHref, courseLevels, isCourseSlug, levelCourse } from "../content/course-levels";
import { siteCopy } from "../content/site";
import {
  courseData,
  courseListData,
  jobPostingData,
  officeAddresses,
} from "../lib/seo/structured-data";

for (const locale of ["vi", "de"] as const) {
  test(`${locale}: course markup links to detail pages and the conversation anchor`, () => {
    const list = courseListData(locale, "https://example.test");
    assert.equal(list.itemListElement.length, 6);
    for (const row of list.itemListElement) {
      const index = row.position - 1;
      const suffix = index < 5 ? `/niveau/${courseLevels[index]}` : "/niveau#giao-tiep-section";
      assert.equal(row.item.url, `https://example.test${locale === "de" ? "/de" : ""}${suffix}`);
      assert.equal(row.url, row.item.url);
      assert.ok(row.item.description.length > 20);
      assert.equal("offers" in row.item, false, "no invented tuition");
    }
  });
  test(`${locale}: jobs have stable dates and correct remote eligibility`, () => {
    for (const role of openRoles(locale)) {
      const data = jobPostingData(role, locale, "https://example.test")!;
      assert.equal(data.datePosted, "2026-10-29");
      assert.equal(data.description.includes(role.summary.value), true);
      if (role.slug === "giao-vien-online") {
        assert.ok("jobLocationType" in data);
        assert.equal(data.jobLocationType, "TELECOMMUTE");
        assert.equal(data.applicantLocationRequirements?.name, "Germany");
        assert.equal("jobLocation" in data, false);
      } else {
        assert.ok("jobLocation" in data);
        assert.equal(data.jobLocation.length, 2);
      }
      assert.equal("baseSalary" in data, false);
      assert.equal(
        jobPostingData(
          { ...role, open: { status: "ok", value: false } },
          locale,
          "https://example.test",
        ),
        null,
      );
    }
  });
  test(`${locale}: concise homepage title`, () =>
    assert.ok(siteCopy[locale].metaTitle.length <= 60));
}
test("only confirmed Vietnamese offices are marked up", () => {
  assert.equal(officeAddresses().length, 2);
  assert.ok(officeAddresses().every((address) => address.addressCountry === "VN"));
});

test("only the five confirmed CEFR course routes are valid", () => {
  for (const invalid of ["", "A1", "a3", "c2", "giao-tiep", "../a1", "constructor"])
    assert.equal(isCourseSlug(invalid), false);
  for (const locale of ["vi", "de"] as const)
    for (const level of courseLevels) {
      assert.equal(isCourseSlug(level), true);
      const course = levelCourse(locale, level);
      assert.equal(course.id, level);
      assert.equal(course.duration.status, "ok");
      const data = courseData(locale, "https://example.test", course);
      assert.equal(data.name, course.title);
      assert.equal(data.description, course.description.value);
      assert.ok(data.url.endsWith(courseHref(level)));
      assert.equal(data["@id"], `${data.url}#course`);
      assert.equal("offers" in data, false);
      assert.equal("hasCourseInstance" in data, false);
    }
});
