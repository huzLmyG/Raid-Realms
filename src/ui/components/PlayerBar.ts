import { PlayerState } from '../../core/types.ts';
import { RACES } from '../../core/cards.data.ts';
import { getCardImagePath } from '../../assets/card-images.ts';

export interface PlayerBarOptions {
  isMine: boolean;
  canTargetHero?: boolean;
  onHeroClick?: () => void;
  onHeroPowerClick?: () => void;
}

export function renderPlayerBar(
  player: PlayerState,
  options: PlayerBarOptions
): HTMLElement {
  const bar = document.createElement('div');
  bar.className = `p-bar ${options.isMine ? 'mine' : 'enemy'}`;
  if (options.canTargetHero) {
    bar.classList.add('can-target');
  }

  const raceInfo = RACES[player.race];
  const avatarImg = getCardImagePath(`${player.race}_portrait`);
  const hpPercent = Math.max(0, Math.min(100, (player.hp / player.maxHP) * 100));
  const hpFillClass = options.isMine ? 'mine-fill' : 'enemy-fill';

  bar.innerHTML = `
    <div class="pile-zone">
      <div class="pile pile-draw" title="Ziehstapel (${player.deck.length})">
        <span class="pile-icon">📚</span>
        <span class="pile-count">${player.deck.length}</span>
        <span class="pile-label">Zieh</span>
      </div>
      <div class="pile pile-discard" title="Ablagestapel (${player.discard.length})">
        <span class="pile-icon">📂</span>
        <span class="pile-count">${player.discard.length}</span>
        <span class="pile-label">Ablag</span>
      </div>
    </div>

    <div class="p-avatar" title="${player.name} (${raceInfo.name})">
      <img src="${avatarImg}" alt="${player.name}" />
    </div>

    ${options.isMine ? `
      <button class="hero-power-btn" id="hero-power-btn" ${player.heroPowerUsed || player.gold < 2 ? 'disabled' : ''} title="Hero Power (2 Gold)">
        <span class="hp-icon">⚡</span>
        <span class="hp-cost">2</span>
      </button>
    ` : ''}

    <div class="p-info">
      <div class="p-name">${player.name} (${raceInfo.name})</div>
      <div class="p-stats">
        <span>❤️ <span class="sv">${player.hp}</span> / ${player.maxHP}</span>
        <span>🪙 <span class="sv" style="color:var(--gold)">${player.gold}</span></span>
        <span>🃏 <span class="sv">${player.deck.length + player.discard.length}</span></span>
      </div>
      <div class="hp-bar">
        <div class="hp-fill ${hpFillClass}" style="width: ${hpPercent}%"></div>
      </div>
      <div class="race-passive-bar">${player.race.toUpperCase()}: ${raceInfo.name}-Passiv</div>
    </div>
  `;

  if (options.canTargetHero && options.onHeroClick) {
    bar.addEventListener('click', () => {
      options.onHeroClick!();
    });
  }

  if (options.isMine && options.onHeroPowerClick) {
    const hpBtn = bar.querySelector('#hero-power-btn');
    if (hpBtn) {
      hpBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        options.onHeroPowerClick!();
      });
    }
  }

  return bar;
}
