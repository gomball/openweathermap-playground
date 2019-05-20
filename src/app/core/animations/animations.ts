import { animate, query, style, transition, trigger, group } from '@angular/animations';

export const fadeAnimation = trigger('fadeAnimation', [
  transition('* <=> *', [
    style({ position: 'relative' }),
    query(':enter', [style({ opacity: 0, position: 'absolute', top: 8, right: 8, bottom: 8, left: 8, width: '99%' })], { optional: true }),
    query(':leave', [style({ opacity: 1, position: 'absolute', top: 8, right: 8, bottom: 8, left: 8, width: '99%' })], { optional: true }),
    group([
      query(':leave', [style({ opacity: 1 }), animate('0.4s ease-in-out', style({ opacity: 0 }))], {
        optional: true
      }),
      query(':enter', [style({ opacity: 0 }), animate('0.4s ease-in-out', style({ opacity: 1 }))], {
        optional: true
      })
    ])
  ])
]);
