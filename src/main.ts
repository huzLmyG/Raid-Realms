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
import { showVsScreen } from './ui/components/VsScreen.ts';

import { P2PNetwork } from './net/p2p-peerjs.ts';

const app = document.getElementById('app')!;

let selectedMode: 'ai' | 'pvp' = 'ai';
let selectedDifficulty: 'normal' | 'hard' = 'normal';
let selectedP1Race: RaceId = 'human';
let selectedP2Race: RaceId = 'orc';
let activeP2PNetwork: P2PNetwork | null = null;

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
          <button class="mode-btn" id="btn-p2p">🌐 Online 1v1 (P2P)</button>
          <button class="mode-btn" id="btn-rules">📖 Spielregeln</button>
          <button class="mode-btn" id="btn-legal">⚖️ Impressum & Credits</button>
        </div>

        ${selectedMode === 'ai' ? `
          <div style="display:flex;justify-content:center;gap:0.8rem;margin-bottom:1.2rem;align-items:center;">
            <span style="color:var(--txt2);font-size:0.95rem;">KI-Schwierigkeit:</span>
            <button class="mode-btn ${selectedDifficulty === 'normal' ? 'sel' : ''}" id="diff-normal" style="padding:0.4rem 0.8rem;font-size:0.9rem;">Normal</button>
            <button class="mode-btn ${selectedDifficulty === 'hard' ? 'sel' : ''}" id="diff-hard" style="padding:0.4rem 0.8rem;font-size:0.9rem;">🧠 Taktisch (Schwer)</button>
          </div>
        ` : ''}

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

    <!-- P2P Multiplayer Modal -->
    <div class="modal-overlay" id="p2p-modal">
      <div class="modal-box">
        <button class="modal-close" id="p2p-close">✕</button>
        <h2>🌐 Online 1v1 Duell (P2P WebRTC)</h2>
        <p style="color:var(--txt2);margin-bottom:1.2rem;">Spiele direkt im Browser gegen einen Mitspieler — ohne Registrierung, 100% serverlos über Peer-to-Peer.</p>
        
        <div style="display:flex;gap:1rem;margin-bottom:1.5rem;">
          <button class="mode-btn sel" id="tab-host" style="flex:1;">👑 Raum erstellen (Host)</button>
          <button class="mode-btn" id="tab-join" style="flex:1;">🚪 Raum beitreten (Gast)</button>
        </div>

        <div id="panel-host">
          <p>Deine Rasse: <strong style="color:var(--gold);">${RACES[selectedP1Race].name}</strong></p>
          <button class="start-btn" id="btn-create-room" style="margin:1rem 0;width:100%;">Raum generieren</button>
          <div id="host-status" style="display:none;margin-top:1rem;padding:1.2rem;background:var(--bg1);border:1.5px solid var(--gold);border-radius:10px;text-align:center;">
            <p style="font-size:0.95rem;color:var(--txt2);">Teile diesen Raum-Code oder Link mit deinem Mitspieler:</p>
            <h3 id="room-code-display" style="font-size:2.2rem;letter-spacing:0.3rem;color:var(--gold);margin:0.6rem 0;">...</h3>
            <button class="mode-btn" id="btn-copy-link" style="margin-top:0.4rem;">📋 Einladungslink kopieren</button>
            <p id="host-waiting-msg" style="margin-top:1rem;color:var(--arcane);font-size:1rem;">⏳ Warte auf Mitspieler...</p>
          </div>
        </div>

        <div id="panel-join" style="display:none;">
          <p>Deine Rasse: <strong style="color:var(--gold);">${RACES[selectedP1Race].name}</strong></p>
          <div style="margin:1.2rem 0;">
            <input type="text" id="join-room-input" placeholder="Raum-Code (z.B. 4819)" style="width:100%;padding:0.9rem;background:var(--bg0);border:2px solid var(--border);border-radius:8px;color:var(--txt);font-size:1.3rem;text-align:center;text-transform:uppercase;outline:none;" />
          </div>
          <button class="start-btn" id="btn-join-room" style="width:100%;">Dem Duell beitreten</button>
          <p id="join-status" style="margin-top:1rem;color:var(--txt2);text-align:center;font-size:0.95rem;"></p>
        </div>
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
        <p><strong>100% Local-First & P2P:</strong> Dieses Spiel speichert keine personenbezogenen Daten auf zentralen Servern. Einstellungen und Spielfortschritt verbleiben ausschließlich lokal im Speicher deines Browsers (LocalStorage). P2P-Duelle werden direkt verschlüsselt zwischen beiden Browsern übertragen.</p>

        <h3>Transparenzhinweis gemäß Art. 50 EU AI Act</h3>
        <p style="border-left: 3px solid var(--gold); padding-left: 0.8rem; color: var(--txt);">
          <strong>Kennzeichnung:</strong> Die 102 im Spiel verwendeten Kartengrafiken und Rassenporträts wurden mithilfe generativer Bild-KI-Werkzeuge generiert.
        </p>

        <h3>Credits & Technologie</h3>
        <p>Entwickelt mit TypeScript, Vite, PeerJS und Web Audio API. Assistiert von Antigravity AI.</p>
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

  document.getElementById('diff-normal')?.addEventListener('click', () => {
    selectedDifficulty = 'normal';
    renderStartScreen();
  });
  document.getElementById('diff-hard')?.addEventListener('click', () => {
    selectedDifficulty = 'hard';
    renderStartScreen();
  });

  const raceCards = document.querySelectorAll('.race-card');
  raceCards.forEach((card) => {
    card.addEventListener('click', () => {
      const race = card.getAttribute('data-race') as RaceId;
      if (race) {
        selectedP1Race = race;
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

  // P2P Listeners
  const p2pModal = document.getElementById('p2p-modal');
  document.getElementById('btn-p2p')?.addEventListener('click', () => {
    p2pModal?.classList.add('open');
  });
  document.getElementById('p2p-close')?.addEventListener('click', () => {
    p2pModal?.classList.remove('open');
    if (activeP2PNetwork) {
      activeP2PNetwork.disconnect();
      activeP2PNetwork = null;
    }
  });

  const tabHost = document.getElementById('tab-host');
  const tabJoin = document.getElementById('tab-join');
  const panelHost = document.getElementById('panel-host');
  const panelJoin = document.getElementById('panel-join');

  tabHost?.addEventListener('click', () => {
    tabHost.classList.add('sel');
    tabJoin?.classList.remove('sel');
    if (panelHost) panelHost.style.display = 'block';
    if (panelJoin) panelJoin.style.display = 'none';
  });

  tabJoin?.addEventListener('click', () => {
    tabJoin.classList.add('sel');
    tabHost?.classList.remove('sel');
    if (panelJoin) panelJoin.style.display = 'block';
    if (panelHost) panelHost.style.display = 'none';
  });

  document.getElementById('btn-create-room')?.addEventListener('click', async () => {
    const btn = document.getElementById('btn-create-room') as HTMLButtonElement;
    btn.disabled = true;
    btn.textContent = 'Erstelle Raum...';

    activeP2PNetwork = new P2PNetwork();
    const roomCode = await activeP2PNetwork.createRoom('Host', selectedP1Race);

    const hostStatus = document.getElementById('host-status')!;
    hostStatus.style.display = 'block';
    document.getElementById('room-code-display')!.textContent = roomCode;

    document.getElementById('btn-copy-link')?.addEventListener('click', () => {
      const url = `${window.location.origin}${window.location.pathname}?room=${roomCode}`;
      navigator.clipboard.writeText(url);
      alert('Einladungslink in Zwischenablage kopiert:\n' + url);
    });

    activeP2PNetwork.onConnected = (guestName, guestRace) => {
      SoundEngine.victory();
      const p1 = { name: 'Host (Du)', race: selectedP1Race, isAI: false };
      const p2 = { name: `${guestName}`, race: guestRace, isAI: false };
      const state = GameEngine.createGame(p1, p2);
      activeP2PNetwork!.sendGameStart(state);
      p2pModal?.classList.remove('open');
      showVsScreen(p1, p2, () => {
        new GameUI(app, state, { network: activeP2PNetwork!, myPlayerIndex: 0 });
      });
    };
  });

  document.getElementById('btn-join-room')?.addEventListener('click', async () => {
    const input = document.getElementById('join-room-input') as HTMLInputElement;
    const code = input.value.trim();
    if (!code) return;

    const joinStatus = document.getElementById('join-status')!;
    joinStatus.textContent = 'Verbinde mit Host...';

    activeP2PNetwork = new P2PNetwork();
    activeP2PNetwork.onGameStart = (initialState) => {
      SoundEngine.victory();
      p2pModal?.classList.remove('open');
      const p1 = { name: initialState.players[0].name, race: initialState.players[0].race };
      const p2 = { name: initialState.players[1].name, race: initialState.players[1].race };
      showVsScreen(p1, p2, () => {
        new GameUI(app, initialState, { network: activeP2PNetwork!, myPlayerIndex: 1 });
      });
    };

    activeP2PNetwork.onError = (err) => {
      joinStatus.textContent = `Fehler: ${err}`;
    };

    await activeP2PNetwork.joinRoom(code, 'Gast', selectedP1Race);
    joinStatus.textContent = 'Verbunden! Warte auf Spielstart...';
  });

  // URL Parameter ?room=XYZ
  const urlParams = new URLSearchParams(window.location.search);
  const roomParam = urlParams.get('room');
  if (roomParam) {
    p2pModal?.classList.add('open');
    tabJoin?.click();
    const input = document.getElementById('join-room-input') as HTMLInputElement;
    if (input) input.value = roomParam;
  }

  document.getElementById('start-btn')?.addEventListener('click', () => {
    SoundEngine.playCard();
    startGame();
  });
}

function startGame(): void {
  const p1 = { name: 'Spieler', race: selectedP1Race, isAI: false };
  const p2 = {
    name: selectedMode === 'ai' ? `KI (${selectedDifficulty === 'hard' ? 'Taktisch' : 'Normal'})` : 'Spieler 2',
    race: selectedP2Race,
    isAI: selectedMode === 'ai'
  };

  const state = GameEngine.createGame(p1, p2);

  showVsScreen(p1, p2, () => {
    new GameUI(app, state, undefined, selectedDifficulty);
  });
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
