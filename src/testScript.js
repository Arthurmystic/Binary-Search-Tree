// testScript.js

import { tree } from "./index.js";
import { prettyPrint } from "./prettyPrint.js";

// Sample arrays
const arr1 = [500, 10, 20, 30, 100, 40];
const arr2 = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const arr3 = [10, 20, 30, 40, 50, 60]; // optional second tree

// Create trees
const myTree = tree(arr2);
const myTree2 = tree(arr3);

console.log("Initial tree:");
console.log(prettyPrint(myTree.root));

// -------------------
// INSERT TESTS
// -------------------
console.log("\nInserting values...");
[
  67, 34, 90, 36, 30, 7.5, 6, 4.5, 2, 7000, 8000, 9000, 7500, 400, 295, 298,
  40000022, 90000022, 0.1,
].forEach((val) => myTree.insert(val));

console.log("Tree after inserts:");
console.log(prettyPrint(myTree.root));

// -------------------
// DELETE TESTS
// -------------------
console.log("\nDeleting values...");
[30, 23, 8000, 7, 6345, 4, 298].forEach((val) => myTree.del(val));

console.log("Tree after deletes:");
console.log(prettyPrint(myTree.root));

// -------------------
// REINSERT deleted values
// -------------------
console.log("\nReinserting deleted values...");
[30, 23, 8000, 7, 6345, 4, 298].forEach((val) => myTree.insert(val));
console.log("Tree after re-inserts:");
console.log(prettyPrint(myTree.root));

// -------------------
// HEIGHT & DEPTH TESTS
// -------------------
console.log("\nHeight & Depth checks:");
console.log("Height of 67:", myTree.height(67));
console.log("Depth of 298:", myTree.depth(298));
console.log("Depth of 11111 - nonexistent:", myTree.depth(11111));

// simple helper
const logBalanceStatus = (tree) =>
  tree.isBalanced()
    ? console.log("--- ✅ Root and Subtrees are balanced ---")
    : console.log("❌ TREE NOT balanced");
//

// -------------------
// BALANCE CHECK
// -------------------
console.log("\nBalance check before rebalance:");
myTree.isBalanced();
logBalanceStatus(myTree);

// -------------------
// TRAVERSAL TESTS
// -------------------
console.log("\nTraversals:");
console.log("Level Order:", myTree.levelOrderForEach(myTree.callBack));
console.log("Preorder:", myTree.preOrderForEach(myTree.root));
console.log("Inorder:", myTree.inOrderForEach(myTree.root));
console.log("Postorder:", myTree.postOrderForEach(myTree.root));

// -------------------
// REBALANCE TEST
// -------------------
console.log("\nRebalancing tree...");
myTree.rebalance();

console.log("Balance check after rebalance:");
myTree.isBalanced();

console.log("Tree after rebalance:");
console.log(prettyPrint(myTree.root));
logBalanceStatus(myTree);

// -------------------
// FINAL TRAVERSALS
// -------------------
console.log("\nTraversals after rebalance:");
console.log("Level Order:", myTree.levelOrderForEach(myTree.callBack));
console.log("Preorder:", myTree.preOrderForEach(myTree.root));
console.log("Inorder:", myTree.inOrderForEach(myTree.root));
console.log("Postorder:", myTree.postOrderForEach(myTree.root));
