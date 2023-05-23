import Service from 'Service/Service';
import List from 'List/List';
import ArticleListItem from 'Articles/ArticleListItem';
import { openLink } from 'utils/openLink';
import { Button } from 'button';
import { Popup, POPUP_TYPE } from 'popup';
import { useMemo } from 'react';

export default function (props) {
  const service = new Service({ endpoint: 'articles' });
  const popup = useMemo(() => new Popup(), []);
  const items = [
    { id: 1, title: 'first' },
    { id: 2, title: 'second' },
  ];

  const ArticleListItemWrapper = ({ item }) => {
    return <ArticleListItem title={item.title} additionalText={item.additionalText} />;
  };

  const createDialogContent = () => {
    const Input = <input placeholder="Введите газвание статьи" />;
    return (
      <>
        <input className='articlesAdd__name' placeholder="Введите газвание статьи" />
        <Button title="Сохранить" onClick={() => addArticle()} />
      </>
    );
  }

  const openArticleAddDialog = () => {
    popup.open({
      type: POPUP_TYPE.DIALOG,
      closeOnOutsideClick: true,
      canDrag: false,
      content: createDialogContent,
    });
  };

  const addArticle = () => {
    const title = (document.querySelector('.articlesAdd__name') as HTMLInputElement).value;
    service.create([{title}]).then((res) => {
      popup.close();
    });
  }

  return (
    <div className="flexbox flexDirectionColumn">
      <header>
        <Button icon="ti-plus" onClick={openArticleAddDialog} />
      </header>
      <List
        source={service}
        items={items}
        onItemClick={(item) => openLink(`/article?id=${item._id}`, true)}
        itemTemplate={ArticleListItemWrapper}
        backgroundColor="transparent"
      />
    </div>
  );
}
