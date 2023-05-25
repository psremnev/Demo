import Service from 'Service/Service';
import List from 'List/List';
import { openLink } from 'base_utils/openLink';
import { Button } from 'button';
import { Popup, POPUP_TYPE } from 'popup';
import { useMemo } from 'react';
import { Header } from 'header';
import Article from 'Article/Article';

/**
 * @link Articles/Articles
 * @description Список Статей
 */
export default function () {
  const service = new Service({ endpoint: 'articles' });
  const popup = useMemo(() => new Popup(), []);

  /**
   * Контент диалога создания статьи
   */
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
        <Button title="Сохранить" onClick={() => saveArticle()} />
      </>
    );
  };

  /**
   * Открыть диалог создания статьи
   */
  const openArticleAddDialog = () => {
    popup.open({
      type: POPUP_TYPE.DIALOG,
      title: 'Новая статья',
      closeOnOutsideClick: true,
      canDrag: true,
      content: createDialogContent,
    });
  };

  /**
   * Сохранить статью на БЛ
   */
  const saveArticle = () => {
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
      <header className="flexbox marginLeft-pre-m">
        <Button icon="ti-plus" onClick={openArticleAddDialog} />
      </header>
      <List
        source={service}
        onItemClick={(item) =>
          openLink(`/article?id=${item._id}&mode=view&page=true`, true)
        }
        itemTemplate={Article}
        backgroundColor="transparent"
        itemsContainerPadding={{ left: 6, right: 6 }}
        itemPadding={{ bottom: 15 }}
        showShadow={false}
        showScrollBar={false}
      />
    </div>
  );
}
