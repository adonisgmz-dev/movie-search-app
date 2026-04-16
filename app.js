window.onload = comenzar;

function comenzar() {
   
    const busqueda = document.getElementById("busqueda");
    const btnBuscar = document.getElementById("btnBuscar");
    const resultados = document.getElementById("resultados")


    
    btnBuscar.addEventListener("click", async () => {
        // Guardamos en una const lo que escribe el usuario
        const txtBusqueda = busqueda.value;

    // Validamos que el campo no este vacio
    if (txtBusqueda === "") {
        resultados.innerHTML = "<p>Escribe una película.</p>";
        return;
    }
    // Se construye la URL con la api y la busqueda del usuario
    const url = `https://www.omdbapi.com/?apikey=d713d45d&s=${txtBusqueda}`;

    try {
    // Peticion a la API y la respuesta la convertimos en JSON 
    const response = await fetch(url);
    const data = await response.json();
    
    resultados.innerHTML = "";
            // Vemos si la API encontro resultados de la busqueda
    if (data.Response === "False") {
    resultados.innerHTML = `<p>${data.Error}</p>`;
    return;
    }
    
    data.Search.forEach((pelicula) => {
    const card = document.createElement("div");
    card.innerHTML = `
    <h3>${pelicula.Title}</h3>
    <p>Año: ${pelicula.Year}</p>
    <img src="${pelicula.Poster}" alt="${pelicula.Title}" width="200">`;
    resultados.appendChild(card);
    });
        } catch (error) {
    // Y esto es por si falla en la busqeda de la pelicula
    resultados.innerHTML = "<p>Error al buscar películas.</p>";
    console.log(error);
    }
        
    })

}