// Dichiarazioni
const postsTable = document.getElementById("posts-table");
const postsNumber = 6;

// API per generare Immagini
fetch("https://jsonplaceholder.typicode.com/photos?_limit=" + postsNumber)
    .then((response) => response.json())
    .then((data) => {
        console.table(data);

        //Genero i post
        data.forEach((element) => {
            createPost(element.url, element.title);
        });
    });

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
