import { paintApplyButton } from "./applyBtn";

export const clearApply = (btnCell) => {
  paintApplyButton(btnCell, 'white');
  btnCell.setValue('FALSE');
};

export const clearProduct = (productCell) => {
  productCell.setValue('Аксессуар');
  productCell.setBackground('white');
};

export const clearColor = (colorCell) => {
  colorCell.setValue('Цвет');
  colorCell.setBackground('white');
  colorCell.setDataValidation(null);
};

export const resetSelection = (product, color, apply) => {

  clearApply(apply);
  clearProduct(product);
  clearColor(color);
};