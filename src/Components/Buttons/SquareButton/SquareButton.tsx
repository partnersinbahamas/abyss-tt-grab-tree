import './SquareButton.scss';

type Props = {
  img?: string,
  onClick?: () => void,
  title?: string
};

export const SquareButton: React.FC<Props> = ({ img, onClick, title }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="squareButton"
    >
      {img && (
        <i className={`${img} squareButton__title`}/>
      )}

      {title && (
        <span>{title}</span>
      )}
    </button>
  );
};
