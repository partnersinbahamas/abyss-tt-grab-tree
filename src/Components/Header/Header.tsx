import { useAppDispatch} from '../../Redux/hooks';
import * as coordinatesActions from '../../Redux/features/coordinates/coordinates';
import { SquareButton } from '../Buttons/SquareButton/SquareButton';
import { PurpleButton } from '../Buttons/PurpleButton/PurpleButton';
import { Counter } from '../Counter/Counter';
import { Scale } from '../Scale/Scale';
import { useLocalStorage } from 'usehooks-ts';
import { TreeNode } from '../../Types/TreeNode';
import { countServicesWithColor } from '../../helpers/functions';
import './Header.scss';

type Props = {
  onNavigate: () => void,
}

export const Header: React.FC<Props> = ({ onNavigate }) => {
  const dispatch = useAppDispatch();
  const [tree] = useLocalStorage<TreeNode[]>('tree', []);

  const countServices = countServicesWithColor(tree, '#EEE000');

  return (
    <section className="header">
      <div className="header__wrapper">
        <h1 className="header__title">Services</h1>

        <Counter count={countServices} />
      </div>

      <div className="header__nav">
        <div className="header__buttons">
          <PurpleButton title="List view" />

          <SquareButton
            img="bx bxs-navigation"
            onClick={() => {
              dispatch(coordinatesActions.set({x: 1, y: 245}))
              onNavigate();
            }}
          />
        </div>

        <Scale />
      </div>
    </section>
  );
};
