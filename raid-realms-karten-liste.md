# RAID REALMS – Kartenliste für Bildgenerierung

**Bildformat:** PNG, quadratisch, mindestens **512×512px** (besser 1024×1024px).  
Stil-Empfehlung: **Dark Fantasy Pixel Art** oder illustrierter Dark-Fantasy-Stil, schwarzer/dunkler Hintergrund.  
Ich kann die Bilder als PNG annehmen und in das Spiel einbauen.

---

## 🗡️ ZAUBER-KARTEN (rote Kartenrahmen)

| ID | Name | Bildmotiv | Effekt |
|---|---|---|---|
| `weak_strike` | **Schwacher Schlag** | Eine zitternde Faust mit einem kleinen Messer, kaum befriedigend | 2 Schaden |
| `slash` | **Hieb** | Ein breites Ork-Schwert schlägt von links nach rechts, Blutspritzer | 3 Schaden |
| `blood_rage` | **Kampfrausch** | Ein Ork-Krieger mit rot leuchtenden Augen, Wunden am Körper, der mit voller Wucht zuschlägt | 7 Schaden, -2 HP Selbstschaden |
| `stone_strike` | **Steinschlag** | Ein riesiger Felsbrocken fliegt auf ein Ziel zu, Staubwolke | 4 Schaden |
| `arrow_salvo` | **Pfeilsalve** | Zehn Pfeile gleichzeitig abgefeuert, ein Bogen im Vordergrund | 2 Schaden an ALLE feindl. Einheiten (AOE) |
| `knife_throw` | **Messerwurf** | Ein Messer dreht sich in der Luft, Zielscheibe im Hintergrund | 3 Schaden + 1 Karte ziehen |
| `poison_spit` | **Giftspucke** | Ein Dämon spuckt grüne Säure, brennende Schäden auf dem Boden | 2 Schaden + 2 Gift-Schaden |
| `shockwave` | **Schockwelle** | Energiewelle breitet sich kreisförmig aus, zertrümmert alles | 1 Schaden an alle + Gegner direkt |
| `fireball` | **Feuerball** | Ein lodernder orangegelber Feuerball mit Flammenspiralen | 8 Schaden (Zauber) |
| `flame_storm` | **Flammensturm** | Ein Magier dreht sich, Feuer schlägt in alle Richtungen aus | 4 Schaden an alle feindl. Einheiten |
| `chain_lightning` | **Kettenblitz** | Blitz springt von Figur zu Figur, violette Energieketten | 5 Schaden, springt auf weitere Ziele |
| `execute` | **Exekution** | Ein Henker mit Kapuze, Schwert erhoben, Schattensilhouette | Tötet sofort Einheiten mit ≤5 HP |
| `acid_rain` | **Säureregen** | Grüner saurer Regen fällt, Rüstungen dampfen, Boden schmilzt | 2 AOE-Schaden + 2 Gift |
| `arcane_bolt` | **Arkaner Pfeil** | Ein schlanker elfischer Zauberpfeil aus reinem blauen Licht | 2 Schaden (Zauber, triggert Ketten) |
| `dark_bolt` | **Dunkler Pfeil** | Ein Schädel-geformter schwarzlila Projektil mit Todesenergie | 2 Schaden |
| `soul_steal` | **Seelen-Dieb** | Eine dunkle Hand reißt einen leuchtenden Geist aus einem Körper | 4 Schaden |
| `dragon_claw` | **Drachenklaue** | Eine massive drachenhafte Klaue schlägt von oben herab | 3 Schaden |
| `hammer_throw` | **Hammerwurf** | Ein rotierender Kriegshammer fliegt in Bogenform, Funken | 2 Schaden, upgradeable |
| `fairy_bolt` | **Feenpfeil** | Ein kleiner glitzernder Lichtstrahl schießt wie ein Pfeil, Glitzerspuren | 3 Schaden (echo-fähig) |
| `hellfire` | **Höllenfeuer** | Flammen steigen aus dem Boden auf, rot-schwarz-orange, dämonisch | 5 Schaden, -2 HP Selbstschaden |
| `bite` | **Biss** | Wolfskiefer zubeißend, Blutspritzer | 3 Schaden + 1 Wolf (1/1) |
| `howl` | **Heulen** | Ein Werwolf heult zum Vollmond, zwei Wolfsilhouetten erscheinen | Beschwört 2 Wölfe (1/1 je) |
| `vampire_bite` | **Vampirbiss** | Vampirzähne in einem Hals, roter Lebensfluss | 4 Schaden mit Lifesteal |
| `plunder` | **Plünderung** | Ein Ork leert einen Geldbeutel über seine Hand, während er grinst | 2 Schaden + 1 Gold |
| `meteor` | **Meteor** | Ein riesiger glühender Felsbrocken mit Feuerschweif rast zur Erde | 15 Schaden + 5 AOE |
| `apocalypse` | **Apokalypse** | Der Himmel bricht auf, Feuerregen und Dunkelheit überall | 8 Schaden an alle Einheiten |
| `soul_sever` | **Seelenschnitt** | Ein unsichtbarer Schnitt reißt eine Seele entzwei, schwarze Energie | 12 Schaden, penetrierend |
| `time_warp` | **Zeitverzerrung** | Eine Sanduhr explodiert, Zeit-Spiralen und Uhrenzeiger | Nochmal dein Zug |
| `death_blow` | **Todesstoß** | Ein einzelner gezielter Schlag trifft mehrere Silhouetten auf einmal | Tötet alle ≤8 HP + 5 Gold |
| `meditation` | **Meditation** | Ein Elf sitzt im Lotussitz, Magie-Ringe um ihn herum | 3 Karten ziehen (Zauber) |

