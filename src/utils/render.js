export function render(query, block) {
  console.log('util render');
  const root = document.querySelector(query);
  root.appendChild(block.getContent());
  block.dispatchComponentDidMount();
  return root;
}