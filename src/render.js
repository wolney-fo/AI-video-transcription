const renderChunk = ({ timestamp, text }) => `
<div class="chunk flex">
  <time class="flex">${getMinutes(timestamp)}</time>
  <p>
    ${groupedText(text, timestamp)}
  </p>
</div>
`;

function getMinutes(timestamp) {
  let date = new Date(null);
  date.setTime(timestamp[0] * 1000);
  return date.toISOString().slice(14, 19);
}

window.seek = function (event) {
  const seekTo = event.currentTarget.dataset.seekTo;
  window.YTPlayer.seekTo(seekTo);
  window.YTPlayer.playVideo();
};

function groupedText(text, timestamp) {
  const words = text.split(" ");

  const groups = [];
  for (let i = 0; i < words.length; i++) {
    if (i % 3 === 0) {
      groups.push(words.slice(i, i + 3).join(" "));
    }
  }

  return groups
    .map((item, idx) => {
      const [initialTime, finalTime] = timestamp;
      const seekTo =
        idx == 0
          ? initialTime
          : (finalTime - initialTime) / (groups.length - idx) + initialTime;
      return `<span onclick=seek(event) data-seek-to=${seekTo}>${item} </span>`;
    })
    .join("");
}

export function renderText({ chunks }) {
  const formattedTranscription = chunks.map(renderChunk).join("");
  document.querySelector(".transcription .content").innerHTML =
    formattedTranscription;
}
