
//file:///Users/eliaahadi/Downloads/higher-order-functions-workshop-master/SpecRunner.html?grep=Callback%20Exercises
// ===================== EACH =====================

// Call iterator(value, key, collection) for each element of collection.
// Accepts both arrays and objects.
//
// Note: each() does not have a return value, but rather simply runs the
// iterator function over each item in the input collection.

var each = function(collection, iterator) {

    if(Array.isArray(collection)) {
	    for (var i = 0; i < collection.length; i++){
	   		 num = collection[i];
	   		 iterator(num, i, collection);
		}
	}
	else if(typeof(collection) === "object") {
		for(var prop in collection){
		      iterator(collection[prop],prop, collection);
		 };
	}


};


var numbers = [1, 2, 3, 4, 5], sum = 0;
each(numbers, function(number) {
  sum += number;
});
console.log(sum);
// → 15

var animals = ['ant', 'bat', 'cat'];
var iterationInputs = [];
each(animals, function(animal, index, list) {
  iterationInputs.push([animal, index, list]);
  //console.log(iterationInputs);
});
/*
[
  ['ant', 0, animals],
  ['bat', 1, animals],
  ['cat', 2, animals]
]);
*/

console.log(iterationInputs);

var animals = { a: 'ant', b: 'bat', c: 'cat' };
var iterationInputs2 = [];
each(animals, function(animal, key, object) {
  iterationInputs2.push([animal, key, object]);
});

console.log(iterationInputs2);


// ===================== FILTER =====================

// Return all elements of an array that pass a truth test.

// Requirement: Implement your .each() function

var filter = function(collection, test) {

  var filteredArray = [];
  for (var i = 0; i < collection.length; i++) {
    if (test(collection[i])) filteredArray.push(collection[i]);
  }
  return filteredArray;

};


function isEven(num) {
  return num % 2 === 0;
}

var arr = [1, 2, 3, 4, 5];

console.log(filter(arr, isEven));
//OUTPUT: [2,4]

console.log(
  filter(arr, function(num) {
    return !isEven(num);
  })
); //[ 1, 3, 5 ]

// ===================== MAP =====================

// Return the results of applying an iterator to each element.

// map() is a useful primitive iteration function that works a lot
// like each(), but in addition to running the operation on all
// the members, it also maintains an array of results.

// Requirement: Implement your .each() function

var map = function(collection, iterator) {

  var mappedArr = [];

  for (var i = 0; i < collection.length; i++) {
    mappedArr.push(iterator(collection[i], i));
  }
  return mappedArr;

};

//test
var arr = [1, 2, 3];

function double(num) {
  return num * 2;
}

console.log(map(arr, double));
//[2, 4, 6]

// ===================== REDUCE =====================

// Reduces an array or object to a single value by repetitively calling
// iterator(accumulator, item) for each item. accumulator should be
// the return value of the previous iterator call.
//
// You can pass in a starting value for the accumulator as the third argument
// to reduce(). If no starting value is passed, the first element is used as
// the accumulator, and is never passed to the iterator. In other words, in
// the case where a starting value is not passed, the iterator is not invoked
// until the second element, with the first element as it's second argument.
//
// Example:
//   var numbers = [1,2,3];
//   var sum = reduce(numbers, function(total, number){
//     return total + number;
//   }, 0); // should be 6
//
//   var identity = reduce([5], function(total, number){
//     return total + number * number;
//   }); // should be 5, regardless of the iterator function passed in
//          No accumulator is given so the first element is used.

// Requirement: Implement your .each() function

// var reduce = function(collection, iterator, accumulator) {
  
// accumulator=0;
// //iterator.length = 0;
//     var current = accumulator;
//   for (var i = 0; i < collection.length; i++){
  
//    	if(iterator == NaN){
//    	  console.log(current,collection[0]);
//   		 current = collection[0];
//   	}
  	
//   	else{} if(current!==0){
//     current = iterator(current, collection[i]);
//     console.log(current);
//   	}
//   	else{
//   	  //current =0;
//   	  current++;
//   	}
//   }
    
//   return current;
  
// };

var reduce = function(collection, iterator, accumulator) {
  var current = accumulator;
  var i = 0;
  if (arguments.length < 2) {
    while (collection[i] === undefined) {
      i ++;
      if (collection.length >= i) {
        throw new Error('Empty array with no initial value');
      }
    }
    current = collection[i];
  }

  for (; i < collection.length; ++ i) {
    if (collection[i] === undefined) continue;
    if (current !== undefined) {
      current = iterator(current, collection[i]);
    } else {
      current=collection[i]; 
    }
  }
  return current;
}



var add2 = function(a, b) {
  return a + b;
};

console.log(reduce([1, 2, 3, 4], add2));

console.log(reduce([1, 2, 3, 4], 
function(a, b) {
  return a + b;
}, 0));
//10

var add = function(tally, item) {return tally + item; };
var total = reduce([1, 2, 3], add);

//console.log(total);
//console.log(reduce([1, 2, 3], add));



var sumSquares = function(tally, item) {return tally + item * item; };
var total2 = reduce([2, 3], sumSquares,0);

var total3 = reduce([2, 3], sumSquares);

console.log("total2 is 10 and output is " + total2);  //13 should be 10, should invoke the iterator on the first element when given an accumulator

