const artista = document.querySelector("#nombreArtista");
const album = document.querySelector("#nombreAlbum");
const cancion = document.querySelector("#nombreCancion");

//Con esta función vemos los posibles escenarios que se pueden encontrar al rellenar los datos
function buscar() {
    const nombreArtista = artista.value;
    const nombreAlbum = album.value;
    const nombreCancion = cancion.value;

    if (nombreArtista !== "" & nombreAlbum !== "" & nombreCancion !== "") {
        //Todo completado
        buscarArtistaAlbumCancion(nombreArtista, nombreAlbum, nombreCancion);
    }
    else if (nombreArtista !== "" & nombreAlbum !== "" & nombreCancion == "") {
        //Solo artista y álbum
        buscarAlbumArtista(nombreArtista, nombreAlbum);

    } else if (nombreArtista !== "" & nombreAlbum == "" & nombreCancion !== "") {
        //Solo artista y canción
        buscarArtistaCancion(nombreArtista, nombreCancion);

    } else if (nombreArtista == "" & nombreAlbum !== "" & nombreCancion !== "") {
        //Solo álbum y canción
        buscarAlbumCancion(nombreAlbum, nombreCancion);

    } else if (nombreArtista !== "" & nombreAlbum == "" & nombreCancion == "") {
        //Solo artista
        buscarArtista(nombreArtista);

    } else if (nombreArtista == "" & nombreAlbum !== "" & nombreCancion == "") {
        //Solo álbum
        buscarAlbum(nombreAlbum);

    } else if (nombreArtista == "" & nombreAlbum == "" & nombreCancion !== "") {
        //Solo canción
        buscarCancion(nombreCancion);
    } else {
        //Si no indicamos que rellene los datos
        $("#name").empty();
        $("#album").empty();
        $("#title").empty();
        $("#duracion").empty();
        $("#rank").empty();
        $("#img").empty();

        $("#name").append("Introduce los datos");
    }

    var containerSoluciones = document.querySelector('.container-soluciones');
    containerSoluciones.classList.add('color-especifico');

}

