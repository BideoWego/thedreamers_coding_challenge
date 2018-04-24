const fs = require('fs');

const data = [];


class Node {
  constructor(value=null, parent=null, children=[]) {
    this.value = value;
    this.parent = parent;
    this.children = children;
    this.depth = parent ? parent.depth + 1 : 0;
  }
}


class PermutationTree {
  constructor(values) {
    this.values = values;
    this.root = new Node();
    this.numPerms = 0;
    this.permutations = [];
  }

  build() {
    this.createPermutations(this.values);
  }

  addPermutation(nums) {
    this.permutations.push(nums);
    console.log(this.permutations, this.permutations.length);
  }

  createPermutations(rest=[], current=[]) {
    if (current.length === this.values.length) {
      return this.addPermutation(current);
    }

    for (let i = 0; i < rest.length; i++) {
      const next = rest[i];
      const copy = rest.slice();
      copy.splice(i, 1);
      this.createPermutations(copy, [...current, next]);
    }
  }
}


const permTree = new PermutationTree([1, 3, 4, 6]);
permTree.build();


fs.writeFileSync('./public/data.json', JSON.stringify(data, null, 2));
