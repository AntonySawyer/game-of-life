export default function checkNeibors(field, subFieldCache) {
  const nextGeneration = field.slice();
  const lastRowIndex = field.length-1;
  let newCache;

  field.forEach((row, rowIndex, field) => {
    let firstRow = rowIndex === 0 ? field[lastRowIndex] : field[rowIndex-1];
    let thirdRow = rowIndex === lastRowIndex ? field[0] : field[rowIndex+1];
    const next = getNewRow([firstRow, row, thirdRow], subFieldCache);
    nextGeneration[rowIndex] = next[0];
    newCache = next[1];
  });

  return [nextGeneration, newCache];
}

function getNewRow(subField, subFieldCache) {
  const newCache = subFieldCache;
  const key = subField.join('');
  const newRow = [];
  if (key in newCache) {
    return [newCache[key], newCache];
  } else {
    subField[1].forEach((cell, cellIndex) => {
      const neiborsCount = getNeibors(cell, cellIndex, subField);
      newRow.push(resolver(neiborsCount, cell));
      newCache[key] = newRow;
  });
  }
  return [newRow, newCache];
}

function getNeibors(cell, cellIndex, subField) {
  const neibors = [];
  const left = cellIndex === 0 ? subField[0].length-1 : cellIndex - 1;
  const right = cellIndex === subField[0].length-1 ? 0 : cellIndex + 1;
 
  neibors.push(subField[0][left], subField[0][cellIndex], subField[0][right],
              subField[1][left], subField[1][right], 
              subField[2][left], subField[2][cellIndex], subField[2][right]);

  return neibors.filter(el => !!el).length;
}

function resolver(neiborsCount, cell) {
  if (neiborsCount < 2 || neiborsCount > 3) {
    return 0;
  } else if (neiborsCount === 3) {
    return 1;
  } else {
    return cell;
  }
}
