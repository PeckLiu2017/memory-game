// 每一次将数组中的随机数与 array[currentIndex] 交换
array = [
  'fa fa-diamond','fa fa-paper-plane-o','fa fa-anchor','fa fa-bolt',
  'fa fa-cube','fa fa-anchor','fa fa-leaf','fa fa-bicycle',
  'fa fa-diamond','fa fa-bomb','fa fa-leaf','fa fa-bomb',
  'fa fa-bolt','fa fa-bicycle','fa fa-paper-plane-o','fa fa-cube'
]
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;
    console.log(currentIndex);
    console.log(array.length);
    console.log(temporaryValue);
    console.log(randomIndex);

  while (currentIndex !== 0) {
    console.log('first currentIndex---------');
    console.log(currentIndex);
    randomIndex = Math.floor(Math.random() * currentIndex);
    console.log('randomIndex----');
    console.log(randomIndex);
    currentIndex -= 1;
    console.log(currentIndex);
    temporaryValue = array[currentIndex];
    console.log('array[currentIndex]----');
    console.log(array[currentIndex]);
    console.log('temporaryValue----');
    console.log(temporaryValue);
    array[currentIndex] = array[randomIndex];
    console.log('array[randomIndex]----');
    console.log(array[randomIndex]);
    console.log('array[currentIndex]----');
    console.log(array[currentIndex]);
    array[randomIndex] = temporaryValue;
    console.log('temporaryValue----');
    console.log(temporaryValue);
    console.log('array[randomIndex]----');
    console.log(array[randomIndex]);
    console.log('array--------');
    console.log(array);
  }
  console.log(array);
  return array;
}
shuffle(array)

// console.log(Math.random());
