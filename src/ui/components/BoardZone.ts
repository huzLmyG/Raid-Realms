import { PlayerState, TargetRef } from '../../core/types.ts';
import { createCardElement } from './CardView.ts';

export interface BoardZoneOptions {
  isEnemy: boolean;
  selectedAttackerSlot?: number | null;
  canTargetChecker?: (target: TargetRef) => boolean;
  onUnitClick?: (slotIndex: number) => void;
  onBuildingClick?: (buildingUid: string) => void;
}

export function renderBoardArea(
  player: PlayerState,
  ownerIndex: number,
  options: BoardZoneOptions
): HTMLElement {
  const area = document.createElement('div');
  area.className = `board-area ${options.isEnemy ? 'enemy-board' : 'my-board'}`;

  // Unit Section (7 slots)
  const unitSection = document.createElement('div');
  unitSection.className = 'board-section units-section';

  const totalUnitSlots = 7;
  for (let slotIndex = 0; slotIndex < totalUnitSlots; slotIndex++) {
    const unit = player.units[slotIndex];
    if (unit) {
      const isSelected = !options.isEnemy && options.selectedAttackerSlot === slotIndex;
      const canTarget = options.isEnemy && options.canTargetChecker
        ? options.canTargetChecker({ type: 'unit', ownerIndex, slotIndex })
        : false;

      const cardEl = createCardElement(unit, {
        isBoard: true,
        isSelected,
        canTarget,
        onClick: () => {
          if (options.onUnitClick) options.onUnitClick(slotIndex);
        }
      });
      unitSection.appendChild(cardEl);
    } else {
      const slotEl = document.createElement('div');
      slotEl.className = 'board-slot empty-slot unit-slot';
      slotEl.title = `Einheiten-Slot ${slotIndex + 1}`;
      slotEl.innerHTML = `<span class="slot-icon">⚔️</span><span class="slot-num">${slotIndex + 1}</span>`;
      unitSection.appendChild(slotEl);
    }
  }

  // Buildings Section (minimum 3 slots)
  const buildingSection = document.createElement('div');
  buildingSection.className = 'board-section buildings-section';

  const numBldgSlots = Math.max(3, player.buildings.length);
  for (let bIndex = 0; bIndex < numBldgSlots; bIndex++) {
    const building = player.buildings[bIndex];
    if (building) {
      const canTarget = options.isEnemy && options.canTargetChecker
        ? options.canTargetChecker({ type: 'building', ownerIndex, buildingUid: building.uid })
        : false;

      const cardEl = createCardElement(building, {
        isBoard: true,
        canTarget,
        onClick: () => {
          if (options.onBuildingClick) options.onBuildingClick(building.uid);
        }
      });
      buildingSection.appendChild(cardEl);
    } else {
      const slotEl = document.createElement('div');
      slotEl.className = 'board-slot empty-slot building-slot';
      slotEl.title = 'Gebäude-Slot (Passiv)';
      slotEl.innerHTML = `<span class="slot-icon">🏰</span>`;
      buildingSection.appendChild(slotEl);
    }
  }

  const divider = document.createElement('div');
  divider.className = 'board-divider';

  const labelUnits = document.createElement('div');
  labelUnits.className = 'board-label';
  labelUnits.textContent = 'EINHEITEN';

  const labelBldg = document.createElement('div');
  labelBldg.className = 'board-label';
  labelBldg.textContent = 'GEBÄUDE';

  if (options.isEnemy) {
    area.appendChild(labelBldg);
    area.appendChild(buildingSection);
    area.appendChild(divider);
    area.appendChild(unitSection);
    area.appendChild(labelUnits);
  } else {
    area.appendChild(labelUnits);
    area.appendChild(unitSection);
    area.appendChild(divider);
    area.appendChild(buildingSection);
    area.appendChild(labelBldg);
  }

  return area;
}

