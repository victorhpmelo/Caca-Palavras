const readline = require("readline-sync");

// Função para definir a cor do texto (sem o chalk)
function corVermelha(texto) {
    return `\x1b[31m${texto}\x1b[0m`;  // Coloca o texto em vermelho
}

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
    let coordenadas = {};  // Guardar as coordenadas das palavras para usarmos depois

    for (let num = 0; num < listaPalavras.length; num++) {
        let palavra = listaPalavras[num];
        let tamPalavra = palavra.length;
        let colocada = false;

        while (!colocada) {
            let coluna = Math.floor(Math.random() * tamanho);
            let linha = Math.floor(Math.random() * tamanho);
            let direcao = definirDirecao();

            if (Cabe(linha, coluna, direcao, tamPalavra, tamanho, tabuleiro)) {
                let coords = []; // Coordenadas da palavra para salvar
                if (direcao === "H") { 
                    for (let j = 0; j < tamPalavra; j++) {
                        tabuleiro[linha][coluna + j] = palavra[j];
                        coords.push([linha, coluna + j]);  // Salva a coordenada
                    }
                } else { 
                    for (let i = 0; i < tamPalavra; i++) {
                        tabuleiro[linha + i][coluna] = palavra[i];
                        coords.push([linha + i, coluna]);  // Salva a coordenada
                    }
                }
                coordenadas[palavra] = coords; // Guarda as coordenadas da palavra
                colocada = true; 
            }
        }
    }
    return coordenadas;
}

// Preencher os espaços vazios com letras aleatórias
function preencherVazios(tabuleiro, tamanho) {
    const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (let i = 0; i < tamanho; i++) {
        for (let j = 0; j < tamanho; j++) {
            if (tabuleiro[i][j] === ".") {
                tabuleiro[i][j] = letras[Math.floor(Math.random() * letras.length)];
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

    const coordenadas = colocarPalavra(listaPalavras, tamanho, tabuleiro); 
    preencherVazios(tabuleiro, tamanho); 
    console.log("Encontre linguagens de programação e/ou frameworks!");
    exibir(tabuleiro, tamanho); 

    let acertos = 0;
    let palavraAcertada = [];

    while(acertos < listaPalavras.length){

        let palavraDigitada = readline.question("\nEscreva uma palavra: ").toUpperCase();

        if(palavraAcertada.includes(palavraDigitada)){
            exibir(tabuleiro, tamanho);
            console.log("Você já encontrou essa palavra, tente outra");
            console.log("Palavras encontradas: ", palavraAcertada);

        }else if(listaPalavras.includes(palavraDigitada)){
            acertos++;
            palavraAcertada.push(palavraDigitada);

            // Destacar a palavra no tabuleiro com cor
            let coords = coordenadas[palavraDigitada];
            for (let i = 0; i < coords.length; i++) {
                let [linha, coluna] = coords[i];
                tabuleiro[linha][coluna] = corVermelha(tabuleiro[linha][coluna]);  // Destaca com a cor vermelha
            }

            exibir(tabuleiro, tamanho);
            console.log(`Parabéns! Você acertou ${acertos} de ${listaPalavras.length} palavras`);
            console.log("Palavras encontradas: ", palavraAcertada);
        } else{
            exibir(tabuleiro, tamanho);
            console.log("A palavra digitada não existe, tente novamente!");
            console.log("Palavras encontradas: ", palavraAcertada);
        }
    }
    console.log("\nParabéns! Você encontrou todas as palavras!");
}

cacaPalavras();
