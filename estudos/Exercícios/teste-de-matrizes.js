/*Matriz (que é um array que recebe arrays)*/
let array1 = [
  ["Banana", 100],
  ["Macaco", 10],
  ["Pessoas", 3]
];

console.log(array1);
console.log(array1[0]);

let array2 = [];
array2 = array1[0].concat(array1[1].concat(array1[2]));

console.log(array2);

let objeto1 = {
  Banana: 100,
  Macaco: 10,
  Pessoas: 3
};

console.log(objeto1);