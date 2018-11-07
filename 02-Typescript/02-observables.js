// 02-observables.ts
var rxjs = require('rxjs');
var map = require('rxjs/operators').map; //Importar el map
var distinct = require('rxjs/operators').distinct; //Para que los observables no se repitan
var concat = require('rxjs/operators').concat;
// const observableNumeros$ = rxjs.of(1, 2, 3, 4, 5, 6);
var observableNumeros$ = rxjs.of(1, true, 2, 'Adrian', 3, { nombre: 'Adrian' }, ['oli'], 2, function () {
});
observableNumeros$
    .pipe(distinct(), map(function (valorActual) {
    return {
        data: valorActual
    };
}))
    .subscribe(function (ok) {
    console.log('ok', ok);
}, //then
function (error) {
    console.log('error', error);
}, //then
function () {
    console.log('complete');
} //then
);
var promesita = function (funciona) {
    return new Promise(function (resolve, reject) {
        if (funciona) {
            resolve(' :) ');
        }
        else {
            reject(' :( ');
        }
    });
};
var promesita$ = rxjs.from(promesita(true));
promesita$
    .subscribe(function (ok) {
    console.log('Promesita bien ', ok);
}, function (error) {
    console.log('Promesita mal ', error);
}, function () {
    console.log('Completado');
});
var observableConcatenado$ = observableNumeros$
    .pipe(concat(promesita$), distinct(), map(function (valorActual) {
    return {
        data: valorActual
    };
}));
observableConcatenado$.subscribe(function (ok) {
    console.log('Concatenado bien ', ok);
}, function (error) {
    console.log('Concatenado mal ', error);
}, function () {
    console.log('Completado');
});
