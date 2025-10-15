import prettyPrint from "./prettyPrint.js";

const arr1 = [500, 10, 20, 30, 100, 40];
// const arr2 = [500,10,20,30,100]
const arr2 = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
// index.js

const node = (data = null, left = null, right = null) => {
  return { data, left, right };
};

const tree = (arr) => {
  let root = buildTree(arr);
  const insert = (root, val) => {
    if (root == null) return node(val);
    if (val < root.data) root.left = insert(root.left, val);
    if (val > root.data) root.right = insert(root.right, val);
    return root;
  };

  const del = (root, val) => {
    if (!root) return null;
    let rootSide;

    const isLeaf = (node) => node && !node.left && !node.right;
    const hasOneChild = (node) => !!node.left !== !!node.right;
    const hasTwoChildren = (node) => node.left && node.right;
    const deleteOneChildNode = (node) => (node.left ? node.left : node.right); // skip currNode n retirn next left or right node;
    const deleteLeaf = (parent, side) => (parent[side] = null);

    if (val < root.data) {
      root.left = del(root.left, val);
      rootSide = "left";
    } else if (val > root.data) {
      root.right = del(root.right, val);
      rootSide = "right";
    } else if (val == root.data) {
      rootSide = null;
    } else console.log("Value not in tree");

    if (rootSide) {
      let child = root[rootSide];
      if (child && val == child.data && isLeaf(child))
        deleteLeaf(root, rootSide); //
    } else if (hasOneChild(root)) {
      root = deleteOneChildNode(root);

      // two child cases
    } else if (hasTwoChildren(root)) {
      // --- Case 1: right child is a leaf ---
      if (isLeaf(root.right)) {
        root = promoteRightLeaf(root);

        // --- Case 2: right child has no left child (simple right promotion) ---
      } else if (hasOneChild(root.right) && !root.right.left) {
        root.data = root.right.data;
        root.right = root.right.right;

        // --- Case 3: all other two-child variations ---
      } else {
        root.data = promoteLeftmostFromRight(root);
      }
    }

    function promoteRightLeaf(node) {
      const leafData = node.right.data;
      deleteLeaf(node, "right"); // del right coz right has the bigger val which will replace the parent
      node.data = leafData; //update node.data
      return node;
    }
    function promoteLeftmostFromRight(node) {
      const rightChild = node.right;
      if (!rightChild.left) return;
      let leftChild = rightChild.left;
      let prevNode = rightChild;
      while (leftChild.left) {
        // check if leftchild of rightchild had
        prevNode = leftChild; //
        leftChild = leftChild.left;
      }
      let nodedata = leftChild.data;
      prevNode.left = leftChild.right; // the .left is already null - this is reassigning which implicitly updates the left leg. no nid 2 del.
      return nodedata;
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
  const newNode = node(root);
  newNode.left = buildTree(sortedArr.slice(0, mid));
  newNode.right = buildTree(sortedArr.slice(mid + 1));
  return newNode;
};

console.log(`  `);
// const myTree = tree(arr1);
const myTree2 = tree(arr2);
console.log(prettyPrint(myTree2.root));
// console.log(myTree2);

myTree2.insert(myTree2.root, 67);
myTree2.insert(myTree2.root, 34);
myTree2.insert(myTree2.root, 90);
myTree2.insert(myTree2.root, 36);
myTree2.insert(myTree2.root, 30);
// myTree2.insert(myTree2.root,7.5)

console.log(prettyPrint(myTree2.root));

// myTree2.del(myTree2.root,34)
// myTree2.del(myTree2.root,30)
// myTree2.del(myTree2.root,233)
myTree2.insert(myTree2.root, 6);
myTree2.insert(myTree2.root, 4.5);
myTree2.insert(myTree2.root, 2);
myTree2.insert(myTree2.root, 7000);
myTree2.insert(myTree2.root, 8000);
myTree2.insert(myTree2.root, 9000);
myTree2.insert(myTree2.root, 7500);
myTree2.insert(myTree2.root, 400);
myTree2.insert(myTree2.root, 295);
myTree2.insert(myTree2.root, 400);
myTree2.insert(myTree2.root, 298);

// myTree2.del(myTree2.root,3)
// myTree2.del(myTree2.root,7)
// myTree2.del(myTree2.root,6)
// myTree2.del(myTree2.root, 67);
// myTree2.del(myTree2.root, 2333);
// myTree2.del(myTree2.root, 90);
// myTree2.del(myTree2.root, 324);
// myTree2.del(myTree2.root, 67);
// myTree2.del(myTree2.root, 23);
// myTree2.del(myTree2.root,333);
// myTree2.del(myTree2.root, 4);
// myTree2.del(myTree2.root, 23);
// myTree2.del(myTree2.root, 6345);
myTree2.del(myTree2.root, 8000);
// myTree2.del(myTree2.root, 7);

// myTree2.del(myTree2.root, 6345);
// myTree2.del(myTree2.root,4)

console.log(prettyPrint(myTree2.root));
