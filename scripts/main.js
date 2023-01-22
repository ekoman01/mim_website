import '../css/style.css';
import "../css/nav.css";
import "../css/responsive.css";
import "../css/artists.css";

gsap.registerPlugin(ScrollTrigger);
const mm = gsap.matchMedia();

const sizes = [
  {
    name: "small",
    xBottom: 150,
    xDraw: 75,
    xBlow: -75,
    xTop: -150,
  },
  {
    name: "large",
    xBottom: 500,
    xDraw: 250,
    xBlow: -250,
    xTop: -500,
  },
];

{
let floating = true;

const disableFloating = () => {
  if (floating) {
    floating = false;
    const $harmonica = document.querySelector(".harmonica");
    $harmonica.style.animation = "none";
  } else {
    floating = true;
    const $harmonica = document.querySelector(".harmonica");
    $harmonica.style.animation = "float 6s ease-in-out infinite";
  }
};

const intro_part = () => {
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

  tl.to(harmonica, {
    step: harmonicaPositions.length - 1,
    ease: SteppedEase.config(harmonicaPositions.length - 1),
    onUpdate: () => {
      console.log(harmonica.step);
      const harmonicaPosition = harmonicaPositions[harmonica.step];
      $harmonicaImage.style.transform = `translate(${
        -100 * harmonicaPosition.x * harmonicaStepPercentageX
      }%`;
    },
  });
  tl.fromTo(".intro", { opacity: 0 }, { opacity: 1 }), ">";
  tl.call(disableFloating);
  tl.to(".harmonica", { opacity: 1 }), ">";
};

const deconstruct_part = () => {
  let xBottom = 0, xDraw = 0, xBlow = 0, xTop = 0;
  mm.add(
    {
      small: "(max-width: 999px)",
      large: "(min-width: 1000px)",
    },
    (context) => {
      const { conditions } = context;
      if (conditions.small) {
        xBottom = sizes[0].xBottom;
        xDraw = sizes[0].xDraw;
        xBlow = sizes[0].xBlow;
        xTop = sizes[0].xTop;
      } 
      else if (conditions.large) {
         xBottom = sizes[1].xBottom;
         xDraw = sizes[1].xDraw;
         xBlow = sizes[1].xBlow;
         xTop = sizes[1].xTop;
       }
    }
  );

  const tlParts = gsap.timeline({
    scrollTrigger: {
      trigger: ".parts",
      scrub: true,
      //markers: true,
      start: "top 80%",
      end: "70% 85%",
    },
  });
  tlParts.to(".bottom", { x: xBottom });
  tlParts.to(".draw", { x: xDraw }, "<");
  tlParts.to(".blow", { x: xBlow }, "<");
  tlParts.to(".top", { x: xTop }, "<");
}

const artists_part = () => {
  const artists = [
    { name: "toots", startYear: 1900, endYear: 1955 },
    { name: "bob", startYear: 1955, endYear: 1961 },
    { name: "stevie", startYear: 1961, endYear: 1962 },
    { name: "west", startYear: 1962, endYear: 1967 },
    {name : "john", startYear : 1967, endYear : 1990},
    {name : "jason", startYear : 1990 , endYear : 2000},
  ];

  for (let artist in artists) {
    let i = 0;
    
    let startCount = artists[artist].startYear,
      num = { let: startCount };

    const changeNumber = () => {
    const $year = document.querySelector("." + artists[artist].name + "__year");
    $year.innerHTML = num.let.toFixed();
    };

    const artistTl = gsap.timeline({
      scrollTrigger: {
        trigger: "." + artists[artist].name,
        pin: true,
        //markers: true,
        start: "top 10%",
        end: "+=6000",
        scrub: true,
      },
    });
    artistTl.to(num, { let: artists[artist].endYear, duration: 3, ease: "none", onUpdate: changeNumber, });

    if (artist != 0) {
      artistTl.fromTo("." + artists[artist].name + "__year", { opacity: 0 ,y: -500 }, { opacity: 1, y: 0 }, "<");
    }

    artistTl.fromTo("." + artists[artist].name+ "__name", { y: 800 }, { y: 0 }, "<");
    artistTl.fromTo("." + artists[artist].name + "__nickname", { y: 800 }, { y: 0 }, "<1");
    artistTl.fromTo("." + artists[artist].name + "__image", { y: 800 }, { y: 0 }, "<2");

    artistTl.fromTo("." + artists[artist].name + "__name", { y: 0 }, { y: -500 }, "<4");
    artistTl.fromTo("." + artists[artist].name + "__nickname", { y: 0 }, { y: -500 }, "<");

    artistTl.fromTo("." + artists[artist].name + "__quote", { y: 800 }, { y: 0 }, "<6");

    artistTl.fromTo("." + artists[artist].name + "__quote", { y: 0 }, { y: -500 }, "<2");
    artistTl.fromTo("." + artists[artist].name + "__image", { opacity: 1 }, { opacity: 0, duration: 3 }, "<");
    artistTl.fromTo("." + artists[artist].name + "__year", { y: 0 }, { y: -200 }, "<");

    artistTl.fromTo("." + artists[artist].name +"__harmonica", { y: 100 }, { y: -500 }, "<2");
    artistTl.fromTo("." + artists[artist].name + "__fact", { y: 100 }, { y: -500 }, "<");
    artistTl.fromTo("." + artists[artist].name + "__work", { y: 100 }, { y: -500 }, "<");
  }
}

const init = () => {
  intro_part();
  deconstruct_part();
  artists_part();
}

init();
}