import { Command, CommandData, CommandType } from '@command-protocols';
import { outputErrorMessage } from '@bot-utils/output-error-message';
import { Base64 } from '@open-wa/wa-automate';
const yts = require('yt-search');
const imageDataURI = require('image-data-uri');

const func: Command = async (params) => {
  const { value, client, message } = params;

  const videos = await yts(value).catch(() => false);

  if (!videos || !videos.all || !videos.all[0]) {
    await outputErrorMessage(
      client,
      message,
      'Não foi possível encontrar o vídeo [' + value + ']'
    );
    return;
  }

  console.log("videos", videos.all[0])
  const dataUri = await imageDataURI.encodeFromURL(videos.all[0].thumbnail);
  console.log("dataUri", videos.all[0].thumbnail)

  await client.sendYoutubeLink(
    message.from,
    videos.all[0].url,
    `Resultado da pesquisa para "*${value}*"
| ${videos.all[0].title} - ${videos.all[0].timestamp} 
| ${videos.all[0].views} views`,
    dataUri as Base64,
  );
};

const watch: CommandData = {
  command: ['.watch'],
  category: CommandType.MEDIA,
  description: 'Pesquisa um vídeo no youtube',
  func,
  allowInGroups: true,
  allowInPrivate: true,
};

export default watch;
