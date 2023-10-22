let respuesta = 0;
let objetivo, genero, peso, altura, edad;

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

//Formulas Tasa Metabolica Basal (TMB)
const tmbHombre = () => {
    return (10 * peso) + (6.25 * altura) - (5 * edad) + 5;
}

const tmbMujer = () => {
    return (10 * peso) + (6.25 * altura) - (5 * edad) - 161;
}

const gastoEnergeticoTotal = (tmb, actividad) => {
    const gastoTotal = tmb * actividad * 1.1;
    return gastoTotal;
}

const respuestaIncorrecta = () => alert("Respuesta incorrecta");

while (respuesta != 4) {
    let tmb, actividad;

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
    } else if (respuesta < 1 || respuesta > 4) {
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
    } else if (respuesta < 1 || respuesta > 2) {
        respuestaIncorrecta();
        continue;
    }

    genero = respuesta;

    respuesta = parseInt(prompt(
        `Ingrese el peso en Kilogramos, ó 4. Para SALIR`
    ));
    
    if (respuesta == 4) break;
    peso = respuesta;

    respuesta = parseInt(prompt(
        `Ingrese la altura en Centímetros, ó 4. Para SALIR`
    ));

    if (respuesta == 4) break;
    altura = respuesta;

    respuesta = parseInt(prompt(
        `Ingrese la edad en años, ó 4. Para SALIR`
    ));

    if (respuesta == 4) break;
    edad = respuesta;

    if (genero == 1) {
        tmb = tmbMujer();
    } else if (genero == 2) {
        tmb = tmbHombre();
    }

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