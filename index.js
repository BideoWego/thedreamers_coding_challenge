const fs = require('fs');


class PermutationsList {
  constructor(values) {
    this.values = values;
    this.permutations = [];
  }

  build() {
    this.createPermutations(this.values);
    console.log(this.permutations);
  }

  createPermutations(rest=[], current=[]) {
    if (current.length === this.values.length) {
      return this.permutations.push(current);
    }

    for (let i = 0; i < rest.length; i++) {
      const next = rest[i];
      const copy = rest.slice();
      copy.splice(i, 1);
      this.createPermutations(copy, [...current, next]);
    }
  }
}


const numberPermutationsList = new PermutationsList([1, 3, 4, 6]);
numberPermutationsList.build();


const data = [];
fs.writeFileSync('./public/data.json', JSON.stringify(data, null, 2));
