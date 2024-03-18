import { Command, CommandData, CommandType } from '@command-protocols';
import { getNumberFromContactId } from '@bot-utils';
import { getRandom } from '@utils';

const func: Command = async ({ message, client, value }) => {
  const groupMembers = await client.getGroupMembers(message.chat.id as any);
  const member = getRandom(groupMembers);
  const contactNumber = getNumberFromContactId(member.id);

  console.log('contactNumber', contactNumber);
  console.log('memberId', member);

  await client.sendTextWithMentions(
    message.from,
    `Quem *${value}*: @${contactNumber}`
  );
};

const quem: CommandData = {
  func,
  command: ['.quem'],
  category: CommandType.FUNNY,
  description: 'Escolhe um membro aleatório do grupo como responsável',
  allowInGroups: true,
  allowInPrivate: false,
};

export default quem;
