import { useEffect, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ScrollChoreography.css";

interface Props {
  enabled: boolean;
  scope: RefObject<HTMLElement | null>;
}

/** Scroll owns movement; readable document flow is the unenhanced default. */
export default function ScrollChoreography({ enabled, scope }: Props) {
  useEffect(() => {
    const root = scope.current;
    if (!root || !enabled) return;
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    let refreshTimer = 0;
    let disposed = false;
    const scheduleRefresh = () => {
      window.clearTimeout(refreshTimer);
      refreshTimer = window.setTimeout(() => {
        if (!disposed) ScrollTrigger.refresh();
      }, 180);
    };
    media.add(
      {
        desktop: "(min-width: 1000px) and (min-height: 640px)",
        mobile: "(max-width: 999px)",
        short: "(max-height: 639px)",
        reduce: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        if (context.conditions?.reduce) return;
        const desktop = Boolean(context.conditions?.desktop);
        root.classList.add("scroll-choreographed");
        root.classList.toggle("scroll-desktop", desktop);
        const find = <T extends Element = HTMLElement>(selector: string) =>
          root.querySelector<T>(selector);
        const all = (selector: string) =>
          gsap.utils.toArray<HTMLElement>(selector, root);
        const hero = find<HTMLElement>(".hero");
        const globe = find<HTMLElement>(".hero-globe");
        const about = find<HTMLElement>(".about");
        const expertise = find<HTMLElement>(".expertise");
        const rail = find<HTMLElement>(".capability-grid");

        if (hero) {
          const heroTimeline = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              id: "portfolio-hero",
              trigger: hero,
              start: "top top",
              end: () =>
                `+=${Math.round(window.innerHeight * (desktop ? 0.88 : 0.32))}`,
              pin: desktop,
              pinSpacing: !desktop,
              scrub: 0.7,
              invalidateOnRefresh: true,
            },
          });
          heroTimeline
            .to(
              all(".hero-line"),
              {
                yPercent: desktop ? -105 : -14,
                opacity: desktop ? 0.1 : 1,
                stagger: 0.025,
                duration: 1,
              },
              0,
            )
            .to(
              all(".hero-description"),
              { y: desktop ? -35 : -12, opacity: 0.45, duration: 1 },
              0,
            )
            .to(
              all(".hero-eyebrow"),
              { y: -18, opacity: 0.3, duration: 0.8 },
              0,
            );
          if (globe)
            heroTimeline.to(
              globe,
              {
                scale: desktop ? 2.05 : 1.2,
                x: desktop ? -window.innerWidth * 0.17 : -18,
                y: desktop ? 70 : 25,
                rotation: 78,
                opacity: desktop ? 0.72 : 0.3,
                transformOrigin: "50% 50%",
                duration: 1,
              },
              0,
            );
          if (desktop)
            heroTimeline.to(
              all(".globe-lines"),
              {
                rotationY: 115,
                rotationZ: -35,
                svgOrigin: "200 200",
                duration: 1,
              },
              0,
            );
        }

        const ticker = find<HTMLElement>(".ticker > div");
        if (ticker)
          gsap.to(ticker, {
            x: desktop ? -180 : -65,
            ease: "none",
            scrollTrigger: {
              trigger: ".ticker",
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          });

        if (about) {
          gsap.fromTo(
            all(".about-copy h2"),
            { y: desktop ? 75 : 30, clipPath: "inset(0 0 70% 0)" },
            {
              y: 0,
              clipPath: "inset(0 0 0% 0)",
              ease: "none",
              scrollTrigger: {
                trigger: about,
                start: "top 82%",
                end: "top 28%",
                scrub: 0.6,
              },
            },
          );
          gsap.fromTo(
            all(".portrait-card"),
            { y: desktop ? 105 : 35, rotation: desktop ? -9 : -2, scale: 0.92 },
            {
              y: desktop ? -35 : 0,
              rotation: desktop ? 3 : 2,
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: ".about-grid",
                start: "top 85%",
                end: "bottom 30%",
                scrub: 0.8,
              },
            },
          );
          gsap.fromTo(
            all(".about-facts > div"),
            { y: 25 },
            {
              y: 0,
              stagger: 0.12,
              ease: "none",
              scrollTrigger: {
                trigger: ".about-facts",
                start: "top 95%",
                end: "top 65%",
                scrub: 0.4,
              },
            },
          );
        }

        if (desktop && expertise && rail) {
          const travel = () =>
            Math.max(
              0,
              rail.scrollWidth -
                expertise.clientWidth +
                parseFloat(getComputedStyle(expertise).paddingLeft) +
                parseFloat(getComputedStyle(expertise).paddingRight),
            );
          const track = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              id: "portfolio-expertise",
              trigger: expertise,
              start: "top top",
              end: () =>
                `+=${Math.max(window.innerHeight * 1.05, travel() * 1.15)}`,
              pin: true,
              scrub: 0.75,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                expertise.style.setProperty(
                  "--rail-progress",
                  String(self.progress),
                );
                expertise.dataset.scrollStep = String(
                  Math.min(4, Math.floor(self.progress * 4) + 1),
                ).padStart(2, "0");
              },
            },
          });
          track
            .fromTo(
              all(".expertise .section-heading"),
              { y: 35 },
              { y: 0, duration: 0.18 },
              0,
            )
            .to(rail, { x: () => -travel(), duration: 1 }, 0.05)
            .to(
              all(".capability-symbol"),
              { rotation: 100, duration: 1, stagger: 0.025 },
              0.05,
            );
        } else if (rail) {
          all(".capability").forEach((card, index) =>
            gsap.fromTo(
              card,
              { y: 25, rotation: index % 2 ? 1.3 : -1.3 },
              {
                y: 0,
                rotation: 0,
                ease: "none",
                scrollTrigger: {
                  trigger: card,
                  start: "top 95%",
                  end: "top 63%",
                  scrub: 0.35,
                },
              },
            ),
          );
        }

        const workHeading = find<HTMLElement>(".work-heading-row");
        if (workHeading)
          gsap.fromTo(
            all(".work-heading-row h2"),
            { x: desktop ? -65 : -18, clipPath: "inset(0 100% 0 0)" },
            {
              x: 0,
              clipPath: "inset(0 0% 0 0)",
              ease: "none",
              scrollTrigger: {
                trigger: workHeading,
                start: "top 92%",
                end: "bottom 66%",
                scrub: 0.65,
              },
            },
          );
        // Cards can be replaced by category filters. Rebuild only their scoped context.
        let cardAnimations: gsap.core.Tween[] = [];
        let cardPins: ScrollTrigger[] = [];
        let cardFocusCleanup: Array<() => void> = [];
        const clearCards = () => {
          cardFocusCleanup.forEach((cleanup) => cleanup());
          cardFocusCleanup = [];
          cardPins.forEach((pin) => pin.kill(true));
          cardPins = [];
          cardAnimations.forEach((animation) => animation.revert());
          cardAnimations = [];
        };
        const animateCards = () => {
          clearCards();
          const cards = all(".work-card");
          cards.forEach((card, index) => {
            if (desktop) {
              const previousZ = card.style.zIndex;
              card.style.zIndex = String(index + 1);
              cardFocusCleanup.push(() => {
                card.style.zIndex = previousZ;
              });
            }
            if (desktop && index < cards.length - 1) {
              const pin = ScrollTrigger.create({
                trigger: card,
                start: "top 75px",
                endTrigger: find(".work-grid"),
                end: "bottom bottom",
                pin: true,
                pinSpacing: false,
                invalidateOnRefresh: true,
              });
              cardPins.push(pin);
              const focusCard = () => {
                const next = cards[index + 1];
                const nextTop =
                  next.getBoundingClientRect().top + window.scrollY;
                if (
                  window.scrollY > nextTop - 100 ||
                  window.scrollY < pin.start - 10
                )
                  window.scrollTo({
                    top: Math.max(0, pin.start + 1),
                    behavior: "instant" as ScrollBehavior,
                  });
              };
              card.addEventListener("focusin", focusCard);
              cardFocusCleanup.push(() =>
                card.removeEventListener("focusin", focusCard),
              );
            }
            if (!desktop)
              cardAnimations.push(
                gsap.fromTo(
                  card,
                  { y: 22 },
                  {
                    y: 0,
                    ease: "none",
                    scrollTrigger: {
                      trigger: card,
                      start: "top 99%",
                      end: "top 45%",
                      scrub: 0.6,
                    },
                  },
                ),
              );
            else
              cardAnimations.push(
                gsap.fromTo(
                  card.querySelectorAll(
                    ".work-card-title,.work-card-summary,.work-tags",
                  ),
                  { y: 38 },
                  {
                    y: 0,
                    stagger: 0.07,
                    ease: "none",
                    scrollTrigger: {
                      trigger: card,
                      start: "top 98%",
                      end: "top 30%",
                      scrub: 0.6,
                    },
                  },
                ),
              );
            const art = card.querySelector(".work-art");
            if (art && desktop)
              cardAnimations.push(
                gsap.fromTo(
                  art,
                  { yPercent: -3, scale: 1.08 },
                  {
                    yPercent: 3,
                    scale: 1.08,
                    ease: "none",
                    scrollTrigger: {
                      trigger: card,
                      start: "top bottom",
                      end: "bottom top",
                      scrub: 0.7,
                    },
                  },
                ),
              );
          });
        };
        animateCards();
        // Unwrap pins before React reconciles filtered cards. Observe explicit events,
        // never pin-spacer DOM mutations, which would recursively rebuild the scene.
        const afterFilter = () => {
          animateCards();
          scheduleRefresh();
        };
        root.addEventListener("portfolio:work-before-filter", clearCards);
        root.addEventListener("portfolio:work-filter", afterFilter);

        all(".experience-card").forEach((item) =>
          gsap.fromTo(
            item,
            { y: desktop ? 38 : 18 },
            {
              y: 0,
              ease: "none",
              scrollTrigger: {
                trigger: item,
                start: "top 92%",
                end: "top 65%",
                scrub: 0.5,
              },
            },
          ),
        );
        all(".process-grid article").forEach((item, index) =>
          gsap.fromTo(
            item,
            { y: desktop ? 45 + index * 22 : 25 },
            {
              y: 0,
              ease: "none",
              scrollTrigger: {
                trigger: item,
                start: "top 95%",
                end: "top 55%",
                scrub: 0.65,
              },
            },
          ),
        );
        gsap.to(all(".process-star"), {
          rotation: 145,
          ease: "none",
          scrollTrigger: {
            trigger: ".process",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        });
        const contact = find<HTMLElement>(".contact");
        if (contact) {
          gsap.fromTo(
            all(".contact-title"),
            {
              y: desktop ? 95 : 32,
              rotation: desktop ? -2 : 0,
              clipPath: "inset(0 0 85% 0)",
            },
            {
              y: 0,
              rotation: 0,
              clipPath: "inset(0 0 0% 0)",
              ease: "none",
              scrollTrigger: {
                trigger: contact,
                start: "clamp(top 96%)",
                end: "clamp(top 33%)",
                scrub: 0.75,
              },
            },
          );
          gsap.fromTo(
            all(".contact-title > svg"),
            { rotation: -85, scale: 0.6 },
            {
              rotation: 0,
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: contact,
                start: "clamp(top 90%)",
                end: "clamp(top 20%)",
                scrub: 0.7,
              },
            },
          );
        }
        scheduleRefresh();
        return () => {
          root.removeEventListener("portfolio:work-before-filter", clearCards);
          root.removeEventListener("portfolio:work-filter", afterFilter);
          clearCards();
          root.classList.remove("scroll-choreographed", "scroll-desktop");
          if (expertise) {
            expertise.style.removeProperty("--rail-progress");
            delete expertise.dataset.scrollStep;
          }
        };
      },
      root,
    );
    const resize = new ResizeObserver(scheduleRefresh);
    root
      .querySelectorAll(".about,.work-grid,.faq,.contact")
      .forEach((element) => resize.observe(element));
    document.fonts?.ready.then(() => {
      if (!disposed) scheduleRefresh();
    });
    root
      .querySelectorAll("img")
      .forEach((image) => image.addEventListener("load", scheduleRefresh));
    return () => {
      disposed = true;
      window.clearTimeout(refreshTimer);
      resize.disconnect();
      root
        .querySelectorAll("img")
        .forEach((image) => image.removeEventListener("load", scheduleRefresh));
      media.revert();
    };
  }, [enabled, scope]);
  return null;
}
