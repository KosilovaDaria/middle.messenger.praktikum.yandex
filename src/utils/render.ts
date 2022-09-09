export default function render(query: string, block: Record<string, any>) {
  const root = document.querySelector(query);
  root?.appendChild(block.getContent());
  block.dispatchComponentDidMount();
  return root;
}
