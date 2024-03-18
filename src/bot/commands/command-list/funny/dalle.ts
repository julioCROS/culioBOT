import { Command, CommandData, CommandType } from '@command-protocols';
import OpenAI from 'openai';

const imageDataURI = require('image-data-uri');

const func: Command = async ({ client, message, value }) => {

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const response = await openai.images.generate({
    prompt: String(value),
    n: 1,
    size: "1024x1024",
  });

  const imageUrl = response.data[0].url;
  const dataUri = await imageDataURI.encodeFromURL(imageUrl);

  console.log(imageUrl);

  await client.sendImage(
    message.from,
    dataUri,
    Date.now() + '.jpg',
    `Gerado: *${value}*`,
    message.id
  );

};

const dalle: CommandData = {
  func,
  command: ['.dalle'],
  category: CommandType.FUNNY,
  description: 'Crie imagem por IA.',
  allowInGroups: true,
  allowInPrivate: false,
};

export default dalle;
