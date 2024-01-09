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
        buscarArtistaAlbumCanción(nombreArtista, nombreAlbum, nombreCancion);
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

function buscarArtistaAlbumCanción(artista, album, cancion) {
    //Primero eliminamos los datos anteriores
    $("#name").empty();
    $("#album").empty();
    $("#title").empty();
    $("#duracion").empty();
    $("#rank").empty();
    $("#img").empty();

    //Primero vamos a buscar el artista
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

    //Indicamos que esta cargando porque algunas acciones tardan mas que otras.
    $("#name").empty();
    $("#name").append("Buscando Artista...");

    //Con los ajustes proporcionados, procedemos a buscar el artista
    $.ajax(ajustesArtistaAlbumCancion1).done(function (resultadoArtistaAlbumCancion1) {
        console.log("Array del artista: ")
        console.log(resultadoArtistaAlbumCancion1);

        //Seleccionamos el nombre del artista y lo ponemos en mayusculas
        const artista = document.querySelector("#nombreArtista").value.toUpperCase();
        //Creamos un bucle para buscar un artista que coincida con el indicado y obtenemos su id
        var datos = resultadoArtistaAlbumCancion1.data.length;
        var i = 0;
        for (i = 0; i < datos; i++) {
            if (resultadoArtistaAlbumCancion1.data[i].artist.name.toUpperCase() === artista) {
                var idArtista = resultadoArtistaAlbumCancion1.data[i].artist.id;
                break;
            }
        }

        console.log("Id del artista: ")
        console.log(idArtista);

        //Una vez tenemos el id del artista, vamos a buscar el album
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

        $("#name").empty();
        $("#name").append("Buscando Álbum...");

        $.ajax(ajustesArtistaAlbumCancion2).done(function (resultadoArtistaAlbumCancion2) {
            console.log("Datos del array del album: ")
            console.log(resultadoArtistaAlbumCancion2);

            //Ponemos en mayusculas el album escrito
            const album = document.querySelector("#nombreAlbum").value.toUpperCase();

            //Creamos este bucle para recoger el album que coincida con el nombre y con el artista
            var datos = resultadoArtistaAlbumCancion2.data.length;
            var i = 0;
            for (i = 0; i < datos; i++) {
                if (resultadoArtistaAlbumCancion2.data[i].album.title.toUpperCase() === album & resultadoArtistaAlbumCancion2.data[i].artist.name.toUpperCase() === artista) {
                    var idAlbum = resultadoArtistaAlbumCancion2.data[i].album.id;
                    break;
                }
            }

            console.log("El id del album: ")
            console.log(idAlbum);

            //Si no se ha encontrado ningún album, se indica y se salta los pasos siguientes, ya que no tenemos recogido ningún id
            if (idAlbum == undefined) {
                $("#name").empty();
                $("#name").append(album + " no pertenece al artista " + artista);
            }

            //Una vez tenemos el id del album, cambiamos los ajustes para obtener toda la información del album
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

            $.ajax(ajustesArtistaAlbumCancion3).done(function (resultadoArtistaAlbumCancion3) {

                console.log("Datos del Álbum: ")
                console.log(resultadoArtistaAlbumCancion3);

                //Aqui comprobamos que el album que hemos escogido pertenece al artista indicado
                var idComprobar = resultadoArtistaAlbumCancion3.artist.id;
                if (idComprobar == idArtista) {
                    var tracklist = resultadoArtistaAlbumCancion3.tracks.data;
                    var arrayIdTracklist = [];
                    for (let a = 0; a < tracklist.length; a++) {
                        var idTracklist = resultadoArtistaAlbumCancion3.tracks.data[a].id;
                        arrayIdTracklist.push(idTracklist);

                    }

                    console.log("Todos los id de las canciones del Álbum: ")
                    console.log(arrayIdTracklist);

                    //Cambiamos los ajustes para obtener el id de la cancion indicada
                    var ajustesArtistaAlbumCancion4 = {
                        "async": true,
                        "crossDomain": true,
                        "url": "https://deezerdevs-deezer.p.rapidapi.com/search?q=" + cancion,
                        "method": "GET",
                        "headers": {
                            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
                            "x-rapidapi-key": "d8527b0c1cmsh09072a88a3a2b07p12ff04jsn6ae2a4d04f82"
                        }
                    }

                    $.ajax(ajustesArtistaAlbumCancion4).done(function (resultadoArtistaAlbumCancion4) {
                        console.log("Datos del array: ")
                        console.log(resultadoArtistaAlbumCancion4);

                        //Aqui nos aseguramos de que el array tenga datos
                        if (resultadoArtistaAlbumCancion4.data.length == 0) {
                            $("#name").empty();
                            $("#name").append("Canción no encontrada");
                        } else {
                            //Ponemos el nomobre de la cancion en mayusculas
                            const cancion = document.querySelector("#nombreCancion").value.toUpperCase();

                            //Creamos el bucle para buscar si el id de la cancion indicada esta dentro de los id de las canciones del album
                            var datos = resultadoArtistaAlbumCancion4.data.length;
                            var i = 0;
                            var idCancion = 0;
                            for (i = 0; i < datos; i++) {
                                // Utiliza includes() para verificar si el id está presente en arrayIdTracklist
                                if (resultadoArtistaAlbumCancion4.data[i].title.toUpperCase() === cancion.toUpperCase() & arrayIdTracklist.includes(resultadoArtistaAlbumCancion4.data[i].id)) {
                                    idCancion = resultadoArtistaAlbumCancion4.data[i].id;

                                    break;
                                }
                            }

                            console.log("Id de la cancion que esta en el album: ")
                            console.log(idCancion);

                            //Cambiamos los ajustes una ultima vez para obtener toda la información de la cancion
                            var ajustesArtistaAlbumCancion5 = {
                                "async": true,
                                "crossDomain": true,
                                "url": "https://deezerdevs-deezer.p.rapidapi.com/track/" + idCancion,
                                "method": "GET",
                                "headers": {
                                    "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
                                    "x-rapidapi-key": "d8527b0c1cmsh09072a88a3a2b07p12ff04jsn6ae2a4d04f82"
                                }
                            }

                            $("#name").empty();
                            $("#name").append("Buscando Canción...");

                            $.ajax(ajustesArtistaAlbumCancion5).done(function (resultadoArtistaAlbumCancion5) {
                                console.log("Todos los datos de la cancion: ")
                                console.log(resultadoArtistaAlbumCancion5);
                                $("#name").empty();
                                //En este bucle verificamos que la canción se encuentra dentro del album.
                                let cancionEncontrada = false;
                                for (let i = 0; i < tracklist.length; i++) {
                                    //Si la cancion se encuentra dentro, proporcionamos los datos
                                    if (idCancion == tracklist[i].id) {
                                        console.log("esta la cancion");
                                        $("#name").append("<aside><a href='" + resultadoArtistaAlbumCancion5.link + "' target='_blank'>Nombre de la canción: " + resultadoArtistaAlbumCancion5.title + "</a></aside>");
                                        $("#album").append("Pertenece al álbum: " + resultadoArtistaAlbumCancion5.album.title);
                                        $("#title").append("Pertenece al artista: " + resultadoArtistaAlbumCancion5.artist.name);
                                        var minutos = Math.floor(resultadoArtistaAlbumCancion5.duration / 60);
                                        var segundos = resultadoArtistaAlbumCancion5.duration % 60;
                                        $("#duracion").append("Duración: " + minutos + " minutos y " + segundos + " segundos");
                                        $("#img").append("<aside><img src='" + resultadoArtistaAlbumCancion5.album.cover_big + "' target='_blank'></img></aside>");
                                        cancionEncontrada = true;
                                        break;
                                    }
                                }
                                //Si no se encuentra dentro del tracklist, salta el siguiente error
                                if (!cancionEncontrada) {
                                    console.log("no esta");
                                    if (resultadoArtistaAlbumCancion5.error.code === 800) {
                                        $("#name").empty();
                                        $("#name").append(cancion + " no pertenece al album " + album + " del artista " + artista);
                                    }
                                }
                            });
                        }
                    })
                    //Si el idartista y el id del creador del album no coinciden, sale el siguiente mensaje.
                } else {
                    $("#name").empty();
                    $("#name").append("El artista indicado no tiene este album, comprueba que los parametros indicados sean correctos.");
                }

            });
        });

    });
}

