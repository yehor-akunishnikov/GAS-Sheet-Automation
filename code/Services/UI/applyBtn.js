export const paintApplyButton = (btnCell, color) => {
  btnCell.setBackground(color);
};

export const setApplyReady = (btnCell) => {
  paintApplyButton(btnCell, 'lime');
};

export const setApplyPending = (btnCell) => {
  paintApplyButton(btnCell, 'yellow');
};