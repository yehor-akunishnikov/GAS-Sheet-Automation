import { event, statEvents, ordersEvents } from './Events.js';
import { compareStrings } from './Services/Util';

switch (event.sheet) {
  case 'Статистика':
    statEvents
      .find((ev) => compareStrings(`${ev.coords}`, `${event.coords}`))
      .listener();
    break;

  case 'Заказы':
      ordersEvents
        .find((ev) => ev.col === event.coords[1])
        .listener();
    break;

  default: break;
}