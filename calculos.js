// ==================== CONSTANTS ==================== //
const Estado_actividad = document.querySelector('.game-notificacion'),
    Estado_juego = ["", "", "", "", "", "", "", "", ""],
    Ganadores = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ],
    mensaje_ganador = () => `El jugador ${jugador} ha ganado!`,
    mensaje_empate = () => `El juego ha terminado en empate!`,
    turno_jugador = () => `Turno del jugador ${jugador}`

// ==================== VARIABLES ==================== //
var actividad_juego = true,
    jugador = ""
a = 0 //variable para habilitar/deshabilitar las celdas, cuando hay un ganador o se reinicia el juego
var contX = 0
var contO = 0

document.getElementById('intro-section').style.display = 'block';

// ==================== FUNCTIONS ==================== //

function habilitar() {
    let player = $('input[name="game"]:checked').val();
    
    jugador = player;
    if (player === undefined) {
      alert('datos erroneos!!, por favor selecciona una opcion');
      
    } else if (player === 'X' || player === 'O'){
      
      a=1;
      actividad_juego = true

    document.getElementById('game-container').style.display = 'block';
    document.getElementById('intro-section').style.display = 'none';
    main()

    }else{
      actividad_juego = false
    }
}


function main() {
    Indicacion_Estado(turno_jugador())
    Principales()
}

function Principales() {
    document.querySelector('.game-container').addEventListener('click', EncargadoDeHacer_click)//Es un evento que indica al navegador que este atento a la interacción del usuario.
    document.querySelector('.reiniciar').addEventListener('click', Reinicio_juego)
}

function Indicacion_Estado(mensaje) {
    Estado_actividad.innerHTML = mensaje
}

function Reinicio_juego() {
    actividad_juego = true
    Reinicio_total()
    Indicacion_Estado(turno_jugador())
    document.querySelectorAll('.game-cell').forEach(cell => cell.innerHTML = "")// En donde la variable cell es una función que será llamada o invocada por cada elemento que exista dentro del arreglo
}

function EncargadoDeHacer_click(clickedCellEvent /** tipo de evento **/ ) {
    if (a != 0) {
        actividad_juego = true;
    } else {
        actividad_juego = false;
    }
    const celda_clickeada = clickedCellEvent.target//devuelve un valor Boolean indicando si un nodo es descendiente de un nodo dado o no
    if (celda_clickeada.classList.contains('game-cell')) {
        const Cell_clickeada_index = Array.from(celda_clickeada.parentNode.children).indexOf(celda_clickeada)
        if (Estado_juego[Cell_clickeada_index] !== '' || !actividad_juego) {
            return false
        }

        Cellda_jugador(celda_clickeada, Cell_clickeada_index)
        Validacionde_resultado()
    }
}

function Cellda_jugador(celda_clickeada /** objeto HTML **/ , Cell_clickeada_index) {
    Estado_juego[Cell_clickeada_index] = jugador // Agrega en la posición correspondiente el valor ya sea "X" u "O" en el estado actual del juego
    celda_clickeada.innerHTML = jugador // Agrega en el HTML el valor del jugador
}

function Validacionde_resultado() {
    let Ronda_ganada = false
    for (let i = 0; i < Ganadores.length; i++) { // Itera cada uno de las posibles combinaciones ganadores
        const Condicion_ganador = Ganadores[i] // Guarda la combinación por ejemplo: [0, 1, 2]
        let posicion1 = Estado_juego[Condicion_ganador[0]],
            posicion2 = Estado_juego[Condicion_ganador[1]],
            posicion3 = Estado_juego[Condicion_ganador[2]] // Almacena el valor del estado actual del juego según las posiciones de winCondition

        if (posicion1 === '' || posicion2 === '' || posicion3 === '') {
            continue; // Si hay algún valor vacio nadie ha ganado aún
        }
        if (posicion1 === posicion2 && posicion2 === posicion3) {
            if (posicion1 == 'X') {
               contX++
            } else if(posicion1 == 'O'){
              contO++
            }
            var valor = `<h1 class="marcador">Jugador X : ${contX} ||  Jugador O : ${contO}</h1>`;
            document.getElementById('marcador').innerHTML = valor;
            // alert('Jugador X :'+contX+' jugador O : '+contO);
            Ronda_ganada = true // Si todas las posiciones coinciden entonces, dicho jugador ha ganado la partida
            break
        }
    }

    if (Ronda_ganada) {
        Indicacion_Estado(mensaje_ganador())
        actividad_juego = false
        alert(mensaje_ganador());
        a=0
        return
    }

    let Ronda_empada = !Estado_juego.includes("") // Si todas las celdas tienen valor y la sentencia anterior fue falsa entonces es empate
    if (Ronda_empada) {
        Indicacion_Estado(mensaje_empate())
        actividad_juego = false
        return
    }

    handlePlayerChange()
}

function handlePlayerChange() {
    jugador = jugador === "X" ? "O" : "X"
    Indicacion_Estado(turno_jugador())
}

function Reinicio_total() {
  a=1;
    let i = Estado_juego.length
    while (i--) {
        Estado_juego[i] = ''
    }
   
}

main()