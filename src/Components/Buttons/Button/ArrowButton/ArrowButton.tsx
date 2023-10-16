import './ArrowButton.scss';

type Props = {
  onClick?: () => void,
}

export const ArrowButton: React.FC<Props> = ({ onClick }) => {
  return (
    <button
      type="button"
      className="arrowButton"
      onClick={onClick}
    >
      <i className='bx bx-chevron-up'/>
    </button>
  )
}