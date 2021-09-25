//@ts-nocheck

export const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
export const sheets = {
  'Заказы': spreadsheet.getSheetByName('Заказы'),
  'Фактически в наличии': spreadsheet.getSheetByName('Фактически в наличии'),
};
export const COLOR_START_POS = 1;
export const COLOR_NAMES = ['Золото', 'Серебро', 'Розовый'];
export const COLORS_TOTAL = COLOR_NAMES.length;