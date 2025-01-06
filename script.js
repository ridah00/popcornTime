function show_movies() {
  document.querySelector("#movie_section").innerHTML = "";
  fetch("movies.json")
    .then((response) => response.json())
    .then((movies) => {
      for (item of movies["results"]) {
        document.querySelector("#movie_section").innerHTML += `
        <div class="card col-md-2 col-12" >
         <i title="Ajouter aux favoris" id="heart" class=" text-light fa-solid fa-heart position-absolute top-0 end-0 p-2"></i>
         <img src="https://image.tmdb.org/t/p/w300${item.poster_path}" class="card-img-top" alt="image du film : ${item.title}">
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
}

show_movies();

document
  .querySelector("#upcoming_button")
  .addEventListener("click", function () {
    document.querySelector("#movie_section").innerHTML = "";
    fetch("nextMovies.json")
      .then((response) => response.json())
      .then((movies) => {
        for (item of movies["results"]) {
          document.querySelector("#movie_section").innerHTML += `
        <div class="card col-md-2 col-10 ">
         <i title="ajouter au favoris" id="heart" class=" text-light fa-solid fa-heart position-absolute top-0 end-0 p-2"></i>
         <img src="https://image.tmdb.org/t/p/w300${item.poster_path}" class="card-img-top" alt="image du film : ${item.title}">
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

document.querySelector("#search_button").addEventListener("click", function () {
  console.log("search tapped");

  var search_input = document
    .querySelector("#search_input")
    .value.toLowerCase();
  console.log(search_input);

  if (search_input != "") {
    document.querySelector("#movie_section").innerHTML = "";
    console.log("searching ...");
  }
  fetch("movies.json")
    .then((response) => response.json())
    .then((movies) => {
      for (item of movies["results"]) {
        console.log(item.title);
        var title = item.title;
        if (title.toLowerCase().includes(search_input)) {
          document.querySelector("#movie_section").innerHTML += `
        <div class="card col-md-2 col-10 ">
         <i onclick="add_to_favorite" title="ajouter au favoris" id="heart" class=" text-light fa-solid fa-heart position-absolute top-0 end-0 p-2"></i>
         <img src="https://image.tmdb.org/t/p/w300${item.poster_path}" class="card-img-top" alt="image du film : ${item.title}">
         <div class="card-body bg-dark ">
            <p class="card-text text-light">${item.title}</p>
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
});

document
  .querySelector("#search_input")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      document.querySelector("#search_button").click();
    }
  });
