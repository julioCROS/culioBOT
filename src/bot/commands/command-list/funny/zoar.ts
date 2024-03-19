import { getNumberFromContactId } from '@bot-utils';
import { Command, CommandData, CommandType } from '@command-protocols';
import { getRandom, getImage } from '@utils';

const imageDataURI = require('image-data-uri');

const memes = [
  'Daqui a pouco o c# ta doendo e não sabe porque 😏',
  'Ta se vendo',
  '🏳️‍🌈?',
  'Tem que acertar pra dar dano né fih 🎯',
  'Ai você está querendo muito, tem limites para as coisas né',
  'Nem precisa, esse já nasceu zoado 😈',
  'Vou nem falar que ele parece o espantalho do fandangos',
  'Tu parece um filhote de lumbriga',
  'Sua certidão de nascimento é um pedido de desculpas 🙏 da fábrica de preservativos 🙈',
  'Tem cara de que enfia um peixe 🐟 no c# e fala que é sereia 🧜‍♀️🧜‍♂️',
  'Agora é só eu e vicê meu gostoso, mano a mano'
];

const func: Command = async (params) => {
  const { value, client, message } = params;

  const contactName = getNumberFromContactId(
    message.sender.id
  );

  const randomNumber = Math.floor(Math.random() * 100);

  let imgUrl = await getImage('meme #' + randomNumber)
    .then((url) => url)
    .catch(() => {
      return false;
    });

  const dataUri = await imageDataURI.encodeFromURL(imgUrl);

  await client.sendImage(
    message.from,
    dataUri,
    Date.now() + '.jpg',
    `${value} ${getRandom(memes)}`,
    message.id
  );
};

const zoar: CommandData = {
  command: ['.zoar', '.zuar'],
  category: CommandType.FUNNY,
  description:
    'Zoa a pessoa marcada com alguma coisa aleatória',
  func,
  allowInGroups: true,
  allowInPrivate: false,
};

export default zoar;
