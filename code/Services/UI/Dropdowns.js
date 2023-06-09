const setDropdown = (color, rule, cell, value = null) => {
  if(value) cell.setValue(value);

  cell.setDataValidation(rule);
  cell.setBackground(color);
};

export const successDropdown = (values, cell, initial) => {
  if(values.length > 1) {
    const rule = SpreadsheetApp
      .newDataValidation()
      .requireValueInList(
        values
      )
      .build();

    setDropdown('lime', rule, cell, initial);

    return 'multiple';
  }

  setDropdown('white', null, cell, values[0]);

  return 'single';
};

export const unsuccessDropdown = (value, cell) => {
  setDropdown('red', null, cell, value);
};