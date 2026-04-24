"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function CreatePatientForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage(null);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    const response = await fetch("/api/patients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    setIsSubmitting(false);

    if (!response.ok) {
      setError(result.message ?? "Unable to create patient account.");
      return;
    }

    event.currentTarget.reset();
    setMessage(`Patient account created for ${result.email}.`);
    router.refresh();
  }

  return (
    <section className="rounded-[24px] border bg-slate-950 p-6 text-white">
      <div className="space-y-2">
        <p className="text-sm uppercase tracking-[0.25em] text-skycare-100">
          Create Patient
        </p>
        <h2 className="text-2xl font-semibold">Issue secure patient access</h2>
        <p className="text-sm leading-6 text-slate-300">
          New patient logins are restricted to doctor-created accounts.
        </p>
      </div>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <Field label="Full name" name="fullName" placeholder="Fatima Benali" required />
        <Field label="Email" name="email" type="email" placeholder="fatima@healix.dev" required />
        <Field label="Temporary password" name="password" type="password" placeholder="Strong temporary password" required />
        <Field label="Age" name="age" type="number" placeholder="59" />
        <Field label="Primary disease" name="disease" placeholder="Hypertension" />

        {error ? (
          <p className="rounded-2xl border border-rose-300/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
            {error}
          </p>
        ) : null}

        {message ? (
          <p className="rounded-2xl border border-healix-300/20 bg-healix-500/10 px-4 py-3 text-sm text-healix-100">
            {message}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-medium text-slate-950 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          Create patient account
        </button>
      </form>
    </section>
  );
}

function Field({
  label,
  name,
  placeholder,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-slate-200" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-400 focus:border-skycare-400 focus:ring-2 focus:ring-skycare-400/20"
      />
    </div>
  );
}
