import '/css/style.css'

gsap.registerPlugin(ScrollTrigger);

const appleNumCols = 8;
const appleStepPercentageX = 1 / appleNumCols;
const applePositions = [
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
      trigger: ".section-with-apple",
      scrub: true,
      markers: true,
      pin: ".apple",
    },
  });

  const apple = {
    step: 0
  };
  const $appleImage = document.querySelector('.apple__image');

  tl.to(apple, { step: applePositions.length-1, duration: 5, ease: SteppedEase.config(applePositions.length-1), onUpdate: () => {
    console.log(apple.step);
    const applePosition = applePositions[apple.step];
    $appleImage.style.transform = `translate(${-100 * applePosition.x * appleStepPercentageX}%`;
  }})
};

init();