function buscarAlbumArtista(artista, album) {
    //Primero quitamos los datos anteriores
    $("#name").empty();
    $("#album").empty();
    $("#title").empty();
    $("#duracion").empty();
    $("#rank").empty();
    $("#img").empty();

    //Como vamos a buscar el idartista primero
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

    //Indicamos que esta cargando porque algunas acciones tardan mas que otras.
    $("#name").append("Buscando Artista...");

    //Creamos la variable para ordenar las canciones de los albumes
    var cont = 1;

    //Con los ajustes indicados, procedemos a buscar
    $.ajax(ajustesArtistaAlbum1).done(function (resultadoArtistaAlbum1) {
        console.log("Datos del array: ")
        console.log(resultadoArtistaAlbum1);

        //Recogemos el nombre del artista y lo ponemos en mayusculas
        const artista = document.querySelector("#nombreArtista").value.toUpperCase();
        var datos = resultadoArtistaAlbum1.data.length;

        //Creamos el bucle para buscar un artista que coincida con el nombre indicado
        var i = 0;
        for (i = 0; i < datos; i++) {
            if (resultadoArtistaAlbum1.data[i].artist.name.toUpperCase() === artista) {
                var idArtista = resultadoArtistaAlbum1.data[i].artist.id;
                break;
            }
        }

        console.log("Id del artista: ")
        console.log(idArtista);

        //Cambiamos los ajustes para realizar la búsqueda del album
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

        $.ajax(ajustesArtistaAlbum2).done(function (resultadoArtistaAlbum2) {
            //Recogemos el album y lo ponemos en mayúsculas
            const album = document.querySelector("#nombreAlbum").value.toUpperCase();
            console.log("Los datos del array: ")
            console.log(resultadoArtistaAlbum2);
            var datos = resultadoArtistaAlbum2.data.length;

            //Creamos el bucle para ir album a album para ver cual esta creado por el artista indicado
            var i = 0;
            for (i = 0; i < datos; i++) {
                if (resultadoArtistaAlbum2.data[i].album.title.toUpperCase() === album & resultadoArtistaAlbum2.data[i].artist.name.toUpperCase() === artista) {
                    var idAlbum = resultadoArtistaAlbum2.data[i].album.id;
                    break;
                }
            }

            console.log("El id del album: ")
            console.log(idAlbum);

            //Cambiamos los ajustes para buscar toda la información del album
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

            $("#name").empty();
            $("#name").append("Buscando Álbum...");

            $.ajax(ajustesArtistaAlbum3).done(function (resultadoArtistaAlbum3) {
                console.log("Toda la información del album: ")
                console.log(resultadoArtistaAlbum3);

                $("#name").empty();
                try {
                    var idComprobar = resultadoArtistaAlbum3.artist.id;

                    //Lo que comprobamos aquí es si el album que se ha seleccionado coincide con el artista
                    if (idComprobar == idArtista) {
                        //Si coincide, cogemos todos los datos
                        var tracklist = resultadoArtistaAlbum3.tracks.data.length;
                        $("#img").append("<aside><img src='" + resultadoArtistaAlbum3.cover_big + "' target='_blank'></img></aside>");
                        $("#name").append("Nombre del Álbum: " + resultadoArtistaAlbum3.title);
                        //Para poner todas las canciones del album creamos este bucle
                        for (i = 0; i < tracklist; i++) {
                            $("#title").append("<aside><a href='" + resultadoArtistaAlbum3.tracks.data[i].link + "' target='_blank'> # " + cont + ": " + resultadoArtistaAlbum3.tracks.data[i].title + "</a></aside>");
                            cont++;
                        }
                    } else {
                        //Si no coinciden, salta este error
                        $("#name").append("El artista indicado no tiene este album, comprueba que los parametros indicados sean correctos.");
                    }
                } catch (error) {
                    if (resultadoArtistaAlbum3.error.code == 800) {
                        //Si sucede un error de la consulta, salta este catch
                        $("#name").append("El album no pertenece al artista indicado");
                        $("#title").append("Puede ser porque la api solo da 25 resultados");
                    }
                }

            });
        });

    });
}

