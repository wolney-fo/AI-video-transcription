import { loadingMessage } from "./loading";

var tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";

var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

window.YTPlayer = null;

export function getVideoId(url) {
  let part1Separator;
  let part2Separator = "?si";

  if (url.includes("youtube.com/watch?")) {
    part1Separator = "?v=";
    part2Separator = "&";
  }

  if (url.includes("youtu.be/")) {
    part1Separator = ".be/";
  }

  if (url.includes("/shorts/")) {
    part1Separator = "/shorts/";
  }

  const [part1, part2] = url.split(part1Separator);
  const [videoId] = part2.split(part2Separator);

  console.log(videoId, part2Separator)

  return videoId;
}

export function loadVideo(url) {
  loadingMessage("Carregando do YouTube...");

  return new Promise((resolve, reject) => {
    window.YTPlayer = new YT.Player("youtubeVideo", {
      videoId: getVideoId(url),
      events: {
        onReady: () => resolve(),
      },
    });
  });
}
