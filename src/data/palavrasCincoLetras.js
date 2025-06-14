import palavras from './palavras.txt?raw';

const todasPalavras = palavras
    .split('\n')
    .map(p => p.trim().toLowerCase())
    .filter(p => p.length === 5 && /^[a-zA-ZçÇáàãâéêíóôõúü]+$/.test(p));

// Remove acentos
const removerAcentos = (str) =>
    str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

export const palavrasSemAcento = todasPalavras.map(removerAcentos);
