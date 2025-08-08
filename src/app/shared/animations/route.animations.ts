// shared/route-animations.ts
import {
  trigger,
  transition,
  style,
  query,
  group,
  animate,
  animateChild
} from '@angular/animations';

export const routeAnimations = trigger('routeAnimations', [
  transition('Home => *', fadeIn()),
  transition('* => Home', fadeOut()),
  transition('* <=> Detail', slideIn()),
  transition('* <=> *', fadeIn()) // Animación por defecto
]);

function fadeIn() {
  return [
    query(':enter', [
      style({ opacity: 0 }),
      animate('300ms ease-in', style({ opacity: 1 }))
    ], { optional: true }),
    animateChild()
  ];
}

function fadeOut() {
  return [
    query(':leave', [
      style({ opacity: 1 }),
      animate('300ms ease-out', style({ opacity: 0 }))
    ], { optional: true }),
    animateChild()
  ];
}

function slideIn() {
  return [
    query(':enter, :leave', style({ position: 'absolute', width: '100%' }), { optional: true }),
    query(':enter', style({ transform: 'translateX(100%)' }), { optional: true }),
    group([
      query(':leave', [
        animate('500ms ease', style({ transform: 'translateX(-100%)' }))
      ], { optional: true }),
      query(':enter', [
        animate('500ms ease', style({ transform: 'translateX(0)' }))
      ], { optional: true })
    ]),
    animateChild()
  ];
}