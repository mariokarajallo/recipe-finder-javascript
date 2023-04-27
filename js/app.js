function iniciarApp() {
  const selecCategorias = document.querySelector("#categorias");

  selecCategorias.addEventListener("change", seleccionarCategoria);

  obtenerCategorias();

  function obtenerCategorias() {
    const url = "https://www.themealdb.com/api/json/v1/1/categories.php";

    fetch(url)
      .then((respuesta) => respuesta.json())
      .then((resultado) => mostrarCategorias(resultado.categories));
  }

  function mostrarCategorias(categories = []) {
    categories.forEach((categoria) => {
      const { strCategory } = categoria;

      //creamos la opciones de nuestro selector de categorias
      const option = document.createElement("OPTION");
      option.value = strCategory;
      option.textContent = strCategory;

      // agregamos las categorias en el HTML
      selecCategorias.appendChild(option);
    });
  }

  function seleccionarCategoria(e) {
    const categoria = e.target.value;
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoria}`;
    console.log(url);
    fetch(url)
      .then((response) => response.json())
      .then((result) => mostrarRecetas(result.meals));
  }
}

document.addEventListener("DOMContentLoaded", iniciarApp());
