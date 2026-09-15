import { CardData, RaceId, RelicData, CardInstance, CardRarity } from './types.ts';

export const CARDS_DB: Record<string, CardData> = {
  // Tier 0: Starter cards (cost 0)
  weak_strike: { id: 'weak_strike', name: 'Schwacher Schlag', type: 'spell', tier: 0, cost: 0, damage: 2, desc: 'Fügt dem Gegner 2 Schaden zu. Ein simpler Angriff ohne Extras.', lore: 'Jeder Krieger beginnt mit einem unbeholfenen Hieb — selbst Legenden fingen klein an.' },
  coin: { id: 'coin', name: 'Münze', type: 'resource', tier: 0, cost: 0, gold: 1, desc: 'Gibt dir 1 Gold zum Ausgeben im Markt.', lore: 'Eine einzelne Münze klingt nach wenig, doch wer sammelt, kauft sich Armeen.' },
  wooden_wall: { id: 'wooden_wall', name: 'Holzmauer', type: 'building', tier: 0, cost: 0, health: 7, fortify: true, desc: 'Gebäude mit 7 HP. FORTIFY zwingt Gegner, es zuerst anzugreifen.', lore: 'Hastig aus Palisaden errichtet — hält den ersten Ansturm auf, aber nicht den zweiten.' },
  marketplace: { id: 'marketplace', name: 'Marktplatz', type: 'building', tier: 0, cost: 0, health: 6, goldPerTurn: 2, desc: 'Gebäude mit 6 HP. Produziert jede Runde automatisch 2 Gold für dich.', lore: 'Wo Händler aus allen Reichen zusammenkommen, fließt das Gold wie Wasser.' },
  slash: { id: 'slash', name: 'Hieb', type: 'spell', tier: 0, cost: 0, damage: 2, desc: 'Fügt dem Gegner 2 Schaden zu. Simpel aber effektiv.', lore: 'Ein breiter Hieb — die Orks brauchen keine Finesse, nur rohe Gewalt.' },
  plunder: { id: 'plunder', name: 'Plünderung', type: 'spell', tier: 0, cost: 0, damage: 2, gold: 2, desc: 'Fügt 2 Schaden zu und bringt dir zusätzlich 2 Gold.', lore: 'Warum nur kämpfen, wenn man dabei auch noch plündern kann?' },
  blood_rage: { id: 'blood_rage', name: 'Kampfrausch', type: 'spell', tier: 0, cost: 0, damage: 5, selfDamage: 3, desc: 'Fügt dem Gegner 5 Schaden zu, aber du verlierst selbst 3 HP.', lore: 'Der Schmerz ist der Preis für diese ungezügelte Kraft — doch Orks zahlen ihn gern.' },
  arcane_bolt: { id: 'arcane_bolt', name: 'Arkaner Pfeil', type: 'spell', tier: 0, cost: 0, damage: 2, isSpell: true, desc: 'Magischer Zauber: Fügt dem Gegner 2 Schaden zu.', lore: 'Der elfische Standardzauber — präzise, elegant und stets zuverlässig.' },
  mana_crystal: { id: 'mana_crystal', name: 'Mana-Kristall', type: 'resource', tier: 0, cost: 0, gold: 2, draw: 1, desc: 'Gibt dir 2 Gold und lässt dich 1 zusätzliche Karte ziehen.', lore: 'Kondensierte Magie in kristalliner Form — wertvoll in jeder Hinsicht.' },
  meditation: { id: 'meditation', name: 'Meditation', type: 'spell', tier: 0, cost: 0, draw: 3, isSpell: true, desc: 'Zauber: Ziehe sofort 3 neue Karten aus deinem Deck.', lore: 'Drei tiefe Atemzüge — und die Antworten kommen von selbst.' },
  dark_bolt: { id: 'dark_bolt', name: 'Dunkler Pfeil', type: 'spell', tier: 0, cost: 0, damage: 2, desc: 'Fügt dem Gegner 2 Schaden zu mit dunkler Magie.', lore: 'Pure Todesenergie, kanalisiert durch einen verdorbenen Geist.' },
  summon_skeleton: { id: 'summon_skeleton', name: 'Skelett-Ruf', type: 'spell', tier: 0, cost: 0, summon: ['Skelett', 1, 1], desc: 'Beschwört ein Skelett (1 ATK / 1 HP) auf dein Spielfeld.', lore: 'Ein Flüstern an die Toten genügt — und Knochen gehorchen.' },
  soul_steal: { id: 'soul_steal', name: 'Seelen-Dieb', type: 'spell', tier: 0, cost: 0, damage: 3, desc: 'Fügt dem Gegner 3 Schaden zu, indem es dessen Seele anzapft.', lore: 'Nicht der Körper stirbt zuerst — die Seele wird langsam geraubt.' },
  graveyard: { id: 'graveyard', name: 'Friedhof', type: 'building', tier: 0, cost: 0, health: 6, summonPerTurn: ['Skelett', 1, 1], desc: 'Gebäude mit 6 HP. Beschwört jede Runde automatisch ein Skelett (1/1).', lore: 'Hier schlafen die Gefallenen — doch der Tod ist nur eine kurze Pause.' },
  dragon_claw: { id: 'dragon_claw', name: 'Drachenklaue', type: 'spell', tier: 0, cost: 0, damage: 2, desc: 'Fügt dem Gegner 2 Schaden mit einer Drachenklaue zu.', lore: 'Auch abgetrennt ist die Klaue eines Drachen immer noch tödlich scharf.' },
  gold_scale: { id: 'gold_scale', name: 'Goldschuppe', type: 'resource', tier: 0, cost: 0, gold: 2, desc: 'Eine wertvolle Schuppe — gibt dir 2 Gold.', lore: 'Vom Leib des Drachen gerissen, ist sie mehr wert als hundert Münzen.' },
  dragon_nest: { id: 'dragon_nest', name: 'Drachennest', type: 'building', tier: 0, cost: 0, health: 8, goldPerTurn: 2, desc: 'Gebäude mit 8 HP. Produziert jede Runde 2 Gold für dich.', lore: 'Wo ein Drache schläft, sammelt sich der Hort von ganz allein.' },
  hammer_throw: { id: 'hammer_throw', name: 'Hammerwurf', type: 'spell', tier: 0, cost: 0, damage: 3, upgradeable: true, desc: 'Fügt 3 Schaden zu. Kann durch die Schmiede aufgewertet werden.', lore: 'Der Zwerg wirft nie daneben — und der Hammer kommt immer zurück.' },
  ore_chunk: { id: 'ore_chunk', name: 'Erz', type: 'resource', tier: 0, cost: 0, gold: 2, upgradeable: true, desc: 'Gibt dir 2 Gold. Kann durch die Schmiede aufgewertet werden.', lore: 'Rohes Eisenerz aus den Tiefen — voller verborgenes Potenzial.' },
  forge: { id: 'forge', name: 'Schmiede', type: 'building', tier: 0, cost: 0, health: 8, upgradePerTurn: true, desc: 'Gebäude mit 8 HP. Wertet jede Runde automatisch eine Handkarte auf (+1/+1).', lore: 'Das Feuer der Zwergenschmiede glüht Tag und Nacht ohne Pause.' },
  fairy_bolt: { id: 'fairy_bolt', name: 'Feenpfeil', type: 'spell', tier: 0, cost: 0, damage: 3, echoable: true, desc: 'Fügt 3 Schaden zu. 25% Chance auf Echo — wird dann nochmal gespielt!', lore: 'Blitzschnell geschossen — und manchmal kommt gleich ein zweiter hinterher.' },
  fairy_dust: { id: 'fairy_dust', name: 'Feenstaub', type: 'resource', tier: 0, cost: 0, gold: 3, draw: 1, echoable: true, desc: 'Gibt 3 Gold und zieht 1 Karte. 25% Echo-Chance für Wiederholung.', lore: 'Glitzernd und unberechenbar — man weiß nie, was der Feenstaub noch bringt.' },
  fairy_ring: { id: 'fairy_ring', name: 'Feenkreis', type: 'building', tier: 0, cost: 0, health: 6, goldPerTurn: 2, desc: 'Gebäude mit 6 HP. Produziert jede Runde 2 Gold für dich.', lore: 'Ein geheimnisvoller Pilzring im Mondlicht, der leise Gold herbeilockt.' },
  hellfire: { id: 'hellfire', name: 'Höllenfeuer', type: 'spell', tier: 0, cost: 0, damage: 4, selfDamage: 1, desc: 'Entfesselt 4 Schaden auf den Gegner, kostet dich aber nur 1 eigene HP.', lore: 'Feuer aus dem tiefsten Abgrund — es verbrennt alles, auch den Beschwörer.' },
  soul_harvest: { id: 'soul_harvest', name: 'Seelenernte', type: 'resource', tier: 0, cost: 0, selfDamage: 1, gold: 4, desc: 'Du opferst 1 HP und erhältst dafür 4 Gold.', lore: 'Blut gegen Gold — der ewige Pakt der Dämonen kennt nur diesen Tausch.' },
  blood_altar: { id: 'blood_altar', name: 'Blutaltar', type: 'building', tier: 0, cost: 0, health: 6, goldPerTurn: 2, desc: 'Gebäude mit 6 HP. Gibt 2 Gold pro Runde.', lore: 'Jede Runde fordert der Altar seinen blutigen Tribut — doch der Lohn ist verlockend.' },
  bite: { id: 'bite', name: 'Biss', type: 'spell', tier: 0, cost: 0, damage: 2, summon: ['Wolf', 1, 1], desc: 'Fügt 2 Schaden zu und beschwört einen Wolf (1/1) aufs Feld.', lore: 'Zähne zuerst, Fragen später — das Gesetz des Rudels.' },
  howl: { id: 'howl', name: 'Heulen', type: 'spell', tier: 0, cost: 0, summon: ['Wolf', 1, 1], buffDamage: 1, desc: 'Beschwört einen Wolf (1/1) und erhöht nächsten Zauberschaden um +1.', lore: 'Das Heulen hallt durch die Nacht — und aus der Dunkelheit kommt ein Wolf.' },
  den: { id: 'den', name: 'Höhle', type: 'building', tier: 0, cost: 0, health: 5, summonPerTurn: ['Wolf', 1, 1], desc: 'Gebäude mit 5 HP. Beschwört jede Runde einen Wolf (1/1).', lore: 'Tief in der Höhle wächst das Rudel — Welpe für Welpe, Runde für Runde.' },
  vampire_bite: { id: 'vampire_bite', name: 'Vampirbiss', type: 'spell', tier: 0, cost: 0, damage: 3, unitLifesteal: true, desc: 'Fügt 3 Schaden zu. Lifesteal: Du heilst dich um den Schadensbetrag.', lore: 'Der Biss ist sanft, fast zärtlich — doch er raubt das Leben tropfenweise.' },
  blood_coin: { id: 'blood_coin', name: 'Blutgeld', type: 'resource', tier: 0, cost: 0, gold: 3, desc: 'Gibt dir 3 Gold aus dunklen Quellen.', lore: 'Geprägt aus dem Blut der Opfer — jede Münze erzählt eine düstere Geschichte.' },
  crypt: { id: 'crypt', name: 'Gruft', type: 'building', tier: 0, cost: 0, health: 6, healPerTurn: 2, desc: 'Gebäude mit 6 HP. Heilt dich jede Runde um 2 HP.', lore: 'Das Grab regeneriert seinen Meister — der Tod nährt den Vampir.' },

  // Tier 1 (cost 2)
  stone_strike: { id: 'stone_strike', name: 'Steinschlag', type: 'spell', tier: 1, cost: 2, damage: 4, desc: 'Fügt dem Gegner 4 Schaden zu mit einem schweren Felsbrocken.' },
  arrow_salvo: { id: 'arrow_salvo', name: 'Pfeilsalve', type: 'spell', tier: 1, cost: 2, damage: 2, aoe: true, desc: 'Fügt allen feindlichen Einheiten 2 AOE-Flächenschaden zu.' },
  knife_throw: { id: 'knife_throw', name: 'Messerwurf', type: 'spell', tier: 1, cost: 2, damage: 3, draw: 1, desc: 'Fügt 3 Schaden zu und du ziehst 1 zusätzliche Karte.' },
  poison_spit: { id: 'poison_spit', name: 'Giftspucke', type: 'spell', tier: 1, cost: 2, damage: 2, dot: 2, desc: 'Fügt 2 Schaden zu plus 2 Gift-Schaden über Zeit.' },
  shockwave: { id: 'shockwave', name: 'Schockwelle', type: 'spell', tier: 1, cost: 2, damage: 1, aoe: true, direct: true, desc: 'Fügt allen feindlichen Einheiten 1 AOE-Schaden zu und trifft auch direkt den Gegner.' },
  coin_pouch: { id: 'coin_pouch', name: 'Münzbeutel', type: 'resource', tier: 1, cost: 2, gold: 3, desc: 'Gibt dir sofort 3 Gold zum Ausgeben.' },
  emergency_heal: { id: 'emergency_heal', name: 'Notheilung', type: 'resource', tier: 1, cost: 2, heal: 3, desc: 'Heilt dich sofort um 3 HP.' },
  herb_potion: { id: 'herb_potion', name: 'Kräutertrank', type: 'resource', tier: 1, cost: 2, draw: 2, desc: 'Ziehe sofort 2 neue Karten aus deinem Deck.' },
  whetstone: { id: 'whetstone', name: 'Wetzstein', type: 'resource', tier: 1, cost: 2, buffDamage: 2, desc: 'Dein nächster Angriffszauber verursacht 2 zusätzlichen Schaden.' },
  smoke_bomb: { id: 'smoke_bomb', name: 'Rauchbombe', type: 'resource', tier: 1, cost: 2, preventAttack: true, desc: 'Verhindert den kompletten Angriff deiner Gegner-Einheiten diese Runde.' },
  militia: { id: 'militia', name: 'Miliz', type: 'unit', tier: 1, cost: 2, attack: 3, health: 4, desc: 'Beschwört eine Miliz-Einheit mit 3 Angriff und 4 HP.' },
  archer: { id: 'archer', name: 'Bogenschütze', type: 'unit', tier: 1, cost: 2, attack: 2, health: 2, desc: 'Beschwört einen Bogenschützen mit 2 ATK / 2 HP.' },
  guard_dog: { id: 'guard_dog', name: 'Wachhund', type: 'unit', tier: 1, cost: 2, attack: 2, health: 3, keywords: ['taunt'], desc: 'Einheit mit 2 ATK / 3 HP und TAUNT: Feinde müssen ihn zuerst angreifen.' },
  peasant: { id: 'peasant', name: 'Leibeigener', type: 'unit', tier: 1, cost: 2, attack: 1, health: 2, goldPerTurn: 1, desc: 'Einheit mit 1 ATK / 2 HP. Produziert jede Runde 1 Gold für dich.' },
  shield_bearer: { id: 'shield_bearer', name: 'Schildträger', type: 'unit', tier: 1, cost: 2, attack: 1, health: 5, keywords: ['taunt'], desc: 'Einheit mit 1 ATK / 5 HP und TAUNT.' },
  barricade: { id: 'barricade', name: 'Barrikade', type: 'building', tier: 1, cost: 2, health: 6, fortify: true, desc: 'Gebäude mit 6 HP. FORTIFY: Feinde müssen es zuerst zerstören.' },
  watch_tower: { id: 'watch_tower', name: 'Wachturm', type: 'building', tier: 1, cost: 2, health: 4, damagePerTurn: 1, desc: 'Gebäude mit 4 HP. Fügt dem Gegner jede Runde automatisch 1 Schaden zu.' },
  treasure_chest: { id: 'treasure_chest', name: 'Schatztruhe', type: 'building', tier: 1, cost: 2, health: 3, goldPerTurn: 2, desc: 'Gebäude mit 3 HP. Produziert jede Runde 2 Gold für dich.' },
  alchemy_lab: { id: 'alchemy_lab', name: 'Alchemielabor', type: 'building', tier: 1, cost: 2, health: 5, healPerTurn: 1, desc: 'Gebäude mit 5 HP. Heilt dich jede Runde um 1 HP.' },
  recruit_tent: { id: 'recruit_tent', name: 'Rekrutierungszelt', type: 'building', tier: 1, cost: 2, health: 4, summonPerTurn: ['Miliz', 3, 4], desc: 'Gebäude mit 4 HP. Beschwört jede Runde automatisch eine Miliz (3/4).' },

  // Tier 2 (cost 5)
  fireball: { id: 'fireball', name: 'Feuerball', type: 'spell', tier: 2, cost: 5, damage: 8, isSpell: true, desc: 'Mächtiger Zauber: Entfesselt 8 Schaden auf ein einzelnes Ziel.' },
  chain_lightning: { id: 'chain_lightning', name: 'Kettenblitz', type: 'spell', tier: 2, cost: 5, damage: 5, chain: [3, 1], desc: 'Fügt 5 Schaden zu und springt dann auf bis zu 3 weitere Ziele.' },
  flame_storm: { id: 'flame_storm', name: 'Flammensturm', type: 'spell', tier: 2, cost: 5, damage: 4, aoe: true, isSpell: true, desc: 'Zauber: Fügt allen feindlichen Einheiten 4 AOE-Flächenschaden zu.' },
  execute: { id: 'execute', name: 'Exekution', type: 'spell', tier: 2, cost: 5, execute: 5, desc: 'Tötet sofort jede feindliche Einheit mit 5 oder weniger HP.' },
  acid_rain: { id: 'acid_rain', name: 'Säureregen', type: 'spell', tier: 2, cost: 5, damage: 2, aoe: true, dot: 2, desc: 'Fügt allen Feinden 2 AOE-Schaden zu plus 2 Gift-Schaden über Zeit.' },
  treasure_hoard: { id: 'treasure_hoard', name: 'Schatzkiste', type: 'resource', tier: 2, cost: 5, gold: 6, desc: 'Gibt dir sofort 6 Gold — ein ordentlicher Goldschub.' },
  major_heal: { id: 'major_heal', name: 'Großer Heiltrank', type: 'resource', tier: 2, cost: 5, heal: 6, desc: 'Heilt dich sofort um 6 HP.' },
  wisdom_scroll: { id: 'wisdom_scroll', name: 'Weisheitsrolle', type: 'resource', tier: 2, cost: 5, draw: 4, gold: 2, desc: 'Ziehe 4 Karten und erhalte 2 Gold.' },
  war_horn: { id: 'war_horn', name: 'Kampfhorn', type: 'resource', tier: 2, cost: 5, doubleAttacks: true, desc: 'Alle deine Einheiten greifen diese Runde doppelt an!' },
  timestop: { id: 'timestop', name: 'Zeitstillstand', type: 'resource', tier: 2, cost: 5, skipOpponentTurn: true, desc: 'Dein Gegner überspringt seinen nächsten kompletten Zug!' },
  knight: { id: 'knight', name: 'Ritter', type: 'unit', tier: 2, cost: 5, attack: 5, health: 6, keywords: ['taunt'], desc: 'Starke Einheit (5 ATK / 6 HP) mit TAUNT.' },
  assassin: { id: 'assassin', name: 'Assassine', type: 'unit', tier: 2, cost: 5, attack: 6, health: 3, keywords: ['charge'], desc: 'Schnelle Einheit (6 ATK / 3 HP) mit CHARGE: Greift sofort beim Beschwören an!' },
  healer: { id: 'healer', name: 'Heiler', type: 'unit', tier: 2, cost: 5, attack: 2, health: 4, healPerTurn: 1, desc: 'Einheit (2 ATK / 4 HP) die dich jede Runde um 1 HP heilt.' },
  war_machine: { id: 'war_machine', name: 'Kriegsmaschine', type: 'unit', tier: 2, cost: 5, attack: 4, health: 8, aoeAttack: 2, desc: 'Massive Einheit (4 ATK / 8 HP). Angriff trifft auch Nachbarn für 2 Nahschaden.' },
  berserker: { id: 'berserker', name: 'Berserker', type: 'unit', tier: 2, cost: 5, attack: 7, health: 4, desc: 'Rohe Gewalt als Einheit (7 ATK / 4 HP).' },
  stone_wall: { id: 'stone_wall', name: 'Steinmauer', type: 'building', tier: 2, cost: 5, health: 12, fortify: true, desc: 'Massive Festung mit 12 HP. FORTIFY.' },
  catapult: { id: 'catapult', name: 'Katapult', type: 'building', tier: 2, cost: 5, health: 6, damagePerTurn: 4, desc: 'Gebäude mit 6 HP. Feuert jede Runde automatisch 4 Schaden auf den Gegner.' },
  gold_mine: { id: 'gold_mine', name: 'Goldmine', type: 'building', tier: 2, cost: 5, health: 8, goldPerTurn: 4, desc: 'Gebäude mit 8 HP. Produziert jede Runde satte 4 Gold für dich.' },
  temple: { id: 'temple', name: 'Tempel', type: 'building', tier: 2, cost: 5, health: 7, healPerTurn: 2, desc: 'Gebäude mit 7 HP. Heilt dich jede Runde um 2 HP.' },
  barracks: { id: 'barracks', name: 'Kaserne', type: 'building', tier: 2, cost: 5, health: 9, summonPerTurn: ['Ritter', 5, 6], desc: 'Gebäude mit 9 HP. Beschwört jede Runde automatisch einen Ritter (5/6)!' },

  // Tier 3 (cost 10)
  meteor: { id: 'meteor', name: 'Meteor', type: 'spell', tier: 3, cost: 10, damage: 15, aoeSecondary: 5, isSpell: true, desc: 'Verheerender Zauber: 15 Schaden auf ein Ziel plus 5 AOE auf alle anderen Feinde.' },
  apocalypse: { id: 'apocalypse', name: 'Apokalypse', type: 'spell', tier: 3, cost: 10, damage: 8, aoe: true, isSpell: true, desc: 'Fügt allen feindlichen Einheiten massiven 8 AOE-Schaden zu.' },
  soul_sever: { id: 'soul_sever', name: 'Seelenschnitt', type: 'spell', tier: 3, cost: 10, damage: 12, piercing: true, desc: 'Dunkler Zauber: 12 Schaden mit PIERCING — ignoriert TAUNT und trifft direkt.' },
  time_warp: { id: 'time_warp', name: 'Zeitverzerrung', type: 'spell', tier: 3, cost: 10, extraTurn: true, desc: 'Du erhältst sofort einen zusätzlichen kompletten Zug nach diesem!' },
  death_blow: { id: 'death_blow', name: 'Todesstoß', type: 'spell', tier: 3, cost: 10, executeAny: 8, goldBack: 5, desc: 'Tötet sofort jede Einheit mit 8 oder weniger HP. Gibt dir 5 Gold zurück.' },
  dragon_hoard: { id: 'dragon_hoard', name: 'Drachenhort', type: 'resource', tier: 3, cost: 10, gold: 12, desc: 'Gewaltiger Goldschub: Gibt dir sofort 12 Gold.' },
  elixir: { id: 'elixir', name: 'Elixier', type: 'resource', tier: 3, cost: 10, healAll: true, desc: 'Legendäres Elixier: Heilt dich vollständig auf deine maximalen HP!' },
  knowledge_book: { id: 'knowledge_book', name: 'Buch des Wissens', type: 'resource', tier: 3, cost: 10, draw: 8, desc: 'Ziehe sofort 8 Karten aus deinem Deck!' },
  divine_blessing: { id: 'divine_blessing', name: 'Göttl. Segen', type: 'resource', tier: 3, cost: 10, invulnerable: 2, desc: 'Göttlicher Schutz: Du bist 2 Runden lang komplett unverwundbar!' },
  black_hole: { id: 'black_hole', name: 'Schwarzes Loch', type: 'resource', tier: 3, cost: 10, destroyAllEnemies: true, desc: 'Zerstört ALLE feindlichen Einheiten und Gebäude sofort!' },
  dragon: { id: 'dragon', name: 'Drache', type: 'unit', tier: 3, cost: 10, attack: 10, health: 10, desc: 'Legendäre Einheit (10 ATK / 10 HP).' },
  angel: { id: 'angel', name: 'Engel', type: 'unit', tier: 3, cost: 10, attack: 6, health: 8, healAllPerTurn: 2, desc: 'Heilige Einheit (6 ATK / 8 HP). Heilt dich jede Runde um 2 HP.' },
  titan: { id: 'titan', name: 'Titan', type: 'unit', tier: 3, cost: 10, attack: 8, health: 15, keywords: ['taunt'], desc: 'Kolossale Einheit (8 ATK / 15 HP) mit TAUNT.' },
  demon_lord: { id: 'demon_lord', name: 'Dämonenfürst', type: 'unit', tier: 3, cost: 10, attack: 12, health: 6, desc: 'Dämonische Einheit (12 ATK / 6 HP). Brutaler Angriff.' },
  necromancer: { id: 'necromancer', name: 'Nekromant', type: 'unit', tier: 3, cost: 10, attack: 4, health: 5, resurrect: true, desc: 'Dunkle Einheit (4 ATK / 5 HP) mit Wiederbelebung.' },
  fortress: { id: 'fortress', name: 'Festung', type: 'building', tier: 3, cost: 10, health: 20, fortify: true, buffUnitsPerTurn: 1, desc: 'Mächtige Festung (20 HP) mit FORTIFY. Bufft jede Runde alle Einheiten +1/+1!' },
  mage_tower: { id: 'mage_tower', name: 'Magierturm', type: 'building', tier: 3, cost: 10, health: 10, damagePerTurn: 3, desc: 'Arkanes Gebäude (10 HP). Feuert jede Runde 3 Zauberschaden auf den Gegner.' },
  vault: { id: 'vault', name: 'Schatzkammer', type: 'building', tier: 3, cost: 10, health: 12, goldPerTurn: 6, desc: 'Gigantische Goldquelle (12 HP). Produziert jede Runde satte 6 Gold!' },
  cathedral: { id: 'cathedral', name: 'Kathedrale', type: 'building', tier: 3, cost: 10, health: 15, healPerTurn: 3, desc: 'Heiliges Gebäude (15 HP). Heilt dich jede Runde um 3 HP.' },
  demon_gate: { id: 'demon_gate', name: 'Dämonenpforte', type: 'building', tier: 3, cost: 10, health: 8, summonPerTurn: ['Dämon', 8, 4], desc: 'Dunkles Gebäude (8 HP). Beschwört jede Runde einen mächtigen Dämon (8/4)!' },

  // Cursed cards
  teufelspakt: { id: 'teufelspakt', name: 'Teufelspakt', type: 'spell', tier: 2, cost: 5, damage: 15, loseMaxHP: 5, rarity: 'cursed', desc: 'Fügt 15 Schaden zu — doch du verlierst permanent 5 Max-HP!' },
  blutzoll: { id: 'blutzoll', name: 'Blutzoll', type: 'spell', tier: 1, cost: 2, draw: 5, cursedCostPlus: 1, rarity: 'cursed', desc: 'Ziehe sofort 5 Karten! Dafür kosten alle Karten diese Runde +1 Gold mehr.' },
  seelenfresser: { id: 'seelenfresser', name: 'Seelenfresser', type: 'spell', tier: 3, cost: 10, destroyOwnUnits: true, dmgPerUnit: 8, rarity: 'cursed', desc: 'Opfere ALLE eigenen Einheiten! Jede geopferte Einheit fügt dem Gegner 8 Schaden zu.' },
  verfluchtes_gold: { id: 'verfluchtes_gold', name: 'Verfluchtes Gold', type: 'resource', tier: 1, cost: 2, gold: 10, oppDrawCards: 3, rarity: 'cursed', desc: 'Gibt dir satte 10 Gold! Aber dein Gegner zieht dafür 3 Karten.' },
  schwarzer_markt: { id: 'schwarzer_markt', name: 'Schwarzer Markt', type: 'spell', tier: 2, cost: 0, freeMarketBuy: true, doubleCostNext: 2, rarity: 'cursed', desc: 'Kaufe 1 Marktkarte komplett gratis! Dafür kosten deine nächsten 2 Käufe das Doppelte.' },
  wahnsinn: { id: 'wahnsinn', name: 'Wahnsinn', type: 'spell', tier: 2, cost: 5, randomDmg20: true, rarity: 'cursed', desc: 'Chaotisch: Fügt 20 Schaden zu — zufällig entweder dem Gegner ODER dir selbst!' },
  blutvertrag: { id: 'blutvertrag', name: 'Blutvertrag', type: 'spell', tier: 2, cost: 5, buffOwnAtk: 3, debuffOwnHP: 3, rarity: 'cursed', desc: 'Alle eigenen Einheiten erhalten +3 ATK, verlieren aber permanent 3 HP!' },
  hungrige_klinge: { id: 'hungrige_klinge', name: 'Hungrige Klinge', type: 'spell', tier: 1, cost: 3, damage: 12, selfDamage: 4, rarity: 'cursed', desc: 'Massiver 12 Schaden auf ein Ziel! Aber du selbst nimmst 4 Schaden.' },
  verfluchter_tempel: { id: 'verfluchter_tempel', name: 'Verfluchter Tempel', type: 'building', tier: 2, cost: 5, health: 8, goldPerTurn: 5, cursedBuildDeath: 15, rarity: 'cursed', desc: 'Gebäude (8 HP): +5 Gold pro Runde! Aber bei Zerstörung: 15 Schaden an dich!' },
  zeitdiebstahl: { id: 'zeitdiebstahl', name: 'Zeitdiebstahl', type: 'spell', tier: 3, cost: 8, extraTurn: true, skipNextOwnTurn: true, rarity: 'cursed', desc: 'Du erhältst sofort einen Extra-Zug! Danach überspringst du aber deinen nächsten.' },
  daemonenpakt: { id: 'daemonenpakt', name: 'Dämonenpakt', type: 'spell', tier: 3, cost: 8, summonCursedDemon: true, rarity: 'cursed', desc: 'Beschwört einen mächtigen 12/12 Dämon! Aber er fügt DIR jede Runde 3 Schaden zu.' },
  necrosis: { id: 'necrosis', name: 'Necrosis', type: 'spell', tier: 3, cost: 10, killAllBothSides: true, rarity: 'cursed', desc: 'Tötet ALLE Einheiten beider Spieler! Du ziehst 1 Karte pro getöteter Einheit.' },
  verdammte_ruestung: { id: 'verdammte_ruestung', name: 'Verdammte Rüstung', type: 'spell', tier: 1, cost: 2, armorThisRound: 10, noBuyThisRound: true, rarity: 'cursed', desc: 'Gibt dir 10 Rüstung für diese Runde! Aber du kannst diese Runde nichts kaufen.' },
  opferlamm: { id: 'opferlamm', name: 'Opferlamm', type: 'spell', tier: 2, cost: 5, healFull: true, killStrongest: true, rarity: 'cursed', desc: 'Heilt dich vollständig auf Max-HP! Dafür stirbt deine stärkste Einheit.' },
  armageddon: { id: 'armageddon', name: 'Armageddon', type: 'spell', tier: 3, cost: 8, aoeAll8: true, loseMaxHP: 3, rarity: 'cursed', desc: '8 Schaden an ALLE Einheiten und BEIDE Spieler! Du verlierst permanent 3 Max-HP.' },

  // Hero Power Cards
  hp_spark: { id: 'hp_spark', name: 'Funke', type: 'spell', tier: 0, cost: 0, damage: 1, isSpell: true, desc: 'Kleiner Zauber: Fügt 1 Schaden zu.' },
  hp_fairy_dust: { id: 'hp_fairy_dust', name: 'Feenstaub', type: 'resource', tier: 0, cost: 0, draw: 1, desc: 'Ziehe 1 Karte aus deinem Deck.' }
};

