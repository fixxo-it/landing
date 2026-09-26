"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Arrow } from "@/components/ui/Button";
import { JELLY_BTN } from "@/components/join/jelly";
import Select from "@/components/join/Select";
import DobPicker, { isAdult, parseDob } from "@/components/join/DobPicker";

const EXPERIENCE = ["No experience yet", "Less than 1 year", "1–3 years", "3–5 years", "5+ years"];
const AVAILABILITY = ["Immediately", "Within a week", "Within 2 weeks", "Within a month"];

const FIELD =
  "h-14 w-full rounded-2xl border border-line bg-white px-5 text-base text-ink placeholder:text-ink-faint outline-none transition-colors focus:border-teal focus:ring-2 focus:ring-teal/20";

const AREA = FIELD.replace("h-14", "min-h-[104px] resize-y py-4");

/* white panel with only a whisper of the brand green: a thin dark-green bar along the top */
const PANEL =
  "relative isolate overflow-hidden rounded-[32px] bg-white shadow-float ring-1 ring-teal/10";

function Glow() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-1.5 bg-gradient-to-r from-teal-dark to-teal"
      />
    </>
  );
}

function Field({
  label,
  className,
  labelClassName = "text-teal-dark",
  count,
  maxCount,
  children,
}: {
  label: string;
  className?: string;
  labelClassName?: string;
  count?: number;
  maxCount?: number;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <div className="mb-2 flex items-center justify-between">
        <span className={`block text-[15px] font-semibold ${labelClassName}`}>
          {label} <span className="text-teal">*</span>
        </span>
        {maxCount && count !== undefined ? (
          <span
            className={`text-xs ${count > maxCount * 0.9 ? "font-medium text-[#B4432F]" : "text-ink-faint"}`}
          >
            {count}/{maxCount}
          </span>
        ) : null}
      </div>
      {children}
    </div>
  );
}

