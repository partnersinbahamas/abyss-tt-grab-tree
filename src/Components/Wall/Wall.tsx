import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import * as coordinatesActions from '../../Redux/features/coordinates/coordinates';
import { useLocalStorage } from 'usehooks-ts';
import { TreeNode } from '../../Types/TreeNode';
import { CircleGreyButton } from '../Buttons/CircleGrayButton/CircleGrayButton';
import { createNode } from '../../helpers/functions';
import { Tree } from '../Tree/Tree';
import { ArrowButton } from '../Buttons/Button/ArrowButton/ArrowButton';
import './Wall.scss';

type Props = {
  isNavigated: boolean
  isNavigatedHandler: () => void,
}

export const Wall: React.FC<Props> = ({ isNavigated, isNavigatedHandler }) => {
  const dispatch = useAppDispatch();
  const coordinates = useAppSelector(state => state.coordinates);
  const [tree, setTree] = useLocalStorage<TreeNode[]>('tree', []);
  const zoom = useAppSelector(state => state.zoom);

  const { x, y } = coordinates;

  const [isDrag, setIsDrag] = useState<boolean>(false);

  const dragHandler = (event: React.MouseEvent<any>) => {
    event.stopPropagation();
    event.preventDefault();
  
    if (!event.currentTarget.closest('.wall')) {
      return;
    }
  
    const spider: Element = document.querySelector('.wall__container')!;
    const coordX: number = event.clientX;
    const coordY: number = event.clientY;
    const spiderWidth: number = spider.clientWidth;
    const spiderHeight: number = spider.clientHeight;
    
    const newCoordX: number = coordX - spiderWidth / 2;
    const newCoordY: number = coordY - spiderHeight / 2 - 40;

    if (newCoordY < 15) {
      dispatch(coordinatesActions.set({ x: newCoordX, y: 15 }));
    } else {
      dispatch(coordinatesActions.set({ x: newCoordX, y: newCoordY }));
    }
  };

  return (
    <section
      className="wall"
      onMouseMove={(event) => {
        if (isDrag) {
          dragHandler(event);
        }
      }}
      onClick={(event) => {
        event.stopPropagation()
        if (isDrag) {
          setIsDrag(false);
        }
      }}
    >
      <p
        className="wall__arrow wall__arrow-1"
        onClick={() => {
          dispatch(coordinatesActions.decreaseY());
          isNavigatedHandler();
        }}
      >
        <ArrowButton/>
      </p>

      <p
        className="wall__arrow wall__arrow-2"
        onClick={() => {
          dispatch(coordinatesActions.increaseX());
          isNavigatedHandler();
        }}
      >
        <ArrowButton/>
      </p>

      <div
        draggable={true}
        className="wall__container"
        style={{
          top: `${y}px`,
          left: `${x}px`,
          transform: `scale(${(zoom / 200) + .5})`,
          transition: isNavigated ? '.5s' : ''
        }}
        onClick={() => setIsDrag(true)}
      >
        <div className="wall__head">
          <h2 className="wall__title">Categories</h2>
  
          <CircleGreyButton
            img="bx bx-plus" 
            onClick={() => {
              const newCategory = createNode(tree);
              setTree((current) => [...current, newCategory])
            }}
          />
        </div>

        {tree.length > 0 && (
          <Tree tree={tree} />
        )}
      </div>

      <p
        className="wall__arrow wall__arrow-3"
        onClick={() => {
          dispatch(coordinatesActions.decreaseX());
          isNavigatedHandler();
        }}
      >
        <ArrowButton/>
      </p>

      <p
        className="wall__arrow wall__arrow-4"
        onClick={() => {
          dispatch(coordinatesActions.increaseY());
          isNavigatedHandler();
        }}
      >
        <ArrowButton/>
      </p>
    </section>
  );
};