export const RACES: Record<RaceId, { name: string; icon: string; cards: { id: string; n: number }[] }> = {
  human: { name: 'Mensch', icon: '👑', cards: [{ id: 'weak_strike', n: 3 }, { id: 'coin', n: 3 }, { id: 'wooden_wall', n: 2 }, { id: 'marketplace', n: 2 }] },
  orc: { name: 'Ork', icon: '⚔️', cards: [{ id: 'slash', n: 3 }, { id: 'plunder', n: 4 }, { id: 'blood_rage', n: 1 }, { id: 'coin', n: 2 }] },
  elf: { name: 'Elf', icon: '✨', cards: [{ id: 'arcane_bolt', n: 3 }, { id: 'mana_crystal', n: 4 }, { id: 'meditation', n: 3 }] },
  undead: { name: 'Untoter', icon: '💀', cards: [{ id: 'dark_bolt', n: 3 }, { id: 'summon_skeleton', n: 3 }, { id: 'soul_steal', n: 2 }, { id: 'graveyard', n: 2 }] },
  dragon: { name: 'Drache', icon: '🐲', cards: [{ id: 'dragon_claw', n: 2 }, { id: 'gold_scale', n: 5 }, { id: 'dragon_nest', n: 3 }] },
  dwarf: { name: 'Zwerg', icon: '⛏️', cards: [{ id: 'hammer_throw', n: 3 }, { id: 'ore_chunk', n: 4 }, { id: 'forge', n: 3 }] },
  fairy: { name: 'Fee', icon: '🧚', cards: [{ id: 'fairy_bolt', n: 2 }, { id: 'fairy_dust', n: 4 }, { id: 'fairy_ring', n: 4 }] },
  demon: { name: 'Dämon', icon: '😈', cards: [{ id: 'hellfire', n: 2 }, { id: 'soul_harvest', n: 4 }, { id: 'blood_altar', n: 4 }] },
  werewolf: { name: 'Werwolf', icon: '🐺', cards: [{ id: 'bite', n: 4 }, { id: 'howl', n: 3 }, { id: 'den', n: 3 }] },
  vampire: { name: 'Vampir', icon: '🦇', cards: [{ id: 'vampire_bite', n: 2 }, { id: 'blood_coin', n: 4 }, { id: 'crypt', n: 4 }] }
};

