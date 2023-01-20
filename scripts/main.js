import '/css/style.css'
import "/css/nav.css";
import "/css/responsive.css";

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
  tl.fromTo(".intro", { opacity: 0 }, { opacity: 1 }), ">";
  tl.call(disableFloating)
  tl.to(".harmonica", { opacity: 1 }), ">";

  const tlParts = gsap.timeline({
    scrollTrigger: {
      trigger: ".parts",
      scrub: true,
      //markers: true,
      start: "top 80%",
      end: "bottom 85%",
    },
  });
  tlParts.to(".bottom", { x: 150 });
  tlParts.to(".draw", { x: 75 }, "<");
  tlParts.to(".blow", { x: -75 }, "<");
  tlParts.to(".top", { x: -150 }, "<");

};

let floating = true;

const disableFloating = () => {
  if (floating) {
    floating = false;
    const $harmonica = document.querySelector(".harmonica");
    $harmonica.style.animation = "none";
  }
  else {
    floating = true;
    const $harmonica = document.querySelector(".harmonica");
    $harmonica.style.animation = "float 6s ease-in-out infinite";
  }
}

let startCount = 1900,
  num = { var: startCount };

const changeNumber = () => {
  const $year = document.querySelector(".toots__year");
  $year.innerHTML = num.var.toFixed();
};

const yearTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".toots",
    pin: true,
    //markers: true,
    start: "top 10%",
    end: "+=4000",
    scrub: true,
  },
});
  yearTl.to(num, { var: 1955, duration: 3, ease: "none", onUpdate: changeNumber, });
  
  yearTl.fromTo(".toots__name", { y: 800 }, { y: 0 }, "<2");
  yearTl.fromTo(".toots__nickname", { y: 800 }, { y: 0 }, "<");
  yearTl.fromTo(".toots__image", { y: 800 }, { y: 0 }, "<");

  yearTl.fromTo(".toots__name", { y: 0 }, { y: -500 }, "<4");
  yearTl.fromTo(".toots__nickname", { y: 0 }, { y: -500 }, "<");

  yearTl.fromTo(".toots__quote", { y: 800 }, { y: 0 }, "<6");

  yearTl.fromTo(".toots__quote", { y: 0 }, { y: -500 }, "<2");
  yearTl.fromTo(".toots__image", { opacity: 1 }, { opacity: 0, duration: 3}, "<");

  yearTl.fromTo(".toots__harmonica", { y: 800 }, { y: 0 }, "<2");
  yearTl.fromTo(".toots__fact", { y: 800 }, { y: 0 }, "<");
  yearTl.fromTo(".toots__work", { y: 800 }, { y: 0 }, "<");

init();