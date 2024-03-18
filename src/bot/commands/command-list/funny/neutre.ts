import { outputErrorMessage } from '@bot-utils/output-error-message';
import { Command, CommandData, CommandType } from '@command-protocols';

const func: Command = async ({ client, message, value }) => {
    const { quotedMsg } = message;

    if (!quotedMsg) {
        await outputErrorMessage(
            client,
            message,
            'Você precisa responder a mensagem que deseja que eu imite.'
        );
        return;
    }

    const { body, caption } = quotedMsg;
    let txt = body ? body : caption;

    txt = neutralize(txt);

    await client.reply(message.from, txt, quotedMsg.id);
};

const neutralize = (text: string): string => {
    let words = text.split(" ");
    return words.map(w => toNeutre(w)).join(" ");
};

const toNeutre = (word: string) => {
    const neutreSuffix = getNeutreSuffix();

    if(word.length === 1){
        return word; 
    }

    if(isVogal(word[word.length - 1])){
        return `${word.slice(0, word.length - 1)}${neutreSuffix}`;
    } else if (word[word.length - 1] === "s" && isVogal(word[word.length - 2])) {
        return `${word.slice(0, word.length - 2)}${neutreSuffix}s`;
    }

    return word;
};

const getNeutreSuffix = (): string => {
    const letters = ['e', 'x', '@'];
    return letters[Math.floor(Math.random() * letters.length)];
};

const isVogal = (letter: string): boolean => {
    return /[aeiouãẽĩõũáéíóúâêîôûàèìòùäëïöü]/ig.test(letter);
};

const prob: CommandData = {
    command: ['.neutre'],
    category: CommandType.FUNNY,
    func,
    description: 'Traduz o texto para linguagem neutra',
    allowInGroups: true,
    allowInPrivate: true,
};

export default prob;
