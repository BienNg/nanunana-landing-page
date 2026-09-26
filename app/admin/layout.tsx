import type { ReactNode } from "react";
import { DocumentLanguage } from "./document-language";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <DocumentLanguage lang="en" />
      {children}
    </>
  );
}
