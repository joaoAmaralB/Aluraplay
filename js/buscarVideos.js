import { conectaAPI } from "./conectaAPI.js";
import constroiCard from "./mostrarVideos.js";

async function buscarVideo(evento) {
    evento.preventDefault()

    const dadosBusca = document.querySelector('[data-barra-pesquisa]').value
    const busca = await conectaAPI.buscaVideo(dadosBusca)

    const lista = document.querySelector('[data-lista]')

    while (lista.firstChild) {
        lista.removeChild(lista.firstChild)
    }

    busca.forEach(elemento => lista.appendChild(constroiCard(elemento.titulo, elemento.descricao, elemento.url, elemento.imagem)))

    if (busca.length == 0) {
        lista.innerHTML = `<h2 class="mensagem__titulo">Não existem vídeos com o termo ${dadosBusca}.</h2>`
    }
}

const botaoBusca = document.querySelector('[data-botao-pesquisa]')
const buscaPorEnter = document.querySelector('.pesquisar__input')

botaoBusca.addEventListener('click', evento => buscarVideo(evento))
buscaPorEnter.addEventListener('keydown', evento => {
    if (evento.code === 'Enter') {
        buscarVideo(evento)
    }
})