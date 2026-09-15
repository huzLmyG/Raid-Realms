import { RaceId } from '../../core/types.ts';
import { RACES } from '../../core/cards.data.ts';
import { getCardImagePath } from '../../assets/card-images.ts';
import { SoundEngine } from '../audio.ts';

const RACE_THEME_COLORS: Record<RaceId, string> = {
  human: 'linear-gradient(135deg, #1b263b, #0d1b2a)',
  orc: 'linear-gradient(135deg, #3d0c0c, #1f0505)',
  elf: 'linear-gradient(135deg, #0d3b2e, #051f18)',
  undead: 'linear-gradient(135deg, #2a153b, #12071a)',
  dragon: 'linear-gradient(135deg, #422a08, #241402)',
  dwarf: 'linear-gradient(135deg, #362f2d, #1c1817)',
  fairy: 'linear-gradient(135deg, #3b1035, #1c051a)',
  demon: 'linear-gradient(135deg, #4d0012, #210006)',
  werewolf: 'linear-gradient(135deg, #1f2d3d, #0b121a)',
  vampire: 'linear-gradient(135deg, #38020e, #170005)'
};

export function showVsScreen(
  p1: { name: string; race: RaceId },
  p2: { name: string; race: RaceId },
  onDone: () => void
): void {
  const overlay = document.createElement('div');
  overlay.id = 'vs-overlay';
  overlay.className = 'active';

  const r1 = RACES[p1.race];
  const r2 = RACES[p2.race];
  const img1 = getCardImagePath(`${p1.race}_portrait`);
  const img2 = getCardImagePath(`${p2.race}_portrait`);

  overlay.innerHTML = `
    <div class="vs-panel left" id="vs-left" style="background:${RACE_THEME_COLORS[p1.race]}">
      <div class="vs-avatar">
        <img src="${img1}" alt="${r1.name}" />
      </div>
      <div class="vs-name">${p1.name}</div>
      <div class="vs-race">${r1.name.toUpperCase()}</div>
    </div>

    <div class="vs-divider" id="vs-divider">VS</div>

    <div class="vs-panel right" id="vs-right" style="background:${RACE_THEME_COLORS[p2.race]}">
      <div class="vs-avatar">
        <img src="${img2}" alt="${r2.name}" />
      </div>
      <div class="vs-name">${p2.name}</div>
      <div class="vs-race">${r2.name.toUpperCase()}</div>
    </div>

    <div class="vs-skip-hint">Klick zum Überspringen ⏩</div>
  `;

  document.body.appendChild(overlay);

  const leftPanel = overlay.querySelector('#vs-left') as HTMLElement;
  const rightPanel = overlay.querySelector('#vs-right') as HTMLElement;
  const divider = overlay.querySelector('#vs-divider') as HTMLElement;

  let finished = false;
  const finish = () => {
    if (finished) return;
    finished = true;
    overlay.remove();
    onDone();
  };

  overlay.addEventListener('click', () => {
    finish();
  });

  // Step 1: Slide panels in
  setTimeout(() => {
    if (finished) return;
    leftPanel.classList.add('slide-in');
    rightPanel.classList.add('slide-in');
  }, 60);

  // Step 2: Impact boom + VS pop + Screen shake
  setTimeout(() => {
    if (finished) return;
    overlay.classList.add('shake');
    SoundEngine.vsImpact();
    divider.classList.add('pop');
  }, 550);

  // Step 3: Slide out
  setTimeout(() => {
    if (finished) return;
    leftPanel.classList.add('slide-out');
    rightPanel.classList.add('slide-out');
    divider.classList.add('fade-out');
  }, 1900);

  // Step 4: Finish transition into game
  setTimeout(() => {
    finish();
  }, 2350);
}
