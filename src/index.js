// index.js
const arr2 = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

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
  const del = (root, val) => {
    if (!root) return null;

    const isLeaf = (node, side) =>
      node[side] &&
      val == node[side].data &&
      !node[side].left &&
      !node[side].right;

    function deleteIfNotLeaf(node) {
      const isSingleChild = node.data === val && !!node.left !== !!node.right;
      const hasTwoChildren = node.data === val && node.left && node.right;
      if (isSingleChild) {
        node = !!node.left ? node.left : node.right; // skip currNode
        return node;
      }
      if (hasTwoChildren) {
        // placeholder for handling 2 children later
      }
      return;
    }

    let rootSide;
    if (val < root.data) {
      root.left = del(root.left, val);
      rootSide = "left";
    } else if (val > root.data) {
      root.right = del(root.right, val);
      rootSide = "right";
    } else rootSide = null;

    if (rootSide) {
      if (isLeaf(root, rootSide)) root[rootSide] = null;
    } else {
      if (!!root.left !== !!root.right) root = deleteIfNotLeaf(root);
    }

    return root;
  };

  return { root, insert, del };
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

// Testing
console.log(`  `);
const myTree2 = tree(arr2);
console.log(prettyPrint(myTree2.root));
myTree2.insert(myTree2.root, 67);
myTree2.insert(myTree2.root, 34);
myTree2.insert(myTree2.root, 90);
myTree2.insert(myTree2.root, 36);
console.log(prettyPrint(myTree2.root));
myTree2.del(myTree2.root, 36);
console.log(prettyPrint(myTree2.root));
