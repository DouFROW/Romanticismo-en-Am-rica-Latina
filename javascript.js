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

  // ========== MODAL PARA AUTORES ==========
  const authorModal = document.getElementById('authorModal');
  const authorModalBody = document.querySelector('.author-modal-body');

  // Información detallada de cada autor
  const authorsInfo = {
    'Esteban Echeverría': {
      nombreCompleto: 'José Esteban Antonio Echeverría',
      nacimiento: '2 de septiembre de 1805',
      fallecimiento: '19 de enero de 1851 (45 años)',
      ciudadNatal: 'Buenos Aires, Argentina',
      nacionalidad: 'Argentino',
      movimiento: 'Romanticismo',
      genero: 'Poesía, cuento, ensayo',
      obrasDestacadas: ['El matadero', 'La cautiva', 'Rimas', 'Dogma socialista'],
      biografia: 'Fue un escritor y poeta argentino, considerado el iniciador del Romanticismo en el Río de la Plata. Miembro de la Generación del 37, participó activamente en la vida política de su tiempo. Sus obras reflejan el conflicto entre civilización y barbarie, siendo "El matadero" considerado el primer cuento realista argentino.'
    },
    'José Mármol': {
      nombreCompleto: 'José Mármol',
      nacimiento: '2 de diciembre de 1817',
      fallecimiento: '9 de agosto de 1871 (53 años)',
      ciudadNatal: 'Buenos Aires, Argentina',
      nacionalidad: 'Argentino',
      movimiento: 'Romanticismo',
      genero: 'Novela, poesía, teatro',
      obrasDestacadas: ['Amalia', 'El peregrino', 'Cantos del peregrino', 'El poeta'],
      biografia: 'Escritor, periodista y político argentino. Su novela "Amalia" es considerada la primera novela argentina y una de las obras más importantes del Romanticismo hispanoamericano. Fue director de la Biblioteca Nacional de Argentina y senador nacional. Su obra combina el romance con la crítica política al régimen de Juan Manuel de Rosas.'
    },
    'Jorge Isaacs': {
      nombreCompleto: 'Jorge Isaacs',
      nacimiento: '1 de abril de 1837',
      fallecimiento: '17 de abril de 1895 (58 años)',
      ciudadNatal: 'Cali, Colombia',
      nacionalidad: 'Colombiano',
      movimiento: 'Romanticismo',
      genero: 'Novela, poesía',
      obrasDestacadas: ['María', 'Poesías'],
      biografia: 'Escritor, poeta y político colombiano. Su novela "María" es la obra más representativa del Romanticismo en América Latina. La novela, de carácter sentimental y ambientada en el paisaje del Valle del Cauca, ha sido traducida a 31 idiomas. Además de su labor literaria, participó en la guerra civil colombiana y ocupó cargos diplomáticos.'
    },
    'Domingo F. Sarmiento': {
      nombreCompleto: 'Domingo Faustino Sarmiento',
      nacimiento: '15 de febrero de 1811',
      fallecimiento: '11 de septiembre de 1888 (77 años)',
      ciudadNatal: 'San Juan, Argentina',
      nacionalidad: 'Argentino',
      movimiento: 'Romanticismo',
      genero: 'Ensayo, autobiografía, periodismo',
      obrasDestacadas: ['Facundo', 'Recuerdos de provincia', 'Educación popular', 'Viajes'],
      biografia: 'Político, escritor, docente, periodista y militar argentino. Presidente de Argentina entre 1868 y 1874. Su obra "Facundo" es un ensayo político-sociológico que analiza el caudillismo en Argentina. Promovió la educación pública y fundó numerosas escuelas y bibliotecas. Es conocido como el "Padre del aula" en Argentina.'
    },
    'José de Espronceda': {
      nombreCompleto: 'José de Espronceda',
      nacimiento: '25 de marzo de 1808',
      fallecimiento: '23 de mayo de 1842 (34 años)',
      ciudadNatal: 'Almendralejo, España',
      nacionalidad: 'Español',
      movimiento: 'Romanticismo',
      genero: 'Poesía, teatro, novela',
      obrasDestacadas: ['El estudiante de Salamanca', 'Canción del pirata', 'El diablo mundo', 'Sancho Saldaña'],
      biografia: 'Poeta español del Romanticismo, considerado el más representativo del primer Romanticismo español. Su vida fue tan romántica como su obra: exiliado por sus ideas liberales, conspirador, periodista y diputado. Su poesía se caracteriza por el individualismo, la rebeldía y la exaltación de la libertad.'
    },
    'Gertrudis G. de Avellaneda': {
      nombreCompleto: 'Gertrudis Gómez de Avellaneda',
      nacimiento: '23 de marzo de 1814',
      fallecimiento: '1 de febrero de 1873 (58 años)',
      ciudadNatal: 'Camagüey, Cuba',
      nacionalidad: 'Cubana-española',
      movimiento: 'Romanticismo',
      genero: 'Poesía, teatro, novela',
      obrasDestacadas: ['Sab', 'Baltasar', 'Guatimozín', 'La avellaneda'],
      biografia: 'Escritora cubana-española, considerada una de las principales figuras del Romanticismo en español. Destacó en poesía, teatro y novela. Su novela "Sab" es una de las primeras novelas antiesclavistas y feministas de la literatura hispanoamericana. Fue propuesta para ingresar a la Real Academia Española en 1853, pero fue rechazada por ser mujer.'
    }
  };

  // Agregar evento click a cada autor
  document.querySelectorAll('.author-card').forEach(card => {
    card.addEventListener('click', function() {
      const authorName = this.querySelector('h3').textContent;
      const authorImg = this.querySelector('img').src;
      const author = authorsInfo[authorName];
      
      if (author) {
        // Llenar el modal con la información del autor
        authorModalBody.innerHTML = `
          <h2>${author.nombreCompleto}</h2>
          <img src="${authorImg}" alt="${authorName}" class="author-detail-img">
          <div class="author-details">
            <p><strong>Fecha de nacimiento:</strong> ${author.nacimiento}</p>
            <p><strong>Fecha de fallecimiento:</strong> ${author.fallecimiento}</p>
            <p><strong>Ciudad natal:</strong> ${author.ciudadNatal}</p>
            <p><strong>Nacionalidad:</strong> ${author.nacionalidad}</p>
            <p><strong>Movimiento literario:</strong> ${author.movimiento}</p>
            <p><strong>Género principal:</strong> ${author.genero}</p>
            <p><strong>Obras destacadas:</strong> ${author.obrasDestacadas.join(', ')}</p>
          </div>
          <div class="author-bio">
            <h3>Biografía</h3>
            <p>${author.biografia}</p>
          </div>
        `;
        
        // Mostrar el modal
        authorModal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevenir scroll
      }
    });
  });

  // ========== MODAL PARA PUBLICIDAD ==========
  const adModal = document.getElementById('adModal');
  const adButton = document.querySelector('.ad-button');

  // Abrir modal del anuncio
  adButton.addEventListener('click', function() {
    adModal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevenir scroll
  });

  // ========== FUNCIONALIDAD PARA CERRAR MODALES ==========
  document.querySelectorAll('.close-modal').forEach(closeBtn => {
    closeBtn.addEventListener('click', function() {
      // Cerrar todos los modales
      document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
      });
      document.body.style.overflow = 'auto'; // Restaurar scroll
    });
  });

  // Cerrar modal al hacer click fuera del contenido
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', function(e) {
      if (e.target === this) {
        this.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restaurar scroll
      }
    });
  });

  // Cerrar modales con la tecla ESC
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
      });
      document.body.style.overflow = 'auto'; // Restaurar scroll
    }
  });

  // ========== MEJORAR LA INTERACCIÓN DE LAS TARJETAS DE AUTOR ==========
  document.querySelectorAll('.author-card').forEach(card => {
    card.style.cursor = 'pointer';
    card.style.transition = 'all 0.3s ease';
    
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px)';
      this.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.2)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
    });
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