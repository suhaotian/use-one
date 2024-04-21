export function replaceItemAtIndex(arr: any[], id, newValue) {
  const index = arr.findIndex(listItem => listItem.id === id);
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

export function removeItemAtIndex(arr: any[], id) {
  const index = arr.findIndex(listItem => listItem.id === id);
  const newArr = [...arr.slice(0, index), ...arr.slice(index + 1)];
  return newArr;
}

// utility for creating unique Id
let id = 0;
export function getId() {
  return ++id;
}
export function setId(result: number) {
  id = result;
}