function buscarArtistaCancion(artista, cancion) {
    //Primero quitamos los datos anteriores
    $("#name").empty();
    $("#album").empty();
    $("#title").empty();
    $("#duracion").empty();
    $("#rank").empty();
    $("#img").empty();

    //Primero vamos a verificar el artista, por lo que facilitamos los ajustes necesarios
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

    //Indicamos que esta cargando porque algunas acciones tardan mas que otras.
    $("#name").empty();
    $("#name").append("Buscando Artista...");

    $.ajax(ajustesArtistaCancion1).done(function (resultadoArtistaCancion1) {
        console.log("Datos del array del artista: ")
        console.log(resultadoArtistaCancion1);

        //Recogemos el nombre que hemos introducido y lo ponemos en mayusculas
        const artista = document.querySelector("#nombreArtista").value.toUpperCase();
        var datos = resultadoArtistaCancion1.data.length;
        var i = 0;

        //Creamos un bucle para buscar el artista
        for (i = 0; i < datos; i++) {
            if (resultadoArtistaCancion1.data[i].artist.name.toUpperCase() === artista) {
                //Si encuentra el artista, coge su id y sale del bucle.
                var idArtista = resultadoArtistaCancion1.data[i].artist.id;
                break;
            }
        }

        console.log("Id del artista: ")
        console.log(idArtista);

        //Una vez que tenemos el id del artista, buscamos la canción
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

        //Una vez cambiada la url, empezamos a buscar
        $.ajax(ajustesArtistaCancion2).done(function (resultadoArtistaCancion2) {
            //Cogemos el nombre de la canción y la ponemos en mayúsculas
            const cancion = document.querySelector("#nombreCancion").value.toUpperCase();

            console.log("Datos del array de la canción: ")
            console.log(resultadoArtistaCancion2);

            var datos = resultadoArtistaCancion2.data.length;
            var idCancion = null; // Inicializar idCancion a null antes del bucle
            var i = 0;

            //Creamos el bucle para ir canción a canción y encontrar una en la que coincida el idArtista de antes con el artista de la canción.
            for (i = 0; i < datos; i++) {
                if (resultadoArtistaCancion2.data[i].title.toUpperCase() === cancion && resultadoArtistaCancion2.data[i].artist.id === idArtista) {
                    idCancion = resultadoArtistaCancion2.data[i].id;
                    break;
                }
            }

            console.log("Id de la canion creada por el artista indicado: ")
            console.log(idCancion);

            //Una vez tenemos el id de la canción, buscamos todos sus datos
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

            $("#name").empty();
            $("#name").append("Buscando Canción...");

            //Cambiamos los ajustes para realizar la busqueda correcta
            $.ajax(ajustesArtistaCancion3).done(function (resultadoArtistaCancion3) {
                console.log("Datos de las canciones de array: ")
                console.log(resultadoArtistaCancion3);

                $("#name").empty();
                //El array puede variar según si ha cogido antes el idCanción o no
                if (resultadoArtistaCancion3.error) {
                    // Acciones cuando hay un error
                    if (resultadoArtistaCancion3.error.code === 800) {
                        $("#name").append("El álbum no pertenece al artista indicado");
                    } else if (resultadoArtistaCancion3.error.code === 600) {
                        $("#name").append("La canción no pertenece al artista indicado");
                    }
                } else if (resultadoArtistaCancion3.artist && resultadoArtistaCancion3.artist.id == idArtista) {
                    // Acciones cuando no hay error y el id del artista coincide
                    $("#name").append("<aside><a href='" + resultadoArtistaCancion3.link + "' target='_blank'>Nombre de la canción: " + resultadoArtistaCancion3.title + "</a></aside>");
                    $("#album").append("Pertenece al álbum: " + resultadoArtistaCancion3.album.title);
                    $("#title").append("Pertenece al artista: " + resultadoArtistaCancion3.artist.name);
                    var minutos = Math.floor(resultadoArtistaCancion3.duration / 60);
                    var segundos = resultadoArtistaCancion3.duration % 60;
                    $("#duracion").append("Duración: " + minutos + " minutos y " + segundos + " segundos");
                    $("#img").append("<aside><img src='" + resultadoArtistaCancion3.album.cover_big + "' target='_blank'></img></aside>");
                } else {
                    // Acciones cuando no hay error pero el id del artista no coincide
                    console.log("coinciden no");
                    $("#name").append("El artista indicado no tiene este álbum, comprueba que los parámetros indicados sean correctos.");
                }

            });
        });

    });
}

