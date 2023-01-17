import '/css/style.css'

gsap.registerPlugin(ScrollTrigger);

let frame_count = 7,
  offset_value = 510;

let tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".scene",
    start: "top top",
    end: "+=" + frame_count * offset_value,
    markers: { fontSize: "25px", fontWeight: "bold" },
    pin: true,
    scrub: true,
  },
});
tl.to(
  ".viewer",
  {backgroundPosition: -offset_value * frame_count * 2 + "px 50%",
  ease: "steps(" + frame_count + ")", duration: 5}
);
tl.fromTo(".intro", { opacity: 0 }, { opacity: 1, y: 350 }, ">0.5");
tl.fromTo(".intro", { opacity: 1 }, { opacity: 0 }, ">2");
tl.to(".viewer", { background: 0, duration: 0 }, ">1");
tl.fromTo(".parts", { opacity: 0, duration: 0 }, { opacity: 1, duration: 0 }, ">");
tl.to(".bottom", { x: 700, duration: 1 }, "<");
tl.to(".draw", { x: 350, duration: 1 }, "<");
tl.to(".blow", { x: -350, duration: 1 }, "<");
tl.to(".top", { x: -700, duration: 1 }, "<");

tl.to(".bottom", { x: 0, duration: 1 }, "<2");
tl.to(".draw", { x: 0, duration: 1 }, "<");
tl.to(".blow", { x: 0, duration: 1 }, "<");
tl.to(".top", { x: 0, duration: 1 }, "<");

tl.fromTo(".tremolo", { x: 0 }, { x: 700 }, ">");
tl.fromTo(".chromatic", { x: 0 }, { x: -200 }, ">");
tl.fromTo(".kind", { opacity: 0 }, { opacity: 1 }, "<2");