import { Command, CommandData, CommandType } from '@command-protocols';
const { ndown, ytdown, twitterdown, tikdown } = require("nayan-media-downloader")
import { outputErrorMessage } from '@bot-utils/output-error-message';

const imageDataURI = require('image-data-uri');
const sourceTags = ['#fb', '#yt', '#ig', '#twt', '#ttk'];

const func: Command = async (params) => {
  const { value, client, message } = params;
  if (!value) {
    await outputErrorMessage(
      client,
      message,
      'Você precisa me enviar um link seu OTÁRIO.'
    );
    return;
  }

  const sourceTag = sourceTags.find((tag) => value.includes(tag));
  console.log("sourceTag: ", sourceTag)
  if (!sourceTag) {
    await outputErrorMessage(
      client,
      message,
      'Você precisa me enviar um link de uma mídia conhecida, OTÁRIO.'
    );
    return;
  }

  const valueLink = value.replace(sourceTag, "");
  console.log("valueLink: ", valueLink)
  console.log("sourceTag: ", sourceTag)
  let downloadURL = null;

  if (sourceTag == "#fb" || sourceTag == "#ig") {
    downloadURL = await ndown(valueLink)
    downloadURL = downloadURL.data[0].url;
  } else if (sourceTag == "#yt") {
    downloadURL = await ytdown(valueLink)
    downloadURL = downloadURL.data.video
  } else if (sourceTag == "#twt") {
    // ARRUMAR
    downloadURL = await twitterdown(valueLink)
    downloadURL = downloadURL.data.HD
  } else if (sourceTag == "#ttk") {
    downloadURL = await tikdown(valueLink)
    downloadURL = downloadURL.data.video
  }

  console.log("downloadURL: ", downloadURL)

  if (!downloadURL) {
    await outputErrorMessage(
      client,
      message,
      'Não foi possível realizar o download da mídia.'
    );
    return;
  }

  await client.sendFileFromUrl(
    message.from,
    downloadURL,
    'media.mp4',
    `Ta na mão disgraced: `,
    message.id
  );
};

const downloadMedia: CommandData = {
  command: ['.download'],
  category: CommandType.MEDIA,
  func,
  description: 'Realiza o download de uma media.',
  detailedDescription:
    'Deve indicar a origem da media. Ex: .download #fb, .download #yt, .download #ig, .download #twt',

  allowInGroups: true,
  allowInPrivate: true,
};

export default downloadMedia;
