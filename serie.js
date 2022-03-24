// var myCarousel = document.querySelector('#myCarousel')
// var carousel = new bootstrap.Carousel(myCarousel)

const containerGenerosPeli=document.querySelector('#generosPeli');
const containerProductoresPeli=document.querySelector('#productoresPeli');
const containerReparto=document.querySelector('#contenedorReparto');

const prefixURL='https://api.themoviedb.org/3';
const apiKey2='ccd1851f34bb7a542da3a533260cd47a';
const urlPoster2 = 'https://image.tmdb.org/t/p/original';

const imgSerie=document.getElementById('imgSerie');
const tituloPeli=document.getElementById('tituloPeli');
const sinopsisPeli=document.getElementById('sinopsisPeli');
const estrenoPeli=document.getElementById('estrenoPeli');

////https://api.themoviedb.org/3/movie/508947?api_key=ccd1851f34bb7a542da3a533260cd47a&language=es-MX
////https://image.tmdb.org/t/p/original/iPhDToxFzREctUA0ZQiYZamXsMy.jpg

window.queryParams=new URLSearchParams(window.location.search);

const id = queryParams.get('id');

const home = () =>
{
    window.location.assign(`/index.html`);
    //window.location.assign(`/pelicula.html?id=${pe
}

const recuperarSerie = async()=>
{
    try {
        let url=`${prefixURL}/tv/${id}?api_key=${apiKey2}&language=es-MX`;
        let respuesta = await fetch(url);
        let serie=await respuesta.json();
        imgSerie.src=`${urlPoster2}${serie.backdrop_path}`;
        console.log(imgSerie.src);
        tituloPeli.innerText=`${serie.original_name}`;
        sinopsisPeli.innerText=`${serie.overview}`;
        estrenoPeli.innerText=` ${serie.first_air_date}`;
        serie.genres.forEach((genero)=>
        {
            const cardGenero=`<span class="badge bg-primary me-1">${genero.name}</span>`;
            containerGenerosPeli.insertAdjacentHTML('beforeend',cardGenero);
        });
        serie.origin_country.forEach((productor)=>
        {
            const cardProductor=`<span class="badge bg-success me-1">${productor}</span>`;
            containerProductoresPeli.insertAdjacentHTML('beforeend',cardProductor);
        });

        // url=`${prefixURL}/movie/${id}/credits?api_key=${apiKey2}&language=es-MX`;
        // respuesta=await fetch(url);
        // const reparto=await respuesta.json();
        // for(let i=0;i<3;i++)
        // {
        //     let actor=reparto.cast[i]
        //     console.log(actor.name);
        //     if(actor.profile_path!==null)
        //     {
        //         const cardActor=`
        //         <div class="card p-0 m-1" style="width: 15rem;">
        //             <img src="${urlPoster2}${actor.profile_path}" class="card-img-top" alt="...">
        //             <div class="card-body d-flex flex-column align-items-center justify-content-center">
        //               <p class="card-text">${actor.name}</p>
        //               <span class="badge bg-warning me-1">${actor.character}</span>
        //             </div>
        //         </div>
        //         `;
        //         containerReparto.insertAdjacentHTML('beforeend',cardActor);
        //     }
        // }
        // reparto.cast.forEach((actor)=>
        // {
        // });
    } catch (error) {
        
    }
}

recuperarSerie();