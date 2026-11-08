# WebKit on Windows: an iframe page stops getting animation frames

A minimal reproduction for a Playwright WebKit issue on Windows: a test page in a same-origin
iframe stops getting `requestAnimationFrame` callbacks for 1.4 to 20 s while its timers keep
running, so actions that wait for a stable element time out.

The runner is Vitest's browser mode with the Playwright provider, which runs each test file in a
fresh iframe inside a harness page. `watch.js` runs in every test page and logs each stall.
`make-tests.mjs` writes 250 copies of one small test, so that 250 fresh pages run.

## Steps

The stall needs a busy machine, so run it in two copies of this folder at the same time:

```
npm install
npx playwright install webkit
node make-tests.mjs
npx vitest run --silent=false
```

## What to look for

Lines like these, and sometimes a failed test:

```
[stall] 12888ms without a frame after 2 frames; timer gap at most 81ms; top page got a frame meanwhile: true
TimeoutError: locator.click: Timeout 14894ms exceeded.
```