function buscarArtistaAlbumCancion(artista, album, cancion) {
    //Para limpiar los datos anteriores
    document.getElementById("name").innerHTML = "";
    document.getElementById("album").innerHTML = "";
    document.getElementById("title").innerHTML = "";
    document.getElementById("duracion").innerHTML = "";
    document.getElementById("rank").innerHTML = "";
    document.getElementById("img").innerHTML = "";

    // Ajustes para buscar el artista
    var ajustesArtistaAlbumCancion1 = {
        "async": true,
        "crossDomain": true,
        "url": "https://deezerdevs-deezer.p.rapidapi.com/search?q=" + artista,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
            "x-rapidapi-key": "d8527b0c1cmsh09072a88a3a2b07p12ff04jsn6ae2a4d04f82"
        }
    }

    // Indicar que está cargando
    mostrarMensaje("Buscando Artista...");

    // Realizar la búsqueda del artista
    fetch(ajustesArtistaAlbumCancion1.url, {
        method: ajustesArtistaAlbumCancion1.method,
        headers: ajustesArtistaAlbumCancion1.headers
    })
        .then(response => response.json())
        .then(resultadoArtistaAlbumCancion1 => {
            console.log("Array del artista: ");
            console.log(resultadoArtistaAlbumCancion1);

            // Seleccionar el nombre del artista y pasarlo a mayúsculas
            const artistaInput = document.querySelector("#nombreArtista").value.toUpperCase();

            // Bucle para buscar un artista que coincida con el indicado y obtener su id
            var datos = resultadoArtistaAlbumCancion1.data.length;
            var i = 0;
            var idArtista;

            for (i = 0; i < datos; i++) {
                if (resultadoArtistaAlbumCancion1.data[i].artist.name.toUpperCase() === artistaInput) {
                    idArtista = resultadoArtistaAlbumCancion1.data[i].artist.id;
                    break;
                }
            }

            console.log("Id del artista: ");
            console.log(idArtista);

            // Cambiar los ajustes para realizar la búsqueda del álbum
            var ajustesArtistaAlbumCancion2 = {
                "async": true,
                "crossDomain": true,
                "url": "https://deezerdevs-deezer.p.rapidapi.com/search?q=" + album,
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
                    "x-rapidapi-key": "d8527b0c1cmsh09072a88a3a2b07p12ff04jsn6ae2a4d04f82"
                }
            }

            // Indicar que está cargando
            mostrarMensaje("Buscando Álbum...");

            // Realizar la búsqueda del álbum
            fetch(ajustesArtistaAlbumCancion2.url, {
                method: ajustesArtistaAlbumCancion2.method,
                headers: ajustesArtistaAlbumCancion2.headers
            })
                .then(response => response.json())
                .then(resultadoArtistaAlbumCancion2 => {
                    console.log("Datos del array del álbum: ");
                    console.log(resultadoArtistaAlbumCancion2);

                    // Pasar a mayúsculas el nombre del álbum escrito
                    const albumInput = document.querySelector("#nombreAlbum").value.toUpperCase();

                    // Bucle para recoger el álbum que coincida con el nombre y con el artista
                    var datos = resultadoArtistaAlbumCancion2.data.length;
                    var i = 0;
                    var idAlbum;

                    for (i = 0; i < datos; i++) {
                        if (resultadoArtistaAlbumCancion2.data[i].album.title.toUpperCase() === albumInput && resultadoArtistaAlbumCancion2.data[i].artist.name.toUpperCase() === artistaInput) {
                            idAlbum = resultadoArtistaAlbumCancion2.data[i].album.id;
                            break;
                        }
                    }

                    console.log("El id del álbum: ");
                    console.log(idAlbum);

                    // Si no se ha encontrado ningún álbum, mostrar mensaje y salir
                    if (idAlbum == undefined) {
                        mostrarMensaje(albumInput + " no pertenece al artista " + artistaInput);
                        return;
                    }

                    // Cambiar los ajustes para obtener toda la información del álbum
                    var ajustesArtistaAlbumCancion3 = {
                        "async": true,
                        "crossDomain": true,
                        "url": "https://deezerdevs-deezer.p.rapidapi.com/album/" + idAlbum,
                        "method": "GET",
                        "headers": {
                            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
                            "x-rapidapi-key": "d8527b0c1cmsh09072a88a3a2b07p12ff04jsn6ae2a4d04f82"
                        }
                    }

                    // Indicar que está cargando
                    mostrarMensaje("Buscando Álbum...");

                    // Realizar la búsqueda de toda la información del álbum
                    fetch(ajustesArtistaAlbumCancion3.url, {
                        method: ajustesArtistaAlbumCancion3.method,
                        headers: ajustesArtistaAlbumCancion3.headers
                    })
                        .then(response => response.json())
                        .then(resultadoArtistaAlbumCancion3 => {
                            console.log("Toda la información del álbum: ");
                            console.log(resultadoArtistaAlbumCancion3);

                            try {
                                var idComprobar = resultadoArtistaAlbumCancion3.artist.id;

                                // Comprobar si el álbum que se ha seleccionado coincide con el artista
                                if (idComprobar == idArtista) {
                                    // Si coincide, recoger todos los datos
                                    var tracklist = resultadoArtistaAlbumCancion3.tracks.data.length;
                                    document.getElementById("img").innerHTML = "<aside><img src='" + resultadoArtistaAlbumCancion3.cover_big + "' target='_blank'></img></aside>";
                                    document.getElementById("name").innerHTML = "Nombre del Álbum: " + resultadoArtistaAlbumCancion3.title;

                                    // Para poner todas las canciones del álbum, crear este bucle
                                    for (i = 0; i < tracklist; i++) {
                                        // Verificar si la canción coincide con la especificada
                                        if (resultadoArtistaAlbumCancion3.tracks.data[i].title.toUpperCase() === cancion.toUpperCase()) {
                                            // Si coincide, recoger información específica de la canción
                                            var idCancion = resultadoArtistaAlbumCancion3.tracks.data[i].id;

                                            // Cambiar los ajustes para obtener toda la información de la canción
                                            var ajustesArtistaAlbumCancion4 = {
                                                "async": true,
                                                "crossDomain": true,
                                                "url": "https://deezerdevs-deezer.p.rapidapi.com/track/" + idCancion,
                                                "method": "GET",
                                                "headers": {
                                                    "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
                                                    "x-rapidapi-key": "d8527b0c1cmsh09072a88a3a2b07p12ff04jsn6ae2a4d04f82"
                                                }
                                            }

                                            // Indicar que está cargando
                                            mostrarMensaje("Buscando Canción...");

                                            // Realizar la búsqueda de toda la información de la canción
                                            fetch(ajustesArtistaAlbumCancion4.url, {
                                                method: ajustesArtistaAlbumCancion4.method,
                                                headers: ajustesArtistaAlbumCancion4.headers
                                            })
                                                .then(response => response.json())
                                                .then(resultadoArtistaAlbumCancion4 => {
                                                    console.log("Toda la información de la canción: ");
                                                    console.log(resultadoArtistaAlbumCancion4);

                                                    // Verificar si la canción pertenece al álbum
                                                    if (resultadoArtistaAlbumCancion4.album.id == idAlbum) {
                                                        // Si pertenece, mostrar información de la canción
                                                        mostrarMensaje("<aside><a href='" + resultadoArtistaAlbumCancion4.preview + "' target='_blank'>Nombre de la canción: " + resultadoArtistaAlbumCancion4.title + "</a></aside>");
                                                        document.getElementById("album").innerHTML = "Pertenece al álbum: " + resultadoArtistaAlbumCancion4.album.title;
                                                        document.getElementById("title").innerHTML = "Pertenece al artista: " + resultadoArtistaAlbumCancion4.artist.name;
                                                        var minutos = Math.floor(resultadoArtistaAlbumCancion4.duration / 60);
                                                        var segundos = resultadoArtistaAlbumCancion4.duration % 60;
                                                        document.getElementById("duracion").innerHTML = "Duración: " + minutos + " minutos y " + segundos + " segundos";
                                                        document.getElementById("img").innerHTML = "<aside><img src='" + resultadoArtistaAlbumCancion4.album.cover_big + "' target='_blank'></img></aside>";
                                                    }
                                                });
                                            break;
                                        } else {
                                            // Si no pertenece, mostrar mensaje de error
                                            mostrarMensaje(cancion + " no pertenece al álbum " + albumInput + " del artista " + artistaInput);
                                        }
                                    }
                                } else {
                                    // Si no coinciden, mostrar mensaje de error
                                    mostrarMensaje("El artista indicado no tiene este álbum, comprueba que los parámetros indicados sean correctos.");
                                }
                            } catch (error) {
                                if (resultadoArtistaAlbumCancion3.error.code == 800) {
                                    // Si sucede un error de la consulta, mostrar mensaje de error
                                    mostrarMensaje("El álbum no pertenece al artista indicado");
                                    document.getElementById("title").innerHTML = "Puede ser porque la API solo da 25 resultados";
                                }
                            }
                        });
                });
        });
}

function mostrarMensaje(mensaje) {
    // Mostrar mensaje
    document.getElementById("name").innerHTML = mensaje;
}

// function buscarArtistaAlbumCanción(artista, album, cancion) {
//     //Primero eliminamos los datos anteriores
//     $("#name").empty();
//     $("#album").empty();
//     $("#title").empty();
//     $("#duracion").empty();
//     $("#rank").empty();
//     $("#img").empty();

//     //Primero vamos a buscar el artista
//     var ajustesArtistaAlbumCancion1 = {
//         "async": true,
//         "crossDomain": true,
//         "url": "https://deezerdevs-deezer.p.rapidapi.com/search?q=" + artista,
//         "method": "GET",
//         "headers": {
//             "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
//             "x-rapidapi-key": "d8527b0c1cmsh09072a88a3a2b07p12ff04jsn6ae2a4d04f82"
//         }
//     }

//     //Indicamos que esta cargando porque algunas acciones tardan mas que otras.
//     $("#name").empty();
//     $("#name").append("Buscando Artista...");

//     //Con los ajustes proporcionados, procedemos a buscar el artista
//     $.ajax(ajustesArtistaAlbumCancion1).done(function (resultadoArtistaAlbumCancion1) {
//         console.log("Array del artista: ")
//         console.log(resultadoArtistaAlbumCancion1);

//         //Seleccionamos el nombre del artista y lo ponemos en mayusculas
//         const artista = document.querySelector("#nombreArtista").value.toUpperCase();
//         //Creamos un bucle para buscar un artista que coincida con el indicado y obtenemos su id
//         var datos = resultadoArtistaAlbumCancion1.data.length;
//         var i = 0;
//         for (i = 0; i < datos; i++) {
//             if (resultadoArtistaAlbumCancion1.data[i].artist.name.toUpperCase() === artista) {
//                 var idArtista = resultadoArtistaAlbumCancion1.data[i].artist.id;
//                 break;
//             }
//         }

