import { mkdirSync, writeFileSync } from 'node:fs';

const test = `import { expect, it } from 'vitest';
import { userEvent } from 'vitest/browser';

it('opens and closes a dialog', async () => {
  const root = document.createElement('div');
  root.innerHTML = '<label><input type="checkbox"> Restock</label>'
    + '<button type="button" id="open">Open</button>'
    + '<dialog><button type="button" id="close">Close</button></dialog>';
  document.body.append(root);
  const dialog = root.querySelector('dialog');
  root.querySelector('#open').addEventListener('click', () => dialog.showModal());
  root.querySelector('#close').addEventListener('click', () => dialog.close());
  await userEvent.click(root.querySelector('#open'));
  await userEvent.click(root.querySelector('#close'));
  expect(dialog.open).toBe(false);
});
`;
mkdirSync('tests', { recursive: true });
for (let n = 0; n < 250; n += 1) {
  writeFileSync(`tests/t${String(n).padStart(3, '0')}.test.js`, test);
}
