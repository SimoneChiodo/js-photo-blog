fetch("https://jsonplaceholder.typicode.com/photos?_limit=6")
    .then((response) => response.json())
    .then((data) => {
        console.table(data);
    });

// Dichiarazioni
const postsTable = document.getElementById("posts-table");
createPost();
createPost();
createPost();
createPost();
createPost();
createPost();

// Funzione per aggiungere un post in HTML
function createPost() {
    postsTable.innerHTML += `
        <!-- Post Card -->
        <div class="col py-3 container-center">
            <!-- Post Container -->
            <div class="post-container p-3"> 
                <!-- Pin Image -->
                <img
                    src="./img/pin.svg"
                    alt="pin-image"
                    class="post-pin"
                />
                <!-- Card Image -->
                <img
                    src="./img/wall.png"
                    alt="post-image"
                    class="post-image"
                /> 
                <!-- Card Description -->
                <p class="post-description">Description</p>
            </div>
        </div>
    `;
}
