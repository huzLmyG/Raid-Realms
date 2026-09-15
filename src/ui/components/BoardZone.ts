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

  // Unit Section
  const unitSection = document.createElement('div');
  unitSection.className = 'board-section';

  player.units.forEach((unit, slotIndex) => {
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
    }
  });

  // Buildings Section
  const buildingSection = document.createElement('div');
  buildingSection.className = 'board-section';

  player.buildings.forEach((building) => {
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
  });

  const divider = document.createElement('div');
  divider.className = 'board-divider';

  if (options.isEnemy) {
    // Enemy: Buildings on top, Units on bottom
    area.appendChild(buildingSection);
    area.appendChild(divider);
    area.appendChild(unitSection);
  } else {
    // Player: Units on top, Buildings on bottom
    area.appendChild(unitSection);
    area.appendChild(divider);
    area.appendChild(buildingSection);
  }

  return area;
}
