import '/css/style.css'

gsap.registerPlugin(ScrollTrigger);

const harmonicaNumCols = 8;
const harmonicaStepPercentageX = 1 / harmonicaNumCols;
const harmonicaPositions = [
  { x: 0 },
  { x: 1 },
  { x: 2 },
  { x: 3 },
  { x: 4 },
  { x: 5 },
  { x: 6 },
  { x: 7 },
];

const init = () => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".part_one",
      scrub: true,
      //markers: true,
      pin: ".harmonica",
    },
  });

  const harmonica = {
    step: 0,
  };
  const $harmonicaImage = document.querySelector(".harmonica__image");

  tl.to(harmonica, { step: harmonicaPositions.length-1, duration: 5, ease: SteppedEase.config(harmonicaPositions.length-1), onUpdate: () => {
    console.log(harmonica.step);
    const harmonicaPosition = harmonicaPositions[harmonica.step];
    $harmonicaImage.style.transform = `translate(${-100 * harmonicaPosition.x * harmonicaStepPercentageX}%`;
  }})

  tl.fromTo(".intro", { opacity: 0 }, { opacity: 1 }, ">");
  tl.fromTo(".harmonica", { y: 0 }, { y: 100, delay: 2 }), ">10";
  tl.fromTo(".harmonica", { opacity: 1 }, { opacity: 0 }), ">";

  const tlParts = gsap.timeline({
    scrollTrigger: {
      trigger: ".parts",
      scrub: true,
      //markers: true,
      start: "top 80%",
      end: "bottom 85%",
    },
  });
  tlParts.to(".bottom", { x: 150 }, "<");
  tlParts.to(".draw", { x: 75 }, "<");
  tlParts.to(".blow", { x: -75 }, "<");
  tlParts.to(".top", { x: -150 }, "<");

};

init();