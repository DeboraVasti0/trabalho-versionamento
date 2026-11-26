
const secoes = document.querySelectorAll(".secao");
const botaoProximo = document.getElementById("proximo");
const botaoAnterior = document.getElementById("anterior");

let atual = 0;
let rolando = false;

// Centralizar a seção selecionada
function irParaSecao(indice) {
    if (indice < 0 || indice >= secoes.length) return;

    atual = indice;
    rolando = true;

    secoes[indice].scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center"
    });

    setTimeout(() => {
        rolando = false;
    }, 700);
}

// Próxima seção
botaoProximo.addEventListener("click", () => {
    if (atual < secoes.length - 1) {
        irParaSecao(atual + 1);
    }
});

// Seção anterior
botaoAnterior.addEventListener("click", () => {
    if (atual > 0) {
        irParaSecao(atual - 1);
    }
});

// Navegação pelo teclado
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
        botaoProximo.click();
    }

    if (e.key === "ArrowLeft") {
        botaoAnterior.click();
    }
});

// Atualizar seção conforme a rolagem
window.addEventListener("scroll", () => {
    if (rolando) return;

    let menorDistancia = Infinity;

    secoes.forEach((secao, indice) => {
        const retangulo = secao.getBoundingClientRect();
        const centroSecao = retangulo.top + retangulo.height / 2;
        const distancia = Math.abs(
            centroSecao - window.innerHeight / 2
        );

        if (distancia < menorDistancia) {
            menorDistancia = distancia;
            atual = indice;
        }
    });
});
