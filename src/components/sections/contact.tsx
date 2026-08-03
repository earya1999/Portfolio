"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Linkedin,
  Github,
  Calendar,
  Instagram,
  MapPin,
  Copy,
  Check,
  Send,
  Download,
} from "lucide-react";
import { toast } from "sonner";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/magnetic";
import { Spotlight } from "@/components/spotlight";
import { profile } from "@/lib/content";

export function Contact() {
  const [copied, setCopied] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [honeypot, setHoneypot] = React.useState("");

  const onCopy = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    toast.success("Email copied");
    setTimeout(() => setCopied(false), 1600);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (honeypot) {
      toast.error("Blocked by spam filter.");
      return;
    }
    setSubmitting(true);
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const message = String(form.get("message") || "").trim();

    if (!name || !email || !message) {
      toast.error("Please fill in all fields.");
      setSubmitting(false);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email.");
      setSubmitting(false);
      return;
    }

    const endpoint = process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT;
    try {
      if (endpoint) {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ name, email, message }),
        });
        if (!res.ok) throw new Error("Bad response");
        toast.success("Message sent — I'll reply within 24 hours.");
      } else {
        const subject = encodeURIComponent(`Portfolio contact — ${name}`);
        const body = encodeURIComponent(`${message}\n\n— ${name} <${email}>`);
        window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
        toast.success("Opening your mail client…");
      }
      (e.currentTarget as HTMLFormElement).reset();
    } catch {
      toast.error("Something went wrong. Please email me directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's build something that works."
      description="I'm interested in implementation, solutions consulting, professional services, AI deployment, and customer-facing technology roles."
      accent="emerald"
    >
      <div className="grid gap-6 lg:grid-cols-5">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4 }}
          className="lg:col-span-2 flex flex-col gap-4"
        >
          <div className="flex flex-col gap-2 rounded-2xl border border-border/60 bg-card/60 p-6">
            <div className="eyebrow">Direct</div>
            <div className="mt-1 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <a
                  href={`mailto:${profile.email}`}
                  className="truncate text-lg font-medium hover:underline"
                >
                  {profile.email}
                </a>
                <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="size-3.5" />
                  {profile.location}
                </div>
              </div>
              <Button size="icon" variant="secondary" onClick={onCopy} aria-label="Copy email">
                {copied ? <Check /> : <Copy />}
              </Button>
            </div>
          </div>

          <a
            href={profile.socials.calendly}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between rounded-2xl border border-border/60 bg-card/60 p-6 transition-all hover:border-foreground/20 hover:bg-card"
          >
            <div>
              <div className="eyebrow">Book time</div>
              <div className="mt-1 text-base font-medium">Schedule a 30-minute intro</div>
              <div className="mt-1 text-xs text-muted-foreground">
                Available for conversations about open roles
              </div>
            </div>
            <Calendar className="size-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
          </a>

          <div className="grid grid-cols-2 gap-3">
            <SocialTile href={profile.socials.linkedin} icon={Linkedin} label="LinkedIn" />
            <SocialTile href={profile.socials.github} icon={Github} label="GitHub" />
            <SocialTile href={profile.socials.instagram} icon={Instagram} label="Instagram" />
            <SocialTile href={profile.resumeUrl} icon={Download} label="Resume" download />
          </div>
        </motion.div>

        <Spotlight className="lg:col-span-3 rounded-2xl">
        <motion.form
          onSubmit={onSubmit}
          noValidate
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="relative rounded-2xl border border-border/60 bg-card/60 p-6"
        >
          <div className="eyebrow mb-4">Send a message</div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name" name="name" required autoComplete="name" />
            <Field label="Email" name="email" type="email" required autoComplete="email" />
          </div>
          <Field label="Company (optional)" name="company" autoComplete="organization" />
          <Field
            label="What are you working on?"
            name="message"
            textarea
            required
            placeholder="Role, team, or what you'd like to discuss"
          />
          {/* Honeypot — hidden from real users */}
          <div className="absolute -left-[9999px]" aria-hidden>
            <label>
              Company website
              <input
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </label>
          </div>
          <div className="mt-4 flex items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground">
              I typically respond within one business day.
            </p>
            <Magnetic>
              <Button type="submit" disabled={submitting}>
                <Send />
                {submitting ? "Sending…" : "Send message"}
              </Button>
            </Magnetic>
          </div>
        </motion.form>
        </Spotlight>
      </div>
    </Section>
  );
}

function SocialTile({
  href,
  icon: Icon,
  label,
  download,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  download?: boolean;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      download={download}
      className="flex items-center gap-2 rounded-xl border border-border/60 bg-background/60 p-3 text-sm text-foreground/80 transition-all hover:border-foreground/20 hover:bg-card hover:text-foreground"
    >
      <Icon className="size-4" />
      {label}
    </a>
  );
}

interface FieldProps {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  placeholder?: string;
  textarea?: boolean;
}

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
  placeholder,
  textarea,
}: FieldProps) {
  const cls =
    "mt-2 w-full rounded-xl border border-border bg-background/60 px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:border-foreground/40 focus:ring-2 focus:ring-ring/30";
  return (
    <label className="mt-4 block first:mt-0">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      {textarea ? (
        <textarea
          name={name}
          required={required}
          placeholder={placeholder}
          rows={5}
          className={cls}
        />
      ) : (
        <input
          name={name}
          type={type}
          required={required}
          autoComplete={autoComplete}
          placeholder={placeholder}
          className={cls}
        />
      )}
    </label>
  );
}