function buscarAlbumCancion(album, cancion) {
    //Primero limpiamos los datos anteriores
    $("#name").empty();
    $("#album").empty();
    $("#title").empty();
    $("#duracion").empty();
    $("#rank").empty();
    $("#img").empty();

    //Indicamos los ajustes que deseamos, en este caso vamos a verificar primero el album
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

    //Indicamos que esta cargando porque algunas acciones tardan mas que otras.
    $("#name").empty();
    $("#name").append("Buscando Álbum...");

    $.ajax(ajustesAlbumCancion1).done(function (resultadoAlbumCancion1) {
        //Recogemos el nombre del album y lo ponemos en mayúsculas
        const album = document.querySelector("#nombreAlbum").value.toUpperCase();
        console.log("Datos del array para buscar el álbum: ");
        console.log(resultadoAlbumCancion1);
        var datos = resultadoAlbumCancion1.data.length;
        var i = 0;

        //Vamos dato por dato por todo el array hasta encontrar un album con el mismo nombre
        for (i = 0; i < datos; i++) {
            if (resultadoAlbumCancion1.data[i].album.title.toUpperCase() === album.toUpperCase()) {
                var idAlbum = resultadoAlbumCancion1.data[i].album.id;
                console.log("Id del album: ");
                console.log(idAlbum);
                break;
            }
        }

        // Una vez con el album id, cambiamos los ajustes de búsqueda para sacar toda la información del álbum
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

        $.ajax(ajustesAlbumCancion2).done(function (resultadoAlbumCancion2) {
            console.log("Todos los datos del álbum: ")
            console.log(resultadoAlbumCancion2);
            //Creamos una variable con las canciones del álbum, y un array para almacenarlas
            var tracklist = resultadoAlbumCancion2.tracks.data;
            var arrayIdTracklist = [];
            //En este bucle vamos cancion a cancion del álbum recogiendo su id y guardandolo en el array
            for (let a = 0; a < tracklist.length; a++) {
                var idTracklist = resultadoAlbumCancion2.tracks.data[a].id;
                arrayIdTracklist.push(idTracklist);
            }
            console.log("Todos los id de las canciones del álbum: ");
            console.log(arrayIdTracklist);

            //Con todos los id de las canciones del album, vamos a ver si el id de la cancion indicada se encuentra entre esos id
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

            //Con estos ajustes, vamos a buscar la canción
            $.ajax(ajustesAlbumCancion3).done(function (resultadoAlbumCancion3) {
                console.log("Todos los datos del array de la canción: ")
                console.log(resultadoAlbumCancion3);

                //Si el tamaño del array es 0, es que no ha encontrado una canción con ese nombre
                if (resultadoAlbumCancion3.data.length == 0) {
                    $("#name").empty();
                    $("#name").append("Canción no encontrada");
                } else {
                    //Si tiene datos el array, ponemos la canción en mayúsculas
                    const cancion = document.querySelector("#nombreCancion").value.toUpperCase();

                    //Preparamos las variables para realizar el bucle
                    var datos = resultadoAlbumCancion3.data.length;
                    var i = 0;
                    var idCancion = 0;

                    //En este bucle vamos a ver si la canción esta entre las canciones del album.
                    for (i = 0; i < datos; i++) {
                        // Utiliza includes() para verificar si el id está presente en arrayIdTracklist
                        if (resultadoAlbumCancion3.data[i].title.toUpperCase() === cancion.toUpperCase() & arrayIdTracklist.includes(resultadoAlbumCancion3.data[i].id)) {
                            idCancion = resultadoAlbumCancion3.data[i].id;
                            break;
                        }
                    }

                    console.log("El id de la canción que coincide: ")
                    console.log(idCancion);

                    //Una vez tenemos un id que conincide, buscamos ese id en las canciones para obtener todos sus datos
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

                    $("#name").empty();
                    $("#name").append("Buscando Canción...");

                    //Una vez cambiamos la url para buscar la canción, procedemos a sacar los datos
                    $.ajax(ajustesAlbumCancion4).done(function (resultadoAlbumCancion4) {
                        console.log("Datos del array de la canción: ")
                        console.log(resultadoAlbumCancion4);

                        //preparamos el bucle para ir cancion por cancion para ver cual es la que coincide
                        let cancionEncontrada = false;
                        $("#name").empty();
                        for (let i = 0; i < tracklist.length; i++) {
                            if (idCancion == tracklist[i].id) {
                                //Cuando el id de la cancion coincide con alguno del album, recogemos los datos
                                $("#name").append("<aside><a href='" + resultadoAlbumCancion4.link + "' target='_blank'>Nombre de la canción: " + resultadoAlbumCancion4.title + "</a></aside>");
                                $("#album").append("Pertenece al álbum: " + resultadoAlbumCancion4.album.title);
                                $("#title").append("Pertenece al artista: " + resultadoAlbumCancion4.artist.name);
                                var minutos = Math.floor(resultadoAlbumCancion4.duration / 60);
                                var segundos = resultadoAlbumCancion4.duration % 60;
                                $("#duracion").append("Duración: " + minutos + " minutos y " + segundos + " segundos");
                                $("#img").append("<aside><img src='" + resultadoAlbumCancion4.album.cover_big + "' target='_blank'></img></aside>");
                                $("#rank").append("¿No es la canción que deseabas? Prueba a relenar el campo del autor");
                                cancionEncontrada = true;
                                break;
                            }
                        }
                        if (!cancionEncontrada) {
                            //Si no coincide la canción, lo indicamos y avisamos que pueden existir más albumes con el mismo nombre
                            $("#name").append(cancion + " no pertenece al album " + album + " del artista " + resultadoAlbumCancion2.artist.name + ", para una búsqueda más específica, indique el artista deseado");
                        }
                    });

                }
            })
        });
    });
}

