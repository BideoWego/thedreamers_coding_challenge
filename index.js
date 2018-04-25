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


class ExpressionsList {
  constructor(permutations, combinations) {
    this.permutations = permutations;
    this.combinations = combinations;
    this.expressions = [];
  }

  build() {
    this._createExpressions();
    console.log(this.expressions.length);
  }

  _createExpressions() {
    for (let i = 0; i < this.permutations.length; i++) {
      const permutation = this.permutations[i];
      for (let j = 0; j < this.combinations.length; j++) {
        const combination = this.combinations[j];
        this._createExpression(permutation, combination);
      }
    }
  }

  _createExpression(values, operators) {
    const expression = values.slice();
    for (let i = 0, j = 1; i < operators.length; i++,j += 2) {
      const operator = operators[i];
      expression.splice(j, 0, operator);
    }
    this.expressions.push(expression);
  }
}


const numberPermutationsList = new PermutationsList([1, 3, 4, 6]);
numberPermutationsList.build();


const operatorCombinationsList = new CombinationsList(['+', '-', '/', '*'], 3);
operatorCombinationsList.build();


const expressionsList = new ExpressionsList(
  numberPermutationsList.permutations,
  operatorCombinationsList.combinations
);
expressionsList.build();


const data = [];
fs.writeFileSync('./public/data.json', JSON.stringify(data, null, 2));
