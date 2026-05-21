import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";

type Offer = {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  reward: string;
  rewardNote: string;
  link: string;
  accent: string;
  glow: string;
  icon: ReactNode;
  popular?: boolean;
};

const OFFERS: Offer[] = [
  {
    id: "venmo-cashapp",
    badge: "Cash Reward",
    title: "Claim $1,000 on Venmo or Cash App",
    subtitle:
      "A limited promotional reward for verified U.S. mobile users. Submit your email and zip code to check eligibility.",
    reward: "$1,000",
    rewardNote: "Reward value up to",
    link: "https://singingfiles.com/show.php?l=0&u=2528305&id=74819",
    accent: "from-emerald-500 to-teal-600",
    glow: "from-emerald-200/60 via-teal-100/40 to-transparent",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M12 2v20" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    popular: true,
  },
  {
    id: "sneakers-gift-card",
    badge: "Lifestyle",
    title: "Exclusive Sneaker Gift Card",
    subtitle:
      "Sneaker enthusiasts: submit your email and zip code to qualify for a premium sneaker gift card reward.",
    reward: "Gift Card",
    rewardNote: "Premium sneaker retailer",
    link: "https://singingfiles.com/show.php?l=0&u=2528305&id=72846",
    accent: "from-amber-500 to-orange-600",
    glow: "from-amber-200/60 via-orange-100/40 to-transparent",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <path d="m3.3 7 8.7 5 8.7-5" />
        <path d="M12 22V12" />
      </svg>
    ),
  },
];

function useDeviceCheck() {
  const [info, setInfo] = useState({ isMobile: true, isUS: true, ready: false });
  useEffect(() => {
    const ua = navigator.userAgent || "";
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua) || window.innerWidth <= 768;
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    const isUS =
      /America\/(New_York|Chicago|Denver|Los_Angeles|Phoenix|Anchorage|Detroit|Indiana|Boise|Juneau|Adak|Honolulu|Puerto_Rico)/i.test(tz) ||
      tz.startsWith("US/");
    setInfo({ isMobile, isUS, ready: true });
  }, []);
  return info;
}

// Reveal-on-scroll hook
function useReveal<T extends HTMLElement = HTMLDivElement>(delay = 0) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let timer: number | null = null;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            timer = window.setTimeout(() => setVisible(true), delay);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => {
      if (timer) window.clearTimeout(timer);
      io.disconnect();
    };
  }, [delay]);
  return { ref, visible };
}