export default function ApplicationForm() {
  const [done, setDone] = useState(false);
  const [experience, setExperience] = useState("");
  const [start, setStart] = useState("");
  const [dob, setDob] = useState("");
  const [currentAddress, setCurrentAddress] = useState("");
  const [permanentAddress, setPermanentAddress] = useState("");
  const [tried, setTried] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const born = parseDob(dob);
  const dobInvalid = !born;
  const dobUnderage = !!born && !isAdult(born);

  const closeThanks = () => {
    setDone(false);
    setTried(false);
    setSubmitError(null);
    setExperience("");
    setStart("");
    setDob("");
    setCurrentAddress("");
    setPermanentAddress("");
    formRef.current?.reset();
  };

  useEffect(() => {
    if (!done) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeThanks();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [done]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTried(true);
    setSubmitError(null);

    if (!experience || !start || dobInvalid || dobUnderage) {
      return;
    }

    const form = formRef.current;
    if (!form) return;

    const formData = new FormData(form);
    const fullName = String(formData.get("name") || "").trim();
    const phone = String(formData.get("mobile") || "").trim();
    const languages = String(formData.get("languages") || "").trim();
    const consent = formData.get("consent") === "on";
    const website = String(formData.get("website") || "").trim(); // Honeypot

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: fullName,
          phone,
          dob,
          languages,
          experience,
          availability: start,
          current_address: currentAddress,
          permanent_address: permanentAddress,
          consent_contact: consent,
          website,
        }),
      });

      const json = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(
          json?.error || json?.detail || "Failed to submit application. Please try again.",
        );
      }

      setDone(true);
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please check your details and try again.";
      setSubmitError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form ref={formRef} onSubmit={handleSubmit} className={`${PANEL} p-6 sm:p-10 lg:p-14`}>
        <Glow />
        <h3 className="relative font-display text-h3 font-semibold text-teal-dark lg:text-4xl">
          Caregiver application
        </h3>
        <p className="relative mt-2 text-ink-muted">Fields marked * are required.</p>

        {submitError && (
          <div className="relative mt-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50/80 p-4 text-sm text-[#B4432F]">
            <span className="shrink-0 text-base">⚠️</span>
            <div className="flex-1 font-medium">{submitError}</div>
          </div>
        )}

        {/* Honeypot field - Invisible to legitimate users, filled by bots */}
        <div
          className="hidden"
          aria-hidden="true"
          style={{ display: "none", position: "absolute", left: "-9999px" }}
        >
          <label htmlFor="website">Website</label>
          <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="relative mt-8 grid gap-6 sm:grid-cols-2">
          <Field label="Full name">
            <input
              required
              name="name"
              maxLength={100}
              placeholder="As on your ID"
              className={FIELD}
            />
          </Field>
          <Field label="Mobile number">
            <input
              required
              name="mobile"
              type="tel"
              inputMode="numeric"
              pattern="[0-9]{10}"
              maxLength={15}
              placeholder="10-digit number"
              className={FIELD}
            />
          </Field>
          <Field label="Date of birth" labelClassName="text-ink">
            <DobPicker
              value={dob}
              onChange={setDob}
              invalid={tried && (dobInvalid || dobUnderage)}
            />
            {tried && dobInvalid && (
              <p className="mt-2 text-sm font-medium text-[#B4432F]">
                Enter a valid date as DD/MM/YYYY.
              </p>
            )}
            {tried && dobUnderage && (
              <p className="mt-2 text-sm font-medium text-[#B4432F]">
                You must be 18 or older to apply.
              </p>
            )}
          </Field>
          <Field label="Languages you speak">
            <input
              required
              name="languages"
              maxLength={255}
              placeholder="e.g. Kannada, Hindi"
              className={FIELD}
            />
          </Field>
          <Field label="Baby care experience">
            <Select
              value={experience}
              onChange={setExperience}
              options={EXPERIENCE}
              placeholder="Select experience"
              invalid={tried && !experience}
            />
          </Field>
          <Field label="When can you start?">
            <Select
              value={start}
              onChange={setStart}
              options={AVAILABILITY}
              placeholder="Select availability"
              invalid={tried && !start}
            />
          </Field>
          <Field
            label="Current address"
            className="sm:col-span-2"
            count={currentAddress.length}
            maxCount={500}
          >
            <textarea
              required
              name="currentAddress"
              rows={3}
              maxLength={500}
              value={currentAddress}
              onChange={(e) => setCurrentAddress(e.target.value)}
              placeholder="House / flat, street, area, city, pincode"
              className={AREA}
            />
          </Field>
          <Field
            label="Permanent address"
            className="sm:col-span-2"
            count={permanentAddress.length}
            maxCount={500}
          >
            <textarea
              required
              name="permanentAddress"
              rows={3}
              maxLength={500}
              value={permanentAddress}
              onChange={(e) => setPermanentAddress(e.target.value)}
              placeholder="House / flat, street, area, city, pincode"
              className={AREA}
            />
          </Field>
        </div>

        <hr className="relative my-8 border-line" />

        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <label className="flex items-start gap-3 text-[15px] font-semibold text-ink">
            <input
              required
              name="consent"
              type="checkbox"
              defaultChecked
              className="mt-0.5 h-6 w-6 shrink-0 rounded-md accent-teal"
            />
            <span>
              I agree that FamCare may contact me about this application by phone or WhatsApp.{" "}
              <span className="text-teal">*</span>
            </span>
          </label>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`${JELLY_BTN} h-12 px-7 text-base disabled:opacity-70`}
          >
            <span className="relative z-10 inline-flex items-center gap-2.5">
              {isSubmitting ? "SUBMITTING..." : "SUBMIT"} {!isSubmitting && <Arrow />}
            </span>
          </button>
        </div>
        <p className="relative mt-4 text-sm text-ink-muted">
          We use your details only for recruitment. Please don’t share Aadhaar numbers or other
          documents here.
        </p>
      </form>

      {done &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/50 px-6 backdrop-blur-sm"
            onClick={closeThanks}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="thanks-title"
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-[440px] rounded-[28px] bg-white p-8 text-center shadow-float sm:p-10"
            >
              <span
                className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-teal text-3xl text-lime"
                aria-hidden
              >
                ✓
              </span>
              <h3 id="thanks-title" className="mt-5 font-display text-3xl font-bold text-ink">
                Thank you for applying.
              </h3>
              <p className="mt-3 text-ink-muted">
                Our hiring team will review your details and contact you if you are shortlisted.
              </p>
              <button
                type="button"
                onClick={closeThanks}
                className={`${JELLY_BTN} mt-7 h-12 px-8 text-base`}
              >
                <span className="relative z-10">DONE</span>
              </button>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
