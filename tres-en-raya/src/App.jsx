import { useState } from "react"

const TURNS = {
  X: 'x',
  O: 'o'
}


//Si isSelected is true, enseñamos visualmente si le toca a uno o a otro.
//Por eso le pasamos el className al className del <div>
const Square = ({ children, isSelected, updateBoard, index}) => {

  const className = `square ${isSelected ? 'is-selected' : ''}`

  const handleClick = () => {
    updateBoard(index)
  }
  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}


//Ahora meteremos las combinaciones ganadoras, atendiendo a las filas y columnas que tenemos:
const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [8, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]


function App() {
  //const board = Array(9).fill(null) como queremos usar un estado, no podemos usar esta linea
  const [board, setBoard] = useState(Array(9).fill(null))
  
  //Crearemos un estado para saber de quien es el turno
  const [turn, setTurn] = useState(TURNS.X)

  //En este caso, null es que hay un ganador, false que no lo hay
  const [winner, setWinner] = useState(null)

  const checkWinner = (boardToCheck) => {
    //Para cada combinacion del WINNER_COMBOS, recuperamos las posiciones a, b, c Ej: [0, 1, 2]
    //De esta forma, vamos a verificar que tenemos en cada elemento, para decidir cual es el ganador
    for (const combo of WINNER_COMBOS){
      const [a, b, c] = combo
      if (
        boardToCheck[a] &&
        boardToCheck[a] == boardToCheck[b] &&
        boardToCheck[a] == boardToCheck[c]
      ){
        return boardToCheck[a]
      }
    }
    //Si no sale ganador
    return null
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

  //3.Verificar si hay ganador
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      alert(`El ganador es ${newWinner}`)
      setWinner(newWinner)
    }
  }
//La funcion de updateBoard, la llamamos y le pasamos la propia updateBoard, ya que asi
//lo podemos ejecutar cuando queramos

  return (
    <main className='board'>
      <h1> Tres en raya </h1>
      <section className="game">
        {
          board.map((_, index) => {
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
    </main>
  )
}

export default App