---

## 🏃 EINHEITEN-KARTEN (dunkelrote Kartenrahmen)

| ID | Name | Bildmotiv | Stats & Fähigkeit |
|---|---|---|---|
| `militia` | **Miliz** | Ein einfacher Bauer mit Speer und Holzschild, Bauernkleidung | 3/4 – Einfache Kampfeinheit |
| `archer` | **Bogenschütze** | Ein Bogenschütze zieht einen Pfeil zurück, konzentrierter Blick | 2/2 – Fernkampf |
| `guard_dog` | **Wachhund** | Ein zähnefletschender Hund mit Stachelkragen, schutzbereit | 2/3 – **TAUNT**: muss zuerst angegriffen werden |
| `peasant` | **Leibeigener** | Ein müder Bauer trägt einen Sack, aber lächelt (Goldmünzen purzeln) | 1/2, generiert +1 Gold/Runde |
| `shield_bearer` | **Schildträger** | Eine Figur versteckt sich vollständig hinter einem Riesenturnierschild | 1/5 – **TAUNT** |
| `assassin` | **Assassine** | Ein schwarz gekleideter Attentäter springt aus dem Schatten, Dolch | 6/3 – **CHARGE**: greift sofort an |
| `knight` | **Ritter** | Ein vollgerüsteter Ritter auf Streitross, Lanze und Schild | 5/6 – **TAUNT** |
| `healer` | **Heiler** | Ein freundlicher Priester mit Stab und Heiligenschein, grüne Energie | 2/4, heilt +1 HP/Runde |
| `war_machine` | **Kriegsmaschine** | Ein massiver Belagerungsturm auf Rädern, mit Pfeilen und Schleudern | 4/8 – AOE-Nebenschaden 2 |
| `berserker` | **Berserker** | Ein nackter Ork mit Narben, zwei Äxte, völlig in Rage | 7/4 – stärker bei wenig HP |
| `dragon` | **Drache** | Ein majestätischer schwarzer Drache entfaltet seine Schwingen | 10/10 |
| `angel` | **Engel** | Ein strahlender Engel mit goldenen Flügeln, Heilsaura | 6/8, +2 HP/Runde für alle Verbündete |
| `titan` | **Titan** | Ein steinerner Riese so groß wie ein Berg, alles überragend | 8/15 – **TAUNT** |
| `demon_lord` | **Dämonenfürst** | Ein hörniger Dämon aus dem Abgrund, flammendes Schwert | 12/6 – Angriff kostet -2 HP |
| `necromancer` | **Nekromant** | Ein Zauberer im schwarzen Mantel beschwört Skelette aus dem Boden | 4/5 – Belebt tote Einheiten |

---

## 🏰 GEBÄUDE-KARTEN (goldgelbe Kartenrahmen)

