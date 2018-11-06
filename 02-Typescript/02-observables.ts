// 02-observables.ts

declare var require: any;
const rxjs = require('rxjs');

const observableNumeros$ = rxjs.of(1, 2, 3, 4, 5, 6);

observableNumeros$
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
    )
;