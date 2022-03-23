const containerInfoPelicula=document.querySelector('#pelicula');

const apiURL='https://api.themoviedb.org/3';
const apiKey='ccd1851f34bb7a542da3a533260cd47a';

const urlPoster = 'https://image.tmdb.org/t/p/original';

////https://api.themoviedb.org/3/movie/508947?api_key=ccd1851f34bb7a542da3a533260cd47a&language=es-MX

window.queryParams=new URLSearchParams(window.location.search);

const id = queryParams.get('id');

console.log(id);

const recuperarPelcula=async()=>
{
    try {
        const url=`${apiURL}/movie/popular?api_key=${apiKey}&language=es-MX&page=1`;
        const respuesta = await fetch(url);
        const body=await respuesta.json();
        const peliculas=body.results;
        peliculas.forEach((pelicula) => {
            const card=`
            <div ondblclick="irPelicula('${pelicula.id}')" class="card col-sm-3">
                <img src="${urlPoster}${pelicula.backdrop_path}" class="card-img-top" alt="${pelicula.original_title}">
                <div class="card-body">
                    <h3>${pelicula.original_title}</h3>
                    <p class="card-text">${pelicula.overview}</p>
                </div>
            </div>
            `
            containerCards.insertAdjacentHTML('beforeend',card);
        });
        
    } catch (error) {
        
    }
}