import "../css/preloader.css";
import "../css/style.css";
import "../css/nav.css";
import "../css/artists.css";
import "../css/responsive.css";

import delay from "./utils/delay";
import loadImageAsync from "./utils/loadImageAsync";

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
    name: "medium",
    xBottom: 250,
    xDraw: 125,
    xBlow: -125,
    xTop: -250,
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
  
  const mainImages = [
    { map: "", fileName: "Bob" },
    { map: "", fileName: "jason_ricci" },
    { map: "", fileName: "john_popper" },
    { map: "", fileName: "logo_small" },
    { map: "", fileName: "stevie_wonder" },
    { map: "", fileName: "Toots" },
    { map: "", fileName: "west-large" },
    { map: "", fileName: "west" },
    { map: "animation/", fileName: "Chromatic_" },
    { map: "animation/", fileName: "css_sprites" },
    { map: "animation/", fileName: "Diatonic_" },
    { map: "animation/", fileName: "Tremolo_" },
    { map: "parts/", fileName: "Blow" },
    { map: "parts/", fileName: "Bottom" },
    { map: "parts/", fileName: "Comb" },
    { map: "parts/", fileName: "Draw" },
    { map: "parts/", fileName: "Top" },
  ];
  
  const imagePaths = mainImages.map((i) => {
    return `./assets/${i.map}${i.fileName}.webp`;
  });

  let images = [];
  let numImagesLoaded = 0;
  const $preloaderPercentage = document.querySelector(".preloader__percentage");
  const $preloaderVisual = document.querySelector(".preloader__visual");

  const init = async () => {
    // preload the images
    $preloaderVisual.classList.add("preloader__visual--has-transition");
    onProgress();
    document.documentElement.classList.add("is-loading");
    document.querySelector("body").classList.add("overflow-y-hidden");
    images = await Promise.all(
      imagePaths.map(async (path) => {
        const image = await loadImageAsync(path);
        numImagesLoaded++;
        onProgress();
        return image;
      })
    );
    preloadComplete();
  };

  const onProgress = () => {
    const relativeProgress = numImagesLoaded / imagePaths.length;
    const progressPercentage = Math.round(relativeProgress * 100);
    console.log(
      numImagesLoaded,
      imagePaths.length,
      relativeProgress,
      progressPercentage
    );
    $preloaderPercentage.textContent = `${progressPercentage}%`;
    $preloaderVisual.style.transform = `scale3d(1, ${relativeProgress}, 1)`;
  };

  const preloadComplete = async () => {
    await delay(350); // add some extra time for the preload visual css transition to finish
    initPage();
  };

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
    let xBottom = 0,
      xDraw = 0,
      xBlow = 0,
      xTop = 0;
    mm.add(
      {
        small: "(max-width: 620px)",
        medium: "(max-width: 1099px)",
        large: "(min-width: 1100px)",
      },
      (context) => {
        const { conditions } = context;
        if (conditions.small) {
          xBottom = sizes[0].xBottom;
          xDraw = sizes[0].xDraw;
          xBlow = sizes[0].xBlow;
          xTop = sizes[0].xTop;
        } else if (conditions.medium) {
          xBottom = sizes[1].xBottom;
          xDraw = sizes[1].xDraw;
          xBlow = sizes[1].xBlow;
          xTop = sizes[1].xTop;
        } else if (conditions.large) {
          xBottom = sizes[2].xBottom;
          xDraw = sizes[2].xDraw;
          xBlow = sizes[2].xBlow;
          xTop = sizes[2].xTop;
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

    let part = document.querySelectorAll(".parts__piece");
    const name = document.querySelector(".parts__name");
    for (let i = 0; i < part.length; i++) {
      part[i].addEventListener("mouseover", (event) => {
        name.innerHTML = part[i].id;
      });
    }
  };

  const kinds = () => {
    let kind = document.querySelectorAll(".kind");
    for (let i = 0; i < kind.length; i++) {
      kind[i].addEventListener("mouseover", (event) => {
        kind[i].src = "assets/animation/" + kind[i].id + "_Hover.webp";
      });
      kind[i].addEventListener("mouseout", (event) => {
        kind[i].src = "assets/animation/" + kind[i].id + "_.webp";
      });
      kind[i].addEventListener("click", (event) => {
        showDetails(kind[i].id);
      });
      document.querySelector(".info").addEventListener("click", (event) => {
        const test = "mobile";
        showDetails(test);
      });
    }
  };

  let pressed = false;
  let sizeLarge;

  const showDetails = (id) => {
    mm.add(
      {
        large: "(min-width: 1100px)",
      },
      (context) => {
        const { conditions } = context;
        if (conditions.large) {
          sizeLarge == true;
        } else if (!conditions.large) {
          sizeLarge == false;
        }
      }
    );

    const types = ["Chromatic", "Diatonic", "Tremolo"];
    for (let type in types) {
      if (id == types[type]) {
        if (!pressed) {
          document.querySelector(
            ".info__text__" + types[type].toLowerCase()
          ).style.display = "flex";
          pressed = true;
          for (let other in types) {
            if (id != types[other] && sizeLarge) {
              document.querySelector(
                "." + types[other].toLowerCase() + "__kind"
              ).style.display = "none";
            } else if (!sizeLarge) {
              document.querySelector(
                "." + types[other].toLowerCase() + "__kind"
              ).style.display = "none";
            }
          }
        } else if (pressed) {
          document.querySelector(
            ".info__text__" + types[type].toLowerCase()
          ).style.display = "none";
          pressed = false;
          for (let other in types) {
            if (id != types[other]) {
              document.querySelector(
                "." + types[other].toLowerCase() + "__kind"
              ).style.display = "flex";
            }
          }
        }
      } else if (id == "mobile") {
        pressed = false;
        for (let other in types) {
          document.querySelector(
            "." + types[other].toLowerCase() + "__kind"
          ).style.display = "flex";
          document.querySelector(
            ".info__text__" + types[type].toLowerCase()
          ).style.display = "none";
        }
      }
    }
  };

  const artists_part = () => {
    const artists = [
      { name: "toots", startYear: 1900, endYear: 1955 },
      { name: "bob", startYear: 1955, endYear: 1961 },
      { name: "stevie", startYear: 1961, endYear: 1962 },
      { name: "west", startYear: 1962, endYear: 1967 },
      { name: "john", startYear: 1967, endYear: 1990 },
      { name: "jason", startYear: 1990, endYear: 2000 },
    ];

    for (let artist in artists) {
      let i = 0;

      let startCount = artists[artist].startYear,
        num = { let: startCount };

      const changeNumber = () => {
        const $year = document.querySelector(
          "." + artists[artist].name + "__year"
        );
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
      artistTl.to(num, {
        let: artists[artist].endYear,
        duration: 3,
        ease: "none",
        onUpdate: changeNumber,
      });

      if (artist != 0) {
        artistTl.fromTo(
          "." + artists[artist].name + "__year",
          { opacity: 0, y: -500 },
          { opacity: 1, y: 0 },
          "<"
        );
      }

      artistTl.fromTo(
        "." + artists[artist].name + "__name",
        { y: 800 },
        { y: 0 },
        "<"
      );
      artistTl.fromTo(
        "." + artists[artist].name + "__nickname",
        { y: 800 },
        { y: 0 },
        "<1"
      );
      artistTl.fromTo(
        "." + artists[artist].name + "__image",
        { y: 800 },
        { y: 0 },
        "<2"
      );

      artistTl.fromTo(
        "." + artists[artist].name + "__name",
        { y: 0, opacity: 1 },
        { y: -500, opacity: 0 },
        "<4"
      );
      artistTl.fromTo(
        "." + artists[artist].name + "__nickname",
        { y: 0, opacity: 1 },
        { y: -800, opacity: 0 },
        "<"
      );

      artistTl.fromTo(
        "." + artists[artist].name + "__quote",
        { y: 800, opacity: 0 },
        { y: 0, opacity: 1 },
        "<6"
      );

      artistTl.fromTo(
        "." + artists[artist].name + "__quote",
        { y: 0 },
        { y: -800 },
        "<2"
      );
      artistTl.fromTo(
        "." + artists[artist].name + "__image",
        { opacity: 1 },
        { opacity: 0, duration: 3 },
        "<1"
      );
      artistTl.fromTo(
        "." + artists[artist].name + "__year",
        { y: 0 },
        { y: -400 },
        "<"
      );

      artistTl.fromTo(
        "." + artists[artist].name + "__harmonica",
        { y: 100, opacity: 0 },
        { y: -500, opacity: 1 },
        "<2"
      );
      artistTl.fromTo(
        "." + artists[artist].name + "__fact",
        { y: 100, opacity: 0 },
        { y: -500, opacity: 1 },
        "<"
      );
      artistTl.fromTo(
        "." + artists[artist].name + "__work",
        { y: 100, opacity: 0 },
        { y: -500, opacity: 1 },
        "<"
      );
    }
  };

  const initPage = () => {
    gsap.to('.preloader', { duration: 0.5, autoAlpha: 0, onComplete: () => {
      document.documentElement.classList.remove('is-loading');
    }});
    intro_part();
    deconstruct_part();
    kinds();
    artists_part();
  };

  init();
}