function buscarArtista(artista) {
    //Limpiamos los datos anteriores
    $("#name").empty();
    $("#album").empty();
    $("#title").empty();
    $("#duracion").empty();
    $("#rank").empty();
    $("#img").empty();

    //Indicamos los ajustes que queremos para realizar la búsqueda
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

    //Usamos esta variable para poner las 10 canciones más escuchadas
    var cont = 1;

    //Indicamos que esta cargando porque algunas acciones tardan mas que otras.
    $("#name").append("Buscando Artista...");

    $.ajax(ajustesArtista1).done(function (resultadoArtista1) {
        //Con los ajustes proporcionados buscamos el artista indicado
        console.log("Los datos del array: ")
        console.log(resultadoArtista1);
        var datos = resultadoArtista1.data.length;
        var i = 0;

        $("#name").empty();

        //Vamos viendo adto por dato hasta encontrar el artista.
        for (i = 0; i < datos; i++) {
            //Si el artista indicado es igual a alguno de los datos de la api, cogemos sus datos
            if (resultadoArtista1.data[i].artist.name.toUpperCase() === artista.toUpperCase()) {
                $("#img").append("<aside><img src='" + resultadoArtista1.data[i].artist.picture_big + "' target='_blank'></img></aside>");
                $("#name").append("Nombre del Artista: " + resultadoArtista1.data[i].artist.name);
                //En este bucle ponemos las 10 canciones más escuchadas del artista
                for (x = 0; x < 10; x++) {
                    $("#title").append("<aside><a href='" + resultadoArtista1.data[x].link + "' target='_blank'> # " + cont + ": " + resultadoArtista1.data[x].title + "</a>" + " del album: " + resultadoArtista1.data[x].album.title + "</aside>");
                    cont++;
                }
                break;
            }
        }
        if (i == datos && i != 0) {
            $("#name").append("Artista no encontrado");
        }
        //Si el array tiene de longuitud 0, es que el artista no existe en deezer.
        if (resultadoArtista1.data.length == 0) {
            $("#name").append("No existe el artista indicado")
        }
    });
}

