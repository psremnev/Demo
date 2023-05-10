import Service from 'Service/Service';
import List from 'List/List';
import ArticleListItem from 'Articles/ArticleListItem';
import { openLink } from 'utils/openLink';

export default function (props) {
  const serv = new Service({ endpoint: 'List' });
  const items = [
    { id: 1, title: 'first' },
    { id: 2, title: 'second' },
  ];

  const ArticleListItemWrapper = ({ item }) => {
    return <ArticleListItem title={item.title} additionalText={item.additionalText} />;
  };

  return (
    <List
      source={serv}
      items={items}
      onItemClick={(item) => openLink(`/article?id=${item.id}`)}
      itemTemplate={ArticleListItemWrapper}
    />
  );
}
