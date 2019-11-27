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
  const topIndex = rowIndex === 0 ? bottomBorder : rowIndex - 1;
  const bottomIndex = rowIndex === bottomBorder ? 0 : rowIndex + 1;
  const leftIndex = colIndex === 0 ? rightBorder : colIndex - 1;
  const rightIndex = colIndex === rightBorder ? 0 : colIndex + 1;
 
  neibors.push(field[rowIndex][leftIndex]);
  neibors.push(field[rowIndex][rightIndex]);

  neibors.push(field[topIndex][colIndex]);
  neibors.push(field[topIndex][leftIndex]);
  neibors.push(field[topIndex][rightIndex]);

  neibors.push(field[bottomIndex][colIndex]);
  neibors.push(field[bottomIndex][leftIndex]);
  neibors.push(field[bottomIndex][rightIndex]);

  return neibors.filter(el => !!el);
}
