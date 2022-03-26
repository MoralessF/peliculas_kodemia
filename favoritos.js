const urlDB = "https://peliculas-app-31b24-default-rtdb.firebaseio.com/"
const urlPoster = 'https://image.tmdb.org/t/p/original';

const containerCards=document.querySelector('.row');

const recuperarFavoritos2=async()=>
{
    const url=`${urlDB}/favoritos.json`;
    const respuesta=await fetch(url);
    const body=await respuesta.json();
    const peliculas=Object.values(body);
    peliculas.forEach((pelicula) => {
        //console.log(pelicula);
        if(pelicula.overview!==''&&pelicula.backdrop_path!==null)
        {
            // console.log(typeof pelicula.vote_average);
            if(pelicula.vote_average<6){colorCalificacion="bg-danger";}
            else if(pelicula.vote_average>=6 && pelicula.vote_average<7.5){colorCalificacion="bg-warning";}
            else{colorCalificacion='bg-success'}

            const card=`
            <div ondblclick="irPelicula('${pelicula.peliculaID}')" class="card col-3 p-0 m-1">
                <img src="${urlPoster}${pelicula.backdropPath}" class="card-img-top" alt="${pelicula.title}">
                <div class="card-body d-flex flex-column justify-content-center align-items-center">
                    <h3 class="text-center">${pelicula.title}</h3>
                </div>
                <div class="d-flex align-items-center justify-content-around m-2">
                <div>
                    Calificación: <span class="badge ${colorCalificacion} me-1">${pelicula.vote_average}</span>
                </div>
                    <i id="${pelicula.peliculaID}" onclick="desmarcarFavorito(${pelicula.peliculaID})" class="bi bi-heart-fill text-danger"></i>
                </div>
            </div>
            `
            //<p class="card-text">${pelicula.overview}</p>
            containerCards.insertAdjacentHTML('beforeend',card);
        }
    });
    
}

recuperarFavoritos2();

const irPelicula = (peliculaID) =>
{
    window.console.log(peliculaID);
    const prefijo= 'https://www.themoviedb.org/movie/508947-turning-red';
    window.location.assign(`/pelicula.html?id=${peliculaID}`);
    //window.location.assign(`/pelicula.html?id=${pe
}