//         console.log("Id del artista: ")
//         console.log(idArtista);

//         //Una vez tenemos el id del artista, vamos a buscar el album
//         var ajustesArtistaAlbumCancion2 = {
//             "async": true,
//             "crossDomain": true,
//             "url": "https://deezerdevs-deezer.p.rapidapi.com/search?q=" + album,
//             "method": "GET",
//             "headers": {
//                 "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
//                 "x-rapidapi-key": "d8527b0c1cmsh09072a88a3a2b07p12ff04jsn6ae2a4d04f82"
//             }
//         }

//         $("#name").empty();
//         $("#name").append("Buscando Álbum...");

//         $.ajax(ajustesArtistaAlbumCancion2).done(function (resultadoArtistaAlbumCancion2) {
//             console.log("Datos del array del album: ")
//             console.log(resultadoArtistaAlbumCancion2);

//             //Ponemos en mayusculas el album escrito
//             const album = document.querySelector("#nombreAlbum").value.toUpperCase();

//             //Creamos este bucle para recoger el album que coincida con el nombre y con el artista
//             var datos = resultadoArtistaAlbumCancion2.data.length;
//             var i = 0;
//             for (i = 0; i < datos; i++) {
//                 if (resultadoArtistaAlbumCancion2.data[i].album.title.toUpperCase() === album & resultadoArtistaAlbumCancion2.data[i].artist.name.toUpperCase() === artista) {
//                     var idAlbum = resultadoArtistaAlbumCancion2.data[i].album.id;
//                     break;
//                 }
//             }

//             console.log("El id del album: ")
//             console.log(idAlbum);

//             //Si no se ha encontrado ningún album, se indica y se salta los pasos siguientes, ya que no tenemos recogido ningún id
//             if (idAlbum == undefined) {
//                 $("#name").empty();
//                 $("#name").append(album + " no pertenece al artista " + artista);
//             }

//             //Una vez tenemos el id del album, cambiamos los ajustes para obtener toda la información del album
//             var ajustesArtistaAlbumCancion3 = {
//                 "async": true,
//                 "crossDomain": true,
//                 "url": "https://deezerdevs-deezer.p.rapidapi.com/album/" + idAlbum,
//                 "method": "GET",
//                 "headers": {
//                     "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
//                     "x-rapidapi-key": "d8527b0c1cmsh09072a88a3a2b07p12ff04jsn6ae2a4d04f82"
//                 }
//             }

//             $.ajax(ajustesArtistaAlbumCancion3).done(function (resultadoArtistaAlbumCancion3) {

//                 console.log("Datos del Álbum: ")
//                 console.log(resultadoArtistaAlbumCancion3);

//                 //Aqui comprobamos que el album que hemos escogido pertenece al artista indicado
//                 var idComprobar = resultadoArtistaAlbumCancion3.artist.id;
//                 if (idComprobar == idArtista) {
//                     var tracklist = resultadoArtistaAlbumCancion3.tracks.data;
//                     var arrayIdTracklist = [];
//                     for (let a = 0; a < tracklist.length; a++) {
//                         var idTracklist = resultadoArtistaAlbumCancion3.tracks.data[a].id;
//                         arrayIdTracklist.push(idTracklist);

//                     }

//                     console.log("Todos los id de las canciones del Álbum: ")
//                     console.log(arrayIdTracklist);

//                     //Cambiamos los ajustes para obtener el id de la cancion indicada
//                     var ajustesArtistaAlbumCancion4 = {
//                         "async": true,
//                         "crossDomain": true,
//                         "url": "https://deezerdevs-deezer.p.rapidapi.com/search?q=" + cancion,
//                         "method": "GET",
//                         "headers": {
//                             "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
//                             "x-rapidapi-key": "d8527b0c1cmsh09072a88a3a2b07p12ff04jsn6ae2a4d04f82"
//                         }
//                     }

//                     $.ajax(ajustesArtistaAlbumCancion4).done(function (resultadoArtistaAlbumCancion4) {
//                         console.log("Datos del array: ")
//                         console.log(resultadoArtistaAlbumCancion4);

//                         //Aqui nos aseguramos de que el array tenga datos
//                         if (resultadoArtistaAlbumCancion4.data.length == 0) {
//                             $("#name").empty();
//                             $("#name").append("Canción no encontrada");
//                         } else {
//                             //Ponemos el nomobre de la cancion en mayusculas
//                             const cancion = document.querySelector("#nombreCancion").value.toUpperCase();

//                             //Creamos el bucle para buscar si el id de la cancion indicada esta dentro de los id de las canciones del album
//                             var datos = resultadoArtistaAlbumCancion4.data.length;
//                             var i = 0;
//                             var idCancion = 0;
//                             for (i = 0; i < datos; i++) {
//                                 // Utiliza includes() para verificar si el id está presente en arrayIdTracklist
//                                 if (resultadoArtistaAlbumCancion4.data[i].title.toUpperCase() === cancion.toUpperCase() & arrayIdTracklist.includes(resultadoArtistaAlbumCancion4.data[i].id)) {
//                                     idCancion = resultadoArtistaAlbumCancion4.data[i].id;

//                                     break;
//                                 }
//                             }

//                             console.log("Id de la cancion que esta en el album: ")
//                             console.log(idCancion);

//                             //Cambiamos los ajustes una ultima vez para obtener toda la información de la cancion
//                             var ajustesArtistaAlbumCancion5 = {
//                                 "async": true,
//                                 "crossDomain": true,
//                                 "url": "https://deezerdevs-deezer.p.rapidapi.com/track/" + idCancion,
//                                 "method": "GET",
//                                 "headers": {
//                                     "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
//                                     "x-rapidapi-key": "d8527b0c1cmsh09072a88a3a2b07p12ff04jsn6ae2a4d04f82"
//                                 }
//                             }

//                             $("#name").empty();
//                             $("#name").append("Buscando Canción...");

