import './PurpleButton.scss';

type Props = {
  title: string,
  onClick?: (value: any) => void,
}

export const PurpleButton: React.FC<Props> = ({ title, onClick = () => {} }) => {
  return (
    <button
      type="button"
      className="purpleButton"
      onClick={onClick}
    >
      {title}
    </button>
  );
};
