"use client";

import { startTransition, useActionState, useEffect, useMemo, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, m } from "motion/react";
import { CircleAlert, LoaderCircle, Phone, Send } from "lucide-react";
import { submitConsultation } from "@/app/actions/consultation";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { LOCALE_FIELD } from "@/lib/i18n/locale";
import { courseOptions, goalOptions } from "@/content/form-options";
import { siteFor } from "@/content/site";
import { ui } from "@/content/ui";
import { trackLead } from "@/lib/analytics";
import { readAttribution } from "@/lib/attribution";
import { prefillFromSearch, usePrefill } from "@/lib/prefill-store";
import {
  attributionFields,
  consultationSchemaFor,
  emptyConsultation,
  HONEYPOT_FIELD,
  type ConsultationField,
  type ConsultationInput,
} from "@/lib/validation/consultation";
import {
  initialConsultationState,
  type ConsultationState,
} from "@/lib/validation/consultation-state";
import { AnchorButton, Button } from "@/components/ui/Button";
import { describedBy, Field } from "@/components/ui/Field";
import { Input, Select, Textarea } from "@/components/ui/controls";
import { ZaloIcon, zaloOnCoral } from "@/components/icons/brand";
import { FormSuccess } from "./FormSuccess";
import { Turnstile } from "./Turnstile";

/** Wrapper: remounting the inner form (new key) resets the action state. */
export function ConsultationForm({ turnstileSiteKey }: { turnstileSiteKey?: string }) {
  const [round, setRound] = useState(0);
  return (
    <ConsultationFormInner
      key={round}
      turnstileSiteKey={turnstileSiteKey}
      onReset={() => setRound((r) => r + 1)}
    />
  );
}

