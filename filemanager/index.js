"use strict";

const fs = require('fs');

function getFiles(origen, callbackGetFiles) {

    //leer contenido de la carpeta y genera lista de nombres de ficheros 
    fs.readdir(origen, (err, lista) => {
        if (err) {
            callbackGetFiles(err);
            return;
        } else {
            callbackGetFiles(null, lista);
            return;
        }
    })
}

function printFile(archivoTexto, callbackPrintFile) {

    //obtiene el contenido del fichero archivoTexto

    fs.readFile(archivoTexto, 'utf8', (err, listaLineas) => {
        if (err) {
            callbackPrintFile(err);
            return;
        } else {
            callbackPrintFile(null, listaLineas);
            return;
        }
    })
}


const carpeta = './files/';
console.log('PROCESANDO CARPETA: ',carpeta);

//obtengo lista de ficheros de carpeta
getFiles(carpeta, (err, ficheros) => {
    if (err){
        console.error('Se produjo un error al obtener la lista de ficheros', err);
        return;
    }

    //recorro la lista de ficheros 
    //si el fichero no es .txt saco por pantalla su nombre

    for( let i = 0; i < ficheros.length; i++ ) {
        if(ficheros[i].indexOf('.txt') > -1) {
            printFile(carpeta+ficheros[i], (err, lines) => {
                if (err){
                    console.error('Se produjo un error al leer el fichero ', ficheros[i],'...', err);
                    return;
                }           

                //saco las lineas del fichero de texto por consola
                console.log('Contenido del fichero: ', ficheros[i]);
                console.log(lines);
            });
        } else {
            console.log('Detectado fichero no txt: ', ficheros[i]);
        }
    }
});




