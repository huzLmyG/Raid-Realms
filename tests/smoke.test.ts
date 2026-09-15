import { describe, it, expect } from 'vitest';
import { CARD_IMAGES, getCardImagePath } from '../src/assets/card-images.ts';

describe('Raid Realms - Smoke Test', () => {
  it('Asset-Registry enthält alle 10 Rassen-Porträts', () => {
    const races = ['demon', 'dragon', 'dwarf', 'elf', 'fairy', 'human', 'orc', 'undead', 'vampire', 'werewolf'];
    for (const race of races) {
      expect(CARD_IMAGES[`${race}_portrait`]).toBeDefined();
    }
  });

  it('Asset-Registry enthält mehr als 60 Kartengrafiken', () => {
    const keys = Object.keys(CARD_IMAGES);
    expect(keys.length).toBeGreaterThan(60);
  });

  it('getCardImagePath liefert gültige Pfade oder Fallback', () => {
    expect(getCardImagePath('fireball')).toBe('./cards/fireball.png');
    expect(getCardImagePath('unknown_card_xyz')).toBe('./cards/weak_strike.png');
  });
});
