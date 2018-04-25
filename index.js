const fs = require('fs');


class PermutationsList {
  constructor(values) {
    this.values = values;
    this.permutations = [];
  }

  build() {
    this._createPermutations(this.values);
  }

  _createPermutations(rest=[], current=[]) {
    if (current.length === this.values.length) {
      return this.permutations.push(current);
    }

    for (let i = 0; i < rest.length; i++) {
      const next = rest[i];
      const copy = rest.slice();
      copy.splice(i, 1);
      this._createPermutations(copy, [...current, next]);
    }
  }
}


class CombinationsList {
  constructor(values, maxLength=null) {
    this.values = values;
    this.maxLength = maxLength || values.length;
    this.combinations = [];
  }

  build() {
    this._createCombinations(this.values);
    this.combinations.forEach(c => console.log(c));
    console.log(this.combinations.length);
  }

  _createCombinations(rest=[], current=[]) {
    if (current.length === this.maxLength) {
      return this.combinations.push(current);
    }

    for (let i = 0; i < rest.length; i++) {
      const next = rest[i];
      for (let j = 1; j <= rest.length; j++) {
        const filled = Array(this.maxLength).fill(next, 0, 0 + j);
        console.log(filled);
      }
    }
  }
}


const numberPermutationsList = new PermutationsList([1, 3, 4, 6]);
numberPermutationsList.build();


const operatorCombinationsList = new CombinationsList(['+', '-', '/', '*']);
operatorCombinationsList.build();


const data = [];
fs.writeFileSync('./public/data.json', JSON.stringify(data, null, 2));
