function show_movies() {
  document.querySelector("#movie_section").innerHTML = "";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMzU3ZTc3NWU5YjA0MjI5N2UzNjUzMmRjNzQxMzhlMCIsIm5iZiI6MTczNTgwNjUyMi4zNTYsInN1YiI6IjY3NzY0ZTNhMDliODBmOWJiMzEyOWRjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Zo4Ok-aJF4fgo8BQsj80H5sP9zTW5TgU5TNYqyiQdS4",
    },
  };
  fetch(
    "https://api.themoviedb.org/3/movie/now_playing?language=fr-FR&page=1&region=fr",
    options
  )
    .then((response) => response.json())
    .then((movies) => {
      for (item of movies["results"]) {
        document.querySelector("#movie_section").innerHTML += `
        <div class="card col-md-2 col-10" >
         <i title="Ajouter aux favoris" id="heart" class=" text-light fa-solid fa-heart position-absolute top-0 end-0 p-2"></i>
        <a href="movie_details.html?movie_id=${item.id}"> 
        <img src="https://image.tmdb.org/t/p/w300${item.poster_path}" class="card-img-top" alt="image du film : ${item.title}">
         </a>
         <div class="card-body bg-dark ">
            <span class="d-inline-block text-truncate text-light" title="${item.title}" style="width: 150px;">
             ${item.title}
            </span>
            <p class="card-text1 text-light">${item.vote_average}/10 <i class="bi bi-star-fill text-warning"></i></p>
         </div>
        </div>
        `;
      }
    })
    .catch((error) => {
      console.error("Error fetching the movies:", error);
    });
}

show_movies();

document
  .querySelector("#upcoming_button")
  .addEventListener("click", function () {
    document.querySelector("#movie_section").innerHTML = "";
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMzU3ZTc3NWU5YjA0MjI5N2UzNjUzMmRjNzQxMzhlMCIsIm5iZiI6MTczNTgwNjUyMi4zNTYsInN1YiI6IjY3NzY0ZTNhMDliODBmOWJiMzEyOWRjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Zo4Ok-aJF4fgo8BQsj80H5sP9zTW5TgU5TNYqyiQdS4",
      },
    };

    fetch(
      "https://api.themoviedb.org/3/movie/upcoming?language=fr-FR&page=1&region=fr",
      options
    )
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
            <span class="d-inline-block text-truncate text-light" style="width: 150px;">
               ${item.title}
            </span>
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
// chercher
document.querySelector("#search_button").addEventListener("click", function () {
  console.log("search tapped");

  var search_input = document
    .querySelector("#search_input")
    .value.toLowerCase();
  console.log(search_input);

  if (search_input != "") {
    document.querySelector("#movie_section").innerHTML = "";
    console.log("searching ...");

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMzU3ZTc3NWU5YjA0MjI5N2UzNjUzMmRjNzQxMzhlMCIsIm5iZiI6MTczNTgwNjUyMi4zNTYsInN1YiI6IjY3NzY0ZTNhMDliODBmOWJiMzEyOWRjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Zo4Ok-aJF4fgo8BQsj80H5sP9zTW5TgU5TNYqyiQdS4",
      },
    };
    
    fetch(
      "https://api.themoviedb.org/3/movie/now_playing?language=fr-FR&page=1&region=fr",
      options
    )
      .then((response) => response.json())
      .then((movies) => {

        for (item of movies["results"]) {
          console.log(item.title);
          var title = item.title;
          if (title.toLowerCase().includes(search_input)) {
            document.querySelector("#movie_section").innerHTML += `
        <div class="card col-md-2 col-10 ">
         <i onclick="add_to_favorite" title="ajouter au favoris" id="heart" class=" text-light fa-solid fa-heart position-absolute top-0 end-0 p-2"></i>
        <a href="movie_details.html?movie_id=${item.id}"> 
        <img src="https://image.tmdb.org/t/p/w300${item.poster_path}" class="card-img-top" alt="image du film : ${item.title}">
         </a>
         <div class="card-body bg-dark ">
            <span class="d-inline-block text-truncate text-light" style="width: 150px;">
              ${item.title}
            </span>
            <p class="card-text1 text-light">${item.vote_average}/10 <i class="bi bi-star-fill text-warning"></i></p>
         </div>
        </div>
        `;
          }
        }
        if (document.querySelector("#movie_section").innerHTML === "") {
          document.querySelector(
            "#movie_section"
          ).innerHTML = `<p class="text-light text-center"> <span class="fs-1"> Oops!...</span><br> désolé, aucune correspondance trouvée pour le titre du film " ${search_input} ". Veuillez vérifier l'orthographe ou essayer un autre titre !</p>`;
        }
      })
      .catch((error) => {
        console.error("Error fetching the movies:", error);
      });

  } else {
    show_movies();
  }
});
// cliquer sur "entrer" pour chercher
document
  .querySelector("#search_input")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      document.querySelector("#search_button").click();
    }
  });
