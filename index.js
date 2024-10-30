$(document).ready(function () {
  var plantas = ["Cactus suculenta", "Flor animada", "Flor sencilla", "Florecita infantil", "Mini aloe vera", "Una flor sonriente"];
  var topeInvernadero = parseFloat($('#topeInvernadero').height()); //variable con el límite al que deben llegar las plantas
  var topPlantas = parseFloat($('#plantas').position().top); //parte de arriba del div de las plantas
  var marginPlants = []; //array para guardar el orden de llegada
  var diferencia = topPlantas - topeInvernadero; //diferencia inicial entre el div de las plantas y el límite

  /** Escuchar el cambio en el selector */
  $('#numeroPlantas').change(function () {
      var numPlantas = parseInt($(this).val());
      var htmlPlantas = "";
      /** Crear un string con las imagenes que se van a mostrar, en función del valor del selector */
      for (var i = 0; i < numPlantas; i++) {
          htmlPlantas += '<img class="fotoFlor" id="flor' + i + '" src="img/img/' + plantas[i] + '.jpg' + '">';
      }
      /** Añadir el string al div destinado para contener las plantas */
      $("#plantas").html(htmlPlantas);
  });

  $("#boton1").click(function () {
      /** Comprobamos que el selector tenga un valor válido para empezar la animación */
      if ($('#numeroPlantas').val() > 0) {
          animacionAleatoria();
          accionclick();
      }
  });

  $("#boton2").click(function () {
      /** reseteamos */
      resetplants();
  });

  function togglesBotones() {
      /** Función que cambia el estado (mostrado/oculto) de los botones */
      $("#boton1").toggle();
      $("#boton2").toggle();
  }
  
  function accionclick() {
      /** Llamar a la función principal y a cambiar botones */
      animacionAleatoria();
      togglesBotones();
  }
  
  function resetplants() {
      /** resetear, volviendo a dar el margin inicial y cambiamos botones */
      $("#plantas img").each(function () {
          $(this).css("margin-bottom", 20);
      });
      togglesBotones();
  }
  
  function animacionAleatoria() {
    
      /** Recorrer div de las imagenes */
      $("#plantas img").each(function (index) {
          /** Obtener margin-bottom para comparar con la diferencia (al ser un string con px, se lo quitamos y lo transformamos en float)*/
          let margin = parseFloat($(this).css('margin-bottom').slice(0,-2));
          
          if ( margin < diferencia) {
              /** obtenemos número aleatorio entre 0 y 10 para añadirle al margin-bottom de la planta */
              var rand = Math.floor(Math.random() * 10); 
              $(this).animate({
                  "margin-bottom": "+=" + rand
              }, 5);
          } else {
              /** Si el margen es mayor que la diferencia y en el array no está la planata, la metemos, obteniendo en el array las planatas en orden de llegada */
              if (!marginPlants.includes(plantas[index])) {
                  marginPlants.push(plantas[index]);
              }
          }
      });
  
      /** llamar recursivamente a la función hasta que lleguen todas las plantas o mostrar la tabla, con un timeout, para esperar a que termine el animate para hacer la comprobación */
      setTimeout(function(){
          if (marginPlants.length < $("#plantas img").length) {
              animacionAleatoria();
          } else {
              showTable();
          }
      }, 200)
     
  }
 
  function showTable() {
      /** función que inserta en la tabla las celdas con el orden de la llegada de las plantas */
      var htmlToAdd = '';
      $(marginPlants).each(function(index, element) {
        index++;
          htmlToAdd += '<tr><td>' +index  + '</td><td>' + element + '</td></tr>';
      });
      $('#tablaFlores tbody').html(htmlToAdd);
  }
  
});



