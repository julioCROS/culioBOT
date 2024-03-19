import { outputErrorMessage } from '@bot-utils/output-error-message';
import { Command, CommandData, CommandType } from '@command-protocols';
import { getRandom } from '@utils';

const vocabMap: any = {
    "ele": ["elu", "el", "ile", "ilu"],
    "ela": ["elu", "el", "ile", "ilu"],
    "dele": ["delu", "dile", "dilu", "del"],
    "dela": ["delu", "dile", "dilu", "del"],
    "do": ["de"],
    "da": ["de"],
    "no": ["ne"],
    "na": ["ne"],
    "o": ["ê"],
    "os": ["ês"],
    "a": ["le", "ê"],
    "as": ["les"],
    "pela": ["pele", "por"],
    "pelo": ["pele", "por"],
    "pelas": ["peles", "por"],
    "pelos": ["peles", "por"],
    "meu": ["minhe"],
    "teu": ["tue"],
    "seu": ["sue"],
    "sua": ["sue"],
    "este": ["estu"],
    "esta": ["estu"],
    "esse": ["essu"],
    "essa": ["essu"],
    "cujo": ["cuje"],
    "cuja": ["cuje"],
    "um": ["ume"],
    "uma": ["ume"],
    "mano": ["mane"],
    "mana": ["mane"],
    "avô": ["avôe"],
    "avó": ["avóe"],
    "moço": ["moce"],
    "moça": ["moce"],
    "pai": ["pãe"],
    "tio": ["tie"],
    "tia": ["tie"],
    "tu": ["tue"]
}

const stopWords = [ 'agora', 'ainda', 'algo', 'ali', 'ampla', 'amplas', 'amplo', 'amplos', 'ano', 'anos', 'ante', 'antes', 'ao', 'aos', 'apenas', 'apoio', 'após', 'aqui', 'aquilo', 'área', 'às', 'assim', 'até', 'atrás', 'através', 'baixo', 'bastante', 'bem', 'boa', 'boas', 'bom', 'bons', 'breve', 'cá', 'cada', 'catorze', 'cedo', 'cento', 'certamente', 'certeza', 'cima', 'cinco', 'coisa', 'coisas', 'com', 'como', 'conselho', 'contra', 'contudo', 'custa', 'da', 'dá', 'dão', 'daquela', 'daquelas', 'daquele', 'daqueles', 'dar', 'das', 'de', 'debaixo', 'dela', 'delas', 'dele', 'deles', 'demais', 'dentro', 'depois', 'desde', 'dessa', 'dessas', 'deve', 'devem', 'devendo', 'dever', 'deverá', 'deverão', 'deveria', 'deveriam', 'devia', 'deviam', 'dez', 'dezanove', 'dezasseis', 'dezassete', 'dezoito', 'dia', 'diante', 'disse', 'disso', 'disto', 'dito', 'diz', 'dizem', 'dizer', 'do', 'dois', 'dos', 'doze', 'duas', 'dúvida', 'e', 'é', 'em', 'embora', 'enquanto', 'entre', 'era', 'eram', 'éramos', 'és', 'está', 'estamos', 'estão', 'estar', 'estas', 'estás', 'estava', 'estavam', 'estávamos', 'este', 'esteja', 'estejam', 'estejamos', 'estes', 'esteve', 'estive', 'estivemos', 'estiver', 'estivera', 'estiveram', 'estivéramos', 'estiverem', 'estivermos', 'estivesse', 'estivessem', 'estivéssemos', 'estiveste', 'estivestes', 'estou', 'etc', 'eu', 'exemplo', 'faço', 'falta', 'favor', 'faz', 'fazeis', 'fazem', 'fazemos', 'fazendo', 'fazer', 'fazes', 'feita', 'feitas', 'feito', 'feitos', 'fez', 'fim', 'final', 'foi', 'fomos', 'for', 'fora', 'foram', 'fôramos', 'forem', 'forma', 'formos', 'fosse', 'fossem', 'fôssemos', 'foste', 'fostes', 'fui', 'geral', 'grande', 'grandes', 'grupo', 'há', 'haja', 'hajam', 'hajamos', 'hão', 'havemos', 'havia', 'hei', 'hoje', 'hora', 'horas', 'houve', 'houvemos', 'houver', 'houvera', 'houverá', 'houveram', 'houvéramos', 'houverão', 'houverei', 'houverem', 'houveremos', 'houveria', 'houveriam', 'houveríamos', 'houvermos', 'houvesse', 'houvessem', 'houvéssemos', 'isso', 'isto', 'já', 'la', 'lá', 'lado', 'lhe', 'lhes', 'lo', 'local', 'logo', 'longe', 'lugar', 'maior', 'maioria', 'mais', 'mal', 'mas', 'máximo', 'me', 'meio', 'menor', 'menos', 'mês', 'meses', 'mesma', 'mesmas', 'mesmo', 'mesmos', 'meu', 'meus', 'mil', 'minha', 'minhas', 'momento', 'muita', 'muitas', 'muito', 'muitos', 'na', 'nada', 'não', 'naquela', 'naquelas', 'naquele', 'naqueles', 'nas', 'nem', 'nenhum', 'nenhuma', 'nessa', 'nessas', 'nesse', 'nesses', 'nesta', 'nestas', 'neste', 'nestes', 'ninguém', 'nível', 'no', 'noite', 'nome', 'nos', 'nós', 'nossa', 'nossas', 'nosso', 'nossos', 'nova', 'novas', 'nove', 'novo', 'novos', 'num', 'numa', 'número', 'nunca', 'obra', 'obrigada', 'obrigado', 'oitava', 'oitavo', 'oito', 'onde', 'ontem', 'onze', 'ou', 'outra', 'outras', 'outro', 'outros', 'para', 'parece', 'parte', 'partir', 'paucas', 'pela', 'pelas', 'pelo', 'pelos', 'pequena', 'pequenas', 'pequeno', 'pequenos', 'per', 'perante', 'perto', 'pode', 'pude', 'pôde', 'podem', 'podendo', 'poder', 'poderia', 'poderiam', 'podia', 'podiam', 'põe', 'põem', 'pois', 'ponto', 'pontos', 'por', 'porém', 'porque', 'porquê', 'posição', 'possível', 'possivelmente', 'posso', 'pouca', 'poucas', 'pouco', 'poucos', 'primeira', 'primeiras', 'primeiro', 'primeiros', 'própria', 'próprias', 'próprio', 'próprios', 'próxima', 'próximas', 'próximo', 'próximos', 'pude', 'puderam', 'quais', 'quáis', 'qual', 'quando', 'quanto', 'quantos', 'quarta', 'quarto', 'quatro', 'que', 'quê', 'quem', 'quer', 'quereis', 'querem', 'queremas', 'queres', 'quero', 'questão', 'quinta', 'quinto', 'quinze', 'relação', 'sabe', 'sabem', 'são', 'se', 'segunda', 'segundo', 'sei', 'seis', 'seja', 'sejam', 'sejamos', 'sem', 'sempre', 'sendo', 'ser', 'será', 'serão', 'serei', 'seremos', 'seria', 'seriam', 'seríamos', 'sete', 'sétima', 'sétimo', 'seu', 'seus', 'sexta', 'sexto', 'si', 'sido', 'sim', 'sistema', 'só', 'sob', 'sobre', 'sois', 'somos', 'sou', 'sua', 'suas', 'tal', 'talvez', 'também', 'tampouco', 'tanta', 'tantas', 'tanto', 'tão', 'tarde', 'te', 'tem', 'tém', 'têm', 'temos', 'tendes', 'tendo', 'tenha', 'tenham', 'tenhamos', 'tenho', 'tens', 'ter', 'terá', 'terão', 'terceira', 'terceiro', 'terei', 'teremos', 'teria', 'teriam', 'teríamos', 'teu', 'teus', 'teve', 'ti', 'tido', 'tinha', 'tinham', 'tínhamos', 'tive', 'tivemos', 'tiver', 'tivera', 'tiveram', 'tivéramos', 'tiverem', 'tivermos', 'tivesse', 'tivessem', 'tivéssemos', 'tiveste', 'tivestes', 'toda', 'todas', 'todavia', 'todo', 'todos', 'trabalho', 'três', 'treze', 'tu', 'tua', 'tuas', 'tudo', 'última', 'últimas', 'último', 'últimos', 'vai', 'vais', 'vão', 'vários', 'vem', 'vêm', 'vendo', 'vens', 'ver', 'vez', 'vezes', 'viagem', 'vindo', 'vinte', 'vir', 'você', 'vocês', 'vos', 'vós', 'vossa', 'vossas', 'vosso', 'vossos', 'zero'];


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
    return words.map(w => toNeutre(w.toLocaleLowerCase())).join(" ");
};

