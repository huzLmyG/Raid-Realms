# 🖥️ Tauri v2 Desktop Build & Steamworks Leitfaden — RAID REALMS

Dieser Leitfaden beschreibt, wie **Raid Realms** als native Windows-Executable (.exe / MSI) für den Desktop und den Steam-Release kompiliert wird.

---

## 🛠️ Voraussetzungen für lokale Windows-Builds
1. **Node.js:** v20+ (`npm install`)
2. **Rust & Cargo:** Installiere [rustup](https://rustup.rs/) (Stable Toolchain: `x86_64-pc-windows-msvc`).
3. **C++ Build Tools:** Visual Studio Build Tools 2022 mit dem Paket „Desktop-Entwicklung mit C++“.
4. **WebView2:** Auf modernen Windows 10/11 Systemen vorinstalliert.

---

## 🚀 Build-Befehle

### 1. Entwicklungsmodus (Hot-Reload mit nativem Fenster)
```powershell
npm run tauri dev
```

### 2. Standalone Windows Release-Build (.exe & MSI)
```powershell
npm run tauri:build
```
Das fertige Executable wird generiert unter:
`src-tauri/target/release/raid-realms.exe`
und das Installationspaket unter:
`src-tauri/target/release/bundle/msi/raid-realms_0.1.0_x64_en-US.msi`

---

## 🎮 Vorbereitung für Steam (Steamworks SDK)
Für den Steam-Release (4,99 € – 7,99 €) kann das Rust-Crate `steamworks` direkt in `src-tauri/Cargo.toml` eingebunden werden:
```toml
[dependencies]
steamworks = "0.11"
```
Damit stehen folgende Features zur Verfügung:
- Steam Overlay (Shift+Tab)
- Steam Achievements (z.B. „Erster Sieg mit Dämon“, „10 Runden überlebt“)
- Steam Cloud-Saves für Kampagnenfortschritt und Statistiken
- DRM-Schutz und automatische Updates
