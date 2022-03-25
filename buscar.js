const listaResultados=document.getElementById('listaResultados');

const buscarItem=(e)=>
{
    e.preventDefault();
    const criterioBusqueda=e.target.querySelector('input').value;
    e.target.querySelector('input').value='';
    criterioBusqueda!=''?buscarPeliculas(criterioBusqueda):alert('Ingresa un término válido');
}

const apiURL='https://api.themoviedb.org/3';
const apiKey='ccd1851f34bb7a542da3a533260cd47a';
const urlPoster = 'https://image.tmdb.org/t/p/original';

//https://api.themoviedb.org/3/search/movie?api_key=ccd1851f34bb7a542da3a533260cd47a&language=es-MX&query=Spider&page=1&include_adult=true

const buscarPeliculas = async(criterioBusqueda) =>
{
    try {
        if(listaResultados.children.length>0)
        {
            Array.from(listaResultados.children).forEach((item)=>
            {
                listaResultados.removeChild(item);
            });
        }

        const url = `${apiURL}/search/movie?api_key=${apiKey}&language=es-MX&query=${criterioBusqueda}`;
        const respuesta = await fetch(url);
        const body = await respuesta.json();
        const peliculasEncontradas=body.results;
        peliculasEncontradas.forEach((pelicula)=>
        {
            let colorCalificacion='';
            if(pelicula.vote_average<6){colorCalificacion="bg-danger";}
            else if(pelicula.vote_average>=6 && pelicula.vote_average<7.5){colorCalificacion="bg-warning";}
            else{colorCalificacion='bg-success'}

            const elementoLista = `
            <li class="list-group-item d-flex justify-content-start align-items-start mb-2">
                <div class="d-flex align-items-center">
                    <div class="ms-2 me-auto d-flex align-items-center align-items-lg-start">
                        <img src="${urlPoster}${pelicula.backdrop_path}" class="d-none d-sm-inline w-25 me-3 rounded">
                        <div class="d-flex flex-column me-2">
                            <div class="d-lg-flex">
                                <div class="fw-bold">
                                    ${pelicula.original_title}
                                </div>
                                <div class="ms-lg-2">
                                    Calificación: <span class="badge ${colorCalificacion} me-1">${pelicula.vote_average}</span>
                                </div>
                            </div>
                            <div class="d-none d-lg-inline mt-1">
                                ${pelicula.overview}
                            </div> 
                        </div>
                    </div>
                    <div class="d-none d-sm-flex flex-column text-center justify-content-lg-start">
                        Estreno:
                        <div>
                            <span class="badge bg-primary rounded-pill">
                                ${pelicula.release_date}
                            </span>
                        </div>
                    </div>
                </div>
            </li>
            `;

            listaResultados.insertAdjacentHTML('beforeend',elementoLista);
        });
    } catch (error) {
        
    }
}

/* <li class="list-group-item d-flex justify-content-between align-items-start">
        <div class="ms-2 me-auto">
        <div class="fw-bold">Subheading</div>
        Content for list item
        </div>
        <span class="badge bg-primary rounded-pill">14</span>
    </li> */