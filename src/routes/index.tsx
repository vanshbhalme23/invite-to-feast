import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import {
  ArrowUpRight,
  CalendarDays,
  Clock3,
  Crown,
  Drumstick,
  Flame,
  GraduationCap,
  MapPin,
  Minus,
  Plus,
  Sprout,
  Utensils,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import posterAsset from "@/assets/fresh-aura-2k26-poster.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Arambha 2K26 · Freshers Party Invitation" },
      { name: "description", content: "Save the date and join the Arambha 2K26 Freshers Party at ED Hall." },
      { property: "og:title", content: "Arambha 2K26 · Freshers Party Invitation" },
      { property: "og:description", content: "Save the date and join the Arambha 2K26 Freshers Party at ED Hall." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [roll, setRoll] = useState("");
  const [zoom, setZoom] = useState(1);

  function advance(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStep((current) => Math.min(current + 1, 4));
  }

  return (
    <main className="flex min-h-screen min-h-svh items-center justify-center bg-background px-4 py-8 text-foreground">
      <section
        aria-live="polite"
        className="w-full max-w-[430px] rounded-[20px] border border-border bg-card p-6 shadow-sm sm:p-6"
      >
        {step === 0 && (
          <>
            <p className="mb-6 flex items-center gap-1 text-[10px] font-medium text-muted-foreground">
              <span aria-hidden="true">●</span> CLASSIFIED INFORMATION <span aria-hidden="true">●</span>
            </p>
            <h1 className="mb-6 text-[42px] font-extrabold leading-[0.92]">
              SAVE<br />THE DATE.
            </h1>
            <div className="mb-7 space-y-3 text-base">
              <p className="flex items-center gap-2"><CalendarDays aria-hidden="true" className="size-4 text-primary" />14 OCTOBER 2024</p>
              <p className="flex items-center gap-2"><Clock3 aria-hidden="true" className="size-4 text-primary" />9:00 AM ONWARDS</p>
              <p className="flex items-center gap-2"><MapPin aria-hidden="true" className="size-4 text-primary" />ED HALL</p>
            </div>
            <Button variant="invite" className="h-11 w-full text-xs" onClick={() => setStep(1)}>
              TELL ME WHAT TO DO →
            </Button>
          </>
        )}

        {step === 1 && (
          <form onSubmit={advance} className="space-y-4">
            <h1 className="flex items-start gap-2 text-2xl font-bold leading-tight">What’s your good name, Junior? <Crown aria-hidden="true" className="mt-1 size-5 shrink-0 text-celebration" /></h1>
            <label className="sr-only" htmlFor="junior-name">Your name</label>
            <input
              id="junior-name"
              autoComplete="given-name"
              className="invite-field h-11 w-full rounded-xl border border-input px-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
              placeholder="Enter your name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <Button variant="invite" className="h-11 w-full text-xs" type="submit">CONTINUE →</Button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={advance} className="space-y-4">
            <h1 className="flex items-center gap-2 text-2xl font-bold leading-tight">Show Your ID <GraduationCap aria-hidden="true" className="size-6 shrink-0 text-primary" /></h1>
            <label className="sr-only" htmlFor="junior-roll">Your roll number</label>
            <input
              id="junior-roll"
              className="invite-field h-11 w-full rounded-xl border border-input px-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
              placeholder="Your Roll No"
              value={roll}
              onChange={(event) => setRoll(event.target.value)}
            />
            <Button variant="invite" className="h-11 w-full text-xs" type="submit">I AM A JUNIOR →</Button>
          </form>
        )}

        {step === 3 && (
          <div>
            <h1 className="mb-6 text-2xl font-bold leading-tight">One serious question <Utensils aria-hidden="true" className="inline size-5 text-celebration" /><br />Veg or Non-Veg?</h1>
            <div className="space-y-3">
              <Button variant="invite" className="h-11 w-full text-xs" onClick={() => setStep(4)}>VEG <Sprout aria-hidden="true" className="size-4" /></Button>
              <Button variant="invite" className="h-11 w-full text-xs" onClick={() => setStep(4)}>NON-VEG <Drumstick aria-hidden="true" className="size-4" /></Button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="py-1 text-center">
            <h1 className="mb-5 text-[32px] font-bold leading-[1.15] text-celebration">
              YOU’RE IN! <Flame aria-hidden="true" className="inline size-7" /><br />Welcome to ARAMBHA 2K26
            </h1>
            <p className="mb-7 text-sm text-muted-foreground">Now get ready for what’s next!</p>
            <Button variant="celebration" className="h-11 w-full text-xs" onClick={() => setStep(5)}>
              SHOW ME THE POSTER <Flame aria-hidden="true" className="size-4" />
            </Button>
          </div>
        )}

        {step === 5 && (
          <div className="text-center">
            <h1 className="text-2xl font-bold leading-tight">FRESH AURA 2K26<br />FRESHER’S PARTY</h1>
            <p className="mt-4 text-base">23rd OCT • 10:30 AM • SHIVSHANKAR SABHAGRUA</p>
            <div className="relative mt-4 flex h-[450px] items-center justify-center overflow-hidden rounded-2xl bg-muted">
              <a
                href={posterAsset.url}
                target="_blank"
                rel="noreferrer"
                aria-label="Open the FRESH AURA 2K26 poster in a new tab"
                className="absolute right-3 top-3 z-10 inline-flex size-9 items-center justify-center rounded-sm bg-background/85 text-foreground"
              >
                <ArrowUpRight aria-hidden="true" className="size-5" />
              </a>
              <img
                src={posterAsset.url}
                alt="FRESH AURA 2K26 Fresher's Party invitation poster"
                className="h-full max-w-full object-contain transition-transform duration-200"
                style={{ transform: `scale(${zoom})` }}
              />
              <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-background/85 p-1">
                <Button variant="ghost" size="icon" aria-label="Zoom out" disabled={zoom <= 0.75} onClick={() => setZoom((value) => Math.max(0.75, value - 0.25))}>
                  <Minus aria-hidden="true" />
                </Button>
                <Button variant="ghost" size="icon" aria-label="Zoom in" disabled={zoom >= 1.5} onClick={() => setZoom((value) => Math.min(1.5, value + 0.25))}>
                  <Plus aria-hidden="true" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