function buscarAlbum(album) {
    //Primero limpiamos los datos
    $("#name").empty();
    $("#album").empty();
    $("#title").empty();
    $("#duracion").empty();
    $("#rank").empty();
    $("#img").empty();

    //Ahora vamos a proporcionar los ajustes para realizar la búsqueda
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

    //Indicamos que esta cargando porque algunas acciones tardan mas que otras.
    $("#name").append("Buscando Álbum...");

    //Los los ajustes anteriores realizamos la búsqueda
    $.ajax(ajustesAlbum1).done(function (resultadoAlbum1) {
        //Pasamos el nombre del album a mayúsculas
        const album = document.querySelector("#nombreAlbum").value.toUpperCase();
        console.log("Datos del array: ")
        console.log(resultadoAlbum1);
        var datos = resultadoAlbum1.data.length;
        var i = 0;
        //Con este bucle, buscamos un album que se llame igual al dato introducido, y si es asi, recogemos su id
        for (i = 0; i < datos; i++) {
            if (resultadoAlbum1.data[i].album.title.toUpperCase() === album.toUpperCase()) {
                var id = resultadoAlbum1.data[i].album.id;
                break;
            }
        }
        console.log("El id del album es: ");
        console.log(id);

        //Una vez tenemos el id del album, cambiamos el tipo de búsqueda para asi obtener todos los datos del álbum
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


        //Con los ajustes nuevos, procedemos a buscar los datos con el id del album
        $.ajax(ajustesAlbum2).done(function (respuestaAlbum2) {
            console.log("Los datos del álbum son los siguientes: ")
            console.log(respuestaAlbum2);
            //Realizamos un try/Catch debido a que en la busqueda del id, puede que el album introducido no exista,
            //por lo que no va a existir el id. Si pasa eso, sale el error 800, que es el que procesamos en el catch
            try {
                //Limpiamos el cargando y recogemos los datos
                $("#name").empty();
                var tracklist = respuestaAlbum2.tracks.data.length;
                $("#img").append("<aside><img src='" + respuestaAlbum2.cover_big + "' target='_blank'></img></aside>");
                $("#name").append("Nombre del Álbum: " + respuestaAlbum2.title);
                //Este bucle se repite tantas veces como canciones tenga el album, y las ordenamos con la variable cont
                for (i = 0; i < tracklist; i++) {
                    $("#title").append("<aside><a href='" + respuestaAlbum2.tracks.data[i].link + "' target='_blank'> # " + cont + ": " + respuestaAlbum2.tracks.data[i].title + "</a></aside>");
                    cont++;
                }
            } catch (error) {
                //Si sale el error 800, es que no se ha encontrado ningún id con el album indicado,
                //ya que en el apartado anterior, si no existe el album no recoge ningun id
                if (respuestaAlbum2.error.code == 800) {
                    $("#name").empty();
                    $("#name").append("El album indicado no existe");
                }
            }


        });
    });

}

