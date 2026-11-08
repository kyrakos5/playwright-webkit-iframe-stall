// Logs each stretch of more than a second without an animation frame in this test page, while
// its timers keep running, and whether the top-level page still gets frames meanwhile.
const now = performance.now.bind(performance);
let last = now();
let frames = 0;
let stall = null;
const beat = () => {
  if (stall) {
    console.log(`[stall] ${Math.round(now() - stall.from)}ms without a frame after ${stall.frames} frames; timer gap at most ${Math.round(stall.gap)}ms; top page got a frame meanwhile: ${stall.top}`);
    stall = null;
  }
  last = now();
  frames += 1;
  requestAnimationFrame(beat);
};
requestAnimationFrame(beat);
let tick = now();
setInterval(() => {
  const gap = now() - tick;
  tick = now();
  if (now() - last < 1000) return;
  if (!stall) {
    stall = { from: last, frames, gap: 0, top: false };
    const s = stall;
    window.top.requestAnimationFrame(() => { s.top = true; });
  }
  stall.gap = Math.max(stall.gap, gap);
}, 50);