//                             $.ajax(ajustesArtistaAlbumCancion5).done(function (resultadoArtistaAlbumCancion5) {
//                                 console.log("Todos los datos de la cancion: ")
//                                 console.log(resultadoArtistaAlbumCancion5);
//                                 $("#name").empty();
//                                 //En este bucle verificamos que la canción se encuentra dentro del album.
//                                 let cancionEncontrada = false;
//                                 for (let i = 0; i < tracklist.length; i++) {
//                                     //Si la cancion se encuentra dentro, proporcionamos los datos
//                                     if (idCancion == tracklist[i].id) {
//                                         console.log("esta la cancion");
//                                         $("#name").append("<aside><a href='" + resultadoArtistaAlbumCancion5.link + "' target='_blank'>Nombre de la canción: " + resultadoArtistaAlbumCancion5.title + "</a></aside>");
//                                         $("#album").append("Pertenece al álbum: " + resultadoArtistaAlbumCancion5.album.title);
//                                         $("#title").append("Pertenece al artista: " + resultadoArtistaAlbumCancion5.artist.name);
//                                         var minutos = Math.floor(resultadoArtistaAlbumCancion5.duration / 60);
//                                         var segundos = resultadoArtistaAlbumCancion5.duration % 60;
//                                         $("#duracion").append("Duración: " + minutos + " minutos y " + segundos + " segundos");
//                                         $("#img").append("<aside><img src='" + resultadoArtistaAlbumCancion5.album.cover_big + "' target='_blank'></img></aside>");
//                                         cancionEncontrada = true;
//                                         break;
//                                     }
//                                 }
//                                 //Si no se encuentra dentro del tracklist, salta el siguiente error
//                                 if (!cancionEncontrada) {
//                                     console.log("no esta");
//                                     if (resultadoArtistaAlbumCancion5.error.code === 800) {
//                                         $("#name").empty();
//                                         $("#name").append(cancion + " no pertenece al album " + album + " del artista " + artista);
//                                     }
//                                 }
//                             });
//                         }
//                     })
//                     //Si el idartista y el id del creador del album no coinciden, sale el siguiente mensaje.
//                 } else {
//                     $("#name").empty();
//                     $("#name").append("El artista indicado no tiene este album, comprueba que los parametros indicados sean correctos.");
//                 }

//             });
//         });

//     });
// }

function buscarAlbumArtista(artista, album) {
    // Limpiar los datos anteriores
    document.getElementById("name").innerHTML = "";
    document.getElementById("album").innerHTML = "";
    document.getElementById("title").innerHTML = "";
    document.getElementById("duracion").innerHTML = "";
    document.getElementById("rank").innerHTML = "";
    document.getElementById("img").innerHTML = "";

    // Ajustes para verificar el artista
    var ajustesArtistaAlbum1 = {
        "async": true,
        "crossDomain": true,
        "url": "https://deezerdevs-deezer.p.rapidapi.com/search?q=" + artista,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
            "x-rapidapi-key": "d8527b0c1cmsh09072a88a3a2b07p12ff04jsn6ae2a4d04f82"
        }
    }

    // Indicar que está cargando
    document.getElementById("name").innerHTML = "Buscando Artista...";

    // Variable para ordenar las canciones de los álbumes
    var cont = 1;

    // Realizar la búsqueda del artista
    fetch(ajustesArtistaAlbum1.url, {
        method: ajustesArtistaAlbum1.method,
        headers: ajustesArtistaAlbum1.headers
    })
        .then(response => response.json())
        .then(resultadoArtistaAlbum1 => {
            console.log("Datos del array: ")
            console.log(resultadoArtistaAlbum1);

            // Recoger el nombre del artista y pasarlo a mayúsculas
            const artista = document.querySelector("#nombreArtista").value.toUpperCase();
            var datos = resultadoArtistaAlbum1.data.length;

            // Bucle para buscar un artista que coincida con el nombre indicado
            var i = 0;
            for (i = 0; i < datos; i++) {
                if (resultadoArtistaAlbum1.data[i].artist.name.toUpperCase() === artista) {
                    var idArtista = resultadoArtistaAlbum1.data[i].artist.id;
                    break;
                }
            }

            console.log("Id del artista: ")
            console.log(idArtista);

            // Cambiar los ajustes para realizar la búsqueda del álbum
            var ajustesArtistaAlbum2 = {
                "async": true,
                "crossDomain": true,
                "url": "https://deezerdevs-deezer.p.rapidapi.com/search?q=" + album,
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
                    "x-rapidapi-key": "d8527b0c1cmsh09072a88a3a2b07p12ff04jsn6ae2a4d04f82"
                }
            }

            // Indicar que está cargando
            document.getElementById("name").innerHTML = "Buscando Álbum...";

            // Realizar la búsqueda del álbum
            fetch(ajustesArtistaAlbum2.url, {
                method: ajustesArtistaAlbum2.method,
                headers: ajustesArtistaAlbum2.headers
            })
                .then(response => response.json())
                .then(resultadoArtistaAlbum2 => {
                    // Recoger el álbum y pasarlo a mayúsculas
                    const album = document.querySelector("#nombreAlbum").value.toUpperCase();
                    console.log("Los datos del array: ")
                    console.log(resultadoArtistaAlbum2);
                    var datos = resultadoArtistaAlbum2.data.length;

                    // Bucle para ir álbum a álbum para ver cuál está creado por el artista indicado
                    var i = 0;
                    for (i = 0; i < datos; i++) {
                        if (resultadoArtistaAlbum2.data[i].album.title.toUpperCase() === album && resultadoArtistaAlbum2.data[i].artist.name.toUpperCase() === artista) {
                            var idAlbum = resultadoArtistaAlbum2.data[i].album.id;
                            break;
                        }
                    }

                    console.log("El id del álbum: ")
                    console.log(idAlbum);

                    // Cambiar los ajustes para buscar toda la información del álbum
                    var ajustesArtistaAlbum3 = {
                        "async": true,
                        "crossDomain": true,
                        "url": "https://deezerdevs-deezer.p.rapidapi.com/album/" + idAlbum,
                        "method": "GET",
                        "headers": {
                            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
                            "x-rapidapi-key": "d8527b0c1cmsh09072a88a3a2b07p12ff04jsn6ae2a4d04f82"
                        }
                    }

                    // Indicar que está cargando
                    document.getElementById("name").innerHTML = "Buscando Álbum...";

                    // Realizar la búsqueda de toda la información del álbum
                    fetch(ajustesArtistaAlbum3.url, {
                        method: ajustesArtistaAlbum3.method,
                        headers: ajustesArtistaAlbum3.headers
                    })
                        .then(response => response.json())
                        .then(resultadoArtistaAlbum3 => {
                            console.log("Toda la información del álbum: ")
                            console.log(resultadoArtistaAlbum3);

                            document.getElementById("name").innerHTML = "";

                            try {
                                var idComprobar = resultadoArtistaAlbum3.artist.id;

                                // Comprobar si el álbum que se ha seleccionado coincide con el artista
                                if (idComprobar == idArtista) {
                                    // Si coincide, recoger todos los datos
                                    var tracklist = resultadoArtistaAlbum3.tracks.data.length;
                                    document.getElementById("img").innerHTML = "<aside><img src='" + resultadoArtistaAlbum3.cover_big + "' target='_blank'></img></aside>";
                                    document.getElementById("name").innerHTML = "Nombre del Álbum: " + resultadoArtistaAlbum3.title;
                                    // Para poner todas las canciones del álbum, crear este bucle
                                    for (i = 0; i < tracklist; i++) {
                                        document.getElementById("title").innerHTML += "<aside><a href='" + resultadoArtistaAlbum3.tracks.data[i].link + "' target='_blank'> # " + cont + ": " + resultadoArtistaAlbum3.tracks.data[i].title + "</a></aside>";
                                        cont++;
                                    }
                                } else {
                                    // Si no coinciden, mostrar este mensaje de error
                                    document.getElementById("name").innerHTML = "El artista indicado no tiene este álbum, comprueba que los parámetros indicados sean correctos.";
                                }
                            } catch (error) {
                                if (resultadoArtistaAlbum3.error.code == 800) {
                                    // Si hay un error en la consulta, mostrar este mensaje de error
                                    document.getElementById("name").innerHTML = "El álbum no pertenece al artista indicado";
                                    document.getElementById("title").innerHTML = "Puede ser porque la API solo da 25 resultados";
                                }
                            }
                        });
                });
        });
}

