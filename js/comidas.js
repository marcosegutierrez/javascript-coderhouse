const obtenerAlimentos = async () => {
    const result = await fetch('./alimentos.json');
    const valores = await result.json()
    return valores.alimentos
}

/* Ejemplos de comidas */
const listadoComidas = (alimentos, kcal, ...indices) => {
    let txt = `<div class="col"> <p>Una comida de <b>${kcal} kcal</b> se ve así:</p>`
    for (let i of indices) {
        txt += `
        <ul>
            <li> Alimento: ${alimentos[i].alimento} </li>
            <li> Porción: ${alimentos[i].porcion} </li>
            <li> Calorías: ${alimentos[i].calorias} </li>
        </ul>
        `
    }
    txt += `</div>`
    return txt
}

const vistaComidas = (...listado) => {
    let element = document.getElementById('idAlimentos');
    element && element.remove();
    let textAlimentos = document.createElement('div');
    textAlimentos.setAttribute("id", "idAlimentos");
    textAlimentos.setAttribute("class", "row align-items-start");
    for (let i of listado) textAlimentos.innerHTML += i;
    document.body.append(textAlimentos);
}

const obtenerComidas = async () => {
    const alimentos = await obtenerAlimentos();
    let random = Math.random() * (3 - 1) + 1
    let listado1 = (random > 2) ? 
        listadoComidas(alimentos, 500, 0, 2, 4, 6) : listadoComidas(alimentos, 400, 1, 4, 5, 6);
    let listado2 = (Math.trunc(random*10) % 2 == 0) ?
        listadoComidas(alimentos, 250, 9, 10, 12) : listadoComidas(alimentos, 400, 8, 12, 7, 11);
    vistaComidas(listado1, listado2)
}

const comidas = {
    obtenerComidas
};

export default comidas;