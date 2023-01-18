import '/css/style.css'

gsap.registerPlugin(ScrollTrigger);

let frame_count, offset_value;

if (window.screen.width >= 600) {
  frame_count = 7;
  offset_value = 260;
}
else {
  frame_count = 7;
  offset_value = 160;
}


let tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".scene",
    start: "top top",
    end: "+=" + frame_count * offset_value,
    //markers: { fontSize: "25px", fontWeight: "bold" },
    pin: true,
    scrub: true,
  },
});
tl.to(
  ".viewer",
  {backgroundPosition: -offset_value * frame_count * 2 + "px 50%",
  ease: "steps(" + frame_count + ")", duration: 5}
);
tl.fromTo(".intro", { opacity: 0 }, { opacity: 1 }, ">0.5");
tl.fromTo(".intro", { opacity: 1 }, { opacity: 0 }, ">2");
tl.to(".viewer", { background: 0, duration: 0 }, ">1");
tl.fromTo(".parts", { opacity: 0, duration: 0 }, { opacity: 1, duration: 0 }, ">");

if (window.screen.width >= 600) {
  tl.to(".bottom", { x: 500, duration: 2 }, "<");
  tl.to(".draw", { x: 250, duration: 2 }, "<");
  tl.to(".blow", { x: -250, duration: 2 }, "<");
  tl.to(".top", { x: -500, duration: 2 }, "<");
} else {
  tl.to(".bottom", { x: 150, duration: 2 }, "<");
  tl.to(".draw", { x: 75, duration: 2 }, "<");
  tl.to(".blow", { x: -75, duration: 2 }, "<");
  tl.to(".top", { x: -150, duration: 2 }, "<");
}

tl.to(".bottom", { x: 0, duration: 2 }, "<10");
tl.to(".draw", { x: 0, duration: 2 }, "<");
tl.to(".blow", { x: 0, duration: 2 }, "<");
tl.to(".top", { x: 0, duration: 2 }, "<");

if (window.screen.width >= 600) {
  tl.fromTo(".tremolo", { x: 0 }, { x: 300 }, ">");
  tl.fromTo(".diatonic", { x: 0 }, { x: 0 }, ">");
  tl.fromTo(".chromatic", { x: 0 }, { x: -300 }, ">");
} else {
  tl.fromTo(".tremolo", { x: 0 }, { x: 75 }, ">");
  tl.fromTo(".diatonic", { x: 0 }, { x: 0 }, ">");
  tl.fromTo(".chromatic", { x: 0 }, { x: -75 }, ">");
}

tl.fromTo(".parts", { opacity: 1, duration: 0 }, { opacity: 0, duration: 0 }, ">");
tl.fromTo(".kind", { opacity: 0, duration: 0 }, { opacity: 1, duration: 0 }, "<");