function buscarArtistaCancion(artista, cancion) {
    // Limpiar los datos anteriores
    document.getElementById("name").innerHTML = "";
    document.getElementById("album").innerHTML = "";
    document.getElementById("title").innerHTML = "";
    document.getElementById("duracion").innerHTML = "";
    document.getElementById("rank").innerHTML = "";
    document.getElementById("img").innerHTML = "";

    // Ajustes para verificar el artista
    var ajustesArtistaCancion1 = {
        "async": true,
        "crossDomain": true,
        "url": "https://deezerdevs-deezer.p.rapidapi.com/search?q=" + artista,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
            "x-rapidapi-key": "d8527b0c1cmsh09072a88a3a2b07p12ff04jsn6ae2a4d04f82"
        }
    }

    // Indicar que está cargando
    document.getElementById("name").innerHTML = "Buscando Artista...";

    // Realizar la búsqueda del artista
    fetch(ajustesArtistaCancion1.url, {
        method: ajustesArtistaCancion1.method,
        headers: ajustesArtistaCancion1.headers
    })
        .then(response => response.json())
        .then(resultadoArtistaCancion1 => {
            console.log("Datos del array del artista: ")
            console.log(resultadoArtistaCancion1);

            // Recoger el nombre que hemos introducido y pasarlo a mayúsculas
            const artista = document.querySelector("#nombreArtista").value.toUpperCase();
            var datos = resultadoArtistaCancion1.data.length;
            var i = 0;

            // Bucle para buscar el artista
            for (i = 0; i < datos; i++) {
                if (resultadoArtistaCancion1.data[i].artist.name.toUpperCase() === artista) {
                    // Si encuentra el artista, coge su ID y sale del bucle
                    var idArtista = resultadoArtistaCancion1.data[i].artist.id;
                    break;
                }
            }

            console.log("Id del artista: ")
            console.log(idArtista);

            // Una vez que tenemos el ID del artista, buscamos la canción
            var ajustesArtistaCancion2 = {
                "async": true,
                "crossDomain": true,
                "url": "https://deezerdevs-deezer.p.rapidapi.com/search?q=" + cancion,
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
                    "x-rapidapi-key": "d8527b0c1cmsh09072a88a3a2b07p12ff04jsn6ae2a4d04f82"
                }
            }

            // Indicar que está cargando
            document.getElementById("name").innerHTML = "Buscando Canción...";

            // Realizar la búsqueda de la canción
            fetch(ajustesArtistaCancion2.url, {
                method: ajustesArtistaCancion2.method,
                headers: ajustesArtistaCancion2.headers
            })
                .then(response => response.json())
                .then(resultadoArtistaCancion2 => {
                    // Recoger el nombre de la canción y pasarlo a mayúsculas
                    const cancion = document.querySelector("#nombreCancion").value.toUpperCase();

                    console.log("Datos del array de la canción: ")
                    console.log(resultadoArtistaCancion2);

                    var datos = resultadoArtistaCancion2.data.length;
                    var idCancion = null; // Inicializar idCancion a null antes del bucle
                    var i = 0;

                    // Bucle para ir canción a canción y encontrar una en la que coincida el idArtista de antes con el artista de la canción
                    for (i = 0; i < datos; i++) {
                        if (resultadoArtistaCancion2.data[i].title.toUpperCase() === cancion && resultadoArtistaCancion2.data[i].artist.id === idArtista) {
                            idCancion = resultadoArtistaCancion2.data[i].id;
                            break;
                        }
                    }

                    console.log("Id de la canción creada por el artista indicado: ")
                    console.log(idCancion);

                    // Una vez que tenemos el ID de la canción, buscamos todos sus datos
                    var ajustesArtistaCancion3 = {
                        "async": true,
                        "crossDomain": true,
                        "url": "https://deezerdevs-deezer.p.rapidapi.com/track/" + idCancion,
                        "method": "GET",
                        "headers": {
                            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
                            "x-rapidapi-key": "d8527b0c1cmsh09072a88a3a2b07p12ff04jsn6ae2a4d04f82"
                        }
                    }

                    // Indicar que está cargando
                    document.getElementById("name").innerHTML = "Buscando Canción...";

                    // Cambiar los ajustes para realizar la búsqueda correcta
                    fetch(ajustesArtistaCancion3.url, {
                        method: ajustesArtistaCancion3.method,
                        headers: ajustesArtistaCancion3.headers
                    })
                        .then(response => response.json())
                        .then(resultadoArtistaCancion3 => {
                            console.log("Datos de las canciones de array: ")
                            console.log(resultadoArtistaCancion3);

                            document.getElementById("name").innerHTML = "";

                            // El array puede variar según si ha cogido antes el idCanción o no
                            if (resultadoArtistaCancion3.error) {
                                // Acciones cuando hay un error
                                if (resultadoArtistaCancion3.error.code === 800) {
                                    document.getElementById("name").innerHTML = "El álbum no pertenece al artista indicado";
                                } else if (resultadoArtistaCancion3.error.code === 600) {
                                    document.getElementById("name").innerHTML = "La canción no pertenece al artista indicado";
                                }
                            } else if (resultadoArtistaCancion3.artist && resultadoArtistaCancion3.artist.id == idArtista) {
                                // Acciones cuando no hay error y el id del artista coincide
                                document.getElementById("name").innerHTML = "<aside><a href='" + resultadoArtistaCancion3.link + "' target='_blank'>Nombre de la canción: " + resultadoArtistaCancion3.title + "</a></aside>";
                                document.getElementById("album").innerHTML = "Pertenece al álbum: " + resultadoArtistaCancion3.album.title;
                                document.getElementById("title").innerHTML = "Pertenece al artista: " + resultadoArtistaCancion3.artist.name;
                                var minutos = Math.floor(resultadoArtistaCancion3.duration / 60);
                                var segundos = resultadoArtistaCancion3.duration % 60;
                                document.getElementById("duracion").innerHTML = "Duración: " + minutos + " minutos y " + segundos + " segundos";
                                document.getElementById("img").innerHTML = "<aside><img src='" + resultadoArtistaCancion3.album.cover_big + "' target='_blank'></img></aside>";
                            } else {
                                // Acciones cuando no hay error pero el id del artista no coincide
                                console.log("coinciden no");
                                document.getElementById("name").innerHTML = "El artista indicado no tiene este álbum, comprueba que los parámetros indicados sean correctos.";
                            }
                        });
                });
        });
}

