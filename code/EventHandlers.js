import { event } from './Events.js';

import { 
  decreaseProductAmount, 
  getCategory, 
  getColors, 
  getOrdersCoords, 
  writeProductReport
} from './Services/Main.js';

import { setApplyPending } from './Services/UI/applyBtn.js';

import { 
  applyColor, 
  setColorsDropdownPending, 
  successColorDropdown, 
  unsuccessColorDropdown 
} from './Services/UI/ColorDropdown.js';
import { clearApply, resetSelection } from './Services/UI/reset.js';

import { isButtonValid, isColorValid, isProductValid } from './Services/Validation.js';


export const onProductDropdown = () => {
  if(!isProductValid(event.value)) return false;

  const [ rowIndex ] = event.coords;
  const { 
    color: colorCell,
    apply: btnCell,
  } = getOrdersCoords(rowIndex, 'color', 'apply');

  setColorsDropdownPending(colorCell);
  clearApply(btnCell);

  try {
    const productName = event.value.trim();
    const category = getCategory(productName).trim();
    const colors = getColors(productName, category);

    successColorDropdown(colors, colorCell, btnCell);

  } catch(err) {
    unsuccessColorDropdown(colorCell, btnCell);
  }
}

export const onColorDropdown = () => {
  const [ rowIndex ] = event.coords;
  const { 
    product: productCell,
    apply: btnCell,
  } = getOrdersCoords(rowIndex, 'apply', 'product');

  clearApply(btnCell);

  const isValid = isColorValid(
    event.value, 
    productCell.getValue()
  );

  if(!isValid) return false;

  applyColor(event.range, btnCell);
};

export const onApplyClick = () => {
  setApplyPending(event.range);
  
  const [ rowIndex ] = event.coords;
  const { 
    color: colorCell, 
    product: productCell,
    info: infoCell,
  } = getOrdersCoords(rowIndex, 'color', 'product', 'info');
  
  const colorName = colorCell.getValue();
  const productName = productCell.getValue();

  if(!isButtonValid(colorName, productName, event.value)) {
    resetSelection(
      productCell,
      colorCell,
      event.range,
    );
    return false
  }
  
  const category = getCategory(productName);

  decreaseProductAmount(productName, colorName, category);
  writeProductReport(infoCell, productName, colorName);
  resetSelection(
    productCell,
    colorCell,
    event.range,
  );
};