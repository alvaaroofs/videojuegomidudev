export const TURNS = {
    X: '×',
    O: 'o'
  }
  
  //Ahora meteremos las combinaciones ganadoras, atendiendo a las filas y columnas que tenemos:
export const WINNER_COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    
    [0, 4, 8],
    [2, 4, 6]
  ]