/**
 * 刷新页面不记录当前滚动位置，回到顶部
 */
if (history.scrollRestoration) {
  history.scrollRestoration = "manual";
}

function main() {
  // 总共有 60 张图片
  const IMG_COUNT = 60;

  // canvas ctx
  const ctx = document.querySelector("#canvas").getContext("2d");

  // 图片列表
  const images = [];

  /**
   * 从网络加载图片，接收一个 callback，用于加载完成后使用
   * @param {Function} callback
   */
  const loadImage = (callback) => {
    let loaded = 0; // 已经加载的图片数

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
          callback();
        }
      };
    }
  };

  // 渲染
  const render = () => {
    // 将 main 标签上的 data-loading 设置为 false
    const mainElement = document.querySelector(".main");
    mainElement.dataset.loading = "false";

    // 绘制第一张图片到 canvas 上
    ctx.drawImage(images[0], 0, 0, 600, 600);

    // other-section 的高度
    const otherSectionHeight =
      document.querySelector(".other-section").offsetHeight;

    // 监听页面滚动，替换渲染的图片
    window.addEventListener("scroll", () => {
      // body 垂直滚动的像素 / (body 的滚动高度 - body 的 clientHeight - other-section 的高度)
      let scrolled =
        document.body.scrollTop /
        (document.body.scrollHeight -
          document.body.clientHeight -
          otherSectionHeight);

      // 取整
      let frame = Math.ceil(scrolled * IMG_COUNT);

      changeFrame(frame);
    });
  };

  const changeFrame = (frame) => {
    // index 表示 images 的下标，从 0 开始到 59
    let index = frame - 1;
    if (index < 0) index = 0;
    if (index >= IMG_COUNT) index = IMG_COUNT - 1;

    ctx.clearRect(0, 0, 600, 600);
    ctx.drawImage(images[index], 0, 0, 600, 600);
  };

  loadImage(render);
}

main();
