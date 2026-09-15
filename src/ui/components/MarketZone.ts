import { CardData } from '../../core/types.ts';
import { createCardElement } from './CardView.ts';

export interface MarketZoneOptions {
  turn: number;
  playerGold: number;
  isMyTurn: boolean;
  onBuyCard: (slotIndex: number) => void;
  onReroll: () => void;
  onEndTurn: () => void;
}

export function renderMarketZone(
  market: (CardData | null)[],
  options: MarketZoneOptions
): HTMLElement {
  const center = document.createElement('div');
  center.className = 'center-zone';

  // Top control row
  const topRow = document.createElement('div');
  topRow.className = 'center-top-row';

  topRow.innerHTML = `
    <div class="turn-badge">Runde ${options.turn}</div>
    <div class="phase-badge">${options.isMyTurn ? 'Dein Zug' : 'Gegner am Zug'}</div>
    <button class="btn-end" id="btn-end-turn" ${!options.isMyTurn ? 'disabled' : ''}>
      ✅ Zug beenden
    </button>
  `;

  // Market cards row
  const marketRow = document.createElement('div');
  marketRow.className = 'center-market-row';

  const label = document.createElement('div');
  label.className = 'market-label';
  label.textContent = '🏪 Markt';
  marketRow.appendChild(label);

  const marketPanel = document.createElement('div');
  marketPanel.className = 'market-panel';

  market.forEach((card, index) => {
    if (card) {
      const unaffordable = options.playerGold < card.cost;
      const cardEl = createCardElement(card, {
        isMarket: true,
        unaffordable,
        onClick: () => {
          if (options.isMyTurn && !unaffordable) {
            options.onBuyCard(index);
          }
        }
      });
      marketPanel.appendChild(cardEl);
    } else {
      const emptySlot = document.createElement('div');
      emptySlot.className = 'card market-empty';
      marketPanel.appendChild(emptySlot);
    }
  });
  marketRow.appendChild(marketPanel);

  // Reroll button
  const rerollBtn = document.createElement('button');
  rerollBtn.className = 'btn-sm';
  rerollBtn.textContent = '🔄 2🪙';
  rerollBtn.disabled = !options.isMyTurn || options.playerGold < 2;
  rerollBtn.addEventListener('click', () => {
    if (options.isMyTurn && options.playerGold >= 2) {
      options.onReroll();
    }
  });
  marketRow.appendChild(rerollBtn);

  center.appendChild(topRow);
  center.appendChild(marketRow);

  const endBtn = topRow.querySelector('#btn-end-turn');
  if (endBtn && options.isMyTurn) {
    endBtn.addEventListener('click', () => {
      options.onEndTurn();
    });
  }

  return center;
}
