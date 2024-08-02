//Si isSelected is true, enseñamos visualmente si le toca a uno o a otro.
//Por eso le pasamos el className al className del <div>
export const Square = ({ children, isSelected, updateBoard, index}) => {
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