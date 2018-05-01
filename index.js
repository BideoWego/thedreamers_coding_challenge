const fs = require('fs');


// ----------------------------------------
// Number Permutations
// ----------------------------------------
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


// ----------------------------------------
// Operator Combinations
// ----------------------------------------
class CombinationsList {
  constructor(values, maxLength=null) {
    this.values = values;
    this.maxLength = maxLength || values.length;
    this.combinations = [];
  }

  build() {
    this._createCombinations();
  }

  _createCombinations(current=[]) {
    if (current.length >= this.maxLength) {
      return this.combinations.push(current);
    }

    for (let i = 0; i < this.values.length; i++) {
      const next = this.values[i];
      this._createCombinations([...current, next]);
    }
  }
}


// ----------------------------------------
// Expressions
// ----------------------------------------
class ExpressionsList {
  constructor(permutations, combinations) {
    this.permutations = permutations;
    this.combinations = combinations;
    this.expressions = [];
  }

  build() {
    const expressions = this._createExpressions();
  }

  _createExpressions() {
    for (let i = 0; i < this.permutations.length; i++) {
      const permutation = this.permutations[i];
      const variations = this._createVariations(permutation);
      const expressions = this._parenthesize(variations);
      const merged = this._mergeOperators(expressions);
      this.expressions.push(...merged);
    }
  }

  _createVariations(array) {
    const results = [];
    for (let size = 2; size < array.length; size++) {
      for (let  i = 0; i + size <= array.length; i++) {
        const sliced = array.slice();
        const chunk = sliced.slice(i, i + size);
        sliced.splice(i, size, chunk);
        results.push(sliced);

        if (sliced.length > 2) {
          results.push(...this._createVariations(sliced));
        }
      }
    }
    return results;
  }

  _parenthesize(array) {
    const results = {};
    for (let j = 0; j < array.length; j++) {
      const variation = array[j];
      const stringified = this._stringify(variation);
      results[stringified] = true;
    }
    return Object.keys(results);
  }

  _stringify(variation) {
    let str = '';
    for (let i = 0; i < variation.length; i++) {
      const item = variation[i];
      str += i === 0 ? '' : ',';

      if (Array.isArray(item)) {
        str += `(${ this._stringify(item) })`;
      } else {
        str += item;
      }
    }
    return str;
  }

  _mergeOperators(expressions) {
    const merged = [];
    for (let i = 0; i < this.combinations.length; i++) {
      for (let j = 0; j < expressions.length; j++) {
        const combination = this.combinations[i].slice();
        const expression = expressions[j];

        let str = expression
          .split('')
          .map(char => char === ',' ? combination.shift() : char)
          .join('');
        merged.push(str);
      }
    }
    return merged;
  }
}


// ----------------------------------------
// Config
// ----------------------------------------

const input = [1, 3, 4, 6];
const expected = 24;


// ----------------------------------------
// Run Script
// ----------------------------------------
console.log('Building data...');

const startTime = new Date().getTime();

const numberPermutationsList = new PermutationsList(input);
numberPermutationsList.build();


const operatorCombinationsList = new CombinationsList(
  ['+', '-', '/', '*'],
  input.length - 1
);
operatorCombinationsList.build();


const expressionsList = new ExpressionsList(
  numberPermutationsList.permutations,
  operatorCombinationsList.combinations
);
expressionsList.build();


const results = expressionsList.expressions.map(e => {
  return {
    expression: e,
    value: Function(`"use strict"; return ${ e };`)()
  };
});


const answers = [];
results.forEach((result, index) => {
  if (result.value === expected) {
    answers.push({ result, index });
  }
});

const endTime = new Date().getTime();
const time = (endTime - startTime) / results.length;


// ----------------------------------------
// Output
// ----------------------------------------
fs.writeFileSync('./public/data.json', JSON.stringify({
  input,
  expected,
  time,
  answers,
  results
}, null, 2));

console.log('Done.');
