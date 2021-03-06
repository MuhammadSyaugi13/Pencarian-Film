// pencarian
$('#btn-search').on('click', function () {

    $.ajax({
        url: 'http://www.omdbapi.com/?apikey=366f9702&s=' + $('.input-key').val(),
        success: hasil => {
            const film = hasil.Search;
            let cards = '';

            film.forEach(m => {
                cards += showCards(m);
            });
            $('.movie-container').html(cards);

            // ketika tombol deatil di click
            $('.detail-btn').on('click', function () {
                $.ajax({
                    url: 'http://www.omdbapi.com/?apikey=366f9702&i=' + $(this).data('imdbid'),
                    success: m => {
                        const movieDetail = showMovieDetail(m);
                        $(`.modal-body`).html(movieDetail);
                    },
                    error: (e) => {
                        console.log(e.responseText);
                    }

                });

            });

        },
        error: (e) => {
            console.log(e.responseText);
        }
    });

});



function showMovieDetail(m) {
    return `<div class="container-fluid">
                <div class="row">
                    <div class="col-md-3"><img src="${m.Poster}" class="img-fluid" alt=""></div>
                    <div class="col-md">
                        <ul class="list-group">
                            <li class="list-group-item"><h4>${m.Title} (${m.Year})</h4></li>
                            <li class="list-group-item"><strong>Director :</strong>${m.Director}</li>
                            <li class="list-group-item"><strong>Actors : </strong> ${m.Actors} </li>
                        </ul>
                    </div>
                </div>
            </div>`;
}

function showCards(m) {
    return `<div class="col-md-4 my-5">
    <div class="card" style="width: 18rem;">
        <img src="${m.Poster}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${m.Title}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>

            <a href="#" class="btn btn-primary detail-btn" data-bs-toggle="modal" data-bs-target="#dataTargetModal" data-imdbid="${m.imdbID}">Show Detail</a>
        </div>
    </div>
</div>`;
}