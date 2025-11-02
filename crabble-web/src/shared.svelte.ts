export const swap = (array: Array<any>, indexA: number, indexB: number) => {
  let result = array;

  let indexAValue = array[indexA];
  let indexBValue = array[indexB];

  result[indexA] = indexBValue;
  result[indexB] = indexAValue;

  return result;
};
