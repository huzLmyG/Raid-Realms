import './ui/styles/main.css';
import './ui/styles/board.css';
import './ui/styles/cards.css';
import './ui/styles/market.css';

import { RaceId } from './core/types.ts';
import { GameEngine } from './core/engine.ts';
import { RACES } from './core/cards.data.ts';
import { getCardImagePath } from './assets/card-images.ts';
import { GameUI } from './ui/GameUI.ts';
import { SoundEngine } from './ui/audio.ts';

const app = document.getElementById('app')!;

let selectedMode: 'ai' | 'pvp' = 'ai';
let selectedP1Race: RaceId = 'human';
let selectedP2Race: RaceId = 'orc';

function renderStartScreen(): void {
  const racesList = Object.entries(RACES) as [RaceId, { name: string; icon: string }][];

  const raceCardsHtml = racesList
    .map(([raceKey, raceData]) => {
      const portrait = getCardImagePath(`${raceKey}_portrait`);
      const isSel = raceKey === selectedP1Race ? 'sel' : '';
      return `
        <div class="race-card ${isSel}" data-race="${raceKey}">
          <img class="race-portrait" src="${portrait}" alt="${raceData.name}" />
          <h3>${raceData.name.toUpperCase()}</h3>
          <p class="race-passive">${raceKey.toUpperCase()}-Passiv</p>
        </div>
      `;
    })
    .join('');

  app.innerHTML = `
    <div id="screen-start" class="screen active">
      <div class="start-wrap">
        <h1 class="game-title">RAID REALMS</h1>
        <p class="subtitle">Taktisches 1v1 Deckbuilder-Duell — Ultimate Edition</p>

        <div class="mode-row">
          <button class="mode-btn ${selectedMode === 'ai' ? 'sel' : ''}" id="mode-ai">🤖 vs KI</button>
          <button class="mode-btn ${selectedMode === 'pvp' ? 'sel' : ''}" id="mode-pvp">⚔️ PvP (Lokal)</button>
          <button class="mode-btn" id="btn-rules">📖 Spielregeln</button>
          <button class="mode-btn" id="btn-legal">⚖️ Impressum & Credits</button>
        </div>

        <div class="race-grid" id="race-grid">
          ${raceCardsHtml}
        </div>

        <div class="selection-status">
          <div class="player-sel">
            <div class="label">Spieler 1</div>
            <div class="chosen">${RACES[selectedP1Race].name}</div>
          </div>
          <div class="player-sel">
            <div class="label">${selectedMode === 'ai' ? 'KI-Gegner' : 'Spieler 2'}</div>
            <div class="chosen">${RACES[selectedP2Race].name}</div>
          </div>
        </div>

        <button class="start-btn" id="start-btn">⚔️ DUELL STARTEN</button>
      </div>
    </div>

    <!-- Help Modal -->
    <div class="modal-overlay" id="help-modal">
      <div class="modal-box">
        <button class="modal-close" id="help-close">✕</button>
        <h2>📖 Spielregeln — RAID REALMS</h2>
        <h3>🎯 Ziel</h3>
        <p>Reduziere die Lebenspunkte (HP) deines Gegners auf 0. Beide Spieler starten mit 60 HP (Vampir: 50 HP).</p>
        <h3>💰 Gold & In-Match Markt</h3>
        <p>Du erhältst jede Runde <strong>+3 Gold Basiseinkommen</strong> plus Gebäude-Boni. Im Markt kannst du neue Einheiten, Zauber und Gebäude dauerhaft für dein Deck erwerben.</p>
        <h3>⚔️ Kampfsystem & Keywords</h3>
        <ul>
          <li><strong>TAUNT:</strong> Gegner MÜSSEN diese Einheit zuerst angreifen, bevor andere Ziele anvisiert werden können.</li>
          <li><strong>FORTIFY:</strong> Gebäude blockieren direkte Angriffe auf den Helden!</li>
          <li><strong>CHARGE:</strong> Einheit kann sofort im Beschwörungszug angreifen.</li>
          <li><strong>LIFESTEAL:</strong> Zugefügter Schaden heilt dich bzw. die Einheit.</li>
        </ul>
      </div>
    </div>

    <!-- Legal & Credits Modal -->
    <div class="modal-overlay" id="legal-modal">
      <div class="modal-box">
        <button class="modal-close" id="legal-close">✕</button>
        <h2>⚖️ Impressum, Datenschutz & KI-Hinweis</h2>
        
        <h3>Angaben gemäß § 5 DDG (ehemals TMG)</h3>
        <p><strong>Projekt:</strong> Raid Realms (Indie Game Prototyp in Entwicklung)</p>
        <p><strong>Verantwortlich:</strong> Lenny (<a href="mailto:lifenuggets12@gmail.com" style="color:var(--gold)">lifenuggets12@gmail.com</a>)</p>
        <p>Dieses Spiel ist ein nicht-kommerzielles Kunst- und Lernprojekt.</p>

        <h3>Datenschutzerklärung (DSGVO)</h3>
        <p><strong>100% Local-First:</strong> Dieses Spiel speichert keine personenbezogenen Daten auf zentralen Servern. Einstellungen und Spielfortschritt verbleiben ausschließlich lokal im Speicher deines Browsers (LocalStorage). Es werden keine Werbe- oder Tracking-Cookies verwendet.</p>

        <h3>Transparenzhinweis gemäß Art. 50 EU AI Act</h3>
        <p style="border-left: 3px solid var(--gold); padding-left: 0.8rem; color: var(--txt);">
          <strong>Kennzeichnung:</strong> Die 102 im Spiel verwendeten Kartengrafiken und Rassenporträts wurden mithilfe generativer Bild-KI-Werkzeuge generiert.
        </p>

        <h3>Credits & Technologie</h3>
        <p>Entwickelt mit TypeScript, Vite und Web Audio API. Assistiert von Antigravity AI.</p>
      </div>
    </div>
  `;

  // Event Listeners
  document.getElementById('mode-ai')?.addEventListener('click', () => {
    selectedMode = 'ai';
    renderStartScreen();
  });
  document.getElementById('mode-pvp')?.addEventListener('click', () => {
    selectedMode = 'pvp';
    renderStartScreen();
  });

  const raceCards = document.querySelectorAll('.race-card');
  raceCards.forEach((card) => {
    card.addEventListener('click', () => {
      const race = card.getAttribute('data-race') as RaceId;
      if (race) {
        selectedP1Race = race;
        // Zufällige Gegner-Rasse
        const keys = Object.keys(RACES) as RaceId[];
        const otherKeys = keys.filter(k => k !== race);
        selectedP2Race = otherKeys[Math.floor(Math.random() * otherKeys.length)];
        renderStartScreen();
      }
    });
  });

  document.getElementById('btn-rules')?.addEventListener('click', () => {
    document.getElementById('help-modal')?.classList.add('open');
  });
  document.getElementById('help-close')?.addEventListener('click', () => {
    document.getElementById('help-modal')?.classList.remove('open');
  });

  document.getElementById('btn-legal')?.addEventListener('click', () => {
    document.getElementById('legal-modal')?.classList.add('open');
  });
  document.getElementById('legal-close')?.addEventListener('click', () => {
    document.getElementById('legal-modal')?.classList.remove('open');
  });

  document.getElementById('start-btn')?.addEventListener('click', () => {
    SoundEngine.playCard();
    startGame();
  });
}

function startGame(): void {
  const state = GameEngine.createGame(
    { name: 'Spieler', race: selectedP1Race, isAI: false },
    { name: selectedMode === 'ai' ? 'KI-Gegner' : 'Spieler 2', race: selectedP2Race, isAI: selectedMode === 'ai' }
  );

  new GameUI(app, state);
}

// Service Worker Registration for PWA Offline Support
if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch((err) => {
      console.warn('PWA ServiceWorker registration skipped/failed:', err);
    });
  });
}

// Initial render
renderStartScreen();
