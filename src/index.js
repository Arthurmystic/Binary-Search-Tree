// index.js

const node = (data = null, left = null, right = null) => {
  return { data, left, right };
};

const tree = (arr) => {
  let dataTree = buildTree(arr);
  const insert = (val) => {
    let data = dataTree;
    let oldData;
    while (data !== null) {
      oldData = data;
      if (val < data.root) data = data.left;
      if (val > data.root) data = data.right;
    }
    oldData = val;
  };
  return { dataTree, insert };
};

const buildTree = (arr) => {
  if (arr.length === 0) return null;
  const sortedArr = arr
    .filter((x, i) => arr.indexOf(x) === i) // const sortedArr = [...new Set(arr)].sort((a,b)=>a-b); new set auto removes dups ... change sit back to array
    .sort((a, b) => a - b);
  const mid = Math.floor(sortedArr.length / 2);
  let root = sortedArr[mid];
  let newNode = node(root);
  newNode.left = buildTree(sortedArr.slice(0, mid));
  newNode.right = buildTree(sortedArr.slice(mid + 1));
  return newNode;
};
