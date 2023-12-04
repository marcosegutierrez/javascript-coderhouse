//Formula de Tasa Metabolica Basal (TMB)
const tasaMetabolicaBasal = (persona) => {
    let tmb = (10 * persona.peso) + (6.25 * persona.altura) - (5 * persona.edad);
    if (persona.genero === "femenino") { // tmbMujer
        tmb -= 161;
    } else if (persona.genero === "masculino") { // tmbHombre
        tmb += 5;
    }
    return tmb;
}

const gastoEnergeticoTotal = (factoresDieta) => {
    return factoresDieta.reduce((acc, val) => acc * Object.values(val)[0], 1);
}

const actividadFisica = (estiloDeVida, entrenamiento) => {
    let actividad;
    switch (estiloDeVida) {
        case "sedentario":
            actividad = 1.3;
            break;
        case "ligeramenteActivo":
            actividad = 1.5;
            break;
        case "activo":
            actividad = 1.7;
            break;
        case "muyActivo":
            actividad = 1.9;
            break;
    }
    switch (entrenamiento) {
        case "3":
            actividad += 0;
            break;
        case "4":
            actividad += 0.1;
            break;
        case "5":
            actividad += 0.2;
            break;
        case "6":
            actividad += 0.3;
            break;
    }

    return actividad;
}

const calculosBase = {
    tasaMetabolicaBasal,
    gastoEnergeticoTotal,
    actividadFisica
};

export default calculosBase;