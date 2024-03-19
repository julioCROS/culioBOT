const { ndown, ytdown, twitterdown, tikdown } = require("nayan-media-downloader")

async function download(tag) {
  let downloadURL;
  if (tag == "fb" || tag == "ig") {
    downloadURL = await ndown("https://www.facebook.com/reel/770143171689494")
  } else if (tag == "yt") {
    downloadURL = await ytdown("https://youtu.be/eNMo41P6J-Q?si=_3rrtvc0PQ1qiGrE")
  } else if (tag == "twt") {
    downloadURL = await twitterdown("https://twitter.com/hourly_shitpost/status/1769373004532703384")
  } else if (tag == "ttk") {
    downloadURL = await tikdown("https://vm.tiktok.com/ZMMBfeGT5/")
  }
  console.log(downloadURL)
}

download("fb")