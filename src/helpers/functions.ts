import { TreeNode } from "../Types/TreeNode";

export function generateUniqueId(data: TreeNode[]) {
  let maxId = 0;

  function traverseAndFindMaxId(category: TreeNode) {
    if (category.id > maxId) {
      maxId = category.id;
    }

    if (category.next) {
      category.next.forEach((subCategory: TreeNode) => {
        traverseAndFindMaxId(subCategory);
      });
    };
  };

  if (Array.isArray(data)) {
    data.forEach((category: TreeNode) => {
      traverseAndFindMaxId(category);
    });
  } else {
    traverseAndFindMaxId(data);
  }

  return maxId + 1;
};

export function createNode(category: TreeNode[]) {
  let newId = generateUniqueId(category);

  const newCategory = {
    id: newId,
    value: '',
    color: '#FF785B',
    next: [],
  }

  return newCategory;
};

export const addNodeToId = (id: number | null, data: TreeNode[], tree: TreeNode[], count: number | string) => {
  if (typeof count === 'number') {
    count++;
  }

  const newNode = createNode(tree);
  newNode.color = getNodeColor(count)

  if (id) {
    const updatedData = data.map((item: any) => {
      if (item.id === id) {

        item.next.push(newNode);
      } else if (item.next.length > 0) {
        item.next = addNodeToId(id, item.next, tree, count);
      }
  
      return item;
    });
    
    return updatedData;
  } else {
    return [...tree, newNode];
  }
};

export const updateNodeName = (id: number, data: TreeNode[], value: string) => {
  const updatedData = data.map((item: any) => {
    if (item.id === id) {
      item.value = value;
    } else if (item.next.length > 0) {
      item.next = updateNodeName(id, item.next, value);
    }

    return item;
  });
    
  return updatedData;
};

export const deleteNode = (id: number, data: TreeNode[]) => {
  const updatedData = data.map((item: TreeNode) => {
    if (item.id === id) {
      return { ...item, next: [] };
    } else if (item.next.length > 0) {
      item.next = deleteNode(id, item.next);
    }

    return item;

  }).filter((item) => item.id !== id);

  return updatedData;
};

export function getNodeColor(count: number | string) {
  if (typeof count === 'string' && count === 'service') {
    return '#EEE000';
  } else if (typeof count === 'number' && count > 0 && count < 2) {
    return '#40C5DD';
  } else {
    return '#B6B6B6';
  };
};

export function countServicesWithColor(data: TreeNode[], color: string) {
  let count = 0;

  function countColorInTree(node: TreeNode) {
    if (node.color === color) {
      count++;
    }

    if (node.next) {
      node.next.forEach(countColorInTree);
    }
  }

  data.forEach(countColorInTree);

  return count;
}
