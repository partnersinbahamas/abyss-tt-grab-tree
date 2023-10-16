import { TreeItem } from './TreeItem/TreeItem';
import { TreeNode } from '../../Types/TreeNode';
import { useAppSelector } from '../../Redux/hooks';
import './Tree.scss';

type Props = {
  tree: TreeNode[],
};
  
export const Tree: React.FC<Props> = ({ tree }) => {
    const zoom = useAppSelector(state => state.zoom);

  return (
    <ul className="tree" id="tree">
      {tree.map((item: TreeNode) => (
        <li className="tree__item" key={item.id}>
          <TreeItem item={item}/>

          {item.next && item.next.length > 0 && (
            <Tree tree={item.next} />
          )}
        </li>
      ))}
    </ul>
  );
};
  