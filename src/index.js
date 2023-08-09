const url = 'http://localhost:3000/movies';
const nav = document.getElementById('movie-list');
const title = document.getElementById('title');
const releaseYear = document.getElementById('year-released');
const description = document.getElementById('description');
const watched = document.getElementById('watched');
const selectedImg = document.getElementById('detail-image');
const form = document.getElementById('blood-form');
const submitBlood = document.querySelector('#add-blood');
const bloodAmount = document.getElementById('blood-amount');
const renderedBloodCount = document.getElementById('amount');
const imgDisplayed = document.getElementById('detail-image');
let currMovie;


function patchWatched(movie, bool) {
    let obj = {
        watched: bool
    }

    fetch(`${url}/${movie.id}`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(obj)
    })
}

function patchBlood(movie, num) {
    let bloodCount = movie.blood_amount + num
    let obj = {
        blood_amount: bloodCount
    }
    fetch(`${url}/${movie.id}`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(obj)
    })
}


function renderMovie(movie) {
    
    currMovie = movie;
    title.innerText = movie.title;
    releaseYear.innerText = movie.release_year;
    description.innerText = movie.description;
    imgDisplayed.src = movie.image
    renderedBloodCount.innerText = movie.blood_amount;
    watched.innerText = movie.watched ? 'WATCHED' : 'UNWATCHED';

    watched.addEventListener('click', () => {
        if (watched.innerText === 'WATCHED'){
            patchWatched(movie, false);
        } else if (watched.innerText === 'UNWATCHED') {
            patchWatched(movie, true);
        }
    }) 
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let parsedBlood = parseInt(form["blood-amount"].value, 10);
    let newBloodAmount = currMovie.blood_amount + parsedBlood;
    fetch(`${url}/${currMovie.id}`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({blood_amount: newBloodAmount})
    })
})



fetch(url)
.then(resp => resp.json())
.then(movies => {
    movies.forEach(movie => {
        let img = document.createElement('img');
        img.src = movie.image;
        nav.append(img)
        img.addEventListener('click', () => {
            renderMovie(movie)
        })
    });



    

    renderMovie(movies[0])

})


























// fetch(url)
// .then(resp => resp.json())
// .then(movies => {
//     movies.forEach(movie => {
//         let img = document.createElement('img');
//         img.src = movie.image;
//         img.id = movie.id - 1;
//         watched.textContent = movie.watched ? 'WATCHED' : 'UNWATCHED';
//         nav.appendChild(img);
        
        
//         img.addEventListener('click', () => {
//             // e.preventDefault();
//             watched.id = e.target.id;
//             submitBlood.id = e.target.id;
//             renderMovie(e.target.id);
//         })

//     })
//     console.log(movies[0])

//     submitBlood.addEventListener('click', () => {
//         // e.preventDefault();
//         let parsedId = parseInt(watched.id, 10) + 1;
//         let blood = parseInt(bloodAmount.value, 10);
//         updateBlood(parsedId, blood)
//     })

//     function updateBlood(id, amount) {
//         parsedBloodAmount = parseInt(movies[id - 1].blood_amount, 10);
//         parsedBloodAmount+=amount;
        
//         let newAmount = parsedBloodAmount + amount;
//         let obj = {
//             blood_amount: parsedBloodAmount
//         }
//         fetch(`${url}/${id}`, {
//             method: "PATCH",
//             headers: {"Content-Type": "application/json"},
//             body: JSON.stringify(obj)
//         })
//         .then(resp => resp.json())
//         .then(data => {
//             renderedBloodCount.innerText = data.blood_amount;
//         })

//     }

//     watched.addEventListener('click', () => {
//         // e.preventDefault();
        
//         let parsedId = parseInt(watched.id, 10) + 1;

//         if (watched.textContent === 'UNWATCHED') {
//             watched.textContent = 'WATCHED';
//             updateWatched(parsedId, true);
            
//             } else if (watched.textContent === 'WATCHED') {
//                 watched.textContent = 'UNWATCHED'
//                 updateWatched(parsedId, false)
//             }
        
//     })
    
//     function updateWatched(id, bool) {
//         let obj = {
//                     watched: bool
//                 }
    
//         fetch(`${url}/${id}`, {
//             method: "PATCH",
//             headers: {"Content-Type": "application/json"},
//             body: JSON.stringify(obj)
//         })
        
//     }

//     function renderMovie(id) {
        
//         selectedImg.src = movies[id].image;
//         title.textContent = movies[id].title;
//         releaseYear.textContent = movies[id].release_year;
//         description.textContent = movies[id].description;
//         watched.textContent = movies[id].watched ? 'WATCHED' : 'UNWATCHED';
//         renderedBloodCount.textContent = movies[id].blood_amount;
//     }

//     renderMovie(0)
    
// })


