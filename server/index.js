import express from "express";
import cors from "cors";
import { downloader } from "./download-video.js";
import { createMP3 } from "./create-mp3.js";

const app = express();
app.use(cors());

app.get("/audio", async (req, res) => {
  const videoId = req.query.v;

  try {
    await downloader(videoId);

    await createMP3();

    return res.send("Ok!");
  } catch (error) {
    console.error(error);
    return res.send(error);
  }

  return res.send(videoId);
});

app.listen(3333, () => console.log("Server is running"));
