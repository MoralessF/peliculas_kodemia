//const firebaseConfig = "peliculas-app-31b24";
const urlDB = "https://peliculas-app-31b24-default-rtdb.firebaseio.com/"

const crearPeliculaFavorita = (peliculaID, backdropPath, title, overview, vote_average, funcion) =>
{
    const url=`${urlDB}/favoritos.json`;
    const pelicula = {peliculaID, backdropPath, title, vote_average, overview};

    fetch(url,{
        method:'POST',
        body:JSON.stringify(pelicula),
        headers:
        {
            'Content-Type':'application/json'
        }
    }).then((respuesta)=>respuesta.json())
    .then((body)=>funcion(body))
    .catch((error)=>console.log(error));
}

const recuperarFavoritos = (funcion) =>
{
    const url=`${urlDB}/favoritos.json`;
    fetch(url)
    .then(respuesta => respuesta.json())
    .then((body) => funcion(body))
    .catch((error)=>console.log(error));
}

const recuperarFavoritos2=async()=>
{
    const url=`${urlDB}/favoritos.json`;
    const respuesta=await fetch(url);
    const body=await respuesta.json();
    const peliculas=body.results;
    console.log(body);
    // peliculas.forEach((pelicula)=>
    // {
    //     console.log(pelicula);
    // });
    return body;
}