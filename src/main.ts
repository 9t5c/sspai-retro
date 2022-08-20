import "./style.css";

const IMG_COUNT = 60,
  ctx: CanvasRenderingContext2D = document
    .querySelector<HTMLCanvasElement>("#canvas")!
    .getContext("2d")!,
  images: HTMLImageElement[] = [];

let loaded = 0;

function loadImage(fn: Function) {
  for (let i = 0; i < IMG_COUNT; i++) {
    const img = new Image();
    img.src = `https://cdn.sspai.com/preorder/macintoshcharger/images/mcfpsv2/mcfps00${(
      "0" +
      (i + 1)
    ).slice(
      -2
    )}.png?imageMogr2/auto-orient/quality/50/thumbnail/!1000x1000r/gravity/Center/crop/600x600/interlace/1`;
    images[i] = img;

    img.onload = () => {
      loaded++;
      if (loaded === IMG_COUNT) {
        fn();
      }
    };
  }
}

loadImage(bootstrap);

function bootstrap() {
  ctx.drawImage(images[0], 0, 0, 600, 600);
  document.body.classList.add("scroll");

  window.addEventListener("scroll", () => {
    let scrolled =
      document.documentElement.scrollTop /
      (document.documentElement.scrollHeight -
        document.documentElement.clientHeight);

    let frame = Math.ceil(scrolled * IMG_COUNT);
    changeFrame(frame);
  });
}

function changeFrame(frame: number) {
  let index = frame - 1;
  if (index < 0) index = 0;
  if (index > IMG_COUNT) index = IMG_COUNT;

  ctx.clearRect(0, 0, 600, 600);
  ctx.drawImage(images[index], 0, 0, 600, 600);
}
