import './CircleGreyButton.scss';

type Props = {
  img: string,
  onClick: () => void,
  color?: string
};

export const CircleGreyButton: React.FC<Props> = ({ img, onClick, color = '#ddd'}) => {
  return (
    <button
      type="button"
      className="circleButton"
      style={{backgroundColor: color}}
      onClick={(event) => {
        event.stopPropagation()
        onClick();
      }}
    >
      <i className={img}/>
    </button>
  );
};
