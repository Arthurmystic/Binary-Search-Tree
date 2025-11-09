// index.js

const createNode = (data = null, left = null, right = null) => {
  return { data, left, right };
};

const tree = (arr) => {
  let root = buildTree(arr);

  const isLeaf = (node) => node && !node.left && !node.right;

  const insert = (val, arrRoot = root) => {
    if (!arrRoot) return createNode(val);
    if (val < arrRoot.data) arrRoot.left = insert(val, arrRoot.left);
    if (val > arrRoot.data) arrRoot.right = insert(val, arrRoot.right);
    return arrRoot;
  };

  // returns node with the given value
  const find = (val, arrRoot = root) => {
    if (!arrRoot) return null;
    if (val < arrRoot.data) return find(val, arrRoot.left);
    if (val > arrRoot.data) return find(val, arrRoot.right);
    return arrRoot;
  };

  const depth = (val, arrRoot = root) => {
    if (!arrRoot) return null;
    if (val < arrRoot.data) {
      let leftAns = depth(val, arrRoot.left);
      return leftAns === null ? null : leftAns + 1;
    }
    if (val > arrRoot.data) {
      let rightAns = depth(val, arrRoot.right);
      return rightAns === null ? null : rightAns + 1;
    }
    return 0;
  };

  function computeHeight(node) {
    if (!node) return 0;
    if (isLeaf(node)) return 0;
    return 1 + Math.max(computeHeight(node.left), computeHeight(node.right));
  }

  const height = (val, arrRoot = root) => {
    const node = find(val, arrRoot);
    if (!node) return null;
    return computeHeight(node);
  };

  // const isNodeBalanced = (node) => {
  //   return Math.abs(computeHeight(node.left) - computeHeight(node.right)) > 1
  //     ? false
  //     : true;
  // };

  const isNodeBalanced = (node) =>
    Math.abs(computeHeight(node.left) - computeHeight(node.right)) <= 1;

  function isBalanced(node = root) {
    if (!node) return true; // treat null returns as balanced ;
    if (!isNodeBalanced(node)) {
      console.log("❌ Node NOT balanced");
      return false;
    }
    const areSubTreesBalanced = isBalanced(node.right) && isBalanced(node.left); // check if left and right subtrees are balanced
    return areSubTreesBalanced ? true : false;
  }

  function levelOrderForEach(callback, arrRoot = root) {
    try {
      if (typeof callback !== "function")
        throw new Error(
          "Invalid callback: expected a function but received " +
            typeof callback +
            "."
        );

      const queue = [arrRoot];
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
    // if (queue.length == 0) return finalArr; // add this and #out the 2 lines below if recursion version is to be used
    const removedItem = queue.shift();
    finalArr.push(removedItem.data);

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

  function rebalance() {
    root = buildTree(preOrderForEach(root)); // using preorder for traversal but can use any of the others
  }

  const del = (val, arrRoot = root) => {
    if (!arrRoot) return null;
    let rootSide;

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
    get root() {
      return root;
    }, // using getter so as to use the dynamic/updated value of root externally too
    insert,
    del,
    find,
    levelOrderForEach,
    callBack,
    preOrderForEach,
    inOrderForEach,
    postOrderForEach,
    height,
    depth,
    isBalanced,
    rebalance,
  };
};

const buildTree = (arr) => {
  if (arr.length === 0) return null;
  const sortedArr = arr
    .filter((x, i) => arr.indexOf(x) === i) // const sortedArr = [...new Set(arr)].sort((a,b)=>a-b); new set auto removes dups ... changes it back to array
    .sort((a, b) => a - b);

  const mid = Math.floor(sortedArr.length / 2);
  let root = sortedArr[mid];
  const node = createNode(root);
  node.left = buildTree(sortedArr.slice(0, mid));
  node.right = buildTree(sortedArr.slice(mid + 1));
  return node;
};

export { tree };
