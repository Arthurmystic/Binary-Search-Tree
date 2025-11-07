import prettyPrint from "./prettyPrint.js";

const arr1 = [500, 10, 20, 30, 100, 40];
// const arr2 = [500,10,20,30,100]
const arr2 = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
// index.js

const createNode = (data = null, left = null, right = null) => {
  return { data, left, right };
};

const tree = (arr) => {
  let root = buildTree(arr);
  const insert = (val, arrRoot = root) => {
    if (!arrRoot) return createNode(val);
    if (val < arrRoot.data) arrRoot.left = insert(val, arrRoot.left);
    if (val > arrRoot.data) arrRoot.right = insert(val, arrRoot.right);
    return arrRoot;
  };

  const find = (val, arrRoot = root) => {
    if (!arrRoot) return null;
    if (val < arrRoot.data) return find(val, arrRoot.left);
    if (val > arrRoot.data) return find(val, arrRoot.right);
    return arrRoot;
  };

  function levelOrderForEach(callback, treeRoot = root) {
    try {
      if (callback !== "function")
        throw new Error(
          "Invalid callback: expected a function but received " +
            typeof callback +
            "."
        );

      const queue = [treeRoot];
      const finalArr = [];
      while (queue.length > 0) {
        callback(queue, queue[0], finalArr);
      }
      return finalArr;
      // return callback(queue, queue[0], finalArr); // recursion version - # out while and return finalArr to use this
    } catch (e) {
      // console.error(e)
      console.log(e.name);
      console.log(e.message);
      // console.log(e.stack)
    }
  }

  function callBack(queue, node, finalArr) {
    // if (queue.length == 0) return finalArr; // add this and #out IF below if recursion version is to be used
    if (queue.length >= 0) {
      const removedItem = queue.shift();
      finalArr.push(removedItem.data);
    }
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
    // return callBack(queue, queue[0], finalArr); // add this if recursion versiont to be used
  }

  function preOrderForEach(node) {
    if (!node) return [];
    return [
      node.data,
      ...preOrderForEach(node.left),
      ...preOrderForEach(node.right),
    ];
  } // the spread operator is for flattening the arrays, instead of having nested arrays e.g. [...[1,2], ...[3,4], 5] -> [1,2,3,4,5]

  function inOrderForEach(node) {
    if (!node) return [];
    return [
      ...inOrderForEach(node.left),
      node.data,
      ...inOrderForEach(node.right),
    ];
  } // the spread operator is for flattening the arrays, instead of having nested arrays e.g. [...[1,2], ...[3,4], 5] -> [1,2,3,4,5]

  function postOrderForEach(node) {
    if (!node) return [];
    return [
      ...postOrderForEach(node.left),
      ...postOrderForEach(node.right),
      node.data,
    ];
  } // the spread operator is for flattening the arrays, instead of having nested arrays e.g. [...[1,2], ...[3,4], 5] -> [1,2,3,4,5]

  const del = (val, arrRoot = root) => {
    if (!arrRoot) return null;
    let rootSide;

    const isLeaf = (node) => node && !node.left && !node.right;
    const hasOneChild = (node) => !!node.left !== !!node.right;
    const hasTwoChildren = (node) => node.left && node.right;
    const deleteOneChildNode = (node) => (node.left ? node.left : node.right); // skip currNode n retirn next left or right node;
    const deleteLeaf = (parent, side) => (parent[side] = null);

    if (val < arrRoot.data) {
      arrRoot.left = del(val, arrRoot.left);
      rootSide = "left";
    } else if (val > arrRoot.data) {
      arrRoot.right = del(val, arrRoot.right);
      rootSide = "right";
    } else if (val == arrRoot.data) {
      rootSide = null;
    } else console.log("Value not in tree");

    if (rootSide) {
      let child = arrRoot[rootSide];
      if (child && val == child.data && isLeaf(child))
        deleteLeaf(arrRoot, rootSide); //
    } else if (hasOneChild(arrRoot)) {
      arrRoot = deleteOneChildNode(arrRoot);

      // two child cases
    } else if (hasTwoChildren(arrRoot)) {
      // --- Case 1: right child is a leaf ---
      if (isLeaf(arrRoot.right)) {
        arrRoot = promoteRightLeaf(arrRoot);

        // --- Case 2: right child has no left child (simple right promotion) ---
      } else if (hasOneChild(arrRoot.right) && !arrRoot.right.left) {
        arrRoot.data = arrRoot.right.data;
        arrRoot.right = arrRoot.right.right;

        // --- Case 3: all other two-child variations ---
      } else arrRoot.data = promoteLeftmostFromRight(arrRoot);
    }

    function promoteRightLeaf(node) {
      const leafData = node.right.data;
      deleteLeaf(node, "right"); // del right coz right has the bigger val which will replace the parent
      node.data = leafData; //update node.data
      return node;
    }

    function promoteLeftmostFromRight(node) {
      const rightChild = node.right;
      if (!rightChild.left) return rightChild.data; // return data if no left child;
      let leftChild = rightChild.left;
      let prevNode = rightChild;
      while (leftChild.left) {
        // this loop finds the leftmost child
        prevNode = leftChild;
        leftChild = leftChild.left;
      }
      let nodedata = leftChild.data;
      prevNode.left = leftChild.right; // the leftChild.left is already null - this is reassigning which implicitly updates the left leg
      return nodedata;
    }
    return arrRoot;
  };
  return {
    root,
    insert,
    del,
    find,
    preOrderForEach,
    inOrderForEach,
    postOrderForEach,
  };
};

