import { CardInstance } from '../../core/types.ts';
import { createCardElement } from './CardView.ts';

export interface HandZoneOptions {
  playerGold: number;
  isMyTurn: boolean;
  selectedCardUid?: string | null;
  onCardClick: (card: CardInstance) => void;
}

export function renderHandZone(
  hand: CardInstance[],
  options: HandZoneOptions
): HTMLElement {
  const zone = document.createElement('div');
  zone.className = 'hand-zone';

  hand.forEach((card) => {
    const unaffordable = options.playerGold < card.cost;
    const isSelected = options.selectedCardUid === card.uid;

    const cardEl = createCardElement(card, {
      isHand: true,
      unaffordable: !options.isMyTurn || unaffordable,
      isSelected,
      onClick: () => {
        if (options.isMyTurn) {
          options.onCardClick(card);
        }
      }
    });

    zone.appendChild(cardEl);
  });

  return zone;
}
