'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Arrow } from '@/components/ui/Button';
import { JELLY_BTN } from '@/components/join/jelly';
import Select from '@/components/join/Select';
import DobPicker, { isAdult, parseDob } from '@/components/join/DobPicker';

const EXPERIENCE = [
  'No experience yet',
  'Less than 1 year',
  '1–3 years',
  '3–5 years',
  '5+ years',
];
const AVAILABILITY = [
  'Immediately',
  'Within a week',
  'Within 2 weeks',
  'Within a month',
];

const FIELD =
  'h-14 w-full rounded-2xl border border-line bg-white px-5 text-base text-ink placeholder:text-ink-faint outline-none transition-colors focus:border-teal focus:ring-2 focus:ring-teal/20';

const AREA = FIELD.replace('h-14', 'min-h-[104px] resize-y py-4');

/* white panel with only a whisper of the brand green: a thin dark-green bar along the top */
const PANEL =
  'relative isolate overflow-hidden rounded-[32px] bg-white shadow-float ring-1 ring-teal/10';

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
  labelClassName = 'text-teal-dark',
  children,
}: {
  label: string;
  className?: string;
  labelClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <span
        className={`mb-2 block text-[15px] font-semibold ${labelClassName}`}
      >
        {label} <span className="text-teal">*</span>
      </span>
      {children}
    </div>
  );
}

export default function ApplicationForm() {
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [experience, setExperience] = useState('');
  const [start, setStart] = useState('');
  const [dob, setDob] = useState('');
  const [tried, setTried] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const born = parseDob(dob);
  const dobInvalid = !born;
  const dobUnderage = !!born && !isAdult(born);

  const closeThanks = () => {
    setDone(false);
    setTried(false);
    setApiError(null);
    setExperience('');
    setStart('');
    setDob('');
    formRef.current?.reset();
  };

  useEffect(() => {
    if (!done) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeThanks();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [done]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTried(true);
    setApiError(null);

    if (!experience || !start || dobInvalid || dobUnderage) {
      return;
    }

    const form = formRef.current;
    if (!form) return;

    const formData = new FormData(form);
    const payload = {
      full_name: (formData.get('name') as string)?.trim(),
      phone: (formData.get('mobile') as string)?.trim(),
      dob: dob.trim(),
      languages: (formData.get('languages') as string)?.trim(),
      experience: experience.trim(),
      availability: start.trim(),
      current_address: (formData.get('currentAddress') as string)?.trim(),
      permanent_address: (formData.get('permanentAddress') as string)?.trim(),
      consent_contact: true,
    };

    setSubmitting(true);
    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res
          .json()
          .catch(() => ({ error: 'Failed to submit application' }));
        throw new Error(
          errorData.error || errorData.detail || 'Failed to submit application'
        );
      }

      setDone(true);
    } catch (err: any) {
      setApiError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className={`${PANEL} p-6 sm:p-10 lg:p-14`}
      >
        <Glow />
        <h3 className="relative font-display text-h3 font-semibold text-teal-dark lg:text-4xl">
          Caregiver application
        </h3>
        <p className="relative mt-2 text-ink-muted">
          Fields marked * are required.
        </p>

        {apiError && (
          <div className="relative mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
            {apiError}
          </div>
        )}

        <div className="relative mt-8 grid gap-6 sm:grid-cols-2">
          <Field label="Full name">
            <input
              required
              name="name"
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
          <Field label="Current address" className="sm:col-span-2">
            <textarea
              required
              name="currentAddress"
              rows={3}
              placeholder="House / flat, street, area, city, pincode"
              className={AREA}
            />
          </Field>
          <Field label="Permanent address" className="sm:col-span-2">
            <textarea
              required
              name="permanentAddress"
              rows={3}
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
              type="checkbox"
              className="mt-0.5 h-6 w-6 shrink-0 rounded-md accent-teal"
            />
            <span>
              I agree that FamCare may contact me about this application by
              phone or WhatsApp. <span className="text-teal">*</span>
            </span>
          </label>
          <button
            type="submit"
            disabled={submitting}
            className={`${JELLY_BTN} h-12 px-7 text-base ${submitting ? 'cursor-not-allowed opacity-75' : ''}`}
          >
            <span className="relative z-10 inline-flex items-center gap-2.5">
              {submitting ? 'SUBMITTING...' : 'SUBMIT'}{' '}
              {!submitting && <Arrow />}
            </span>
          </button>
        </div>
        <p className="relative mt-4 text-sm text-ink-muted">
          We use your details only for recruitment. Please don’t share Aadhaar
          numbers or other documents here.
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
              <h3
                id="thanks-title"
                className="mt-5 font-display text-3xl font-bold text-ink"
              >
                Thank you for applying.
              </h3>
              <p className="mt-3 text-ink-muted">
                Our hiring team will review your details and contact you if you
                are shortlisted.
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
          document.body
        )}
    </>
  );
}
