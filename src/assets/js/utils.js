export function makeArray (cnt) {
  if (!cnt) return;
  let array = new Array(parseInt(cnt));
  let i = 0;
  while (i < array.length) array[i] = i++;
  return array;
}

export function changeItem (a, x, y) {
  let newArray = a.slice();
  let temp = newArray[x];
  newArray[x] = newArray[y];
  newArray[y] = temp;
  return newArray;
}

export function shuffle (a) {
  let newArray = a.slice();
  let result = new Array();
  let length = a.length;
  while (length) {
    let index = getRandomInt(0, length);
    result.push(newArray[index]);
    newArray.splice(index, 1);
    length--;
  }
  return result;
}

export function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
