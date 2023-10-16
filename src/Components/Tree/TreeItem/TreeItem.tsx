import { useLocalStorage } from 'usehooks-ts';
import { deleteNode, updateNodeName } from '../../../helpers/functions';
import { CircleGreyButton } from '../../Buttons/CircleGrayButton/CircleGrayButton';
import './TreeItem.scss';
import { TreeNode } from '../../../Types/TreeNode';
import { useState } from 'react';
import { Create } from '../../Create/Create';

type Props = {
  item: TreeNode,
};

export const TreeItem: React.FC<Props> = ({ item }) => {
  const [treeData, setTree] = useLocalStorage<TreeNode[]>('tree', []);
  const [isEdit, setIsEdit] = useState<boolean>(item.value.length <= 0);
  const [name, setName] = useState<string>(item.value);
  const [isCreate, setIsCreate] = useState<boolean>(false);

  const nameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    const { value } = event.target;

    setName(value);
  };

  return (
    <div className="treeItem">
      {!isEdit ? (
        <div className="treeItem__container">
          <div className="treeItem__element" style={{ backgroundColor: item.color }} >
            {item.value}
          </div>

          <div className="treeItem_buttons">
            <CircleGreyButton
              img="bx bx-plus"
              onClick={() => setIsCreate((current) => !current)}
            />

            <CircleGreyButton
              img="bx bxs-pencil"
              onClick={() => setIsEdit(true)}
            />

            <div className="treeItem__cross">
              <CircleGreyButton
                img="bx bx-plus"
                color="#FF7373"
                onClick={() => {
                  const updated = deleteNode(item.id, treeData);

                  setTree(updated);
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="treeItem__input">
          <input
            type="text"
            className="treeItem__input_type"
            placeholder="Category name"
            value={name}
            onChange={(event) => nameHandler(event)}
            onClick={(event) => event.stopPropagation()}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                const updated = updateNodeName(item.id, treeData, name);

                setTree(updated);
                setIsEdit(false);
              }
            }}
          />

          <div className="treeItem_buttons">
            <div className="treeItem__cross">
              <CircleGreyButton
                img="bx bx-plus"
                color="#FFD100"
                onClick={() => {
                  const updated = deleteNode(item.id, treeData);
                  setTree(updated);
                }}
              />
            </div>

            <CircleGreyButton
              img="bx bx-check"
              color={name.length ? "#00C31E" : '#ddd'}
              onClick={() => {
                if (name.length) {
                  const updated = updateNodeName(item.id, treeData, name);

                  setTree(updated);
                  setIsEdit(false);
                }
              }}
            />
          </div>
        </div>
      )}

      {isCreate && (
        <div className="treeItem__create">
          <Create item={item} setIsCreate={setIsCreate}/>
        </div>
      )}
    </div>
  );
};
