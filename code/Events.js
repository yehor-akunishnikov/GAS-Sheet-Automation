import { onApplyClick, onColorDropdown, onCountStatistics, onProductDropdown } from './EventHandlers.js';

export const event = {
  range: EVENT.range,
  coords: [
    EVENT.range.getRow(),
    EVENT.range.getColumn(),
  ],
  value: EVENT.value,
  sheet: EVENT.range.getSheet().getName(),
}

export const statEvents = [
  {
    coords: [18, 10],
    listener: onCountStatistics,
  },
];

export const ordersEvents = [
  {
    col: 6,
    listener: onProductDropdown,
  },
  {
    col: 7,
    listener: onColorDropdown,
  },
  {
    col: 8,
    listener: onApplyClick,
  },
];