import './Create.scss';
import { Button } from '../Buttons/Button/Button';
import { TreeNode } from '../../Types/TreeNode';
import { useLocalStorage } from 'usehooks-ts';
import { addNodeToId } from '../../helpers/functions';
import React from 'react';

type Props = {
  item: TreeNode,
  setIsCreate: (value: boolean) => void,
}

export const Create: React.FC<Props> = ({ item, setIsCreate }) => {
  const [tree, setTree] = useLocalStorage<TreeNode[]>('tree', []);

  return (
    <div className="create" onClick={(event) => event.stopPropagation()}>
      <h1 className="create__title">What do you want to create?</h1>

        <div className="create__buttons">
          <Button
            title='Category'
            onClick={() => {
              let count = 0;

              const updated = addNodeToId(item.id, tree, tree, count);
              setTree(updated);
              setIsCreate(false);
          }}/>
          <Button
            title='Service'
            onClick={() => {
              const updated = addNodeToId(item.id, tree, tree, 'service');
              setTree(updated);
              setIsCreate(false);
          }}/>
        </div>
    </div>
  );
};
