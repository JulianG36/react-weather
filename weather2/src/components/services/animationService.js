import { TweenMax } from "gsap/TweenMax";

function fadeIn(elements) {
  const length = elements.length;
  let mytweens = [];
  console.log("fadeIn", length);
  for (let i = 0; i < length; i++) {
    const tween = TweenMax.to(elements[i], 3, { opacity: 100 });
    console.log("fade in", elements[i], tween);
  }
}
function fadeOutTweens(tweens) {
  const length = tweens.length;
  for (let i = 0; i < length; i++) {
    tweens.reverse();
  }
}

function fadeOut(element) {}

export default {
  fadeOut,
  fadeIn
};
