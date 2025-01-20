const readline = require("readline-sync");

// Sortear horizontal(H) ou vertical(V)
function definirDirecao() {
    return Math.random() < 0.5 ? "H" : "V"; 
}

// Verificar se a palavra cabe nessa posição
function Cabe(linha, coluna, direcao, tamPalavra, tamanho, tabuleiro) {
    if (direcao === "H") {
        if ((coluna + tamPalavra) > tamanho) { 
            return false;
        }

        for (let j = coluna; j < coluna + tamPalavra; j++) {
            if (tabuleiro[linha][j] !== ".") { 
                return false;
            }
        }

    } else if(direcao === "V") { 

        if ((linha + tamPalavra) > tamanho) { 
            return false;
        }

        for (let i = linha; i < linha + tamPalavra; i++) {
            if (tabuleiro[i][coluna] !== ".") { 
                return false;
            }
        }
    }

    return true;
}

// Colocando as palavras no tabuleiro
function colocarPalavra(listaPalavras, tamanho, tabuleiro) {
    for (let num = 0; num < listaPalavras.length; num++) {
        let palavra = listaPalavras[num];
        let tamPalavra = palavra.length;
        let colocada = false;

        while (!colocada) {
            let coluna = Math.floor(Math.random() * tamanho);
            let linha = Math.floor(Math.random() * tamanho);
            let direcao = definirDirecao();

            if (Cabe(linha, coluna, direcao, tamPalavra, tamanho, tabuleiro)) {
                if (direcao === "H") { 
                    for (let j = 0; j < tamPalavra; j++) {
                        tabuleiro[linha][coluna + j] = palavra[j];
                    }
                } else { 
                    for (let i = 0; i < tamPalavra; i++) {
                        tabuleiro[linha + i][coluna] = palavra[i];
                    }
                }
                colocada = true; 
            }
        }
    }
}

// Preencher os espaços vazios com letras aleatórias
function preencherVazios(tabuleiro, tamanho) {
    const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (let i = 0; i < tamanho; i++) {
        for (let j = 0; j < tamanho; j++) {
            if (tabuleiro[i][j] === ".") {
                tabuleiro[i][j] = letras[Math.floor(Math.random() * letras.length)]; //a função floor arredendo para baixo, a randoM sorteia de 0 a 1.
            }
        }
    }
}

// Exibir o tabuleiro
function exibir(tabuleiro, tamanho) {
    for (let i = 0; i < tamanho; i++) {
        console.log(tabuleiro[i].join(" ")); 
    }
}

// Função principal
function cacaPalavras() {
    const listaPalavras = ["JAVA", "SPRINGBOOT", "JAVASCRIPT", "HTML", "PYTHON"];
    const tamanho = 10; 

    // Criando o tabuleiro
    const tabuleiro = [];
    for (let i = 0; i < tamanho; i++) {
        tabuleiro[i] = [];
        for (let j = 0; j < tamanho; j++) {
            tabuleiro[i][j] = "."; 
        }
    }

    colocarPalavra(listaPalavras, tamanho, tabuleiro); 
    preencherVazios(tabuleiro, tamanho); 
    console.log("Encontre lingugens de programação e/ou frameworks!");
    exibir(tabuleiro, tamanho); 

    let acertos = 0;
    let palavraAcertada = [];

    while(acertos < listaPalavras.length){

        let palavraDigitada = readline.question("\nEscreva uma palavra: ").toUpperCase();

        if(palavraAcertada.includes(palavraDigitada)){
            exibir(tabuleiro, tamanho);
            console.log("Voce ja encontrou essa palavra, tente outra");
            console.log("Palavras encontradas: ", palavraAcertada);

        }else if(listaPalavras.includes(palavraDigitada)){
            acertos++;
            exibir(tabuleiro, tamanho);
            palavraAcertada.push(palavraDigitada);
            console.log(`Parabens! Voce acertou ${acertos} de ${listaPalavras.length} palavras`);
            console.log("Palavras encontradas: ", palavraAcertada);
        } else{
            exibir(tabuleiro, tamanho);
            console.log("A palavra digitada nao existe, tente novamente!");
            console.log("Palavras encontradas: ", palavraAcertada);
        }
    }
    console.log("\nParabéns! Você encontrou todas as palavras!");

}

cacaPalavras();