function ConsultationFormInner({
  turnstileSiteKey,
  onReset,
}: {
  turnstileSiteKey?: string;
  onReset: () => void;
}) {
  const [state, formAction, isPending] = useActionState<ConsultationState, FormData>(
    submitConsultation,
    initialConsultationState,
  );
  const formRef = useRef<HTMLFormElement>(null);
  const prefill = usePrefill();
  const locale = useLocale();
  const copy = ui[locale].form;
  const resolver = useMemo(() => zodResolver(consultationSchemaFor(locale)), [locale]);

  // Values echoed by the server (no-JS round trip) become the defaults.
  const echoed = state.status === "invalid" || state.status === "error" ? state.values : undefined;
  const defaults: ConsultationInput = {
    ...emptyConsultation,
    ...(echoed as Partial<ConsultationInput> | undefined),
  };

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    control,
    formState: { errors, isSubmitted },
  } = useForm<ConsultationInput>({
    resolver,
    mode: "onTouched",
    defaultValues: defaults,
  });

  // ?khoa= / ?muc-tieu= / ?loi-nhan= from the URL on mount.
  useEffect(() => {
    const fromUrl = prefillFromSearch(location.search);
    if (fromUrl.course) setValue("course", fromUrl.course);
    if (fromUrl.goal) setValue("goal", fromUrl.goal);
    if (fromUrl.message) setValue("message", fromUrl.message);
  }, [setValue]);

  // CTA clicks elsewhere on the page.
  useEffect(() => {
    if (prefill.nonce === 0) return;
    if (prefill.course) setValue("course", prefill.course, { shouldDirty: true });
    if (prefill.goal) setValue("goal", prefill.goal, { shouldDirty: true });
    if (prefill.message) setValue("message", prefill.message, { shouldDirty: true });
  }, [prefill, setValue]);

  // Server-side field errors (JS path) → react-hook-form.
  useEffect(() => {
    if (state.status !== "invalid") return;
    for (const [field, message] of Object.entries(state.fieldErrors)) {
      setError(field as ConsultationField, { type: "server", message }, { shouldFocus: true });
    }
  }, [state, setError]);

  // Conversion events, once per success.
  const tracked = useRef(false);
  useEffect(() => {
    if (state.status === "success" && !tracked.current) {
      tracked.current = true;
      trackLead({ course: state.course, goal: state.goal });
    }
  }, [state]);

  const onValid = () => {
    if (!formRef.current) return;
    const fd = new FormData(formRef.current);
    // First-touch attribution captured on landing (sessionStorage).
    const attribution = readAttribution();
    for (const f of attributionFields) fd.set(f, attribution[f] ?? "");
    startTransition(() => formAction(fd));
  };

  /** Client errors win; before any JS submit (no-JS round trip) show server errors. */
  const errorFor = (f: ConsultationField): string | undefined =>
    errors[f]?.message ??
    (state.status === "invalid" && !isSubmitted ? state.fieldErrors[f] : undefined);

  const messageLength = useWatch({ control, name: "message" })?.length ?? 0;

  return (
    <div aria-live="polite">
      <AnimatePresence mode="wait" initial={false}>
        {state.status === "success" ? (
          <m.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <FormSuccess onReset={onReset} />
          </m.div>
        ) : (
          <m.form
            key="form"
            ref={formRef}
            action={formAction}
            onSubmit={(e) => handleSubmit(onValid)(e)}
            noValidate
            initial={false}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="relative grid gap-5 md:grid-cols-2"
          >
            <input type="hidden" name={LOCALE_FIELD} value={locale} />
            <Field id="lead-name" label={copy.name} required error={errorFor("name")}>
              <Input
                id="lead-name"
                autoComplete="name"
                placeholder={copy.namePlaceholder}
                defaultValue={defaults.name}
                aria-required
                aria-invalid={!!errorFor("name")}
                aria-describedby={describedBy("lead-name", { error: !!errorFor("name") })}
                {...register("name")}
              />
            </Field>

            <Field
              id="lead-phone"
              label={copy.phone}
              required
              hint={copy.phoneHint}
              error={errorFor("phone")}
            >
              <Input
                id="lead-phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder={copy.phonePlaceholder}
                defaultValue={defaults.phone}
                aria-required
                aria-invalid={!!errorFor("phone")}
                aria-describedby={describedBy("lead-phone", {
                  hint: !errorFor("phone"),
                  error: !!errorFor("phone"),
                })}
                {...register("phone")}
              />
            </Field>

            <Field id="lead-course" label={copy.course} error={errorFor("course")}>
              <Select
                id="lead-course"
                defaultValue={defaults.course}
                aria-invalid={!!errorFor("course")}
                aria-describedby={describedBy("lead-course", { error: !!errorFor("course") })}
                {...register("course")}
              >
                <option value="">{copy.courseEmpty}</option>
                {courseOptions[locale].map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </Select>
            </Field>

            <Field
              id="lead-goal"
              label={copy.goal}
              required
              error={errorFor("goal")}
              className="md:col-span-2"
            >
              <Select
                id="lead-goal"
                defaultValue={defaults.goal}
                aria-required
                aria-invalid={!!errorFor("goal")}
                aria-describedby={describedBy("lead-goal", { error: !!errorFor("goal") })}
                {...register("goal")}
              >
                <option value="">{copy.goalEmpty}</option>
                {goalOptions[locale].map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </Select>
            </Field>

            <Field
              id="lead-message"
              label={copy.message}
              error={errorFor("message")}
              className="md:col-span-2"
            >
              <Textarea
                id="lead-message"
                rows={4}
                maxLength={1000}
                placeholder={copy.messagePlaceholder}
                defaultValue={defaults.message}
                aria-invalid={!!errorFor("message")}
                aria-describedby={[
                  "lead-message-count",
                  describedBy("lead-message", { error: !!errorFor("message") }),
                ]
                  .filter(Boolean)
                  .join(" ")}
                {...register("message")}
              />
              <p
                id="lead-message-count"
                className="mt-1 text-right text-body-sm text-ink-subtle tabular-nums"
              >
                {messageLength}/1000
              </p>
            </Field>

            {/* Honeypot — hidden from people and assistive tech */}
            <div aria-hidden className="absolute -left-[10000px] h-px w-px overflow-hidden">
              <label>
                Website
                <input type="text" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            {/* Attribution fields are added to the FormData on submit (see onValid). */}

            {turnstileSiteKey ? (
              <div className="md:col-span-2">
                <Turnstile siteKey={turnstileSiteKey} />
              </div>
            ) : null}

            {state.status === "error" ? <FormErrorBanner message={state.message} /> : null}

            <div className="md:col-span-2">
              <Button
                type="submit"
                size="lg"
                fullWidth
                disabled={isPending}
                aria-disabled={isPending}
              >
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
            </div>
          </m.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function FormErrorBanner({ message }: { message: string }) {
  const locale = useLocale();
  const site = siteFor(locale);
  const copy = ui[locale].form;
  return (
    <m.div
      role="alert"
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-control border border-error/30 bg-error-container p-4 text-on-error-container md:col-span-2"
    >
      <p className="flex gap-2 text-body-md">
        <CircleAlert aria-hidden className="mt-0.5 size-5 shrink-0" />
        {message}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <AnchorButton
          href={site.channels.zalo}
          target="_blank"
          rel="noopener noreferrer"
          size="sm"
          track={{ channel: "zalo", placement: "form_error" }}
          className={zaloOnCoral}
        >
          <ZaloIcon /> {copy.zalo}
        </AnchorButton>
        <AnchorButton
          href={site.phone.href}
          size="sm"
          variant="outline"
          track={{ channel: "phone", placement: "form_error" }}
        >
          <Phone aria-hidden /> {site.phone.display}
        </AnchorButton>
      </div>
    </m.div>
  );
}
