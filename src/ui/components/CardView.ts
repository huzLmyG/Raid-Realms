import { CardData, CardInstance } from '../../core/types.ts';
import { getCardRarity } from '../../core/cards.data.ts';
import { getCardImagePath } from '../../assets/card-images.ts';

export interface CardViewOptions {
  isHand?: boolean;
  isMarket?: boolean;
  isBoard?: boolean;
  unaffordable?: boolean;
  canTarget?: boolean;
  isSelected?: boolean;
  onClick?: (e: MouseEvent) => void;
}

export function createCardElement(
  card: CardData | CardInstance,
  options: CardViewOptions = {}
): HTMLElement {
  const el = document.createElement('div');
  const rarity = getCardRarity(card);
  const cardType = card.type;

  el.className = `card ${cardType} rarity-${rarity}`;
  if (options.unaffordable) el.classList.add('unaffordable');
  if (options.canTarget) el.classList.add('can-target');
  if (options.isSelected) el.classList.add('selected');

  const instance = card as CardInstance;
  if (instance.summoned && options.isBoard) {
    el.classList.add('summoned');
  }

  const imagePath = getCardImagePath(card.id);
  const cost = card.cost ?? 0;
  const costClass = cost === 0 ? 'card-cost free' : 'card-cost';

  // Stats
  let statsHtml = '';
  if (cardType === 'unit') {
    const atk = (card.attack ?? 0) + (instance.upgrades ?? 0);
    const hp = (instance.health ?? card.health ?? 0);
    statsHtml = `
      <div class="card-stats">
        <span class="atk">⚔️ ${atk}</span>
        <span class="hp">❤️ ${hp}</span>
      </div>
    `;
  } else if (cardType === 'building') {
    const hp = (instance.health ?? card.health ?? 0);
    statsHtml = `
      <div class="card-stats">
        <span class="hp">🛡️ ${hp}</span>
      </div>
    `;
  } else if (card.damage) {
    statsHtml = `
      <div class="card-stats">
        <span class="atk">💥 ${card.damage}</span>
      </div>
    `;
  } else if (card.gold) {
    statsHtml = `
      <div class="card-stats">
        <span style="color:var(--gold)">🪙 +${card.gold}</span>
      </div>
    `;
  } else if (card.heal) {
    statsHtml = `
      <div class="card-stats">
        <span class="hp">💚 +${card.heal}</span>
      </div>
    `;
  }

  // Keywords
  let kwHtml = '';
  if (card.keywords && card.keywords.length > 0) {
    kwHtml = card.keywords.map(kw => `<span class="kw">${kw.toUpperCase()}</span>`).join(' ');
  }
  if (card.fortify) {
    kwHtml += ' <span class="fortify-badge">FORTIFY</span>';
  }

  el.innerHTML = `
    <div class="tier-badge">T${card.tier}</div>
    <div class="${costClass}">${cost}🪙</div>
    <div class="card-art">
      <img src="${imagePath}" alt="${card.name}" loading="lazy" />
    </div>
    <div class="card-body">
      <div class="card-name" title="${card.name}">${card.name}</div>
      <div class="card-type">${cardType}${kwHtml ? ' · ' + kwHtml : ''}</div>
      <div class="card-effect">${card.desc}</div>
      ${statsHtml}
    </div>
  `;

  if (options.onClick) {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      options.onClick!(e);
    });
  }

  return el;
}
