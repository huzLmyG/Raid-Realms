// Entry Point for Raid Realms
console.log('[Raid Realms] Initializing application...');

const app = document.getElementById('app');
if (app) {
  app.innerHTML = `
    <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;text-align:center;gap:1rem;">
      <h1 style="font-family:'Cinzel',serif;font-size:3rem;color:#f0c040;letter-spacing:0.2rem;">RAID REALMS</h1>
      <p style="color:#c0a878;font-size:1.2rem;">Teil A1: Setup & Build-Pipeline bereit</p>
      <div style="font-size:0.9rem;color:#9b7fff;">102 Karten- und Porträt-Assets geladen</div>
    </div>
  `;
}
