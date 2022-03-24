//se puso .row porque estamos ocupando una clase y si fuera #row sería búsqueda por id
const containerCards=document.querySelector('.row');

const apiURL='https://api.themoviedb.org/3';
const apiKey='ccd1851f34bb7a542da3a533260cd47a';
//https://api.themoviedb.org/3/movie/508947?api_key=ccd1851f34bb7a542da3a533260cd47a&language=es-MX
const urlPoster = 'https://image.tmdb.org/t/p/original';

const recuperarPelisPopulares=async()=>
{
    try {
        const url=`${apiURL}/movie/popular?api_key=${apiKey}&language=es-MX&page=1`;
        const respuesta = await fetch(url);
        const body=await respuesta.json();
        const peliculas=body.results;
        peliculas.forEach((pelicula) => {
            if(pelicula.overview!==''&&pelicula.backdrop_path!==null)
            {
                const card=`
                <div ondblclick="irPelicula('${pelicula.id}')" class="card col-3 p-0 m-1">
                    <img src="${urlPoster}${pelicula.backdrop_path}" class="card-img-top" alt="${pelicula.original_title}">
                    <div class="card-body d-flex flex-column justify-content-center align-items-center">
                        <h3 class="text-center">${pelicula.original_title}</h3>
                        <span class="badge bg-success me-1">Calificación: ${pelicula.vote_average}</span>     
                    </div>
                </div>
                `
                //<p class="card-text">${pelicula.overview}</p>
                containerCards.insertAdjacentHTML('beforeend',card);
            }
        });
        
    } catch (error) {
        
    }
}

const irPelicula = (peliculaID) =>
{
    window.console.log(peliculaID);
    const prefijo= 'https://www.themoviedb.org/movie/508947-turning-red';
    window.location.assign(`/pelicula.html?id=${peliculaID}`);
    //window.location.assign(`/pelicula.html?id=${pe
}

//recuperarPopulares();
recuperarPelisPopulares();