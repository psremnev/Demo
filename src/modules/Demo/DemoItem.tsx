import { Header } from 'header';

export default function DemoItem({
  title = '',
  content = 'Content'
}) {
  return (
    <section className="demoItem" style={{ marginBottom: 4, width: '100%' }}>
      <Header title={title} />
      <section style={{ display: 'flex', flexDirection: 'column', marginTop: 4 }}>{content}</section>
    </section>
  );
}
