import { event, statEvents, ordersEvents } from "./Events.js";

switch (event.sheet) {
  case 'Статистика':
    statEvents
      .find((ev) => ev.coords === event.coords)
      .listener();
    break;

  case 'Заказы':
      ordersEvents
        .find((ev) => ev.col === event.coords[1])
        .listener();
    break;

  default: break;
}