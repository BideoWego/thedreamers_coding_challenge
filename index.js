
function shuffle(array) {
  let shuffledIndex = 0;

  for (let i = 0; i < array.length; i++) {
    const rand = Math.floor(Math.random() * array.length) - shuffledIndex;
    [
      array[shuffledIndex],
      array[shuffledIndex + rand]
    ] = [
      array[shuffledIndex + rand],
      array[shuffledIndex]
    ]
    shuffledIndex++;
  }

  return array;
}


function createOperationPath(...args) {

}


function findOperationPaths(n=[1, 3, 4, 6], answer=24) {
  // For each number
  // start a tree where each other number
  // has one of + - / *
  // on each of the other numbers
  // when no more numbers are available
  // return result

  // Compute the number of permutations
  // Continue until memo has keys of that length
  // For each perm check if memo has that key
  // If not perform operations

  const numPerms = 4 * 3 * 2;
  const memo = {};

  for (let i = 0; i < numPerms; i++) {
    const shuffled = shuffle(n);
    const key = shuffled.join('');
    if (!memo[key]) {
      // perform operations
      // {
      //   "13476": {
      //     "1+3+4+6": 14,
      //     //...
      //   }
      // }

      const [a, b, c, d] = shuffled;
      memo[key] = {

        // Addition
        [`${ a }+${ b }+${ c }+${ d }`]: a + b + c + d,

        [`${ a }+${ b }+${ c }-${ d }`]: a + b + c - d,
        [`${ a }+${ b }-${ c }-${ d }`]: a + b - c - d,

        [`${ a }+${ b }+${ c }/${ d }`]: a + b + c / d,
        [`(${ a }+${ b }+${ c })/${ d }`]: (a + b + c) / d,

        [`${ a }+${ b }/${ c }/${ d }`]: a + b / c / d,
        [`(${ a }+${ b })/${ c }/${ d }`]: (a + b) / c / d,

        [`${ a }+${ b }+${ c }*${ d }`]: a + b + c * d,
        [`(${ a }+${ b }+${ c })*${ d }`]: (a + b + c) * d,

        [`${ a }+${ b }*${ c }*${ d }`]: a + b * c * d,
        [`(${ a }+${ b })*${ c }*${ d }`]: (a + b) * c * d,


        // Subtraction
        [`${ a }-${ b }-${ c }-${ d }`]: a - b - c - d,

        [`${ a }-${ b }-${ c }+${ d }`]: a - b - c + d,
        [`${ a }-${ b }+${ c }+${ d }`]: a - b + c + d,

        [`${ a }-${ b }-${ c }/${ d }`]: a - b - c / d,
        [`(${ a }-${ b }-${ c })/${ d }`]: (a - b - c) / d,

        [`${ a }-${ b }/${ c }/${ d }`]: a - b / c / d,
        [`(${ a }-${ b })/${ c }/${ d }`]: (a - b) / c / d,

        [`${ a }-${ b }-${ c }*${ d }`]: a - b - c * d,
        [`(${ a }-${ b }-${ c })*${ d }`]: (a - b - c) * d,

        [`${ a }-${ b }*${ c }*${ d }`]: a - b * c * d,
        [`(${ a }-${ b })*${ c }*${ d }`]: (a - b) * c * d,


        // Division
        [`${ a }/${ b }/${ c }/${ d }`]: a / b / c / d,

        [`${ a }/${ b }/${ c }-${ d }`]: a / b / c - d,
        [`${ a }/${ b }/(${ c }-${ d })`]: a / b / (c - d),

        [`${ a }/${ b }-${ c }-${ d }`]: a / b - c - d,
        [`${ a }/(${ b }-${ c }-${ d })`]: a / (b - c - d),

        [`${ a }/${ b }/${ c }+${ d }`]: a / b / c + d,
        [`${ a }/${ b }/(${ c }+${ d })`]: a / b / (c + d),

        [`${ a }/${ b }+${ c }+${ d }`]: a / b + c + d,
        [`${ a }/(${ b }+${ c }+${ d })`]: a / (b + c + d),

        [`${ a }/${ b }/${ c }*${ d }`]: a / b / c * d,
        [`(${ a }/${ b }/${ c })*${ d }`]: (a / b / c) * d,

        [`${ a }/${ b }*${ c }*${ d }`]: a / b * c * d,
        [`(${ a }/${ b })*${ c }*${ d }`]: (a / b) * c * d,


        // Multiplication
        [`${ a }*${ b }*${ c }*${ d }`]: a * b * c * d,

        [`${ a }*${ b }*${ c }-${ d }`]: a * b * c - d,
        [`${ a }*${ b }*(${ c }-${ d })`]: a * b * (c - d),

        [`${ a }*${ b }-${ c }-${ d }`]: a * b - c - d,
        [`${ a }*(${ b }-${ c }-${ d })`]: a * (b - c - d),

        [`${ a }*${ b }*${ c }/${ d }`]: a * b * c / d,
        [`${ a }*${ b }*(${ c }/${ d })`]: a * b * (c / d),

        [`${ a }*${ b }/${ c }/${ d }`]: a * b / c / d,
        [`${ a }*(${ b }/${ c }/${ d })`]: a * (b / c / d),

        [`${ a }*${ b }*${ c }+${ d }`]: a * b * c + d,
        [`${ a }*${ b }*(${ c }+${ d })`]: a * b * (c + d),

        [`${ a }*${ b }+${ c }+${ d }`]: a * b + c + d,
        [`${ a }*(${ b }+${ c }+${ d })`]: a * (b + c + d)
      }
    } else {
      i--;
    }
  }

  return memo;
}

const paths = findOperationPaths();
console.log(paths);
console.log(Object.keys(paths).length);
