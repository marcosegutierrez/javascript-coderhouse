let respuesta = 0;
let persona = {
    genero: 0,
    peso: 0,
    altura: 0,
    edad: 0,
}

const superavit = (gastoTotal) => {
    let kcalObjetivo = parseInt(gastoTotal + 400);
    alert(
        `Las kcal que debes consumir según tu objetivo de Aumento de Masa Muscular son:
        ${kcalObjetivo}
        `);
}

const deficit = (gastoTotal) => {
    let kcalObjetivo = parseInt(gastoTotal - 400);
    alert(
        `Las kcal que debes consumir según tu objetivo de Pérdida de Grasa son:
        ${kcalObjetivo}
        `);
}

const normoCalorico = (gastoTotal) => {
    let kcalObjetivo = parseInt(gastoTotal);
    alert(
        `Las kcal que debes consumir según tu objetivo de Manter el Peso son:
        ${kcalObjetivo}
        `);
}

//Formula de Tasa Metabolica Basal (TMB)
const tasaMetabolicaBasal = () => {
    let tmb = (10 * persona.peso) + (6.25 * persona.altura) - (5 * persona.edad);
    if (persona.genero == 1) { // tmbMujer
        tmb -= 161;
    } else if (persona.genero == 2) { // tmbHombre
        tmb += 5;
    }
    return tmb;
}

const gastoEnergeticoTotal = (tmb, actividad) => {
    const gastoTotal = tmb * actividad * 1.1;
    return gastoTotal;
}

const respuestaIncorrecta = () => alert("Respuesta incorrecta");

while (respuesta != 4) {
    let tmb, actividad, objetivo;

    respuesta = parseInt(prompt(
        `Ingrese el número del objetivo buscado:\n
        1. Aumento de Masa Muscular.\n
        2. Pérdida de Grasa.\n
        3. Mantener mi peso.\n
        4. Para SALIR`
        ));
    
    objetivo = respuesta;

    if (respuesta == 4) {
        break;
    } else if (respuesta < 1 || respuesta > 4 || isNaN(respuesta)) {
        respuestaIncorrecta();
        continue;
    }

    respuesta = parseInt(prompt(
        `Ingrese el género:\n
        1. Femenino.\n
        2. Masculino.\n
        4. Para SALIR`
    ));

    if (respuesta == 4) {
        break;
    } else if (respuesta < 1 || respuesta > 2 || isNaN(respuesta)) {
        respuestaIncorrecta();
        continue;
    }

    persona.genero = respuesta;

    respuesta = parseInt(prompt(
        `Ingrese el peso en Kilogramos, ó 4. Para SALIR`
    ));
    
    if (respuesta == 4) break;
    persona.peso = respuesta;

    respuesta = parseInt(prompt(
        `Ingrese la altura en Centímetros, ó 4. Para SALIR`
    ));

    if (respuesta == 4) break;
    persona.altura = respuesta;

    respuesta = parseInt(prompt(
        `Ingrese la edad en años, ó 4. Para SALIR`
    ));

    if (respuesta == 4) break;
    persona.edad = respuesta;

    tmb = tasaMetabolicaBasal();

    respuesta = parseInt(prompt(
        `Ingrese el factor de actividad física:\n
        0. Sedentario.\n
        1. Ligeramente activo.\n
        2. Activo.\n
        3. Muy activo.\n
        4. Para SALIR`
    ));

    if (respuesta == 4) break;

    switch (respuesta) {
        case 0:
            actividad = 1.3;
            break;
        case 1:
            actividad = 1.5;
            break;
        case 2:
            actividad = 1.7;
            break;
        case 3:
            actividad = 1.9;
            break;
        default:
            respuestaIncorrecta();
            continue;
    }

    if (respuesta == 4) break;

    let gastoTotal = gastoEnergeticoTotal(tmb, actividad);

    switch (objetivo) {
        case 1:
            superavit(gastoTotal);
            break;
        case 2:
            deficit(gastoTotal);
            break;
        case 3:
            normoCalorico(gastoTotal);
            break;
        default:
            break;
    }

}