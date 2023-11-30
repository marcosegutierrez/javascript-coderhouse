/*** Imports ***/

import { calcularObjetivo } from "./objetivos.js";

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
let estiloDeVida = document.getElementById('estiloDeVida');
let entrenamiento = document.getElementById('entrenamiento');
let btnCalcular = document.getElementById('btnCalcular');
let btnResetear = document.getElementById('btnResetear');

objetivo.value = personaStorage?.objetivo || objetivo.value;
genero.value = personaStorage?.genero || genero.value;
peso.value = personaStorage?.peso || peso.value;
altura.value = personaStorage?.altura || altura.value;
edad.value = personaStorage?.edad || edad.value;
estiloDeVida.value = personaStorage?.estiloDeVida || estiloDeVida.value;
entrenamiento.value = personaStorage?.entrenamiento || entrenamiento.value;

/*** Funciones - Cálculos ***/

const guardarStorage = () => {
    const obj = {
        objetivo : objetivo.value,
        genero: persona.genero,
        peso: persona.peso,
        altura: persona.altura,
        edad: persona.edad,
        estiloDeVida: estiloDeVida.value,
        entrenamiento: entrenamiento.value,
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

const actividadFisica = (estiloDeVida, entrenamiento) => {
    switch (estiloDeVida) {
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
    switch (entrenamiento) {
        case "3":
            factoresDieta[1].actividad += 0;
            break;
        case "4":
            factoresDieta[1].actividad += 0.1;
            break;
        case "5":
            factoresDieta[1].actividad += 0.2;
            break;
        case "6":
            factoresDieta[1].actividad += 0.3;
            break;
    }
}

const validarDatos = () => {
    let res = true;
    if (persona.peso <= 0 || persona.altura <= 0 || persona.edad <= 0) {
        Swal.fire({
            title: 'Error!',
            text: 'Los datos numéricos deben ser mayores a 0',
            icon: 'error',
            confirmButtonText: 'OK'
        })
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
        actividadFisica(estiloDeVida.value, entrenamiento.value);
        calcularObjetivo(objetivo.value, gastoEnergeticoTotal);
    }
}

const resetear = () => {
    localStorage.clear();
}

btnCalcular.addEventListener('click', calcular);
btnResetear.addEventListener('click', resetear);