import '/css/style.css'

gsap.registerPlugin(ScrollTrigger);

let frame_count = 8,
  offset_value = 510;

gsap.to(".viewer", {
  backgroundPosition: -offset_value * frame_count * 2 + "px 50%",
  ease: "steps(" + frame_count + ")", // use a stepped ease for the sprite sheet
  scrollTrigger: {
    trigger: ".scene",
    start: "top top",
    end: "+=" + frame_count * offset_value,
    // markers: { fontSize: "25px", fontWeight: "bold" },
    pin: true,
    scrub: true,
  },
});