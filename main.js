document.addEventListener('DOMContentLoaded', () => {
  // Se ejecuta cuando el DOM ha sido completamente cargado y renderizado

  const abacusDiv = document.querySelector('.abacus-container');
  const abacusContainer = document.querySelector('.abacus');
  const abacusBase = document.querySelector('.abacus-base');
  const initialImageContainer = document.querySelector('.initial-image-container');
  const digitsInput = document.getElementById('digits-input');
  const updateButton = document.getElementById('update-button');
  const navItems = document.querySelectorAll('.nav-item');
  const exerciseContainer = document.querySelector('.exercise-container');
  const exerciseFeedback = document.getElementById('exercise-feedback');
  const exerciseInput = document.getElementById('exercise-input');
  const exerciseButton = document.getElementById('exercise-button');
  const exerciseAnotherButton = document.getElementById('exercise-another-button');
  const exerciseReturnButton = document.getElementById('exercise-return-button');

  let activeSection = 'inicio'; // Iniciamos con la sección "Explicación" como activa

  function generateAbacus(number) {
    // Función para generar el ábaco basado en el número proporcionado
    abacusContainer.innerHTML = '';
    const digits = number.toString().split('').map(Number);

    digits.forEach(digit => {
      const column = document.createElement('div');
      column.className = 'abacus-column';

      for (let i = 0; i < 9; i++) {
        const circle = document.createElement('div');
        circle.className = `abacus-circle ${i < digit ? 'abacus-circle-filled' : ''}`;
        column.appendChild(circle);

        if (i <= 9) {
          const lineTop = document.createElement('div');
          lineTop.className = 'abacus-line abacus-line-top';
          circle.appendChild(lineTop);

          const lineBottom = document.createElement('div');
          lineBottom.className = 'abacus-line abacus-line-bottom';
          circle.appendChild(lineBottom);
        }
      }

      abacusContainer.appendChild(column);
    });

  /**
   * ! ya no sirve
   *    const abacusBase = document.querySelector('.abacus-base');
    if (!abacusBase) {
      // Si no existe la base del ábaco, se crea y se agrega al DOM
      const newAbacusBase = document.createElement('div');
      newAbacusBase.className = 'abacus-base';
      abacusDiv.parentElement.insertBefore(newAbacusBase, abacusDiv.nextElementSibling);
    }

    if (digits.length === 0) {
      // Si no hay dígitos en el número, se oculta la base del ábaco
      abacusBase.classList.remove('abacus-base');
    } else {
      // Si hay dígitos en el número, se muestra la base del ábaco
      abacusBase.classList.add('abacus-base');
    } */
  }

  function generateRandomNumber() {
    // Genera un número aleatorio entre 100 y 999 para los ejercicios del ábaco
    return Math.floor(Math.random() * 900) + 100;
  }

  function startExercise() {
    // Inicia un ejercicio generando un número aleatorio y mostrando el ábaco correspondiente
    const randomNumber = generateRandomNumber();
    abacusContainer.setAttribute('data-random-number', randomNumber);
    generateAbacus(randomNumber);

    exerciseFeedback.textContent = ''; // Borra el mensaje de retroalimentación
    exerciseInput.value = ''; // Resetea el valor del input
  }

  function toggleInputContainerVisibility(show) {
    // Muestra u oculta el contenedor de entrada (input-container) según el valor de "show"
    const inputContainer = document.querySelector('.input-container');
    if (show) {
      inputContainer.style.display = 'flex';
    } else {
      inputContainer.style.display = 'none';
    }
  }

  function showExplanationSection() {
    // Muestra la sección de "Explicación" y oculta la sección de "Ejercicios"
    activeSection = 'explicacion';
    exerciseContainer.style.display = 'none';
    abacusDiv.style.display = 'flex';
    abacusBase.style.display = 'flex'; // Muestra el abacusBase
    toggleInputContainerVisibility(true); // Muestra el contenedor de entrada (input-container)
    initialImageContainer.style.display = 'none'; // Muestra la imagen inicial
  }

  function showExerciseSection() {
    // Muestra la sección de "Ejercicios" y oculta la sección de "Explicación"
    activeSection = 'ejercicios';
    exerciseContainer.style.display = 'flex';
    abacusDiv.style.display = 'flex'; // Muestra el abacusDiv
    abacusBase.style.display = 'flex'; // Muestra el abacusBase
    toggleInputContainerVisibility(false); // Oculta el contenedor de entrada (input-container)
    startExercise(); // Inicia un nuevo ejercicio generando un número aleatorio y mostrando el ábaco correspondiente
    initialImageContainer.style.display = 'none'; // Oculta la imagen inicial
  }
  function showInitSection() {
    // Muestra la sección de "Ejercicios" y oculta la sección de "Explicación"
    activeSection = 'inicio';
    exerciseContainer.style.display = 'none';
    abacusDiv.style.display = 'none'; // Muestra el abacusDiv
    toggleInputContainerVisibility(false); // Oculta el contenedor de entrada (input-container)
    startExercise(); // Inicia un nuevo ejercicio generando un número aleatorio y mostrando el ábaco correspondiente
    initialImageContainer.style.display = 'flex'; // Oculta la imagen inicial
  }



  updateButton.addEventListener('click', () => {
    // Evento clic en el botón "Mostrar Abaco" (updateButton)
    const inputValue = digitsInput.value;
    if (activeSection === 'explicacion') {
      // Si estamos en la sección de "Explicación"
      if (!isNaN(inputValue) && inputValue !== '') {
        // Comprobamos que el valor ingresado sea un número válido
        const number = Number(inputValue);
        generateAbacus(number); // Generamos el ábaco con el número ingresado
      } else {
        alert('Por favor, ingresa un número válido.');
      }
    } else if (activeSection === 'ejercicios') {
      // Si estamos en la sección de "Ejercicios"
      startExercise(); // Generamos un nuevo ejercicio con un número aleatorio
    }
    else if (activeSection === 'inicio') {
      // Si estamos en la sección de "Ejercicios"
      showInitSection(); // Generamos un nuevo ejercicio con un número aleatorio
    }

  });

  // Agregar event listeners a los elementos del navbar para cambiar entre secciones
  navItems.forEach(navItem => {
    navItem.addEventListener('click', () => {
      // Evento clic en un elemento del navbar
      // Ocultar la sección actual y mostrar la nueva sección seleccionada
      if (navItem.dataset.section === 'explicacion') {
        showExplanationSection(); // Mostrar la sección de "Explicación"
      } else if (navItem.dataset.section === 'ejercicios') {
        showExerciseSection(); // Mostrar la sección de "Ejercicios"
      }
    });
  });

  exerciseButton.addEventListener('click', () => {
    // Evento clic en el botón "Comprobar" (exerciseButton)
    const randomNumber = Number(abacusContainer.getAttribute('data-random-number'));
    const userInput = Number(exerciseInput.value);
    if (!isNaN(userInput) && userInput === randomNumber) {
      // Comprobamos que el valor ingresado sea un número válido y coincide con el número del ábaco
      exerciseFeedback.textContent = '¡Correcto! Felicitaciones.'; // Mostramos mensaje de retroalimentación
    } else {
      exerciseFeedback.textContent = 'Incorrecto. Intenta de nuevo.'; // Mostramos mensaje de retroalimentación
    }
  });

  exerciseAnotherButton.addEventListener('click', () => {
    // Evento clic en el botón "Hacer otro ejercicio" (exerciseAnotherButton)
    startExercise(); // Generamos un nuevo ejercicio con un número aleatorio
  });

  exerciseReturnButton.addEventListener('click', () => {
    // Evento clic en el botón "Regresar al inicio" (exerciseReturnButton)
    showInitSection(); // Mostrar la sección de "Explicación"
  });
});


