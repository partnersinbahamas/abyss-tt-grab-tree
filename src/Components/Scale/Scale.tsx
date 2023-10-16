import { useCallback, useState } from "react";
import { SquareButton } from "../Buttons/SquareButton/SquareButton";
import * as zoomActions from '../../Redux/features/zoom/zoom';
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import classNames from 'classnames';
import './Scale.scss';

export const Scale = () => {
  const dispatch = useAppDispatch();
  const zoom = useAppSelector(state => state.zoom);
  const AMOUNT: number = 20;

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const zoomAmounts: number[] = [
    25, 30, 40, 50, 60, 70, 80, 90, 100, 125, 150,
  ];

  const onIncrease = useCallback(() => {
    dispatch(zoomActions.increase(AMOUNT));
  }, []);

  const onDecrease = useCallback(() => {
    dispatch(zoomActions.decrease(AMOUNT));
  }, []);

  const onSet = useCallback((amount: number) => {
    dispatch(zoomActions.set(amount))
    setIsOpen(false);
  }, [])

  return (
    <div className="scale">
      <SquareButton img="bx bx-minus" onClick={onDecrease} />

      <p
        className="scale__count"
        onClick={() => setIsOpen((current) => !current)}
      >
        {zoom}%
      </p>

      {isOpen && (
        <ul className="scale__list">
          {zoomAmounts.map((amount: number) => (
            <li
              key={amount}
              className="scale__count scale__count_item"
              onClick={() => onSet(amount)}
            >
              {amount}%
            </li>
          ))}
        </ul>
      )}

      <SquareButton img="bx bx-plus" onClick={onIncrease} />
    </div>
  );
};