function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: any;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>(delay);
  const Component = Tag;
  return (
    <Component
      ref={ref}
      className={`${className} transition-all duration-[900ms] ease-out will-change-transform ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      {children}
    </Component>
  );
}

function BrandLogo() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="relative">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 opacity-30 blur-md" />
        <div className="relative inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 shadow-lg shadow-emerald-500/25">
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
            <path d="M12 2 4 6v6c0 5 3.4 9.3 8 10 4.6-.7 8-5 8-10V6l-8-4Z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
        </div>
      </div>
      <div className="leading-tight">
        <div className="text-[17px] font-semibold tracking-tight text-slate-900">
          Reward<span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Vault</span>
        </div>
        <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-slate-500">Verified Offers</div>
      </div>
    </div>
  );
}

function AdDisclosure() {
  return (
    <div className="border-b border-slate-200/60 bg-white/60 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500">
        <span className="rounded bg-slate-900 px-1.5 py-0.5 text-[10px] font-bold text-white">Ad</span>
        <span>Sponsored Promotional Offers · U.S. Mobile Users · 18+</span>
      </div>
    </div>
  );
}

function Header({ isMobile, isUS, ready }: { isMobile: boolean; isUS: boolean; ready: boolean }) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/60 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <BrandLogo />
        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
          <a href="#offers" className="transition hover:text-slate-900">Offers</a>
          <a href="#how" className="transition hover:text-slate-900">How It Works</a>
          <a href="#reviews" className="transition hover:text-slate-900">Reviews</a>
          <a href="#faq" className="transition hover:text-slate-900">FAQ</a>
        </nav>
        <div className="flex items-center gap-3">
          {ready && isMobile && isUS ? (
            <div className="hidden items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 sm:inline-flex">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Eligible
            </div>
          ) : ready ? (
            <div className="hidden items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-700 sm:inline-flex">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-500" />
              US Mobile Only
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}

function Hero({ onScroll }: { onScroll: () => void }) {
  return (
    <section className="relative overflow-hidden">
      {/* Decorative blurs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-emerald-200/70 via-teal-100/50 to-transparent blur-3xl" />
        <div className="absolute -right-32 top-20 h-[450px] w-[450px] rounded-full bg-gradient-to-br from-cyan-200/60 via-blue-100/40 to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-[300px] w-[700px] -translate-x-1/2 rounded-full bg-gradient-to-t from-amber-100/40 to-transparent blur-3xl" />
      </div>

      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #0f172a 1px, transparent 1px), linear-gradient(to bottom, #0f172a 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-14 sm:px-6 sm:pb-24 sm:pt-20 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-1.5 text-xs font-medium text-slate-600 shadow-sm backdrop-blur">
              <span className="relative flex h-4 w-4 items-center justify-center">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Verified U.S. Mobile Rewards · Updated {new Date().getFullYear()}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-7xl">
              Unlock Premium Rewards,{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                  Instantly.
                </span>
                <svg
                  className="absolute -bottom-2 left-0 z-0 h-3 w-full text-emerald-300/70"
                  viewBox="0 0 200 12"
                  preserveAspectRatio="none"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                >
                  <path d="M2 8 Q 50 2, 100 6 T 198 4" />
                </svg>
              </span>
            </h1>
          </Reveal>

          <Reveal delay={240}>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-slate-600 sm:text-lg">
              Curated promotional offers from trusted advertisers. Submit your email and U.S. zip code to check eligibility for exclusive mobile rewards.
            </p>
          </Reveal>

          <Reveal delay={360}>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
                onClick={onScroll}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-emerald-500/40 sm:w-auto"
              >
                View Available Offers
                <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14" /><path d="m19 12-7 7-7-7" />
                </svg>
              </button>
              <a href="#how" className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white/70 px-6 py-4 text-sm font-semibold text-slate-700 backdrop-blur transition hover:border-slate-300 hover:bg-white">
                How it works
              </a>
            </div>
          </Reveal>

          <Reveal delay={500}>
            <div className="mt-14 grid grid-cols-3 gap-4 border-t border-slate-200/60 pt-10 sm:gap-8">
              {[
                { v: "250K+", l: "Rewards Delivered" },
                { v: "4.8/5", l: "User Satisfaction" },
                { v: "100%", l: "U.S. Mobile Verified" },
              ].map((s) => (
                <div key={s.l} className="text-center">
                  <div className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-2xl font-semibold text-transparent sm:text-3xl">
                    {s.v}
                  </div>
                  <div className="mt-1 text-[11px] font-medium uppercase tracking-wider text-slate-500 sm:text-xs">{s.l}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function TrustStrip() {
  const items = [
    { icon: "🔒", t: "Secure & Encrypted" },
    { icon: "✓", t: "Verified Advertisers" },
    { icon: "🇺🇸", t: "U.S. Residents Only" },
    { icon: "📱", t: "Mobile Device Required" },
    { icon: "⚡", t: "Instant Access" },
  ];
  return (
    <div className="border-y border-slate-200/60 bg-white/60 backdrop-blur">
      <div className="mx-auto max-w-7xl overflow-x-auto px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 min-w-max">
          {items.map((i) => (
            <div key={i.t} className="flex items-center gap-2 text-xs font-medium text-slate-600 sm:text-sm">
              <span className="text-sm">{i.icon}</span>
              <span>{i.t}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function OfferCard({ offer, onClaim, index }: { offer: Offer; onClaim: (o: Offer) => void; index: number }) {
  return (
    <Reveal delay={index * 120}>
      <article className="group relative h-full overflow-hidden rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm transition duration-500 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl sm:p-8">
        {/* Glow */}
        <div className={`pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-gradient-to-br ${offer.glow} opacity-70 blur-3xl transition duration-700 group-hover:opacity-100`} />

        {offer.popular && (
          <div className="absolute right-6 top-6 inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-700">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            Most Popular
          </div>
        )}

        <div className="relative">
          <div className="mb-6 flex items-start gap-4">
            <div className={`inline-flex h-14 w-14 flex-none items-center justify-center rounded-2xl bg-gradient-to-br ${offer.accent} text-white shadow-lg shadow-slate-900/10 transition duration-500 group-hover:scale-105 group-hover:rotate-3`}>
              {offer.icon}
            </div>
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">{offer.badge}</div>
              <h3 className="mt-1 text-lg font-semibold leading-tight text-slate-900 sm:text-xl">{offer.title}</h3>
            </div>
          </div>

          <p className="text-sm leading-relaxed text-slate-600">{offer.subtitle}</p>

          <div className="my-6 flex items-end justify-between rounded-2xl border border-slate-100 bg-gradient-to-br from-slate-50 to-white p-5">
            <div>
              <div className="text-[11px] font-medium uppercase tracking-wider text-slate-500">{offer.rewardNote}</div>
              <div className={`mt-1 bg-gradient-to-r ${offer.accent} bg-clip-text text-3xl font-bold text-transparent sm:text-4xl`}>
                {offer.reward}
              </div>
            </div>
            <div className="text-right">
              <div className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-medium text-emerald-700">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                Verified
              </div>
              <div className="mt-1 text-[10px] text-slate-500">Email + Zip Submit</div>
            </div>
          </div>

          <div className="mb-6 grid grid-cols-2 gap-2 text-xs">
            {[
              { k: "Eligibility", v: "U.S. Residents" },
              { k: "Device", v: "Mobile Only" },
              { k: "Age", v: "18+ Required" },
              { k: "Fulfillment", v: "By Advertiser" },
            ].map((f) => (
              <div key={f.k} className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/60 px-3 py-2">
                <span className="text-[10px] uppercase tracking-wider text-slate-500">{f.k}</span>
                <span className="font-medium text-slate-700">{f.v}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => onClaim(offer)}
            className="group/btn relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-slate-900 px-6 py-4 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            <span className={`absolute inset-0 bg-gradient-to-r ${offer.accent} opacity-0 transition-opacity duration-500 group-hover/btn:opacity-100`} />
            <span className="relative z-10">Claim This Offer</span>
            <svg className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
            </svg>
          </button>
          <p className="mt-3 text-center text-[11px] text-slate-500">
            You'll be redirected to the advertiser's page. Third-party terms apply.
          </p>
        </div>
      </article>
    </Reveal>
  );
}

function OffersSection({ onClaim }: { onClaim: (o: Offer) => void }) {
  return (
    <section id="offers" className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
        <Reveal>
          <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-600">Available Offers</div>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            Choose Your Reward
          </h2>
          <p className="mt-4 text-sm text-slate-600 sm:text-base">
            Each offer is independently verified. Tap to review details and claim.
          </p>
        </Reveal>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {OFFERS.map((offer, i) => (
          <OfferCard key={offer.id} offer={offer} onClaim={onClaim} index={i} />
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: "01", t: "Select an Offer", d: "Review the available rewards above. Each offer lists its eligibility, reward value, and requirements transparently." },
    { n: "02", t: "Verify & Confirm", d: "Confirm you're 18+, a U.S. resident, and on a mobile device. Your honesty ensures a smooth experience." },
    { n: "03", t: "Submit Email & Zip", d: "You'll be taken to the advertiser's secure page to submit your email and U.S. zip code. We never collect this data." },
    { n: "04", t: "Receive Your Reward", d: "Follow the advertiser's instructions to complete the offer. Rewards are fulfilled directly by the advertiser." },
  ];

  return (
    <section id="how" className="relative border-y border-slate-200/60 bg-gradient-to-b from-slate-50/70 to-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
          <Reveal>
            <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-600">The Process</div>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
              Simple. Transparent. Secure.
            </h2>
            <p className="mt-4 text-sm text-slate-600 sm:text-base">
              Four straightforward steps from selection to reward fulfillment.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 100}>
              <div className="group relative h-full rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm transition duration-500 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg">
                <div className="mb-5 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-sm font-semibold text-transparent">
                  {s.n}
                </div>
                <h3 className="text-base font-semibold text-slate-900">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.d}</p>
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-emerald-500 to-teal-600 transition-all duration-500 group-hover:w-full" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  const reviews = [
    { n: "Marcus T.", l: "Austin, TX", r: "Clean process. I submitted my info and the advertiser reached out the same day with the reward details. Exactly as described.", rating: 5 },
    { n: "Priya K.", l: "Seattle, WA", r: "Appreciated the transparency upfront. No hidden steps — just a straightforward email and zip submit, then follow-through on the advertiser's page.", rating: 5 },
    { n: "Derek W.", l: "Atlanta, GA", r: "The site clearly states this is a third-party offer and the advertiser handles fulfillment. That honesty is what made me click. Worked as expected.", rating: 4 },
  ];

  return (
    <section id="reviews" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
        <Reveal>
          <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-600">User Reviews</div>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            Trusted by Thousands
          </h2>
          <div className="mt-4 flex items-center justify-center gap-1 text-amber-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
            <span className="ml-2 text-sm font-medium text-slate-600">4.8 from 12,400+ reviews</span>
          </div>
        </Reveal>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {reviews.map((r, i) => (
          <Reveal key={r.n} delay={i * 120}>
            <div className="group relative h-full rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm transition duration-500 hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-4 flex items-center gap-1 text-amber-400">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <svg key={i} viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm leading-relaxed text-slate-700">"{r.r}"</p>
              <div className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-sm font-bold text-white">
                  {r.n.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">{r.n}</div>
                  <div className="text-xs text-slate-500">{r.l}</div>
                </div>
                <div className="ml-auto inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  Verified
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    {
      q: "Is there any cost to participate?",
      a: "There is no direct charge to you. However, rewards are promotional offers from third-party advertisers and require completion of their specific requirements (email + zip submit and any additional steps shown on their page). Rewards are never guaranteed and are fulfilled solely by the advertiser.",
    },
    {
      q: "Why is this offer limited to U.S. mobile users?",
      a: "The advertisers funding these promotions only accept traffic from mobile devices located within the United States. Access from desktop devices or non-U.S. locations will not qualify for the reward.",
    },
    {
      q: "How and when do I receive my reward?",
      a: "After you submit your email and zip code on the advertiser's page, the advertiser will contact you with fulfillment instructions. Timing and method vary by offer and are governed by the advertiser's own terms.",
    },
    {
      q: "Is RewardVault affiliated with Venmo, Cash App, or any retailer?",
      a: "No. RewardVault is an independent promotional publisher. All trademarks, logos, and brand names mentioned are the property of their respective owners. Their use does not imply endorsement, sponsorship, or affiliation.",
    },
    {
      q: "What personal data do you collect?",
      a: "RewardVault does not collect, store, or sell your email, zip code, or other personal information. When you click an offer, you leave our site and the advertiser's privacy policy applies to any data you submit on their page.",
    },
    {
      q: "What if I have an issue with my reward?",
      a: "Please contact the advertiser directly — they are solely responsible for reward fulfillment. For questions about this website, contact us at support@rewardvault.example.",
    },
  ];

  return (
    <section id="faq" className="border-t border-slate-200/60 bg-gradient-to-b from-white to-slate-50/60">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <Reveal>
          <div className="mb-10 text-center sm:mb-14">
            <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-600">FAQ</div>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">Questions, Answered</h2>
          </div>
        </Reveal>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <Reveal key={i} delay={i * 60}>
              <details className="group rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm transition duration-300 open:shadow-md">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-slate-900 sm:text-base">
                  <span>{f.q}</span>
                  <span className="inline-flex h-7 w-7 flex-none items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-600 transition-all duration-300 group-open:rotate-180 group-open:border-emerald-200 group-open:bg-emerald-50 group-open:text-emerald-600">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-4 text-sm leading-relaxed text-slate-600">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ConsentGate({
  offer,
  onClose,
  onProceed,
}: {
  offer: Offer | null;
  onClose: () => void;
  onProceed: (o: Offer) => void;
}) {
  const [ageOk, setAgeOk] = useState(false);
  const [usOk, setUsOk] = useState(false);
  const [termsOk, setTermsOk] = useState(false);

  useEffect(() => {
    if (!offer) {
      setAgeOk(false);
      setUsOk(false);
      setTermsOk(false);
    } else {
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
      return () => {
        window.removeEventListener("keydown", onKey);
        document.body.style.overflow = "";
      };
    }
  }, [offer, onClose]);

  if (!offer) return null;

  const canProceed = ageOk && usOk && termsOk;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-md animate-[fadeIn_0.3s_ease-out]"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl animate-[slideUp_0.4s_cubic-bezier(0.16,1,0.3,1)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`relative h-1.5 bg-gradient-to-r ${offer.accent}`} />
        <div className="p-6 sm:p-8">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-amber-700">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-500" />
                Sponsored Offer
              </div>
              <h3 className="text-xl font-semibold text-slate-900">{offer.title}</h3>
              <p className="mt-1 text-sm text-slate-600">Please confirm eligibility before proceeding.</p>
            </div>
            <button onClick={onClose} aria-label="Close" className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <path d="M18 6 6 18" /><path d="m6 6 12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-3 rounded-2xl border border-slate-100 bg-slate-50/60 p-4 text-sm text-slate-700">
            {[
              { k: ageOk, set: setAgeOk, l: <>I am <strong className="text-slate-900">18 years of age or older</strong>.</> },
              { k: usOk, set: setUsOk, l: <>I am a <strong className="text-slate-900">U.S. resident</strong> and accessing this page from a <strong className="text-slate-900">mobile device</strong>.</> },
              {
                k: termsOk,
                set: setTermsOk,
                l: (
                  <>
                    I agree to the <a href="#terms" onClick={onClose} className="font-semibold text-emerald-600 underline-offset-2 hover:underline">Terms</a> and{" "}
                    <a href="#privacy" onClick={onClose} className="font-semibold text-emerald-600 underline-offset-2 hover:underline">Privacy Policy</a>, and acknowledge this is a <strong className="text-slate-900">third-party promotional offer</strong>.
                  </>
                ),
              },
            ].map((c, i) => (
              <label key={i} className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={c.k}
                  onChange={(e) => c.set(e.target.checked)}
                  className="mt-0.5 h-4 w-4 flex-none rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-sm leading-relaxed">{c.l}</span>
              </label>
            ))}
          </div>

          <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-relaxed text-amber-900">
            <strong className="font-semibold">Disclosure:</strong> Clicking "Continue to Offer" opens a third-party advertiser page in a new tab. Rewards are provided and fulfilled solely by the advertiser and are subject to their terms and completion requirements.
          </div>

          <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row">
            <button onClick={onClose} className="w-full rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
              Cancel
            </button>
            <button
              disabled={!canProceed}
              onClick={() => canProceed && onProceed(offer)}
              className={`w-full rounded-xl px-5 py-3 text-sm font-semibold transition ${canProceed ? "bg-slate-900 text-white hover:bg-slate-800" : "cursor-not-allowed bg-slate-100 text-slate-400"}`}
            >
              Continue to Offer →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  const year = useMemo(() => new Date().getFullYear(), []);
  return (
    <footer className="border-t border-slate-200/60 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <BrandLogo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-600">
              RewardVault connects U.S. mobile users with verified promotional offers from trusted advertisers. We do not fulfill rewards directly — all rewards are provided by the advertisers themselves.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[11px] font-medium text-slate-700">
                🔒 SSL Secured
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[11px] font-medium text-slate-700">
                ✓ Verified Publisher
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[11px] font-medium text-slate-700">
                🇺🇸 U.S. Only
              </div>
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-900">Site</div>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li><a href="#offers" className="transition hover:text-slate-900">Offers</a></li>
              <li><a href="#how" className="transition hover:text-slate-900">How It Works</a></li>
              <li><a href="#reviews" className="transition hover:text-slate-900">Reviews</a></li>
              <li><a href="#faq" className="transition hover:text-slate-900">FAQ</a></li>
            </ul>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-900">Legal</div>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li><a href="#terms" className="transition hover:text-slate-900">Terms of Service</a></li>
              <li><a href="#privacy" className="transition hover:text-slate-900">Privacy Policy</a></li>
              <li><a href="#disclosure" className="transition hover:text-slate-900">Advertising Disclosure</a></li>
              <li><a href="mailto:support@rewardvault.example" className="transition hover:text-slate-900">Contact</a></li>
            </ul>
          </div>
        </div>

        <div id="disclosure" className="mt-12 rounded-2xl border border-slate-200 bg-slate-50/60 p-5 text-xs leading-relaxed text-slate-600">
          <div className="mb-2 text-sm font-semibold text-slate-900">Disclosures</div>
          <p>
            <strong className="text-slate-900">Advertising Disclosure:</strong> RewardVault is a promotional publisher. We may earn compensation when users complete offers through our links. This does not affect the reward you receive from the advertiser.
          </p>
          <p className="mt-2">
            <strong className="text-slate-900">No Guarantee:</strong> Rewards are provided by third-party advertisers and are subject to their eligibility, verification, and completion requirements. We do not guarantee any specific reward amount or delivery.
          </p>
          <p className="mt-2">
            <strong className="text-slate-900">Eligibility:</strong> Offers are available only to individuals 18 years or older, located in the United States, accessing from a mobile device. Void where prohibited.
          </p>
          <p className="mt-2">
            <strong className="text-slate-900">Trademarks:</strong> All trademarks and brand names referenced on this page are the property of their respective owners. Their use does not imply endorsement. RewardVault is not affiliated with, sponsored by, or endorsed by Venmo, Cash App, PayPal, or any mentioned brand.
          </p>
          <p className="mt-2">
            <strong className="text-slate-900">Privacy:</strong> We do not collect or sell your personal information. When you click an offer link, you leave our site and the advertiser's privacy policy applies. Standard analytics cookies may be used.
          </p>
          <p id="privacy" className="mt-2">
            <strong className="text-slate-900">Contact:</strong> For offer fulfillment questions, contact the advertiser directly. For site questions, email{" "}
            <a href="mailto:support@rewardvault.example" className="font-medium text-emerald-600 hover:underline">support@rewardvault.example</a>.
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-slate-200/60 pt-6 text-xs text-slate-500 sm:flex-row">
          <div>© {year} RewardVault. All rights reserved.</div>
          <div>Independent promotional publisher · Not affiliated with mentioned brands.</div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const device = useDeviceCheck();
  const [pendingOffer, setPendingOffer] = useState<Offer | null>(null);

  const handleProceed = (offer: Offer) => {
    window.open(offer.link, "_blank", "noopener,noreferrer");
    setPendingOffer(null);
  };

  const scrollToOffers = () => {
    document.getElementById("offers")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-white to-slate-50/50 text-slate-900 antialiased selection:bg-emerald-200/60">
      <AdDisclosure />
      <Header isMobile={device.isMobile} isUS={device.isUS} ready={device.ready} />
      <main>
        <Hero onScroll={scrollToOffers} />
        <TrustStrip />
        <OffersSection onClaim={(o) => setPendingOffer(o)} />
        <HowItWorks />
        <Reviews />
        <FAQ />
      </main>
      <Footer />
      <ConsentGate offer={pendingOffer} onClose={() => setPendingOffer(null)} onProceed={handleProceed} />
    </div>
  );
}
