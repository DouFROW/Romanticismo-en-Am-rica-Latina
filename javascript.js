// Función para cambiar entre pestañas
document.addEventListener("DOMContentLoaded", function () {
  const navItems = document.querySelectorAll(".nav-item");
  const tabContents = document.querySelectorAll(".tab-content");

  // Mostrar solo la primera pestaña al cargar
  tabContents.forEach((tab) => {
    tab.classList.remove("active");
  });
  document.getElementById("contexto").classList.add("active");

  // Agregar evento a cada botón de navegación
  navItems.forEach((item) => {
    item.addEventListener("click", function () {
      const tabId = this.getAttribute("data-tab");

      // Remover clase active de todos los botones y pestañas
      navItems.forEach((nav) => nav.classList.remove("active"));
      tabContents.forEach((tab) => tab.classList.remove("active"));

      // Agregar clase active al botón y pestaña seleccionados
      this.classList.add("active");
      document.getElementById(tabId).classList.add("active");

      // Desplazar al inicio del contenido
      document.querySelector(".content").scrollTop = 0;
    });
  });

  // ========== FUNCIONALIDAD DEL MODAL PARA IMÁGENES ==========
  const modal = document.getElementById('imageModal');
  
  // Información para cada imagen
  const imageInfo = {
    'libertad': {
      title: 'La Libertad guiando al pueblo',
      description: 'Esta icónica pintura de Eugène Delacroix (1830) simboliza el espíritu revolucionario que inspiró los movimientos independentistas en América Latina. Representa los ideales de libertad, igualdad y fraternidad que resonaron en todo el continente durante el siglo XIX.'
    },
    'contexto': {
      title: 'Contexto del Romanticismo',
      description: 'El Romanticismo latinoamericano se desarrolló en un periodo de grandes transformaciones sociales y políticas. Los escritores románticos buscaron crear una identidad cultural propia, alejándose de los modelos europeos y celebrando lo autóctono.'
    }
  };
  
  // Agregar click a todas las imágenes del timeline
  document.querySelectorAll('.timeline-images img').forEach(img => {
      img.addEventListener('click', function() {
          console.log('Click en imagen');
          console.log('Src:', this.src);
          console.log('Data-info:', this.getAttribute('data-info'));
          
          const imgSrc = this.src;
          const infoKey = this.getAttribute('data-info');
          const info = infoKey ? imageInfo[infoKey] : null;
          
          console.log('Info encontrada:', info);
          
          modal.style.display = 'block';
          modal.innerHTML = ''; // Limpiar contenido anterior
          
          // Crear botón de cerrar
          const closeBtn = document.createElement('span');
          closeBtn.className = 'close-modal';
          closeBtn.innerHTML = '&times;';
          closeBtn.onclick = () => {
              modal.style.display = 'none';
          };
          modal.appendChild(closeBtn);
          
          // Si la imagen tiene información, mostrar imagen y texto lado a lado
          if (info) {
              console.log('Mostrando modal con info');
              
              const wrapper = document.createElement('div');
              wrapper.className = 'modal-content-wrapper';
              
              const imgElement = document.createElement('img');
              imgElement.className = 'modal-content';
              imgElement.src = imgSrc;
              
              const infoDiv = document.createElement('div');
              infoDiv.className = 'modal-info';
              infoDiv.innerHTML = `
                  <h3>${info.title}</h3>
                  <p>${info.description}</p>
              `;
              
              wrapper.appendChild(imgElement);
              wrapper.appendChild(infoDiv);
              modal.appendChild(wrapper);
          } else {
              console.log('Mostrando solo imagen');
              
              const imgElement = document.createElement('img');
              imgElement.className = 'modal-content';
              imgElement.src = imgSrc;
              imgElement.style.position = 'absolute';
              imgElement.style.top = '50%';
              imgElement.style.left = '50%';
              imgElement.style.transform = 'translate(-50%, -50%)';
              
              modal.appendChild(imgElement);
          }
      });
  });

  // Cerrar modal al hacer click fuera del contenido
  modal.addEventListener('click', (e) => {
      if (e.target === modal) {
          modal.style.display = 'none';
      }
  });

  // Cerrar modal con la tecla ESC
  document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.style.display === 'block') {
          modal.style.display = 'none';
      }
  });
});

// Animación al cargar la página
window.addEventListener("load", function () {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 1s";

  setTimeout(function () {
    document.body.style.opacity = "1";
  }, 100);
});