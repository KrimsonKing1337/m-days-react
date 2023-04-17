export async function startBatteryWatch(
  updateLevelInfoCb: (isLow: boolean) => void,
  updateChargeInfoCb: (isCharging: boolean) => void,
) {
  const battery = await (navigator as any).getBattery();

  function updateLevelInfo() {
    updateLevelInfoCb(battery.level * 100 < 15);
  }

  function updateChargeInfo() {
    updateChargeInfoCb(battery.charging);
  }

  function updateAllBatteryInfo() {
    updateChargeInfo();
    updateLevelInfo();
  }

  updateAllBatteryInfo();

  battery.addEventListener('chargingchange', () => {
    updateChargeInfo();
  });

  battery.addEventListener('levelchange', () => {
    updateLevelInfo();
  });
}