const buildTree = (arr) => {
  if (arr.length === 0) return null;
  const sortedArr = arr
    .filter((x, i) => arr.indexOf(x) === i) // const sortedArr = [...new Set(arr)].sort((a,b)=>a-b); new set auto removes dups ... change sit back to array
    .sort((a, b) => a - b);

  const mid = Math.floor(sortedArr.length / 2);
  let root = sortedArr[mid];
  const node = createNode(root);
  node.left = buildTree(sortedArr.slice(0, mid));
  node.right = buildTree(sortedArr.slice(mid + 1));
  return node;
};

console.log(`  `);
// const myTree = tree(arr1);
const myTree2 = tree(arr2);
console.log(prettyPrint(myTree2.root));
// console.log(myTree2);

myTree2.insert(67);
myTree2.insert(34);
myTree2.insert(90);
myTree2.insert(36);
myTree2.insert(30);
// myTree2.insert(30000);

// myTree2.insert(myTree2.root,7.5)

console.log(prettyPrint(myTree2.root));

// myTree2.del(34)
// myTree2.del(30)
// myTree2.del(233)
myTree2.insert(6);
myTree2.insert(4.5);
myTree2.insert(2);
myTree2.insert(7000);
myTree2.insert(8000);
myTree2.insert(9000);
myTree2.insert(7500);
myTree2.insert(400);
myTree2.insert(295);
myTree2.insert(400);
myTree2.insert(298);
myTree2.levelOrderForEach(myTree2.callBack);
myTree2.preOrderForEach(myTree2.root); //postOrderForEach
myTree2.postOrderForEach(myTree2.root); //postOrderForEach
myTree2.inOrderForEach(myTree2.root); //postOrderForEach

// myTree2.del(3)
// myTree2.del(7)
// myTree2.del(6)
// myTree2.del(67);
// myTree2.del(2333);
// myTree2.del(90);
// myTree2.del(324);
myTree2.del(67);
// myTree2.del(23);
// myTree2.del(333);
// myTree2.del(4);
myTree2.del(23);
// myTree2.del(345);
myTree2.del(8000);
myTree2.del(7);

myTree2.del(6345);
myTree2.del(4);

console.log(prettyPrint(myTree2.root));
myTree2.levelOrderForEach();
