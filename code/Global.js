export const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
export const sheets = {
  'Заказы': spreadsheet.getSheetByName('Заказы'),
  'Фактически в наличии': spreadsheet.getSheetByName('Фактически в наличии'),
  'Статистика': spreadsheet.getSheetByName('Статистика'),
  'Продано': spreadsheet.getSheetByName('Продано'),
};
export const COLOR_START_POS = 1;
export const COLOR_NAMES = ['Золото', 'Серебро', 'Розовый'];
export const CLOTHES_COLORS = ['Основной'];