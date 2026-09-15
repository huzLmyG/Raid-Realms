// Particle and Screen Juice Effects for Raid Realms

class JuiceSystem {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private particles: Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    alpha: number;
    color: string;
    size: number;
    decay: number;
  }> = [];
  private animationId: number | null = null;

  public init(): void {
    if (this.canvas) return;
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'juice-canvas';
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100vw';
    this.canvas.style.height = '100vh';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.zIndex = '9998';
    document.body.appendChild(this.canvas);

    this.ctx = this.canvas.getContext('2d');
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  private resize(): void {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  public burst(x: number, y: number, color = '#f0c040', count = 20): void {
    this.init();
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 5;
      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.5,
        alpha: 1,
        color,
        size: 3 + Math.random() * 3,
        decay: 0.02 + Math.random() * 0.02
      });
    }
    if (!this.animationId) {
      this.loop();
    }
  }

  private loop = (): void => {
    if (!this.ctx || !this.canvas) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.12; // Gravitation
      p.alpha -= p.decay;

      if (p.alpha <= 0) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, p.alpha);
      this.ctx.fillStyle = p.color;
      this.ctx.shadowColor = p.color;
      this.ctx.shadowBlur = 6;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }

    if (this.particles.length > 0) {
      this.animationId = requestAnimationFrame(this.loop);
    } else {
      this.animationId = null;
    }
  };

  public shakeScreen(heavy: boolean = false): void {
    const target = document.querySelector('.game-layout') as HTMLElement;
    if (!target) return;
    const className = heavy ? 'screen-shake-heavy' : 'screen-shake';
    target.classList.remove('screen-shake', 'screen-shake-heavy');
    void target.offsetWidth; // Trigger reflow
    target.classList.add(className);
    setTimeout(() => {
      target.classList.remove(className);
    }, 400);
  }

  public showFloatingText(text: string, x: number, y: number, type: 'damage' | 'heal' | 'gold'): void {
    const floater = document.createElement('div');
    floater.className = `floating-text ${type}`;
    floater.textContent = text;
    floater.style.left = `${x}px`;
    floater.style.top = `${y}px`;
    document.body.appendChild(floater);

    setTimeout(() => {
      floater.remove();
    }, 1000);
  }
}

export const Juice = new JuiceSystem();
