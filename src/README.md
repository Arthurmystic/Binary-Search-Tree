_Binary Search Tree (BST) Project_

_*Logic is contained in index.js*_

A fully-featured Binary Search Tree implementation in JavaScript, including insertion, deletion, searching, traversals, height/depth utilities, balance checking, and rebalancing.
A separate testScript.js file is used to run demonstrations and validate functionality.

_isBalanced()_
Checks if the entire tree (root + all subtrees) is height-balanced.

_rebalance()_
Rebuilds the tree using a traversal (default: preorder) to produce a balanced BST.

_Tree Visualization_
_prettyPrint(node)_
Prints the tree structure in a human-readable rotated format.

All testing and demonstrations are separated into testScript.js

📁 Project Structure
/project
│── index.js # BST implementation
│── prettyPrint.js # Visual tree printer
│── testScript.js # Automated test runner / sandbox
│── README.md # Project documentation (this file)

_🧠 Special points to note_
_Root Handling_
The tree maintains an internal root variable.
A getter:
get root() { return root; }
ensures that external files always see the updated value, even after deletions or rebalancing.

_Balanced Tree Logic_
A node is balanced if: |height(left subtree) – height(right subtree)| <= 1
The entire tree is balanced if: The root is balanced & The left subtree is balanced & The right subtree is balanced

_Rebalancing_
Rebalances by rebuilding the tree from a traversal: root = buildTree(preOrderForEach(root));
Any traversal order could be swapped in.

_*▶️ How to Run Tests*_

Just execute: node testScript.js

_📌 Example Output Snippets_
Pretty-printed tree:
│ ┌── 900
│ ┌── 67
└── 23
│ ┌── 8
└── 7

Traversals:
Preorder: [23, 7, 3, 8, 67, 34, 90]
Inorder: [3, 7, 8, 23, 34, 67, 90]
Postorder: [...]

Balance check:
❌ TREE NOT balanced
--- Rebalancing ---
✅ Balanced!

_*SPecial Notes*_

- The tree automatically keeps its root updated, including after deletions and rebalancing.
- All traversal methods use the spread operator (...) to return flat arrays rather than nested ones.
- The deletion logic is optimized and tested for all BST deletion scenarios.
- testScript.js provides a full demonstration and can be extended with your own tests easily.

_*License*_
This project is free for personal or educational use.
