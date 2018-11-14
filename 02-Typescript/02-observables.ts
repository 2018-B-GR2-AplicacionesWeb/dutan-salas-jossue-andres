// 02-observables.ts

declare var require: any;

const rxjs = require('rxjs');
const map = require('rxjs/operators').map; //Importar el map
const distinct = require('rxjs/operators').distinct; //Para que los observables no se repitan
const concat = require('rxjs/operators').concat;

// const observableNumeros$ = rxjs.of(1, 2, 3, 4, 5, 6);
const observableNumeros$ = rxjs.of(1,
    true,
    2,
    'Adrian',
    3,
    {nombre: 'Adrian'},
    ['oli'],
    2,
    function () {

    }
);

observableNumeros$
    .pipe(
        distinct(),
        map(
            (valorActual) => {
                return {
                    data: valorActual
                }
            }
        )
    )
    .subscribe(
        (ok) => {
            console.log('ok', ok)
        }, //then
        (error) => {
            console.log('error', error)
        }, //then
        () => {
            console.log('complete')
        } //then
    );


const promesita = (funciona) => {
    return new Promise(
        (resolve, reject) => {
            if (funciona) {
                resolve(' :) ')
            }
            else {
                reject(' :( ')
            }
        }
    )
};

const promesita$ = rxjs.from(promesita(true));

promesita$
    .subscribe(
        (ok) => {
            console.log('Promesita bien ', ok)
        },
        (error) => {
            console.log('Promesita mal ', error)

        },
        () => {
            console.log('Completado')
        }
    );

const observableConcatenado$ = observableNumeros$
    .pipe(
        concat(promesita$),
        distinct(),
        map(
            (valorActual) => {
                return {
                    data: valorActual
                }
            }
        )
    )
;

observableConcatenado$.subscribe(
    (ok) => {
        console.log('Concatenado bien ', ok)
    },
    (error) => {
        console.log('Concatenado mal ', error)

    },
    () => {
        console.log('Completado')
    }
);