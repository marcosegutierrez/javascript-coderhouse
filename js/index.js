/*** Variables ***/

let personaStorage = JSON.parse(localStorage.getItem('persona'));
let persona = {
    genero: 0,
    peso: 0,
    altura: 0,
    edad: 0,
};
const factoresDieta = [
    {tmb: 0},
    {actividad: 0},
    {termogenesis: 1.1}
];

/* Variables capturadoras del DOM */

let objetivo = document.getElementById('objetivo');
let genero = document.getElementById('genero');
let peso = document.getElementById('peso');
let altura = document.getElementById('altura');
let edad = document.getElementById('edad');
let actividad = document.getElementById('actividad');
let btnCalcular = document.getElementById('btnCalcular');
let btnResetear = document.getElementById('btnResetear');

objetivo.value = personaStorage?.objetivo || objetivo.value;
genero.value = personaStorage?.genero || genero.value;
peso.value = personaStorage?.peso || peso.value;
altura.value = personaStorage?.altura || altura.value;
edad.value = personaStorage?.edad || edad.value;
actividad.value = personaStorage?.actividad || actividad.value;

/*** Funciones - Cálculos ***/

const guardarStorage = () => {
    const obj = {
        objetivo : objetivo.value,
        genero: persona.genero,
        peso: persona.peso,
        altura: persona.altura,
        edad: persona.edad,
        actividad: actividad.value,
    }
    localStorage.setItem("persona", JSON.stringify(obj));
}

const setearDatos = () => {
    persona.genero = genero.value;
    persona.peso = peso.value;
    persona.altura = altura.value;
    persona.edad = edad.value;
    guardarStorage();
}

const salidaFinal = (objetivoTxt, kcalObjetivo) => {
    let resultado = document.getElementById('resultado');
    resultado.classList.add('salida');
    resultado.innerHTML = `<p>Las kcal que debes consumir según tu objetivo de
                        ${objetivoTxt} son: <b>${kcalObjetivo}</b></p>`;
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

//Formula de Tasa Metabolica Basal (TMB)
const tasaMetabolicaBasal = () => {
    let tmb = (10 * persona.peso) + (6.25 * persona.altura) - (5 * persona.edad);
    if (persona.genero == "femenino") { // tmbMujer
        tmb -= 161;
    } else if (persona.genero == "masculino") { // tmbHombre
        tmb += 5;
    }
    return tmb;
}

const gastoEnergeticoTotal = () => {
    return factoresDieta.reduce((acc, val) => acc * Object.values(val)[0], 1);
}

const actividadFisica = (respuesta) => {
    switch (respuesta) {
        case "sedentario":
            factoresDieta[1].actividad = 1.3;
            break;
        case "ligeramenteActivo":
            factoresDieta[1].actividad = 1.5;
            break;
        case "activo":
            factoresDieta[1].actividad = 1.7;
            break;
        case "muyActivo":
            factoresDieta[1].actividad = 1.9;
            break;
    }
}

const calcularObjetivo = (objetivo) => {
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

const validarDatos = () => {
    let res = true;
    if (persona.peso <= 0 || persona.altura <= 0 || persona.edad <= 0) {
        alert("Los datos numéricos deben ser mayores a 0");
        res = false;
    }
    return res;
}

const calcular = (e) => {
    e.preventDefault();
    // Seteo de datos (values)
    setearDatos();
    if (validarDatos()) {
        factoresDieta[0].tmb = tasaMetabolicaBasal();
        actividadFisica(actividad.value);
        calcularObjetivo(objetivo.value);    
    }
}

const resetear = () => {
    localStorage.clear();
}

btnCalcular.addEventListener('click', calcular);
btnResetear.addEventListener('click', resetear);