/*** Imports ***/

import { calcularObjetivo } from "./objetivos.js";
import calculosBase from "./calculosBase.js";

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

/* Verificación del Local Storage y seteo de opciones */

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

/* Seteo de datos en variables globales */
const setearDatos = () => {
    persona.genero = genero.value;
    persona.peso = peso.value;
    persona.altura = altura.value;
    persona.edad = edad.value;
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
        factoresDieta[0].tmb = calculosBase.tasaMetabolicaBasal(persona);
        factoresDieta[1].actividad = calculosBase.actividadFisica(estiloDeVida.value, entrenamiento.value);
        calcularObjetivo(objetivo.value, calculosBase.gastoEnergeticoTotal, factoresDieta);
        guardarStorage();
    }
}

const resetear = () => {
    localStorage.clear();
}

btnCalcular.addEventListener('click', calcular);
btnResetear.addEventListener('click', resetear);