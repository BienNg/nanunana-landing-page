import type { ReactNode } from "react";
import type { Metadata } from "next";
import { setLocale } from "./get-locale";

/** Render a shared page in German. The page itself must not pin Vietnamese. */
export function dePage<P>(Page: (props: P) => ReactNode | Promise<ReactNode>) {
  return function GermanPage(props: P) {
    setLocale("de");
    return Page(props);
  };
}

/** Metadata for a shared page, resolved in German. */
export function deMetadata<P>(generate: (props: P) => Promise<Metadata> | Metadata) {
  return function generateMetadata(props: P) {
    setLocale("de");
    return generate(props);
  };
}
