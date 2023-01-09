(function ($) {
    $(function () {
        $('.header-dropdown-btn').click(function (e) {
            $(this).children(':last-child').toggleClass('show');
            $('.header-dropdown-content').not($(this).children(':last-child')).removeClass('show');
            e.stopPropagation();
        });
        $('html').click(function () {
            $('.header-dropdown-content').removeClass('show');
        });
    });
})(jQuery);

// Movie fetch

const content = document.getElementById('innerContent');
let keys = [];


function searchMovies(e, elem) {
    e.preventDefault();
    let searchQuery = document.getElementById('searchField');
    if (searchQuery.value !== '') {
        if (!elem.classList.contains('active')) {
            elem.classList.toggle('active')
        }
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=8f19282bc85d738ef80cb64cec2c3854&query=${searchQuery.value}`)
            .then(res => res.json())
            .then(data => movieList(data.results));
        searchQuery.value = '';
    } else {
        elem.classList.remove('active');
    }
}

var popupEntire = document.querySelector('.popup');
function modalBtn(elem) {
    popupEntire.style.display = "block";

    let id = elem.nextSibling.nextSibling.nextSibling.innerHTML;
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=8f19282bc85d738ef80cb64cec2c3854&language=en-US`)
        .then(res => res.json())
        .then(data => trailerGetter(data.results));

    const posterImage = document.querySelector('.poster-image');
    const modalDesc = document.querySelector('.modal-desc');
    const modalName = document.querySelector('.modal-name');
    const modalFooter = document.querySelector('.popup-bottom');
    const ytBtn = document.createElement('div');
    const trailerLink = document.createElement('a');
    const likeBtn = document.createElement('a');
    likeBtn.classList.add('like-btn');
    likeBtn.innerHTML = '<span class="material-symbols-outlined">favorite</span>';
    ytBtn.classList.add('yt-btn');
    modalFooter.innerHTML = '';
    trailerLink.classList.add('trailer-link');
    trailerLink.innerHTML = '<span class="material-symbols-outlined">play_circle </span>';
    trailerLink.innerHTML += 'Watch trailer';
    ytBtn.append(trailerLink);
    modalFooter.append(ytBtn, likeBtn);
    posterImage.innerHTML = elem.innerHTML;
    modalDesc.innerHTML = elem.nextSibling.nextSibling.lastElementChild.innerHTML;
    modalName.innerHTML = elem.nextSibling.innerHTML;
}

function closePopup() {
    let popupEntire = document.querySelector('.popup');
    popupEntire.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == popupEntire) {
        popupEntire.style.display = "none";
    }
}

function trailerGetter(trailer) {
    for (let i = 0; i < trailer.length; i++)
        keys = (trailer[0].key);
    let trailerBtn = document.querySelector('.trailer-link');
    trailerBtn.href = `https://www.youtube.com/watch?v=${keys}`;
}

function upcomingMovies() {
    fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=8f19282bc85d738ef80cb64cec2c3854&language=en-US`)
        .then(res => res.json()).then(data => movieList(data.results));
}

function topRated() {
    fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=8f19282bc85d738ef80cb64cec2c3854`)
        .then(res => res.json()).then(data => movieList(data.results));
}

function getPopular() {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=8f19282bc85d738ef80cb64cec2c3854`)
        .then(res => res.json()).then(data => movieList(data.results));
}
function movieList(movie) {
    document.getElementById('innerContent').innerHTML = '';
    for (let i = 0; i < movie.length; i++) {
        if (movie.length == 0) {
            document.getElementById('innerContent').innerHTML = 'Nothing found';
        } else {
            const movieBlock = document.createElement('div');
            const moviePoster = document.createElement('a');
            const posterImg = document.createElement('img');
            const movieTitle = document.createElement('div');
            const titleSpan = document.createElement('span');
            const movieDetails = document.createElement('div');
            const movieDate = document.createElement('div');
            const movieRating = document.createElement('div');
            const moviewOverview = document.createElement('div');
            const spanId = document.createElement('span');
            spanId.classList.add('span-id');
            movieBlock.classList.add('movie-block');
            movieBlock.id = 'movieBlock';
            moviePoster.classList.add('movie-poster');
            moviePoster.href = "javascript:void(0)";
            moviePoster.setAttribute('onclick', 'modalBtn(this)');
            posterImg.classList.add('poster');
            movieTitle.classList.add('movie-title');
            titleSpan.classList.add('title-span');
            moviewOverview.classList.add('movie-overview');
            movieDetails.classList.add('movie-details');
            movieDate.classList.add('movie-dete');
            movieRating.classList.add('movie-rating');
            moviePoster.append(posterImg);
            movieTitle.append(titleSpan);
            let posterPath = 'https://www.themoviedb.org/t/p/w220_and_h330_face/';
            moviewOverview.innerHTML = movie[i].overview;
            if (movie[i].poster_path) {
                posterImg.src = posterPath + movie[i].poster_path;
                titleSpan.innerHTML = movie[i].original_title;
                movieDate.innerHTML = movie[i].release_date;
                movieRating.innerHTML = movie[i].vote_average + " IMDb";
                spanId.innerHTML = movie[i].id;
                movieDetails.append(movieDate, movieRating, moviewOverview);
                movieBlock.append(moviePoster, movieTitle, movieDetails, spanId);
                movieDetails.lastElementChild.style.display = 'none';
                movieBlock.lastElementChild.style.display = 'none';
                content.append(movieBlock);
            }
        }
    }
}

getPopular();