/* 
document.addEventListener('DOMContentLoaded', () => {
  // Se agrega un evento que se ejecutará cuando la página haya cargado completamente.

  const abacus = document.querySelector('.abacus');
  // Se selecciona el elemento con la clase 'abacus' y se guarda en la variable abacus.

  const digitsInput = document.getElementById('digits-input');
  // Se selecciona el elemento con el id 'digits-input' (el input donde se ingresan los dígitos) y se guarda en la variable digitsInput.

  const updateButton = document.getElementById('update-button');
  // Se selecciona el elemento con el id 'update-button' (el botón "Actualizar") y se guarda en la variable updateButton.

  let abacusBase = null;
  // Se declara una variable abacusBase y se inicializa como null. Esta variable se utilizará para almacenar el div con la clase 'abacus-base'.

  updateButton.addEventListener('click', () => {
    // Se agrega un event listener al botón "Actualizar" que se ejecutará cuando se haga clic en él.

    const digitsArray = digitsInput.value.split('').map(Number);
    // Se obtiene el valor del input 'digitsInput', se divide en caracteres individuales y se convierten a números usando map().
    // El resultado es un array llamado digitsArray que contiene los dígitos ingresados.

    const digits = digitsArray.slice(0, 3);
    // Se crea un nuevo array llamado digits que contiene los primeros 3 elementos de digitsArray.
    // Si se ingresaron menos de 3 dígitos, se tomarán todos los dígitos ingresados.

    abacus.innerHTML = '';
    // Se limpia el contenido del elemento abacus, para poder generar el nuevo ábaco.

    digits.forEach(digit => {
      // Se itera sobre cada dígito del array digits.

      const column = document.createElement('div');
      // Se crea un nuevo div que representará una columna del ábaco y se guarda en la variable column.

      column.className = 'abacus-column';
      // Se le asigna la clase 'abacus-column' al div column.

      for (let i = 0; i < 9; i++) {
        // Se itera desde 0 hasta 8 para crear los círculos y líneas verticales en cada columna del ábaco.

        const circle = document.createElement('div');
        // Se crea un nuevo div que representará un círculo y se guarda en la variable circle.

        circle.className = `abacus-circle ${i < digit ? 'abacus-circle-filled' : ''}`;
        // Se le asigna la clase 'abacus-circle' al div circle y se agrega la clase 'abacus-circle-filled' si el índice es menor que el dígito actual.

        column.appendChild(circle);
        // Se agrega el círculo al div column.

        // Agregar líneas verticales
        if (i <= 9) {
          // Si el índice es menor o igual a 9, se crearán líneas verticales en cada círculo (incluido el último).

          const lineTop = document.createElement('div');
          // Se crea un nuevo div que representará una línea vertical superior y se guarda en la variable lineTop.

          lineTop.className = 'abacus-line abacus-line-top';
          // Se le asigna la clase 'abacus-line' y 'abacus-line-top' al div lineTop.

          circle.appendChild(lineTop);
          // Se agrega la línea vertical superior al div circle.

          const lineBottom = document.createElement('div');
          // Se crea un nuevo div que representará una línea vertical inferior y se guarda en la variable lineBottom.

          lineBottom.className = 'abacus-line abacus-line-bottom';
          // Se le asigna la clase 'abacus-line' y 'abacus-line-bottom' al div lineBottom.

          circle.appendChild(lineBottom);
          // Se agrega la línea vertical inferior al div circle.
        }
      }

      abacus.appendChild(column);
      // Se agrega la columna completa al div abacus.
    });

    if (!abacusBase) {
      // Si la variable abacusBase es null (es decir, la base aún no ha sido creada), se creará y agregará debajo del contenedor del ábaco.

      abacusBase = document.createElement('div');
      // Se crea un nuevo div que representará la base del ábaco y se guarda en la variable abacusBase.

      abacusBase.className = 'abacus-base';
      // Se le asigna la clase 'abacus-base' al div abacusBase.

      abacus.parentElement.insertBefore(abacusBase, abacus.nextElementSibling);
      // Se agrega la base debajo del contenedor del ábaco, justo después del elemento abacus.
    }

    if (digits.length === 0) {
      // Si no se han ingresado dígitos (la longitud de digits es 0), se removerá la clase 'abacus-base' para ocultar la base.

      abacusBase.classList.remove('abacus-base');
    } else {
      // Si se han ingresado dígitos, se agregará la clase 'abacus-base' y se ajustará el ancho para abarcar las columnas.

      abacusBase.classList.add('abacus-base');
      /* const columnWidth = document.querySelector('.abacus-column').offsetWidth;
      // Se obtiene el ancho de una columna del ábaco.

      const baseWidth = columnWidth * 3;
      // Se calcula el ancho total de la base multiplicando el ancho de una columna por 3.

      abacusBase.style.width = baseWidth + 'px';
      // Se ajusta el ancho de la base con el valor calculado.
    }
  });
});
 */