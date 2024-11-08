// Dichiarazioni
const postsTable = document.getElementById("posts-table");
const postsNumber = 6;
const hidePost = document.querySelectorAll("[data-activate=post-overlay]");
const overlay = document.getElementById("overlay");
let posts = [];

// API per generare Immagini
fetch("https://jsonplaceholder.typicode.com/photos?_limit=" + postsNumber)
    .then((response) => response.json())
    .then((data) => {
        //Genero i post
        data.forEach((element) => {
            // Creo un post per l'immagine
            createPost(element.url, element.title);

            // Assegno la funzione che un overlay dell'immagine
            if (element.id === postsNumber) activateOverlay();
        });
    })
    .catch((error) => console.error(error));

// Funzione per generare 1 post
function createPost(img, description) {
    postsTable.innerHTML += `
        <!-- Post Card -->
        <div class="col py-3 container-center">
            <!-- Post Container -->
            <div class="post-container p-3 h-100"> 
                <!-- Pin Image -->
                <img
                    src="./img/pin.svg"
                    alt="pin-image"
                    class="post-pin"
                />
                <!-- Card Image -->
                <img
                    src="${img}"
                    alt="post-image"
                    class="post-image"
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

    posts.forEach((element) => {
        // Quando clicco un post: aggiungo l'apertura di un overlay
        element.addEventListener("click", () => {
            overlay.classList.remove("d-none");
        });
    });
}

//Codice per eliminare gli overlay
hidePost.forEach((element) => {
    element.addEventListener("click", () => {
        overlay.classList.add("d-none");
    });
});
