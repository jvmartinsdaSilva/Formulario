const Palavras = [
    Categoria01 = {
        TemaNome: 'FRUTAS',
        Palavras: ['UVA', 'MORANGO', 'MAÇA', 'MELANCIA']
    },
    Categoria02 = {
        TemaNome: 'PAÍS',
        Palavras: ['ARGENTINA', 'SUIÇA', 'CANADA', 'BRASIL']
    }
]

const TemaNaTela = document.querySelector('.TemaNome')
const PalavraSecreta = document.querySelector('.PalavraSecreta')
const LetraBtns = document.querySelectorAll('.Letra')
const MessageDisplay = document.querySelector('.MessageElements')
const MessageText = document.querySelector('.MessageText')
const ResetBtn = document.querySelector('.reset')
const PalvraRevelada = document.querySelector('.PalavraRevelada')

let CategoriaEscolhida
let Tema
let PalavraSorteada
let tentativa = 6
let PalavraComparada = []


const escolherCategoria = () => {
    CategoriaEscolhida = Math.floor(Math.random() * Palavras.length)
}

const sortearTema = () => {
    Tema = Palavras[CategoriaEscolhida].TemaNome
}

const sortearPalavra = () => {
    let Sorteada = Math.floor(Math.random() * Palavras[CategoriaEscolhida].Palavras.length)
    PalavraSorteada = Palavras[CategoriaEscolhida].Palavras[Sorteada]

}

const ImprimirNaTela = () => {
    TemaNaTela.textContent = Tema

    for(i = 0; i < PalavraSorteada.length; i++){
        PalavraComparada.push('?')
    }

    for(i = 0; i < PalavraComparada.length; i++){
        let div = document.createElement('div')
        div.classList.add('LetraSecreta')
        div.textContent = '?'
        PalavraSecreta.appendChild(div)
    }
}

const verificarJogada = () => {
    for(const LetraBtn of LetraBtns){
        LetraBtn.addEventListener('click', () => {
            compararLetra(LetraBtn.textContent)
            desativarBtn(LetraBtn)
            verificarVitoria()
            console.log(tentativa)
        })
    }
}

const compararLetra = (letra) => {
    const LetrasSecretas = document.querySelectorAll('.LetraSecreta')
    
    let pos = PalavraSorteada.indexOf(letra)

    if(pos < 0){
        tentativa--
        GameOver()
        forca()         
    } else {
        for(i = 0; i < PalavraSorteada.length; i++){
            if(PalavraSorteada[i] == letra){
                PalavraComparada[i] = letra
                LetrasSecretas[i].textContent = letra             
            }
        }
    }
}

const desativarBtn = (btn) => {
    btn.classList.add('Clicked')
    btn.disabled = true
}

const verificarVitoria = () => {
    let vitoria = true

    
    for(i = 0; i < PalavraComparada.length; i++){
        if(PalavraComparada[i] != PalavraSorteada[i]){
            vitoria = false
        }
    }

    if(vitoria){
        venceu()
    }
}

const GameOver = () => {
        if(tentativa === 0){
            MessageDisplay.style.display = 'block'
            MessageText.textContent = 'Você perdeu, a palavra era: '
            PalvraRevelada.textContent = PalavraSorteada
        }
    
}

const venceu = () => {
    MessageDisplay.style.display = 'block'
    MessageText.textContent = 'Parabens, Você venceu!'
}

const resetGame = () => {
    MessageDisplay.style.display = 'none'
    MessageText.textContent = ''

    resetarCampos()
    limparTela()
    resetBtns()
    escolherCategoria()
    sortearTema()
    sortearPalavra()
    ImprimirNaTela()
}

const resetarCampos = () => {
    teste = false
    tentativa = 6
    PalavraSorteada = ''
    PalavraComparada = []
}

const limparTela = () => {
    const LetrasSecretas = document.querySelectorAll('.LetraSecreta')
    
    for(const Letra of LetrasSecretas){
        Letra.remove()
    }

}

const resetBtns = () => {
    for(const btn of LetraBtns){
        btn.classList.remove('Clicked')
        btn.disabled = false
    }
}



 const forca = () => {
     const ForcaContainer = document.querySelector('.ForcaContainer')

     switch (tentativa) {
         case 5:
             ForcaContainer.textContent = 'Cabeça '
             break
         case 4:
             ForcaContainer.textContent = 'Corpo'
             break;
         case 3:
             ForcaContainer.textContent = 'BraçoE'
             break
         case 2:
             ForcaContainer.textContent = 'BraçoD'
           break;
        case 1:
             ForcaContainer.textContent = 'PernaE'
             break
         case 0:
             ForcaContainer.textContent = 'PernaD'
             break
         default:
            break;
    }
}


escolherCategoria()
sortearTema()
sortearPalavra()
ImprimirNaTela()
verificarJogada()
console.log(tentativa)


ResetBtn.addEventListener('click', resetGame)