import { 
  sheets, 
  spreadsheet,
  COLORS_TOTAL,
  COLOR_NAMES,
  COLOR_START_POS,
} from "../Global.js";

import { compareStrings } from './Util.js';

export const getOrdersCoords = (rowIndex, ...requiredCoords) => {
  const sheet = sheets['Заказы'];
  const coords = {};

  requiredCoords.forEach(name => {
    switch (name) {
      case 'info':
        coords.info = sheet.getRange(rowIndex, 7);
        break;
      case 'product':
        coords.product = sheet.getRange(rowIndex, 9);
        break;
      case 'color':
        coords.color = sheet.getRange(rowIndex, 10);
        break;
      case 'apply':
        coords.apply = sheet.getRange(rowIndex, 11);
        break;
      default: break;
    }
  });

  return coords;
};

export const getColorAmountCell = (rowIndex, sheet, colorName) => {
  let amountCell = null;

  switch (colorName) {
    case 'Золото':
      amountCell = sheet.getRange(rowIndex, 3);
      break;
    case 'Серебро':
      amountCell = sheet.getRange(rowIndex, 4);
      break;
    case 'Розовый':
      amountCell = sheet.getRange(rowIndex, 5);
      break;
    default: break;
  }

  return amountCell;
};

export const getCategory = (productName) => {
  const row = sheets['Фактически в наличии']
    .getRange("A2:B")
    .getValues()
    .find(([name]) => compareStrings(productName, name));

  return row[1].trim();
};

export const getColors = (productName, category) => {
  let colors = [];
  
  const row = spreadsheet
    .getSheetByName(category)
    .getRange("B3:E")
    .getValues()
    .find(([name]) => compareStrings(productName, name));

  row.slice(COLOR_START_POS, COLOR_START_POS + COLORS_TOTAL)
    .forEach((amount, index) => {
      if (amount > 0) colors.push(COLOR_NAMES[index]);
    });

  if (!colors.length) throw new Error('Нет в наличии');

  return colors;
};

export const getTotalAmount = (sheet, row) => {
  return sheet.getRange(row, 6).getValue();
};

export const decreaseProductAmount = (productName, colorName, category) => {
  const categorySheet = spreadsheet.getSheetByName(category);

  const rowIndex = categorySheet
    .getRange("B3:B")
    .getValues()
    .findIndex(([name]) => compareStrings(name, productName)) + 3;

  const amountCell = getColorAmountCell(rowIndex, categorySheet, colorName);
  const amount = amountCell.getValue();

  amountCell.setValue(amount - 1);

  const totalAmount = getTotalAmount(categorySheet, amountCell.getRow());
  
  if (totalAmount <= 0) deleteProduct(productName);
};

export const deleteProduct = (productName) => {
  const rowIndex = sheets['Фактически в наличии']
    .getRange('A2:A')
    .getValues()
    .findIndex(([name]) => {
      return compareStrings(name, productName)
    }) + 2;

  sheets['Фактически в наличии'].deleteRow(rowIndex);
};

export const writeToOrderInfo = (infoCell, text) => {
  const oldValue = infoCell.getValue();

  infoCell.setValue(text + oldValue);
};

export const writeToSoldSheet = (text) => {
  const soldSheet = spreadsheet.getSheetByName('Продано');
  const soldSheetLeng = soldSheet.getRange('A1:A').getValues().filter(String).length;
  const lastCell = soldSheet.getRange(soldSheetLeng + 1, 1);

  lastCell.setValue(text);
};

export const writeProductReport = (infoCell, productName, colorName) => {
  const text = `${productName} ${colorName.toUpperCase()} \n`;

  writeToOrderInfo(infoCell, text);
  writeToSoldSheet(text);
};