export const RELICS: Record<string, RelicData> = {
  ring_of_greed: { id: 'ring_of_greed', name: 'Ring der Gier', icon: '💍', desc: 'Jede gekaufte Karte gibt 1 Gold zurück.' },
  blood_amulet: { id: 'blood_amulet', name: 'Blutamulett', icon: '📿', desc: 'Wenn HP unter 30 fällt: ziehe 2 Karten (einmalig).', oneTime: true },
  eternal_blade: { id: 'eternal_blade', name: 'Ewige Klinge', icon: '🗡️', desc: 'Erste Angriffskarte jede Runde kostet 0 Gold.' },
  wise_stone: { id: 'wise_stone', name: 'Weiser Stein', icon: '🔮', desc: 'Sieh die oberste Marktkarte am Rundenanfang.' },
  phoenix_feather: { id: 'phoenix_feather', name: 'Phönixfeder', icon: '🪶', desc: 'Einmal: Eigene Einheit kehrt mit halben HP zurück.', oneTime: true },
  hungry_idol: { id: 'hungry_idol', name: 'Hungerndes Idol', icon: '🗿', desc: 'Runde ohne Kauf = +3 Gold nächste Runde.' },
  rune_compass: { id: 'rune_compass', name: 'Runen-Kompass', icon: '🧭', desc: 'Markt zeigt 1 extra Karte der Gegner-Rasse.' },
  chain_gauntlet: { id: 'chain_gauntlet', name: 'Kettenhandschuh', icon: '🧤', desc: 'Eigene Einheit stirbt → 3 Schaden an Gegner.' },
  soul_mirror: { id: 'soul_mirror', name: 'Seelenspiegel', icon: '🪞', desc: '+1 Extrakarte pro Runde.' },
  time_glass: { id: 'time_glass', name: 'Zeitglas', icon: '⏳', desc: 'Einmal: Gold auf Wert der letzten Runde setzen.', oneTime: true }
};

