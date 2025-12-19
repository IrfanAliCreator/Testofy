 /*🔋 FULL BATTERY SYSTEM (SAFE) */
(function () {
  const battText = document.getElementById("ltu-batteryStatus");
  const chargeText = document.getElementById("ltu-chargeStatus");
  const batteryDiv = document.querySelector(".battery");
  const indicator = batteryDiv ? batteryDiv.querySelector(".indicator") : null;

  if (!("getBattery" in navigator)) {
    // Browser not supported
    if (battText) battText.textContent = "Battery: Not Supported";
    if (chargeText) chargeText.textContent = "Charging: N/A";
    if (batteryDiv) batteryDiv.setAttribute("data-level", "N/A");
    return;
  }

  navigator.getBattery().then((battery) => {
    function updateBatteryUI() {
      const level = battery.level;
      const percent = Math.round(level * 100);

      // Text display
      if (battText) battText.textContent = "Battery: " + percent + "%";
      if (chargeText)
        chargeText.textContent =
          "Charging: " + (battery.charging ? "Yes" : "No");

      // Indicator bar update
      if (indicator && batteryDiv) {
        const maxWidth = 160; // same width as your original design
        indicator.style.width = percent * (maxWidth / 100) + "px";
        batteryDiv.setAttribute("data-level", percent + "%");
      }
    }

    // Initial update
    updateBatteryUI();

    // Live events
    battery.addEventListener("levelchange", updateBatteryUI);
    battery.addEventListener("chargingchange", updateBatteryUI);
  });
})();
  