function buscarAlbumCancion(album, cancion) {
    // Limpiar los datos anteriores
    document.getElementById("name").innerHTML = "";
    document.getElementById("album").innerHTML = "";
    document.getElementById("title").innerHTML = "";
    document.getElementById("duracion").innerHTML = "";
    document.getElementById("rank").innerHTML = "";
    document.getElementById("img").innerHTML = "";

    // Ajustes para verificar primero el álbum
    var ajustesAlbumCancion1 = {
        "async": true,
        "crossDomain": true,
        "url": "https://deezerdevs-deezer.p.rapidapi.com/search?q=" + album,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
            "x-rapidapi-key": "d8527b0c1cmsh09072a88a3a2b07p12ff04jsn6ae2a4d04f82"
        }
    }

    // Indicar que está cargando
    document.getElementById("name").innerHTML = "Buscando Álbum...";

    // Realizar la búsqueda del álbum
    fetch(ajustesAlbumCancion1.url, {
        method: ajustesAlbumCancion1.method,
        headers: ajustesAlbumCancion1.headers
    })
        .then(response => response.json())
        .then(resultadoAlbumCancion1 => {
            // Recoger el nombre del álbum y pasarlo a mayúsculas
            const album = document.querySelector("#nombreAlbum").value.toUpperCase();
            console.log("Datos del array para buscar el álbum: ");
            console.log(resultadoAlbumCancion1);
            var datos = resultadoAlbumCancion1.data.length;
            var i = 0;

            // Buscar un álbum con el mismo nombre
            for (i = 0; i < datos; i++) {
                if (resultadoAlbumCancion1.data[i].album.title.toUpperCase() === album.toUpperCase()) {
                    var idAlbum = resultadoAlbumCancion1.data[i].album.id;
                    console.log("Id del álbum: ");
                    console.log(idAlbum);
                    break;
                }
            }

            // Una vez con el ID del álbum, cambiar los ajustes de búsqueda para obtener toda la información del álbum
            var ajustesAlbumCancion2 = {
                "async": true,
                "crossDomain": true,
                "url": "https://deezerdevs-deezer.p.rapidapi.com/album/" + idAlbum,
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
                    "x-rapidapi-key": "d8527b0c1cmsh09072a88a3a2b07p12ff04jsn6ae2a4d04f82"
                }
            }

            // Realizar la búsqueda de toda la información del álbum
            fetch(ajustesAlbumCancion2.url, {
                method: ajustesAlbumCancion2.method,
                headers: ajustesAlbumCancion2.headers
            })
                .then(response => response.json())
                .then(resultadoAlbumCancion2 => {
                    console.log("Todos los datos del álbum: ")
                    console.log(resultadoAlbumCancion2);

                    // Crear una variable con las canciones del álbum y un array para almacenar sus ID
                    var tracklist = resultadoAlbumCancion2.tracks.data;
                    var arrayIdTracklist = [];

                    // Recorrer cada canción del álbum para recoger sus ID y guardarlos en el array
                    for (let a = 0; a < tracklist.length; a++) {
                        var idTracklist = resultadoAlbumCancion2.tracks.data[a].id;
                        arrayIdTracklist.push(idTracklist);
                    }
                    console.log("Todos los ID de las canciones del álbum: ");
                    console.log(arrayIdTracklist);

                    // Verificar si el ID de la canción indicada se encuentra entre esos ID
                    var ajustesAlbumCancion3 = {
                        "async": true,
                        "crossDomain": true,
                        "url": "https://deezerdevs-deezer.p.rapidapi.com/search?q=" + cancion,
                        "method": "GET",
                        "headers": {
                            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
                            "x-rapidapi-key": "d8527b0c1cmsh09072a88a3a2b07p12ff04jsn6ae2a4d04f82"
                        }
                    }

                    // Buscar la canción
                    fetch(ajustesAlbumCancion3.url, {
                        method: ajustesAlbumCancion3.method,
                        headers: ajustesAlbumCancion3.headers
                    })
                        .then(response => response.json())
                        .then(resultadoAlbumCancion3 => {
                            console.log("Todos los datos del array de la canción: ")
                            console.log(resultadoAlbumCancion3);

                            // Si el tamaño del array es 0, la canción no fue encontrada
                            if (resultadoAlbumCancion3.data.length == 0) {
                                document.getElementById("name").innerHTML = "Canción no encontrada";
                            } else {
                                // Poner la canción en mayúsculas
                                const cancion = document.querySelector("#nombreCancion").value.toUpperCase();

                                // Preparar las variables para el bucle
                                var datos = resultadoAlbumCancion3.data.length;
                                var i = 0;
                                var idCancion = 0;

                                // Buscar si la canción está entre las canciones del álbum
                                for (i = 0; i < datos; i++) {
                                    // Utilizar includes() para verificar si el ID está presente en arrayIdTracklist
                                    if (resultadoAlbumCancion3.data[i].title.toUpperCase() === cancion.toUpperCase() && arrayIdTracklist.includes(resultadoAlbumCancion3.data[i].id)) {
                                        idCancion = resultadoAlbumCancion3.data[i].id;
                                        break;
                                    }
                                }

                                console.log("El ID de la canción que coincide: ")
                                console.log(idCancion);

                                // Una vez tenemos un ID que coincide, buscar ese ID en las canciones para obtener todos sus datos
                                var ajustesAlbumCancion4 = {
                                    "async": true,
                                    "crossDomain": true,
                                    "url": "https://deezerdevs-deezer.p.rapidapi.com/track/" + idCancion,
                                    "method": "GET",
                                    "headers": {
                                        "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
                                        "x-rapidapi-key": "d8527b0c1cmsh09072a88a3a2b07p12ff04jsn6ae2a4d04f82"
                                    }
                                }

                                // Indicar que está cargando
                                document.getElementById("name").innerHTML = "Buscando Canción...";

                                // Buscar la canción con el ID coincidente
                                fetch(ajustesAlbumCancion4.url, {
                                    method: ajustesAlbumCancion4.method,
                                    headers: ajustesAlbumCancion4.headers
                                })
                                    .then(response => response.json())
                                    .then(resultadoAlbumCancion4 => {
                                        console.log("Datos del array de la canción: ")
                                        console.log(resultadoAlbumCancion4);

                                        // Preparar el bucle para ir canción por canción y ver cuál coincide
                                        let cancionEncontrada = false;
                                        document.getElementById("name").innerHTML = "";
                                        for (let i = 0; i < tracklist.length; i++) {
                                            if (idCancion == tracklist[i].id) {
                                                // Cuando el ID de la canción coincide con alguno del álbum, recoger los datos
                                                document.getElementById("name").innerHTML = "<aside><a href='" + resultadoAlbumCancion4.link + "' target='_blank'>Nombre de la canción: " + resultadoAlbumCancion4.title + "</a></aside>";
                                                document.getElementById("album").innerHTML = "Pertenece al álbum: " + resultadoAlbumCancion4.album.title;
                                                document.getElementById("title").innerHTML = "Pertenece al artista: " + resultadoAlbumCancion4.artist.name;
                                                var minutos = Math.floor(resultadoAlbumCancion4.duration / 60);
                                                var segundos = resultadoAlbumCancion4.duration % 60;
                                                document.getElementById("duracion").innerHTML = "Duración: " + minutos + " minutos y " + segundos + " segundos";
                                                document.getElementById("img").innerHTML = "<aside><img src='" + resultadoAlbumCancion4.album.cover_big + "' target='_blank'></img></aside>";
                                                document.getElementById("rank").innerHTML = "¿No es la canción que deseabas? Prueba a rellenar el campo del autor";
                                                cancionEncontrada = true;
                                                break;
                                            }
                                        }
                                        if (!cancionEncontrada) {
                                            // Si no coincide la canción, indicarlo y avisar que pueden existir más álbumes con el mismo nombre
                                            document.getElementById("name").innerHTML = cancion + " no pertenece al álbum " + album + " del artista " + resultadoAlbumCancion2.artist.name + ", para una búsqueda más específica, indique el artista deseado";
                                        }
                                    });
                            }
                        });
                });
        });
}

