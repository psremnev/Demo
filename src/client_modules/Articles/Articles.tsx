import Service from 'Service/Service';
import List from 'List/List';
import ArticleListItem from 'Articles/ArticleListItem';
import { openLink } from 'src/base_utils/openLink';
import { Button } from 'button';
import { Popup, POPUP_TYPE } from 'popup';
import { useMemo } from 'react';
import { Header } from 'header';

export default function (props) {
  const service = new Service({ endpoint: 'articles' });
  const popup = useMemo(() => new Popup(), []);

  const ArticleListItemWrapper = ({ item }) => {
    return (
      <ArticleListItem title={item.title} description={item.description} />
    );
  };

  const createDialogContent = () => {
    return (
      <>
        <div>
          <Header title="Заголовок" size={16} />
          <input
            className="articlesAdd__name"
            placeholder="Введите заголовок статьи"
          />
        </div>
        <div>
          <Header title="Описание" size={16} />
          <input
            className="articlesAdd__description"
            placeholder="Введите краткое описание статьи"
          />
        </div>
        <Button title="Сохранить" onClick={() => addArticle()} />
      </>
    );
  };

  const openArticleAddDialog = () => {
    popup.open({
      type: POPUP_TYPE.DIALOG,
      title: 'Новая статья',
      closeOnOutsideClick: true,
      canDrag: true,
      content: createDialogContent
    });
  };

  const addArticle = () => {
    const title = (
      document.querySelector('.articlesAdd__name') as HTMLInputElement
    ).value;
    const description = (
      document.querySelector('.articlesAdd__description') as HTMLInputElement
    ).value;
    if (title) {
      service.create([{ title, description }]).then((res) => {
        popup.close();
      });
    } else {
      alert('Не задано имя');
    }
    
  };

  return (
    <div className="flexbox flexDirectionColumn fullWidth">
      <header className="flexbox">
        <Button title='Добавить' icon="ti-plus" onClick={openArticleAddDialog} />
      </header>
      <List
        source={service}
        onItemClick={(item) => openLink(`/article?id=${item._id}&&mode='view'`, true)}
        itemTemplate={ArticleListItemWrapper}
        backgroundColor="transparent"
      />
    </div>
  );
}
