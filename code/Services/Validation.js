export const isValid = (checks) => {
  return checks.reduce((acc, check) => acc && check, true);
};

export const isProductValid = (productName) => {
  return isValid([
      productName.trim() !== '',
      productName.trim().toLowerCase() !== 'аксессуар',
  ]);
};

export const isColorValid = (colorName, product) => {
  return isValid([
      colorName.trim() !== '',
      colorName.trim().toLowerCase() !== 'цвет',
      isProductValid(product),
  ]);
};

export const isButtonValid = (colorName, productName, buttonValue) => {
  return isValid([
    isColorValid(colorName, productName),
    colorName.trim().toLowerCase() !== 'нет в наличии',
    buttonValue !== 'FALSE',
  ]);
};