function buscarArtista(artista) {
    // Limpiar los datos anteriores
    document.getElementById("name").innerHTML = "";
    document.getElementById("album").innerHTML = "";
    document.getElementById("title").innerHTML = "";
    document.getElementById("duracion").innerHTML = "";
    document.getElementById("rank").innerHTML = "";
    document.getElementById("img").innerHTML = "";

    // Ajustes para realizar la búsqueda
    var ajustesArtista1 = {
        "async": true,
        "crossDomain": true,
        "url": "https://deezerdevs-deezer.p.rapidapi.com/search?q=" + artista,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
            "x-rapidapi-key": "d8527b0c1cmsh09072a88a3a2b07p12ff04jsn6ae2a4d04f82"
        }
    }

    // Variable para las 10 canciones más escuchadas
    var cont = 1;

    // Indicar que está cargando
    document.getElementById("name").innerHTML = "Buscando Artista...";

    // Realizar la búsqueda
    fetch(ajustesArtista1.url, {
        method: ajustesArtista1.method,
        headers: ajustesArtista1.headers
    })
        .then(response => response.json())
        .then(resultadoArtista1 => {
            console.log("Los datos del array: ")
            console.log(resultadoArtista1);
            var datos = resultadoArtista1.data.length;
            var i = 0;

            document.getElementById("name").innerHTML = "";

            // Buscar el artista en los datos de la API
            for (i = 0; i < datos; i++) {
                // Si el artista indicado es igual a alguno de los datos de la API, recogemos sus datos
                if (resultadoArtista1.data[i].artist.name.toUpperCase() === artista.toUpperCase()) {
                    document.getElementById("img").innerHTML = "<aside><img src='" + resultadoArtista1.data[i].artist.picture_big + "' target='_blank'></img></aside>";
                    document.getElementById("name").innerHTML = "Nombre del Artista: " + resultadoArtista1.data[i].artist.name;

                    // En este bucle, ponemos las 10 canciones más escuchadas del artista
                    for (var x = 0; x < 10; x++) {
                        document.getElementById("title").innerHTML += "<aside><a href='" + resultadoArtista1.data[x].link + "' target='_blank'> # " + cont + ": " + resultadoArtista1.data[x].title + "</a>" + " del album: " + resultadoArtista1.data[x].album.title + "</aside>";
                        cont++;
                    }
                    break;
                }
            }

            // Si el índice i es igual a la longitud de datos y no es igual a 0, el artista no fue encontrado
            if (i === datos && i !== 0) {
                document.getElementById("name").innerHTML = "Artista no encontrado";
            }

            // Si la longitud del array es 0, el artista no existe en Deezer
            if (resultadoArtista1.data.length === 0) {
                document.getElementById("name").innerHTML = "No existe el artista indicado";
            }
        });
}

