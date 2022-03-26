//se puso .row porque estamos ocupando una clase y si fuera #row sería búsqueda por id
const containerCards=document.querySelector('.row');
const botonFav=document.getElementById('botonFav');

const apiURL='https://api.themoviedb.org/3';
const apiKey='ccd1851f34bb7a542da3a533260cd47a';
//https://api.themoviedb.org/3/movie/508947?api_key=ccd1851f34bb7a542da3a533260cd47a&language=es-MX
const urlPoster = 'https://image.tmdb.org/t/p/original';

let colorCalificacion='';

let peliculas = [];

const recuperarPelisPopulares=async()=>
{
    try {
        const url=`${apiURL}/movie/popular?api_key=${apiKey}&language=es-MX&page=1`;
        const respuesta = await fetch(url);
        const body=await respuesta.json();
        peliculas=body.results;
        peliculas.forEach((pelicula) => {
            //console.log(pelicula);
            if(pelicula.overview!==''&&pelicula.backdrop_path!==null)
            {
                // console.log(typeof pelicula.vote_average);
                if(pelicula.vote_average<6){colorCalificacion="bg-danger";}
                else if(pelicula.vote_average>=6 && pelicula.vote_average<7.5){colorCalificacion="bg-warning";}
                else{colorCalificacion='bg-success'}

                const card=`
                <div ondblclick="irPelicula('${pelicula.id}')" class="card col-3 p-0 m-1">
                    <img src="${urlPoster}${pelicula.backdrop_path}" class="card-img-top" alt="${pelicula.original_title}">
                    <div class="card-body d-flex flex-column justify-content-center align-items-center">
                        <h3 class="text-center">${pelicula.original_title}</h3>
                    </div>
                    <div class="d-flex align-items-center justify-content-around m-2">
                    <div>
                        Calificación: <span class="badge ${colorCalificacion} me-1">${pelicula.vote_average}</span>
                    </div>
                        <i id="${pelicula.id}" onclick="marcarFavorito(${pelicula.id})" class="bi bi-heart"></i>
                    </div>
                </div>
                `
                //<p class="card-text">${pelicula.overview}</p>
                containerCards.insertAdjacentHTML('beforeend',card);
            }
        });
        recuperarFavoritos((body) =>
        {
            const favoritos=Object.values(body);
            favoritos.forEach((favorito)=>{
                const icono = document.getElementById(favorito.peliculaID);
                icono.classList.remove('bi-heart');
                icono.classList.add('bi-heart-fill','text-danger');
            });
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

const marcarFavorito = (id) =>
{
    const pelicula = peliculas.find((pelicula)=>pelicula.id==id);
    const icono=document.getElementById(pelicula.id);
    //console.log(Array.from(icono.classList));
    const corazon=Array.from(icono.classList).find((clase)=>clase=='bi-heart-fill');
    if(!corazon)
    {
        //console.log('No es favorito');
        crearPeliculaFavorita(
            pelicula.id,
            pelicula.backdrop_path,
            pelicula.original_title,
            pelicula.overview,
            pelicula.vote_average,
            (body) => {
                const icono=document.getElementById(pelicula.id);
                icono.classList.remove('bi-heart');
                icono.classList.add('bi-heart-fill','text-danger');
            }
        );
    }
    else
    {
        alert('¿Quieres eliminar favorito?');
    }
}



//recuperarPopulares();
recuperarPelisPopulares();