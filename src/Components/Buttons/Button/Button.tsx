import './Button.scss';

type Props = {
  onClick?: () => void,
  title?: string
};

export const Button: React.FC<Props> = ({ onClick, title }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="button"
    >
      <span className="button__title">{title}</span>
    </button>
  );
};
