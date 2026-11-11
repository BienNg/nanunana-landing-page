import assert from "node:assert/strict";
import { test } from "node:test";
import { openRoles } from "../content/careers";
import { siteCopy } from "../content/site";
import { courseListData, jobPostingData, officeAddresses } from "../lib/seo/structured-data";

for (const locale of ["vi", "de"] as const) {
  test(`${locale}: course markup matches the visible course anchors`, () => {
    const list = courseListData(locale, "https://example.test");
    assert.equal(list.itemListElement.length, 6);
    for (const row of list.itemListElement) {
      assert.ok(
        row.item.url.startsWith(`https://example.test${locale === "de" ? "/de" : ""}/niveau#`),
      );
      assert.ok(row.item.url.endsWith("-section"));
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