| ID | Name | Bildmotiv | Effekt |
|---|---|---|---|
| `wooden_wall` | **Holzmauer** | Grobe Palisaden aus Baumstämmen, hastig errichtet | 5 HP – 🛡 FORTIFY: Blockiert Direktangriffe |
| `marketplace` | **Marktplatz** | Bunte Marktstände, reger Handel, Händler aus allen Reichen | 6 HP – +2 Gold/Runde |
| `barricade` | **Barrikade** | Umgekippte Karren, Tische, Fässer zusammengeschoben | 6 HP – 🛡 FORTIFY |
| `stone_wall` | **Steinmauer** | Massive, meterdicke Steinquader, fast unzerstörbar | 12 HP – 🛡 FORTIFY |
| `watch_tower` | **Wachturm** | Hoher Holzturm, Bogenschütze oben, Fackeln | 4 HP – 1 Schaden/Runde auf Gegner |
| `treasure_chest` | **Schatztruhe** | Eine schwere Eichentruhe mit Goldverzierungen und Schloss | 3 HP – +2 Gold/Runde |
| `alchemy_lab` | **Alchemielabor** | Brodelnde Fläschchen, dampfende Kessel, Bücherregal | 5 HP – +1 HP/Runde |
| `recruit_tent` | **Rekrutierungszelt** | Großes Militärzelt mit Fahnenstange, Warteschlange davor | 4 HP – +1 Miliz (3/4)/Runde |
| `catapult` | **Katapult** | Riesiges hölzernes Katapult, gespannt und feuerbereit | 6 HP – +4 Schaden/Runde auf Gegner |
| `gold_mine` | **Goldmine** | Minenstollen im Berg, Schienenkarren, Glühwürmchen-Licht | 8 HP – +4 Gold/Runde |
| `temple` | **Tempel** | Ein prächtiger weißer Tempel mit Lichtstrahlen | 7 HP – +2 HP/Runde |
| `barracks` | **Kaserne** | Militärisches Backsteingebäude, Waffenständer davor | 9 HP – +1 Ritter (5/6)/Runde |
| `fortress` | **Festung** | Eine riesige mittelalterliche Burg auf einem Felsen, uneinnehmbar | 20 HP – 🛡 FORTIFY + alle Einheiten +1/+1/Runde |
| `mage_tower` | **Magierturm** | Ein hoher Turm mit leuchtenden Runen und magischer Aura | 10 HP – +3 Schaden/Runde |
| `vault` | **Schatzkammer** | Gewölbekeller voller Goldstapel, Stahltor, Schlösser | 12 HP – +6 Gold/Runde |
| `cathedral` | **Kathedrale** | Gotische Kathedrale mit Buntglasfenstern und Glockenturm | 15 HP – +3 HP/Runde |
| `demon_gate` | **Dämonenpforte** | Teuflisches Portal mit Flammen, Hieroglyphen, schwebt in der Luft | 8 HP – +1 Dämon (8/4)/Runde |
| `fairy_ring` | **Feenkreis** | Ein Pilzring im Mondlicht, Glühwürmchen und Magie | 5 HP – +1 Gold/Runde |
| `blood_altar` | **Blutaltar** | Steinischer Opferaltar mit roten Flecken, dämonischen Gravuren | 6 HP – +2 Gold/Runde, -1 HP/Runde |
| `crypt` | **Gruft** | Uraltes Mausoleum mit gekritzelten Runen, dunkle Energie | 6 HP – +2 HP/Runde |
| `graveyard` | **Friedhof** | Verwitterte Grabsteine, Nebel, ein Skelett steigt auf | Beschwört 1 Skelett (1/1)/Runde |
| `den` | **Höhle** | Eine felsige Wolfshöhle mit Knochen davor, Augen leuchten | +1 Wolf (2/2)/Runde |
| `dragon_nest` | **Drachennest** | Ein riesiges Nest aus Felsen und Knochen, Goldmünzen darunter | +2 Gold/Runde |
| `forge` | **Schmiede** | Glühendes Feuer, Amboss, Zwerge beim Schmieden, Funkenregen | Upgraded 1 Karte in Hand/Runde |

---

## 💰 RESSOURCEN-KARTEN (grüne Kartenrahmen)

