import comidas from "./comidas.js";

const salidaFinal = (objetivoTxt, kcalObjetivo) => {
    let resultado = document.getElementById('resultado');
    resultado.classList.add('salida');
    resultado.innerHTML = `<p>Las kcal que debes consumir según tu objetivo de
                        ${objetivoTxt} son: <b>${kcalObjetivo}</b></p>`;
    comidas.obtenerComidas();
}

/* Funciones según objetivo buscado */

const superavit = (gastoTotal) => {
    let kcalObjetivo = parseInt(gastoTotal + 400);
    salidaFinal("Aumento de Masa Muscular", kcalObjetivo);
}

const deficit = (gastoTotal) => {
    let kcalObjetivo = parseInt(gastoTotal - 400);
    salidaFinal("Pérdida de Grasa", kcalObjetivo);
}

const normoCalorico = (gastoTotal) => {
    let kcalObjetivo = parseInt(gastoTotal);
    salidaFinal("Manter el Peso", kcalObjetivo);
}

export const calcularObjetivo = (objetivo, gastoEnergeticoTotal) => {
    let gastoTotal = gastoEnergeticoTotal();
    switch (objetivo) {
        case "aumento":
            superavit(gastoTotal);
            break;
        case "perdida":
            deficit(gastoTotal);
            break;
        case "mantenimiento":
            normoCalorico(gastoTotal);
            break;
    }
}