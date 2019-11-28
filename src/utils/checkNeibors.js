// /////// 10000 10x10 - 2700-2900ms

export default function checkNeibors(field) {
  const nextGeneration = field.slice();
  field.forEach((el, rowIndex) => {
    const targetRow = el.slice();
    el.forEach((cell, colIndex) => {
      const neibors = getNeibors(rowIndex, colIndex, field);
      if (neibors.length < 2 || neibors.length > 3) {
        targetRow[colIndex] = 0;
      } else if (neibors.length === 3) {
        targetRow[colIndex] = 1;
      } else {
        targetRow[colIndex] = cell;
      }
    })
    nextGeneration[rowIndex] = targetRow;
  });
  return nextGeneration;
}



function getNeibors(rowIndex, colIndex, field) {
  const neibors = [];
  const rightBorder = field[0].length - 1;
  const bottomBorder = field.length - 1;
  const top = rowIndex === 0 ? bottomBorder : rowIndex - 1;
  const bottom = rowIndex === bottomBorder ? 0 : rowIndex + 1;
  const left = colIndex === 0 ? rightBorder : colIndex - 1;
  const right = colIndex === rightBorder ? 0 : colIndex + 1;
 
  const topLine = field[top];
  const middleLine = field[rowIndex];
  const bottomLine = field[bottom];
  neibors.push(topLine[left], topLine[colIndex], topLine[right],
              middleLine[left], middleLine[right], 
              bottomLine[left], bottomLine[colIndex], bottomLine[right]);

  return neibors.filter(el => !!el);
}
