// Dichiarazioni
const body = document.body;
const postsTable = document.getElementById("posts-table");
const postsNumber = 6;
const hidePost = document.querySelectorAll("[data-activate=post-overlay]");
const overlay = document.getElementById("overlay");
const overlayImage = document.getElementById("overlay-image");
let posts = [];
let postsSpinners = [];

// API per generare Immagini
fetch("https://jsonplaceholder.typicode.com/photos?_limit=" + postsNumber)
    .then((response) => response.json())
    .then((data) => {
        //Genero i post
        data.forEach((element) => {
            // Creo un post per l'immagine
            createPost(element.id, element.url, element.title);

            // Verifico se è l'ultimo post
            if (element.id === postsNumber) {
                // Assegno la funzione che permette di aprire l'overlay
                activateOverlay();

                // Rimuovo lo spinner quando l'immagine viene caricata
                posts.forEach((post) => {
                    // Prelevo degli elementi contenuti all'interno del post
                    let image = post.querySelector(".post-image");
                    let spinner = post.querySelector(".spinner");

                    // Al caricamento dell'immagine rimuovo lo spinner
                    image.addEventListener("load", function () {
                        spinner.classList.add("d-none");
                    });
                    // Se l'immagine non si carica rimuovo lo stesso lo spinner
                    image.addEventListener("error", function () {
                        spinner.classList.add("d-none");
                    });
                });
            }
        });
    })
    .catch((error) => console.error(error));

// Funzione per generare 1 post
function createPost(id, img, description) {
    postsTable.innerHTML += `
        <!-- Post Card -->
        <div id="post-${id}" class="col py-3 container-center">
            <!-- Post Container -->
            <div class="post-container p-3 h-100"> 
                <!-- Pin Image -->
                <img
                    src="./img/pin.svg"
                    alt="pin-image"
                    class="post-pin"
                    draggable="false"
                />
                <!-- Spinner -->
                <i class="fa-solid fa-spinner fa-spin-pulse fa-2xl spinner"></i>
                <!-- Card Image -->
                <img
                    src="${img}"
                    alt="post-image"
                    class="post-image"
                    draggable="false"
                /> 
                <!-- Card Description -->
                <p class="post-description">${description}</p>
            </div>
        </div>
`;
}

//Funzione per attivare gli overlay
function activateOverlay() {
    // Prelevo tutti i post dentro la pagina
    posts = document.querySelectorAll("#posts-table > .col");

    // Aggiungo una funzione per quando clicco un post
    for (let i = 0; i < posts.length; i++) {
        // Prelevo l'elemento attuale (contenente l'id del post)
        let element = posts[i];

        // Prelevo il figlio dell'elemento
        element
            .querySelector(".post-container")
            .addEventListener("click", () => {
                //Prelevo l'immagine attuale
                const actualImage = document.querySelector(
                    `#${element.id} .post-image`
                );

                // Apro l'overlay solo SE: l'immagine è stata caricata && non sia stata caricata erratamente
                if (actualImage.complete && actualImage.naturalWidth > 0) {
                    // Apro l'overlay
                    overlay.classList.remove("d-none");
                    body.classList.add("overflow-y-hidden");

                    // Aggiungo l'immagine all'overlay
                    overlayImage.src = actualImage.src;
                }
            });
    }
}

//Codice per eliminare gli overlay
hidePost.forEach((element) => {
    element.addEventListener("click", () => {
        overlay.classList.add("d-none");
        body.classList.remove("overflow-y-hidden");
    });
});
