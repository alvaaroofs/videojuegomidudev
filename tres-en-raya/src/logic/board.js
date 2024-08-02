import { WINNER_COMBOS } from "../constants.js"

//Esta logica se puede usar en otras como angular, etc...

export const checkWinner = (boardToCheck) => {
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

  //Componente enfocado a los empates; si todas las posiciones de cada square son diferentes a null
//significa que ha acabado el juego; y obligamos a terminar el juego
export const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square !== null)
  }