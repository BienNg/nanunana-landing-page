// Lists every unconfirmed claim (verify(...) call) in content/.
// Usage: pnpm verify:content
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import ts from "typescript";

const dir = path.resolve("content");
const rows = [];

for (const file of readdirSync(dir).filter((f) => f.endsWith(".ts"))) {
  const full = path.join(dir, file);
  const src = ts.createSourceFile(full, readFileSync(full, "utf8"), ts.ScriptTarget.Latest, true);
  const noteOf = (node) =>
    ts.isStringLiteralLike(node) ? node.text : `‹${node.getText(src).slice(0, 40)}›`;

  const visit = (node) => {
    if (ts.isCallExpression(node) && ts.isIdentifier(node.expression)) {
      const [value, note] = node.arguments;
      const name = node.expression.text;
      if (name === "verify" && value && note) {
        push(node, value.getText(src), noteOf(note));
      } else if (name === "d" && value && file === "courses.ts") {
        // courses.ts wraps descriptions in a local verify() helper
        push(node, value.getText(src), "Mô tả khoá học (bản nháp)");
      }
    }
    ts.forEachChild(node, visit);
  };
  const push = (node, value, note) => {
    const { line } = src.getLineAndCharacterOfPosition(node.getStart(src));
    const v = value.replace(/\s+/g, " ");
    rows.push({
      where: `content/${file}:${line + 1}`,
      note,
      value: v.length > 70 ? v.slice(0, 67) + "…" : v,
    });
  };
  visit(src);
}

if (rows.length === 0) {
  console.log("✓ No open {{VERIFY}} items.");
} else {
  console.log(`\n${rows.length} open {{VERIFY}} items (hidden in production):\n`);
  for (const r of rows) console.log(`• ${r.where}\n    ${r.note}\n    = ${r.value}`);
  console.log("");
}