| ID | Name | Bildmotiv | Effekt |
|---|---|---|---|
| `coin` | **Münze** | Eine einzelne goldene Münze, abgegriffen und alt | +1 Gold |
| `mana_crystal` | **Mana-Kristall** | Ein leuchtender violetter Kristall mit innerer Energie | +2 Gold + 1 Karte |
| `gold_scale` | **Goldschuppe** | Eine schimmernde goldfarbene Drachenschuppe | +2 Gold |
| `blood_coin` | **Blutgeld** | Eine dunkelrote Münze mit Totenzeichen | +3 Gold |
| `ore_chunk` | **Erz** | Ein unbearbeiteter Eisenerzbrocken mit Glanz | +1 Gold (upgradeable) |
| `coin_pouch` | **Münzbeutel** | Ein praller Lederbeutel mit herausquellenden Münzen | +3 Gold |
| `treasure_hoard` | **Schatzkiste** | Eine Truhe reißt auf, Gold quillt heraus | +6 Gold |
| `dragon_hoard` | **Drachenhort** | Drachenkopf auf einem riesigen Goldberg, Augen funkeln gierig | +12 Gold |
| `emergency_heal` | **Notheilung** | Ein Heiltrank wird in letzter Sekunde getrunken, rotes Leben | +3 HP |
| `major_heal` | **Großer Heiltrank** | Eine riesige Phiole leuchtendes grünes Heilwasser | +6 HP |
| `elixir` | **Elixier** | Ein perfektes goldenes Fläschchen mit Rosenduft-Dampf | Vollständig auf Max HP heilen |
| `herb_potion` | **Kräutertrank** | Grüne Kräuter, eine Phiole mit dampfendem Trank | 2 Karten ziehen |
| `wisdom_scroll` | **Weisheitsrolle** | Eine aufgerollte elfische Pergamentrolle mit Magie-Schrift | 4 Karten + 2 Gold |
| `knowledge_book` | **Buch des Wissens** | Ein dickes altes Buch mit golden leuchtenden Seiten | 8 Karten ziehen |
| `whetstone` | **Wetzstein** | Ein grauer Schleifstein, eine Klinge daran schärfend | +2 Schaden auf nächste Karte |
| `smoke_bomb` | **Rauchbombe** | Eine schwarze Bombe, dichter Qualm quillt heraus | Blockiert nächsten Angriff |
| `war_horn` | **Kampfhorn** | Ein verziertes Hörn, Schallwellen sichtbar | Alle Einheiten greifen 2× an |
| `timestop` | **Zeitstillstand** | Eine Sanduhr eingefroren in der Luft, alles um sie erstarrt | Gegner überspringt Runde |
| `divine_blessing` | **Göttlicher Segen** | Ein goldener Heiligenschein leuchtet über einer Figur | 2 Runden unverwundbar |
| `black_hole` | **Schwarzes Loch** | Ein saugendes schwarzes Loch verschlingt alle Kreaturen | Vernichtet alle feindl. Einheiten |
| `fairy_dust` | **Feenstaub** | Goldglitzernder Staub in der Luft, Fee im Hintergrund | +2 Gold + 1 Karte (echo-fähig) |
| `soul_harvest` | **Seelenernte** | Ein Dämon erntet Seelen wie Weizen, Sichel in der Hand | -3 HP, +5 Gold |

---

## 📐 Technische Hinweise für Bildgenerierung

- **Format:** PNG, quadratisch
- **Mindestgröße:** 512×512px (besser: 1024×1024px)
- **Stil:** Dark Fantasy, illustriert, detailreich — **kein** heller Hintergrund, dunkler Hintergrund bevorzugt (schwarz, dunkelviolett, dunkelgrau)
- **Bildinhalt:** Das Motiv soll **das zentrale Objekt/die Figur** zeigen, keine Rahmen oder UI-Elemente
- Rasse-Icons (für später):
  - 👑 Mensch: Krone auf Sockel
  - ⚔️ Ork: Gekreuzte Beile
  - ✨ Elf: Magischer Pfeil mit Sternen
  - 💀 Untoter: Totenkopf mit glühenden Augen
  - 🐲 Drache: Drachenkopf-Profil
  - ⛏️ Zwerg: Runen-Hammer
  - 🧚 Fee: Feenflügel mit Glitzer
  - 😈 Dämon: Hörner und Flammen
  - 🐺 Werwolf: Werwolf-Silhouette vor Mond
  - 🦇 Vampir: Fledermaus-Umhang-Figur
