const obtenerAlimentos = async () => {
    const result = await fetch('./alimentos.json');
    const valores = await result.json()
    return valores.alimentos
}

const obtenerComidas = async () => {
    const alimentos = await obtenerAlimentos();
    console.log(alimentos);
    let textAlimentos = document.createElement('div');
    textAlimentos.innerHTML = ` <p>Una comida de 500 kcal se ve así:</p>
                                <ul>
                                    <li> Alimento: ${alimentos[0].alimento} </li>
                                    <li> Porción: ${alimentos[0].porcion} </li>
                                    <li> Calorías: ${alimentos[0].calorias} </li>
                                </ul>
                                <ul>
                                    <li> Alimento: ${alimentos[3].alimento} </li>
                                    <li> Porción: ${alimentos[3].porcion} </li>
                                    <li> Calorías: ${alimentos[3].calorias} </li>
                                </ul>
                                <ul>
                                    <li> Alimento: ${alimentos[5].alimento} </li>
                                    <li> Porción: ${alimentos[5].porcion} </li>
                                    <li> Calorías: ${alimentos[5].calorias} </li>
                                </ul>
                                <ul>
                                    <li> Alimento: ${alimentos[6].alimento} </li>
                                    <li> Porción: ${alimentos[6].porcion} </li>
                                    <li> Calorías: ${alimentos[6].calorias} </li>
                                </ul>
                            `;
    document.body.append(textAlimentos);
}

const comidas = {
    obtenerAlimentos,
    obtenerComidas
};

export default comidas;