function buscarAlbum(album) {
    // Limpiar los datos anteriores
    document.getElementById("name").innerHTML = "";
    document.getElementById("album").innerHTML = "";
    document.getElementById("title").innerHTML = "";
    document.getElementById("duracion").innerHTML = "";
    document.getElementById("rank").innerHTML = "";
    document.getElementById("img").innerHTML = "";

    // Proporcionar los ajustes para realizar la búsqueda
    var cont = 1;
    var ajustesAlbum1 = {
        "async": true,
        "crossDomain": true,
        "url": "https://deezerdevs-deezer.p.rapidapi.com/search?q=" + album,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
            "x-rapidapi-key": "d8527b0c1cmsh09072a88a3a2b07p12ff04jsn6ae2a4d04f82"
        }
    }

    // Indicar que está cargando
    document.getElementById("name").innerHTML = "Buscando Álbum...";

    // Realizar la búsqueda
    fetch(ajustesAlbum1.url, {
        method: ajustesAlbum1.method,
        headers: ajustesAlbum1.headers
    })
        .then(response => response.json())
        .then(resultadoAlbum1 => {
            // Pasar el nombre del álbum a mayúsculas
            const album = document.querySelector("#nombreAlbum").value.toUpperCase();
            console.log("Datos del array: ")
            console.log(resultadoAlbum1);
            var datos = resultadoAlbum1.data.length;
            var i = 0;

            // Buscar un álbum con el mismo nombre
            for (i = 0; i < datos; i++) {
                if (resultadoAlbum1.data[i].album.title.toUpperCase() === album.toUpperCase()) {
                    var id = resultadoAlbum1.data[i].album.id;
                    break;
                }
            }

            console.log("El id del álbum es: ");
            console.log(id);

            // Cambiar el tipo de búsqueda para obtener todos los datos del álbum
            var ajustesAlbum2 = {
                "async": true,
                "crossDomain": true,
                "url": "https://deezerdevs-deezer.p.rapidapi.com/album/" + id,
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
                    "x-rapidapi-key": "d8527b0c1cmsh09072a88a3a2b07p12ff04jsn6ae2a4d04f82"
                }
            }

            // Realizar la búsqueda de todos los datos con el id del álbum
            fetch(ajustesAlbum2.url, {
                method: ajustesAlbum2.method,
                headers: ajustesAlbum2.headers
            })
                .then(response => response.json())
                .then(respuestaAlbum2 => {
                    console.log("Los datos del álbum son los siguientes: ")
                    console.log(respuestaAlbum2);

                    try {
                        // Limpiar el cargando y recoger los datos
                        document.getElementById("name").innerHTML = "";
                        var tracklist = respuestaAlbum2.tracks.data.length;
                        document.getElementById("img").innerHTML = "<aside><img src='" + respuestaAlbum2.cover_big + "' target='_blank'></img></aside>";
                        document.getElementById("name").innerHTML = "Nombre del Álbum: " + respuestaAlbum2.title;

                        // Este bucle se repite tantas veces como canciones tenga el álbum, y las ordenamos con la variable cont
                        for (i = 0; i < tracklist; i++) {
                            document.getElementById("title").innerHTML += "<aside><a href='" + respuestaAlbum2.tracks.data[i].link + "' target='_blank'> # " + cont + ": " + respuestaAlbum2.tracks.data[i].title + "</a></aside>";
                            cont++;
                        }
                    } catch (error) {
                        // Si hay un error, verificar si es el código 800 (no se encontró el álbum)
                        if (respuestaAlbum2.error.code == 800) {
                            document.getElementById("name").innerHTML = "El álbum indicado no existe";
                        }
                    }
                });
        });
}

function buscarCancion(cancion) {
    // Limpiar los datos anteriores
    document.getElementById("name").innerHTML = "";
    document.getElementById("album").innerHTML = "";
    document.getElementById("title").innerHTML = "";
    document.getElementById("duracion").innerHTML = "";
    document.getElementById("rank").innerHTML = "";
    document.getElementById("img").innerHTML = "";

    // Ajustes para la búsqueda de la canción
    var ajustesCancion1 = {
        "async": true,
        "crossDomain": true,
        "url": "https://deezerdevs-deezer.p.rapidapi.com/search?q=" + cancion,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
            "x-rapidapi-key": "d8527b0c1cmsh09072a88a3a2b07p12ff04jsn6ae2a4d04f82"
        }
    }

    // Indicar que está cargando
    document.getElementById("name").innerHTML = "Buscando Canción...";

    // Realizar la búsqueda en los 25 datos que devuelve la API
    fetch(ajustesCancion1.url, {
        method: ajustesCancion1.method,
        headers: ajustesCancion1.headers
    })
        .then(response => response.json())
        .then(resultadoCancion1 => {
            console.log("Datos de array: ");
            console.log(resultadoCancion1);

            if (resultadoCancion1.data.length == 0) {
                document.getElementById("name").innerHTML = "La canción no existe";
            } else {
                const cancion = document.querySelector("#nombreCancion").value.toUpperCase();
                console.log("Ponemos la canción en mayúsculas: " + cancion)
                var datos = resultadoCancion1.data.length;
                var i = 0;

                for (i = 0; i < datos; i++) {
                    if (resultadoCancion1.data[i].title.toUpperCase() === cancion.toUpperCase()) {
                        var id = resultadoCancion1.data[i].id;
                        var track = resultadoCancion1.data[i].type;
                        break;
                    }
                }

                if (id == null) {
                    document.getElementById("name").innerHTML = "Canción no encontrada, verifica que los datos sean correctos";
                }
                console.log("El id de la canción indicada: " + id)
                console.log("Verificamos que la canción indicada es una canción: " + track)
            }

            if (track == "track") {
                // Ajustes para obtener más datos de la canción
                var ajustesCancion2 = {
                    "async": true,
                    "crossDomain": true,
                    "url": "https://deezerdevs-deezer.p.rapidapi.com/track/" + id,
                    "method": "GET",
                    "headers": {
                        "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
                        "x-rapidapi-key": "d8527b0c1cmsh09072a88a3a2b07p12ff04jsn6ae2a4d04f82"
                    }
                }

                // Realizar la búsqueda de todos los datos de la canción
                fetch(ajustesCancion2.url, {
                    method: ajustesCancion2.method,
                    headers: ajustesCancion2.headers
                })
                    .then(response => response.json())
                    .then(resultadoCancion2 => {
                        console.log("Todos los datos relacionados con esta canción: ");
                        console.log(resultadoCancion2);
                        document.getElementById("name").innerHTML = "<aside><a href='" + resultadoCancion2.link + "' target='_blank'>Nombre de la canción: " + resultadoCancion2.title + "</a></aside>";
                        document.getElementById("album").innerHTML = "Pertenece al álbum: " + resultadoCancion2.album.title;
                        document.getElementById("title").innerHTML = "Pertenece al artista: " + resultadoCancion2.artist.name;
                        var minutos = Math.floor(resultadoCancion2.duration / 60);
                        var segundos = resultadoCancion2.duration % 60;
                        document.getElementById("duracion").innerHTML = "Duración: " + minutos + " minutos y " + segundos + " segundos";
                        document.getElementById("img").innerHTML = "<aside><img src='" + resultadoCancion2.album.cover_big + "' target='_blank'></img></aside>";
                    });
            }
        });
}
