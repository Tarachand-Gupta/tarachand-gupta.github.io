'use strict';
const examples = {
  api: { prompt: '“Let my agent check a package’s delivery status.”', tool: 'track_delivery(id)', label: 'Delivery API' },
  script: { prompt: '“Let my agent run my local image-resizing script.”', tool: 'resize_image(path, width)', label: 'Local Python script' },
  workflow: { prompt: '“Let my agent turn a CSV export into a weekly report.”', tool: 'build_report(csv_path)', label: 'Reporting workflow' }
};
const exampleTabs = [...document.querySelectorAll('[data-example]')];
const examplePanel = document.getElementById('example-panel');
function showExample(tab) {
  const example = examples[tab.dataset.example];
  exampleTabs.forEach(item => {
    const selected = item === tab;
    item.setAttribute('aria-selected', String(selected));
    item.tabIndex = selected ? 0 : -1;
  });
  examplePanel.setAttribute('aria-labelledby', tab.id);
  document.getElementById('example-prompt').textContent = example.prompt;
  document.getElementById('example-tool').textContent = example.tool;
  document.getElementById('example-status').textContent = `Illustrative example · ${example.label}`;
  examplePanel.classList.remove('switched');
  requestAnimationFrame(() => examplePanel.classList.add('switched'));
}
exampleTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => showExample(tab));
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % exampleTabs.length;
    if (event.key === 'ArrowLeft') next = (index + exampleTabs.length - 1) % exampleTabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = exampleTabs.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    showExample(exampleTabs[next]);
    exampleTabs[next].focus();
  });
});