const toNeutre = (word: string) => {

    if(vocabMap[word]){
        return getRandom<string>(vocabMap[word]);
    }

    if(stopWords.includes(word)){
        return word;
    }
    
    if(word.length < 4){
        return word; 
    }

    if(word.endsWith("s")){
        return `${getNeutreStem(word.slice(0, word.length - 1))}s`;
    }

    return getNeutreStem(word);
};

const getNeutreStem = (word: string) => {
    if(word.endsWith("co") || word.endsWith("ca")){
        return `${word.slice(0, word.length - 2)}que`;
    }

    if(word.endsWith("go") || word.endsWith("ga")){
        return `${word.slice(0, word.length - 2)}gue`;
    }

    if(word.endsWith("ão") || word.endsWith("ã")){
        return `${word.slice(0, word.length - 2)}ane`;
    }

    if(word.endsWith("ona")){
        return `${word.slice(0, word.length - 1)}e`;
    }

    if(word.endsWith("r")){
        return `${word}e`;
    }

    if(word.endsWith("ra")){
        return `${word.slice(0, word.length - 1)}e`;
    }

    if(word.endsWith("re")){
        return `${word.slice(0, word.length - 2)}ries`;
    }

    if(word.endsWith("io")){
        return `${word.slice(0, word.length - 2)}ie`;
    }

    if(word.endsWith("ê")){
        return `${word.slice(0, word.length - 1)}esu`;
    }

    if(word.endsWith("eu")){
        return `${word.slice(0, word.length - 2)}eie`;
    }
    
    if(isVogal(word[word.length - 1])){
        return `${word.slice(0, word.length - 1)}${getNeutreSuffix(word[word.length - 1])}`;
    }

    return word;
}

const getNeutreSuffix = (letter: string): string => {
    let letters = ['e', 'x', "i", 'u'];

    if(letter === "a" || letter === "e"){
        letters = ['x', "i", 'u'];
    }
    
    const neutreSuffix = letters[Math.floor(Math.random() * letters.length)];
    return neutreSuffix !== letter ? neutreSuffix : 'x';
};

const isVogal = (letter: string): boolean => {
    return /[aeoãẽáéâêàèäë]/ig.test(letter);
};

const neutre: CommandData = {
    command: ['.neutre'],
    category: CommandType.FUNNY,
    func,
    description: 'Traduz o texto para linguagem neutra',
    allowInGroups: true,
    allowInPrivate: true,
};

export default neutre;
