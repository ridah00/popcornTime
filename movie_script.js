// pour un seul film 
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMzU3ZTc3NWU5YjA0MjI5N2UzNjUzMmRjNzQxMzhlMCIsIm5iZiI6MTczNTgwNjUyMi4zNTYsInN1YiI6IjY3NzY0ZTNhMDliODBmOWJiMzEyOWRjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Zo4Ok-aJF4fgo8BQsj80H5sP9zTW5TgU5TNYqyiQdS4'
    }
  };
  const urlParams = new URLSearchParams(window.location.search);
  const movie_id = urlParams.get('movie_id');
  
  fetch(`https://api.themoviedb.org/3/movie/${movie_id}/credits?language=fr-FR`, options)
    .then((reponse) => reponse.json())
    .then((credit) => {

        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMzU3ZTc3NWU5YjA0MjI5N2UzNjUzMmRjNzQxMzhlMCIsIm5iZiI6MTczNTgwNjUyMi4zNTYsInN1YiI6IjY3NzY0ZTNhMDliODBmOWJiMzEyOWRjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Zo4Ok-aJF4fgo8BQsj80H5sP9zTW5TgU5TNYqyiQdS4'
            }
          };
          
          fetch(`https://api.themoviedb.org/3/movie/${movie_id}?language=fr-FR`, options)
            .then((reponse) => reponse.json())
            .then((matrix) => {
                let heure = Math.floor(matrix.runtime / 60)
                let minute = matrix.runtime % 60
                // .filter = if et .map = chercher un objet dans un groupe d'objet
                let directors = credit.crew.filter(member => member.job === "Director").map(member => member.name);
                // .join = les avoir tous a la suite avec une virgule entre 2
                document.getElementById("affiche").innerHTML = `<div class="row m-0 content">
            <img src="https://image.tmdb.org/t/p/w500/${matrix.poster_path}" alt="${matrix.original_title}"
                class="col-3 p-0 m-3">
            <div class="col-8">
                <h1 class="fs-2 p-0 m-3">${matrix.original_title}</h1>
                <p class="m-3">${matrix.release_date}(FR) · ${matrix.genres.map((genres) => genres.name).join(", ")} · ${heure}h${minute}</p>
                <p class="m-3 p-2 fs-4 rounded-circle border">${matrix.vote_average * 10}<span class="fs-6">%</span> </p>
                <p class="m-3 text-secondary">${matrix.tagline}</p>
                <h2 class="m-3 fs-5">Synopsis</h2>
                <p class="m-3">${matrix.overview}</p>
                <div id="movie_directors" class="m-3 row">
                    
                </div>
            </div>
        </div>`
        for (let index = 0; index < directors.length; index++) {
            document.querySelector('#movie_directors').innerHTML+=`
                    <div class="col-6 p-0">
                    <h3 class="fs-6">${directors[index]}</h3>
                    <p>Director</p>
                    </div>`   
        }
        
        document.getElementById("affiche").style.backgroundImage = `url(https://image.tmdb.org/t/p/original${matrix.backdrop_path})`;
        })

        for (let acteur = 0; acteur < 10; acteur++) {
          let poster_path ="";
          ( credit.cast[acteur].profile_path == null) ? poster_path = `./img/images_acteur.jpg` : poster_path = `https://image.tmdb.org/t/p/w300${credit.cast[acteur].profile_path}`;
            document.getElementById("scroll").innerHTML += `
            <div class="card p-0" style="width: 10rem;">
                <img style="width: 158px;height: 237px;" src="${poster_path}" class="card-img-top"
                    alt="Image de ${credit.cast[acteur].name}">
                <div class="card-body">
                    <h5 class="card-title">${credit.cast[acteur].name}</h5>
                    <p class="card-text">${credit.cast[acteur].character}</p>
                </div>
            </div>`;
        }
    })

    // Permet de scroller une barre horizonatl avec la souris
    document.getElementById("scroll").addEventListener('wheel', (e) => {
        e.preventDefault();
        e.currentTarget.scrollLeft += e.deltaY;
      });
      
      document
      .querySelector("#upcoming_button")
      .addEventListener("click", function () {
        document.querySelector("#movie_section").innerHTML = "";
    
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMzU3ZTc3NWU5YjA0MjI5N2UzNjUzMmRjNzQxMzhlMCIsIm5iZiI6MTczNTgwNjUyMi4zNTYsInN1YiI6IjY3NzY0ZTNhMDliODBmOWJiMzEyOWRjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Zo4Ok-aJF4fgo8BQsj80H5sP9zTW5TgU5TNYqyiQdS4'
          }
        };
        fetch('https://api.themoviedb.org/3/movie/now_playing?language=fr-FR&page=1&region=fr', options)
          .then((response) => response.json())
          .then((movies) => {
            for (item of movies["results"]) {
              document.querySelector("#movie_section").innerHTML += `
            <div class="card col-md-2 col-10 ">
             <i title="ajouter au favoris" id="heart" class=" text-light fa-solid fa-heart position-absolute top-0 end-0 p-2"></i>
            <a href="movie_details.html?movie_id=${item.id}"> 
            <img src="https://image.tmdb.org/t/p/w300${item.poster_path}" class="card-img-top" alt="image du film : ${item.title}">
            </a> 
            <div class="card-body bg-dark ">
                <p class="card-text text-light">${item.title}</p>
                
                <p class="card-text1 text-light">${item.vote_average}/10 <i class="bi bi-star-fill text-warning"></i></p>
             </div>
            </div>
            `;
            }
          })
          .catch((error) => {
            console.error("Error fetching the movies:", error);
          });
      });