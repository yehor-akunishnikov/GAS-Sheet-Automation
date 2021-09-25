import { setApplyReady } from "./applyBtn.js";
import { successDropdown, unsuccessDropdown } from "./Dropdowns.js";
import { clearApply } from "./reset.js";

export const paintColorDropdown = (colorCell, color) => {
  colorCell.setBackground(color);
};

export const setColorsDropdownPending = (colorCell) => {
  paintColorDropdown(colorCell, 'yellow');
};

export const applyColor = (colorCell, btnCell) => {
  paintColorDropdown(colorCell, 'white');
  setApplyReady(btnCell);
};

export const successColorDropdown = (values, colorCell, btnCell) => {
  const type = successDropdown(values, colorCell, 'Цвет');

  switch(type) {
    case 'single':
      applyColor(colorCell, btnCell);
      break;

   case 'multiple':
      clearApply(btnCell);
      break;
  }
};

export const unsuccessColorDropdown = (colorCell, btnCell) => {
  unsuccessDropdown('Нет в наличии', colorCell);
  clearApply(btnCell);
};