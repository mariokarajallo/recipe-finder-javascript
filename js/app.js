function iniciarApp() {
  const selecCategorias = document.querySelector("#categorias");
  const resultado = document.querySelector("#resultado");

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

    fetch(url)
      .then((response) => response.json())
      .then((result) => mostrarRecetas(result.meals));
  }

  function mostrarRecetas(recetas) {
    recetas.forEach((receta) => {
      const { idMeal, strMeal, strMealThumb } = receta;

      const recetaContenedor = document.createElement("DIV");
      recetaContenedor.classList.add("col-md-4");

      const recetaCard = document.createElement("DIV");
      recetaCard.classList.add("card", "mb-4");

      const recetaCardImagen = document.createElement("IMG");
      recetaCardImagen.classList.add("card-img-top");
      recetaCardImagen.alt = `Imagen de la receta ${strMeal}`;
      recetaCardImagen.src = strMealThumb;

      const recetaCardBody = document.createElement("DIV");
      recetaCardBody.classList.add("card-body");

      const recetaCardHeading = document.createElement("H3");
      recetaCardHeading.classList.add("card-title", "mb-3");
      recetaCardHeading.textContent = strMeal;

      const recetaCardButton = document.createElement("BUTTON");
      recetaCardButton.classList.add("btn", "btn-danger", "w-100");
      recetaCardButton.textContent = "Ver receta";

      // inyectar en el codigo HTML
      recetaCardBody.appendChild(recetaCardHeading);
      recetaCardBody.appendChild(recetaCardButton);

      recetaCard.appendChild(recetaCardImagen);
      recetaCard.appendChild(recetaCardBody);

      recetaContenedor.appendChild(recetaCard);
      resultado.appendChild(recetaContenedor);
    });
  }
}

document.addEventListener("DOMContentLoaded", iniciarApp());