export const RARITY_MAP: Record<string, CardRarity> = {
  // Common
  weak_strike: 'common', slash: 'common', arcane_bolt: 'common', dark_bolt: 'common', coin: 'common', plunder: 'common', mana_crystal: 'common', soul_steal: 'common', wooden_wall: 'common', fairy_bolt: 'common', bite: 'common', hammer_throw: 'common', hellfire: 'common', vampire_bite: 'common', blood_coin: 'common', ore_chunk: 'common', summon_skeleton: 'common',
  // Rare
  fireball: 'rare', chain_lightning: 'rare', healer: 'rare', meditation: 'rare', dragon_claw: 'rare', gold_scale: 'rare', fairy_dust: 'rare', soul_harvest: 'rare', blood_rage: 'rare', howl: 'rare', forge: 'rare', fairy_ring: 'rare', blood_altar: 'rare', den: 'rare', crypt: 'rare', graveyard: 'rare', marketplace: 'rare', execute: 'rare', herb_potion: 'rare',
  // Epic
  war_machine: 'epic', berserker: 'epic', stone_wall: 'epic', catapult: 'epic', gold_mine: 'epic', temple: 'epic', barracks: 'epic', flame_storm: 'epic', acid_rain: 'epic', meteor: 'epic', apocalypse: 'epic', soul_sever: 'epic', death_blow: 'epic', dragon_hoard: 'epic', knowledge_book: 'epic', black_hole: 'epic', elixir: 'epic', dragon_nest: 'epic',
  // Legendary
  dragon: 'legendary', angel: 'legendary', titan: 'legendary', demon_lord: 'legendary', necromancer: 'legendary', fortress: 'legendary', mage_tower: 'legendary', vault: 'legendary', cathedral: 'legendary', demon_gate: 'legendary', time_warp: 'legendary', divine_blessing: 'legendary',
  // Cursed
  teufelspakt: 'cursed', blutzoll: 'cursed', seelenfresser: 'cursed', verfluchtes_gold: 'cursed', schwarzer_markt: 'cursed', wahnsinn: 'cursed', blutvertrag: 'cursed', hungrige_klinge: 'cursed', verfluchter_tempel: 'cursed', zeitdiebstahl: 'cursed', daemonenpakt: 'cursed', necrosis: 'cursed', verdammte_ruestung: 'cursed', opferlamm: 'cursed', armageddon: 'cursed'
};

export function getCardRarity(card: CardData): CardRarity {
  if (card.rarity) return card.rarity;
  return RARITY_MAP[card.id] ?? 'common';
}

let uidCounter = 0;
export function createCardInstance(id: string): CardInstance {
  const data = CARDS_DB[id];
  if (!data) {
    throw new Error(`Card ID not found in CARDS_DB: ${id}`);
  }
  uidCounter++;
  return {
    ...data,
    uid: `${id}_${Date.now()}_${uidCounter}`,
    upgrades: 0,
    maxHealth: data.health,
    summoned: data.type === 'unit' && !data.keywords?.includes('charge')
  };
}
