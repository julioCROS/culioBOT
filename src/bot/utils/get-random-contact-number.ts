import { Client, Message } from '@open-wa/wa-automate';
import { getRandom } from 'src/utils';

export const getRandomContactNumber = async (
  client: Client,
  message: Message
) => {

  let groupMembers = await client.getGroupMembers(message.chat.id as any);
  console.log("get-random-contact-number.ts # groupMembers:" + groupMembers);

  const firstMember = getRandom(groupMembers);
  console.log("get-random-contact-number.ts # firstMember:" + firstMember)

  return firstMember.id.split('@')[0];
};
