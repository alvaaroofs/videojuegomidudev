import { useState } from "react"
import confetti from "canvas-confetti"

import { Square } from "./components/Square"
import { TURNS } from "./constants.js"
import { checkWinner, checkEndGame } from "./logic/board.js"
import { WinnerModal } from "./components/WinnerModal.jsx"

function App() {
  //const board = Array(9).fill(null) como queremos usar un estado, no podemos usar esta linea
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    if (boardFromStorage) return JSON.parse(boardFromStorage)
      return Array(9).fill(null)
  })

  //Crearemos un estado para saber de quien es el turno
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })

  //En este caso, null es que hay un ganador, false que no lo hay
  const [winner, setWinner] = useState(null)


  //Con este componente, volvemos a establecer los valores por defecto que queramos que aparezcan
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }


  const updateBoard = (index) => {
      //Para no sobreescribir info que ya hemos metido, metemos la siguiente logica para indicar
      //que si tiene algo no actualizamos la posicion
      //con || winner ; si ya hay un ganador tampoco nos dejara seguir jugando
  if (board[index] || winner) return 

  //1.Actualizar el tablero
    const newBoard = [...board]
    //spread y rest operator MIRARLOS BIEN!!!
    //Los arrays no podemos modificar sus valores, si no que tenemos que crear nuevos arrays con el valor que ya tienen
    newBoard[index] = turn
    setBoard(newBoard)
    
  //2.Cambiar el turno
    const newTurn = turn == TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

  //2.1 Guardar la partida
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)

  //3.Verificar si hay ganador
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)){
      setWinner(false)
    }
  }
  //Las actualizaciones de estados en react son asincronos; no bloquea la ejecucion del codigo que viene despues



//La funcion de updateBoard, la llamamos y le pasamos la propia updateBoard, ya que asi
//lo podemos ejecutar cuando queramos
  return (
    <main className='board'>
      <h1> Tres en - </h1>
      <button onClick={resetGame}> Restart </button>
      <section className="game">
        {
          board.map((square, index) => {
            return(
              <Square
              key={index}
              index={index}
              updateBoard={updateBoard}
              >
                {board[index]}
              </Square>
            )
          })
        }
      </section>

      <section className="turn">
        <Square isSelected={turn == TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn == TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner}/>
    </main>
    //En el boton de empezar de nuevo, vamos a resetear el estado a su valor inicial
    //para evitar tener que refrescar la pagina por nosotros mismos
  )
}
export default App