function buscarCancion(cancion) {
    //Primero procedemos a limpiar los datos anteriores
    $("#name").empty();
    $("#album").empty();
    $("#title").empty();
    $("#duracion").empty();
    $("#rank").empty();
    $("#img").empty();

    //Acto seguido indicamos con los soguientes ajustes el tipo de búsqueda que queremos realizar, en este caso usando el search de la api con el nombre de la canción
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

    //Indicamos que esta cargando porque algunas acciones tardan mas que otras.
    $("#name").append("Buscando Canción...");

    //Usando los ajustes establecidos realizamos la búsqueda en los 25 datos que nos devuelve esta api
    $.ajax(ajustesCancion1).done(function (resultadoCancion1) {
        console.log("Datos de array: ");
        console.log(resultadoCancion1);

        //Si el resultado del array es 0 indicamos que la canción no existe e indicamos que verifique los datos,
        //ya que si no está escrito exactamente como en la api no va a ser reconocido
        if (resultadoCancion1.data.length == 0) {
            $("#name").empty();
            $("#name").append("La canción no existe");
        } else {
            //Si el array recoge datos, pasamos el nombre introducido y el nombre de las canciones del array a mayúsculas, para evitar problemas.
            const cancion = document.querySelector("#nombreCancion").value.toUpperCase();
            console.log("Ponemos la canción en mayusculas: " + cancion)
            var datos = resultadoCancion1.data.length;
            var i = 0;

            //En este bucle buscamos uan canción que coincida con el nombre introducido
            for (i = 0; i < datos; i++) {
                if (resultadoCancion1.data[i].title.toUpperCase() === cancion.toUpperCase()) {
                    //Cuando encontramos el nombre de la canción recogemos el id y verificamos que sea una cancion y no un album.
                    var id = resultadoCancion1.data[i].id;
                    var track = resultadoCancion1.data[i].type;
                    break;
                }
            }
            //Si no encuentra ninguna canción con el mismo nombre, devolvemos el siguiente mensaje.
            if (id == null) {
                $("#name").empty();
                $("#name").append("Canción no encontrada, verifica que los datos sean correctos");
            }
            console.log("El id de la canción indicada: " + id)
            console.log("Verificamos que la canción indicada es una canción: " + track)
        }


        //Aqui verificamos que sea una canción, ya que si recogemos un album con el mismo nombre no podriamos buscar en el apartado de canciones de la api
        if (track == "track") {
            //Una vez verificado, cambiamos el tipo de búsqueda de la api para obtener más datos de la canción
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

            //Con los ajustes anteriores, realizamos las búsquedas de todos los datos de la canción
            $.ajax(ajustesCancion2).done(function (resultadoCancion2) {
                console.log("Todos los datos relacionados con esta canción: ");
                console.log(resultadoCancion2);
                $("#name").empty();
                $("#name").append("<aside><a href='" + resultadoCancion2.link + "' target='_blank'>Nombre de la canción: " + resultadoCancion2.title + "</a></aside>");
                $("#album").append("Pertenece al álbum: " + resultadoCancion2.album.title);
                $("#title").append("Pertenece al artista: " + resultadoCancion2.artist.name);
                var minutos = Math.floor(resultadoCancion2.duration / 60);
                var segundos = resultadoCancion2.duration % 60;
                $("#duracion").append("Duración: " + minutos + " minutos y " + segundos + " segundos");
                $("#img").append("<aside><img src='" + resultadoCancion2.album.cover_big + "' target='_blank'></img></aside>");
            });
        }
    });
}
