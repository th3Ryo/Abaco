document.addEventListener('DOMContentLoaded', () => {
  const abacusContainer = document.querySelector('.abacus');
  const abacusBase = document.querySelector('.abacus-base');
  const digitsInput = document.getElementById('digits-input');
  const updateButton = document.getElementById('update-button');
  const navItems = document.querySelectorAll('.nav-item');
  const exerciseContainer = document.querySelector('.exercise-container');
  const exerciseFeedback = document.getElementById('exercise-feedback');
  const exerciseInput = document.getElementById('exercise-input');
  const exerciseButton = document.getElementById('exercise-button');
  const exerciseAnotherButton = document.getElementById('exercise-another-button');
  const exerciseReturnButton = document.getElementById('exercise-return-button');

  let activeSection = 'explicacion'; // Iniciamos con la sección "Explicación" como activa

  function generateAbacus(number) {
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

    if (!abacusBase) {
      abacusBase = document.createElement('div');
      abacusBase.className = 'abacus-base';
      abacusContainer.parentElement.insertBefore(abacusBase, abacusContainer.nextElementSibling);
    }

    if (digits.length === 0) {
      abacusBase.classList.remove('abacus-base');
    } else {
      abacusBase.classList.add('abacus-base');
    }
  }

  function generateRandomNumber() {
    return Math.floor(Math.random() * 900) + 100;
  }

  function startExercise() {
    const randomNumber = generateRandomNumber();
    abacusContainer.setAttribute('data-random-number', randomNumber);
    generateAbacus(randomNumber);

    exerciseFeedback.textContent = '';
    exerciseInput.value = '';
  }

  function toggleInputContainerVisibility(show) {
    const inputContainer = document.querySelector('.input-container');
    if (show) {
      inputContainer.style.display = 'flex';
    } else {
      inputContainer.style.display = 'none';
    }
  }

  function showExplanationSection() {
    activeSection = 'explicacion';
    exerciseContainer.style.display = 'none';
    abacusContainer.style.display = 'flex';
    abacusBase.style.display = 'block';
    toggleInputContainerVisibility(true);
  }

  function showExerciseSection() {
    activeSection = 'ejercicios';
    exerciseContainer.style.display = 'flex';
    toggleInputContainerVisibility(false);
    startExercise();
  }

  updateButton.addEventListener('click', () => {
    const inputValue = digitsInput.value;
    if (activeSection === 'explicacion') {
      if (!isNaN(inputValue) && inputValue !== '') {
        const number = Number(inputValue);
        generateAbacus(number);
      } else {
        alert('Por favor, ingresa un número válido.');
      }
    } else if (activeSection === 'ejercicios') {
      startExercise();
    }
  });

  // Agregar event listeners a los elementos del navbar para cambiar entre secciones
  navItems.forEach(navItem => {
    navItem.addEventListener('click', () => {
      // Ocultar la sección actual y mostrar la nueva sección seleccionada
      if (navItem.dataset.section === 'explicacion') {
        showExplanationSection();
      } else if (navItem.dataset.section === 'ejercicios') {
        showExerciseSection();
      }
    });
  });

  exerciseButton.addEventListener('click', () => {
    const randomNumber = Number(abacusContainer.getAttribute('data-random-number'));
    const userInput = Number(exerciseInput.value);
    if (!isNaN(userInput) && userInput === randomNumber) {
      exerciseFeedback.textContent = '¡Correcto! Felicitaciones.';
    } else {
      exerciseFeedback.textContent = 'Incorrecto. Intenta de nuevo.';
    }
  });

  exerciseAnotherButton.addEventListener('click', () => {
    startExercise();
  });

  exerciseReturnButton.addEventListener('click', () => {
    // Regresar a la sección "Explicación"
    showExplanationSection();
  });
});

/* 
document.addEventListener('DOMContentLoaded', () => {
  // Se agrega un evento que se ejecutará cuando la página haya cargado completamente.

  const abacusContainer = document.querySelector('.abacus');
  // Se selecciona el elemento con la clase 'abacus' y se guarda en la variable abacusContainer.

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

    abacusContainer.innerHTML = '';
    // Se limpia el contenido del elemento abacusContainer, para poder generar el nuevo ábaco.

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

      abacusContainer.appendChild(column);
      // Se agrega la columna completa al div abacusContainer.
    });

    if (!abacusBase) {
      // Si la variable abacusBase es null (es decir, la base aún no ha sido creada), se creará y agregará debajo del contenedor del ábaco.

      abacusBase = document.createElement('div');
      // Se crea un nuevo div que representará la base del ábaco y se guarda en la variable abacusBase.

      abacusBase.className = 'abacus-base';
      // Se le asigna la clase 'abacus-base' al div abacusBase.

      abacusContainer.parentElement.insertBefore(abacusBase, abacusContainer.nextElementSibling);
      // Se agrega la base debajo del contenedor del ábaco, justo después del elemento abacusContainer.
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