export default function render(query: string, block: any) {
  const root = document.querySelector(query);
  // root?.innerHTML = '';
  root?.appendChild(block.getContent());
  block.dispatchComponentDidMount();
  return root;
}
