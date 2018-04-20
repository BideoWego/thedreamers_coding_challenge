# thedreamers_coding_challenge

Find operations to get a number, `result`, from list of `n` numbers using `+`, `-`, `/`, `*`.


## Brute Force Approach

Find the number of permutations of `n`. Find the number of permutations of the operators. Shuffle the list until all possibilities are counted. For each permutation, perform all permutations of the given operators. Record the results in a memo object.


## Tree Approach

Create a tree with root node value `0`. Each level of children will each have a unique value from `n`. Each level will have a value and an operator. The first level of children **must** have an operator of `+`. Each next level will account for each of the permutations of `n` combined with an operator until all combined permutations are satisfied.
