import "./style.css";

// browser refresh scroll top
if (history.scrollRestoration) {
  history.scrollRestoration = "manual";
}

const IMG_COUNT = 60, // number of images
  ctx: CanvasRenderingContext2D = document
    .querySelector<HTMLCanvasElement>("#canvas")!
    .getContext("2d")!, // canvas
  images: HTMLImageElement[] = []; // list of images

let loaded = 0; // loaded nums of images

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

  const mainEl = document.querySelector<HTMLDivElement>(".main")!;
  mainEl.dataset.loading = "false";

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
  if (index > IMG_COUNT) index = IMG_COUNT - 1;

  ctx.clearRect(0, 0, 600, 600);
  ctx.drawImage(images[index], 0, 0, 600, 600);
}

// fix vite warning
export {};
