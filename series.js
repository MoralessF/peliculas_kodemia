//se puso .row porque estamos ocupando una clase y si fuera #row sería búsqueda por id
const containerCardsSeries=document.querySelector('#containerSeries');

const apiURL='https://api.themoviedb.org/3';
const apiKey='ccd1851f34bb7a542da3a533260cd47a';
//https://api.themoviedb.org/3/tv/popular?api_key=ccd1851f34bb7a542da3a533260cd47a&language=es-MX

const urlPoster = 'https://image.tmdb.org/t/p/original';
///https://image.tmdb.org/t/p/original/4g5gK5eGWZg8swIZl6eX2AoJp8S.jpg

const recuperarSeriesPopulares=async()=>
{
    try {
        const url=`${apiURL}/tv/popular?api_key=${apiKey}&language=es-MX`;
        const respuesta = await fetch(url);
        const body=await respuesta.json();
        const series=body.results;
        series.forEach((serie) => {
            if(serie.backdrop_path!==null)
            {
                const card=`
                <div ondblclick="irSerie('${serie.id}')" class="card col-3 p-0 m-1">
                    <img src="${urlPoster}${serie.backdrop_path}" class="card-img-top" alt="${serie.original_name}">
                    <div class="card-body d-flex flex-column justify-content-center align-items-center">
                        <h3 class="text-center">${serie.original_name}</h3>
                        <span class="badge bg-success me-1">Calificación: ${serie.vote_average}</span>     
                    </div>
                </div>
                `
                //<p class="card-text">${pelicula.overview}</p>
                containerCardsSeries.insertAdjacentHTML('beforeend',card);
            }
        });
        
    } catch (error) {
        
    }
}

const irSerie = (serieID) =>
{
    window.console.log(serieID);
    window.location.assign(`/serie.html?id=${serieID}`);
    //window.location.assign(`/pelicula.html?id=${pe
}

//recuperarPopulares();
recuperarSeriesPopulares();