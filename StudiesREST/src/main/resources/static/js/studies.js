// window.addEventListener('load', function(e) {
//   init();
// });


// function init() {
//   ping();
  // document.pingForm.ping.addEventListener('click', function(event) {
  //   event.preventDefault();
  //   getFilm('ping');
  // });
  // document.filmForm.lookup.addEventListener('click', function(event) {
  //   event.preventDefault();
  //   var filmId = document.filmForm.filmId.value;
  //   if (!isNaN(filmId) && filmId > 0) {
  //     getFilm(filmId);
  //   }
  // });
  // document.addFilmForm.addFilmButton.addEventListener('click', function(event) {
  //   event.preventDefault();
  //   var filmTitle = document.addFilmForm.filmTitle.value;
  //   var filmDesc = document.addFilmForm.filmDesc.value;
  //   var filmRating = document.addFilmForm.filmRating.value;
  //   var filmReleaseYear = document.addFilmForm.filmReleaseYear.value;
  //   var filmLength = document.addFilmForm.filmLength.value;
  //   if (filmTitle === '' || filmDesc === '') {
  //     console.log('**********ERROR!!!!********');
  //   } else {
  //     postFilm(filmTitle, filmDesc, filmRating, filmReleaseYear, filmLength);
  //   }
  // });
// }

// function ping() {
//   let xhr = new XMLHttpRequest();
//   xhr.open('GET', 'http://localhost:8383/api/ping');
//   xhr.onreadystatechange = function() {
//     if (xhr.readyState === 4 && xhr.status <= 200) {
//       let data = xhr.responseText;
//     }
//   }
//   xhr.send();
// }
