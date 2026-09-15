// Type definitions for Raid Realms Core Engine

export type RaceId =
  | 'human'
  | 'orc'
  | 'elf'
  | 'undead'
  | 'dragon'
  | 'dwarf'
  | 'fairy'
  | 'demon'
  | 'werewolf'
  | 'vampire';

export type CardType = 'spell' | 'unit' | 'building' | 'resource';

export type CardRarity = 'common' | 'rare' | 'epic' | 'legendary' | 'cursed';

export type Keyword = 'taunt' | 'charge' | 'lifesteal' | 'fortify';

export interface CardData {
  id: string;
  name: string;
  type: CardType;
  tier: 0 | 1 | 2 | 3;
  cost: number;
  desc: string;
  lore?: string;
  rarity?: CardRarity;
  raceReq?: RaceId;

  // Combat Stats
  attack?: number;
  health?: number;
  keywords?: Keyword[];

  // Spells / Resources / Immediate effects
  damage?: number;
  selfDamage?: number;
  gold?: number;
  heal?: number;
  draw?: number;
  isSpell?: boolean;
  aoe?: boolean;
  direct?: boolean;
  piercing?: boolean;
  chain?: [number, number]; // [maxTargets, chainDamage]
  aoeSecondary?: number;
  dot?: number;
  execute?: number;
  executeAny?: number;
  goldBack?: number;
  extraTurn?: boolean;
  skipOpponentTurn?: boolean;
  doubleAttacks?: boolean;
  buffDamage?: number;
  invulnerable?: number;
  preventAttack?: boolean;

  // Building & Unit passives
  fortify?: boolean;
  goldPerTurn?: number;
  healPerTurn?: number;
  damagePerTurn?: number;
  selfDamagePerTurn?: number;
  bonusHealLowHP?: number;
  summonPerTurn?: [string, number, number]; // [name, atk, hp]
  buffUnitsPerTurn?: number;
  upgradePerTurn?: boolean;
  buffAllAtkPerTurn?: number;
  noSummonSickness?: boolean;
  reviveSkelPerTurn?: boolean;
  drawOnSpell?: number;
  healOnEcho?: number;
  debuffAttackers?: number;
  healAllPerTurn?: number;
  growPerTurn?: boolean;
  freeUpgrade?: boolean;
  spellDmgBonus?: number;
  unitLifesteal?: boolean;
  aoeAttack?: number;

  // Special mechanics
  summon?: [string, number, number];
  summon2?: [string, number, number];
  resurrect?: boolean;
  upgradeable?: boolean;
  echoable?: boolean;
  destroyAllEnemies?: boolean;
  healAll?: boolean;

  // Cursed card traits
  loseMaxHP?: number;
  cursedCostPlus?: number;
  destroyOwnUnits?: boolean;
  dmgPerUnit?: number;
  oppDrawCards?: number;
  freeMarketBuy?: boolean;
  doubleCostNext?: number;
  randomDmg20?: boolean;
  buffOwnAtk?: number;
  debuffOwnHP?: number;
  cursedBuildDeath?: number;
  skipNextOwnTurn?: boolean;
  summonCursedDemon?: boolean;
  killAllBothSides?: boolean;
  armorThisRound?: number;
  noBuyThisRound?: boolean;
  healFull?: boolean;
  killStrongest?: boolean;
  aoeAll8?: boolean;

  // Race-specific specials
  oppGoldLoss?: number;
  nextUnitDiscount?: number;
  buffAllTemp?: number;
  buffRandomAtk?: number;
  buffRandomHP?: number;
  doubleDmgNext?: boolean;
  nextSpellFree?: boolean;
  spellDiscount?: number;
  goldPerKill?: number;
  goldEqualDmg?: boolean;
  stealGold?: boolean;
  buffAllAtkTemp?: number;
  doubleGold?: boolean;
  doubleRandomCard?: boolean;
  goldPerUnit?: number;
  transformWeakest?: boolean;
  extraAttackAll?: boolean;
  allEchoRound?: boolean;
  duplicateCard?: boolean;
  healPerKill?: number;
  deathSave?: boolean;
  stealUnitTemp?: boolean;
  buffWolvesAtk?: number;
  killOwnWeakest?: boolean;
  directDamage?: number;
  dmgPerGraveyard?: number;
  maxGraveyardDmg?: number;
  reviveRandom?: boolean;
  onDeathGold?: number;
  onDeathBuffAtk?: number;
  healOnAllyDeath?: number;
  healOnKill?: number;
  immuneUnder?: number;
  spellImmune?: boolean;
  echoBoost?: boolean;
}

export interface CardInstance extends CardData {
  uid: string;
  upgrades: number;
  maxHealth?: number;
  summoned?: boolean; // indicates summoning sickness or already attacked
  _doubleAttack?: boolean;
  _stolen?: boolean;
  _stolenFrom?: number;
  _cursedDemon?: boolean;
  finalDmg?: number;
}

export interface PlayerState {
  id: string;
  name: string;
  race: RaceId;
  isAI: boolean;
  hp: number;
  maxHP: number;
  gold: number;
  storedGold: number;
  lastRoundGold: number;
  deck: CardInstance[];
  hand: CardInstance[];
  discard: CardInstance[];
  units: (CardInstance | null)[]; // 7 board slots
  buildings: CardInstance[]; // max 7
  graveyard: CardInstance[];
  spellChain: number;
  upgradeUsed: boolean;
  heroPowerUsed: boolean;
  relic: RelicData | null;
  _relicUsed: boolean;
  _boughtThisTurn: boolean;
  _nextSpellFree: boolean;
  _spellDiscount: number;
  _allEcho: boolean;
  _doubleDmg: boolean;
  _nextUnitDiscount: boolean | number;
  _deathSave: boolean;
  _idolBonus: number;
  _firstAttackFree: boolean;
  _invulnerable: number;
  _armor: number;
  _preventAttack: boolean;
  _noBuy: boolean;
  _cursedCostPlus: number;
  _skipNextTurn: boolean;
  _extraTurn: boolean;
  _dmgBuff?: number;
  _doubleCost?: number;
  _hpAtTurnStart: number;
}

export interface RelicData {
  id: string;
  name: string;
  icon: string;
  desc: string;
  oneTime?: boolean;
}

export type TargetType = 'player' | 'unit' | 'building';

export interface TargetRef {
  type: TargetType;
  ownerIndex: number; // 0 or 1
  slotIndex?: number; // for units (0..6)
  buildingUid?: string; // for buildings
}

export interface GameState {
  matchId: string;
  turn: number;
  activePlayerIndex: number; // 0 or 1
  phase: 'main' | 'combat';
  market: (CardData | null)[]; // 6 slots
  marketDeck: CardData[];
  marketDiscard: CardData[];
  players: [PlayerState, PlayerState];
  over: boolean;
  winner: number | null; // 0, 1, or null
  log: LogEntry[];
  rngSeed: number;
  BASE_INCOME: number;
}

export interface LogEntry {
  id: string;
  turn: number;
  type: 'action' | 'damage' | 'heal' | 'gold' | 'summon' | 'death' | 'shield';
  message: string;
}
