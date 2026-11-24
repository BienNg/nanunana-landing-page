"use client";

import { startTransition, useActionState, useEffect, useMemo, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { m } from "motion/react";
import { CircleAlert, LoaderCircle, Mail, Send } from "lucide-react";
import Link from "next/link";
import { submitApplication } from "@/app/actions/application";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { LOCALE_FIELD, localePath } from "@/lib/i18n/locale";
import { readAttribution } from "@/lib/attribution";
import { clearApplicationSent, markApplicationSent, useApplyRole } from "@/lib/apply-role-store";
import {
  applicationSchemaFor,
  attributionFields,
  emptyApplication,
  HONEYPOT_FIELD,
  initialApplicationState,
  type ApplicationField,
  type ApplicationInput,
  type ApplicationMessages,
  type ApplicationState,
} from "@/lib/validation/application";
import { AnchorButton, Button } from "@/components/ui/Button";
import { describedBy, Field } from "@/components/ui/Field";
import { Input, Select } from "@/components/ui/controls";
import { Turnstile } from "./Turnstile";

export type ApplicationFormCopy = ApplicationMessages & {
  name: string;
  namePlaceholder: string;
  email: string;
  emailPlaceholder: string;
  role: string;
  roleEmpty: string;
  submit: string;
  sending: string;
  privacyBefore: string;
  privacyLink: string;
  privacyAfter: string;
};

type RoleOption = { value: string; label: string };

/**
 * Job application: name, email, position. On success the Server Action
 * redirects to /tuyen-dung/cam-on, where the conversion is tracked.
 */
export function ApplicationForm({
  roles,
  defaultRole = "",
  copy,
  fallbackEmail,
  fallbackHref,
  turnstileSiteKey,
}: {
  roles: RoleOption[];
  /** Pre-selected position, e.g. on a job page. */
  defaultRole?: string;
  copy: ApplicationFormCopy;
  /** Shown in the error banner so a failed send still has a way through. */
  fallbackEmail: string;
  fallbackHref: string;
  turnstileSiteKey?: string;
}) {
  const [state, formAction, isPending] = useActionState<ApplicationState, FormData>(
    submitApplication,
    initialApplicationState,
  );
  const formRef = useRef<HTMLFormElement>(null);
  const locale = useLocale();
  const prefill = useApplyRole();
  const roleValues = useMemo(() => roles.map((r) => r.value), [roles]);
  const resolver = useMemo(
    () => zodResolver(applicationSchemaFor(locale, roleValues, copy)),
    [locale, roleValues, copy],
  );

  const echoed = state.status === "idle" ? undefined : state.values;
  const defaults: ApplicationInput = {
    ...emptyApplication,
    role: defaultRole,
    ...(echoed as Partial<ApplicationInput> | undefined),
  };

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isSubmitted },
  } = useForm<ApplicationInput>({ resolver, mode: "onTouched", defaultValues: defaults });

  // "Ứng tuyển" buttons elsewhere on this page. A click from an earlier page
  // (client navigation keeps the store) must not override this page's role.
  const seenNonce = useRef(prefill.nonce);
  useEffect(() => {
    if (prefill.nonce === seenNonce.current) return;
    seenNonce.current = prefill.nonce;
    if (!prefill.role) return;
    if (roleValues.includes(prefill.role)) {
      setValue("role", prefill.role, { shouldDirty: true, shouldValidate: isSubmitted });
    }
  }, [prefill, roleValues, setValue, isSubmitted]);

  // Server-side field errors (JS path) → react-hook-form.
  useEffect(() => {
    if (state.status === "idle") return;
    clearApplicationSent();
    if (state.status !== "invalid") return;
    for (const [field, message] of Object.entries(state.fieldErrors)) {
      setError(field as ApplicationField, { type: "server", message }, { shouldFocus: true });
    }
  }, [state, setError]);

  const onValid = (values: ApplicationInput) => {
    if (!formRef.current) return;
    const fd = new FormData(formRef.current);
    const attribution = readAttribution();
    for (const f of attributionFields) fd.set(f, attribution[f] ?? "");
    markApplicationSent(values.role);
    startTransition(() => formAction(fd));
  };

  const errorFor = (f: ApplicationField): string | undefined =>
    errors[f]?.message ??
    (state.status === "invalid" && !isSubmitted ? state.fieldErrors[f] : undefined);

  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={(e) => handleSubmit(onValid)(e)}
      noValidate
      className="relative grid gap-5 md:grid-cols-2"
    >
      <input type="hidden" name={LOCALE_FIELD} value={locale} />
      <Field id="apply-name" label={copy.name} required error={errorFor("name")}>
        <Input
          id="apply-name"
          autoComplete="name"
          placeholder={copy.namePlaceholder}
          defaultValue={defaults.name}
          aria-required
          aria-invalid={!!errorFor("name")}
          aria-describedby={describedBy("apply-name", { error: !!errorFor("name") })}
          {...register("name")}
        />
      </Field>

      <Field id="apply-email" label={copy.email} required error={errorFor("email")}>
        <Input
          id="apply-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          autoCapitalize="none"
          spellCheck={false}
          placeholder={copy.emailPlaceholder}
          defaultValue={defaults.email}
          aria-required
          aria-invalid={!!errorFor("email")}
          aria-describedby={describedBy("apply-email", { error: !!errorFor("email") })}
          {...register("email")}
        />
      </Field>

      <Field
        id="apply-role"
        label={copy.role}
        required
        error={errorFor("role")}
        className="md:col-span-2"
      >
        <Select
          id="apply-role"
          defaultValue={defaults.role}
          aria-required
          aria-invalid={!!errorFor("role")}
          aria-describedby={describedBy("apply-role", { error: !!errorFor("role") })}
          {...register("role")}
        >
          <option value="">{copy.roleEmpty}</option>
          {roles.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </Select>
      </Field>

      {/* Honeypot — hidden from people and assistive tech */}
      <div aria-hidden className="absolute -left-[10000px] h-px w-px overflow-hidden">
        <label>
          Website
          <input type="text" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {turnstileSiteKey ? (
        <div className="md:col-span-2">
          <Turnstile siteKey={turnstileSiteKey} />
        </div>
      ) : null}

      {state.status === "error" ? (
        <m.div
          role="alert"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-control border border-error/30 bg-error-container p-4 text-on-error-container md:col-span-2"
        >
          <p className="flex gap-2 text-body-md">
            <CircleAlert aria-hidden className="mt-0.5 size-5 shrink-0" />
            {state.message}
          </p>
          <div className="mt-3">
            <AnchorButton href={fallbackHref} size="sm" variant="outline">
              <Mail aria-hidden /> {fallbackEmail}
            </AnchorButton>
          </div>
        </m.div>
      ) : null}

      <div className="md:col-span-2">
        <Button type="submit" size="lg" fullWidth disabled={isPending} aria-disabled={isPending}>
          {isPending ? (
            <>
              <LoaderCircle aria-hidden className="animate-spin" /> {copy.sending}
            </>
          ) : (
            <>
              {copy.submit} <Send aria-hidden />
            </>
          )}
        </Button>
        <p className="mt-3 text-center text-body-sm text-ink-subtle">
          {copy.privacyBefore}
          <Link
            href={localePath(locale, "/chinh-sach-bao-mat")}
            className="underline underline-offset-2 hover:text-teal"
          >
            {copy.privacyLink}
          </Link>
          {copy.privacyAfter}
        </p>
      </div>
    </form>
  );
}
