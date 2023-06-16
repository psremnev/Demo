import Service from 'Service/Service';
import List from 'List/List';
import { openLink } from 'utils/openLink';
import { Button } from 'button';
import { Popup, POPUP_TYPE } from 'popup';
import { useMemo } from 'react';
import Article from 'Article/Article';
import { useRef } from 'react';
import {CreateDialog} from './CreateDialog';

/**
 * @link Articles/Articles
 * @description Список Статей
 */
export default function () {
  const collection = useRef(null);
  const service = new Service({ endpoint: 'articles' });
  const popup = useMemo(() => new Popup(), []);
  service.call('find', {}).then((res) => {
    const d = res;
  });

  /**
   * Открыть диалог создания статьи
   */
  const openArticleAddDialog = () => {
    popup.open({
      type: POPUP_TYPE.STACK,
      width: 500,
      title: 'Новая статья',
      closeOnOutsideClick: true,
      canDrag: true,
      content: CreateDialog,
      eventHandlers: {
        onResult: (res) => {
          saveArticle(res);
        }
      }
    });
  };

  const menuClickCallback = (command, data) => {
    switch (command) {
      case 'delete':
        service.delete([data]).then((res) => {
          popup.close();
          collection.current.delete(data);
        });
    }
  };

  /**
   * Сохранить статью на БЛ
   */
  //{ title, author, authorPhoto, content }
  const saveArticle = ({ title, author, photo, content }) => {
    if (title) {
      service.create([{ title, author, photo, content }]).then(async (res) => {
        popup.close();
        const newArticle = await service.read({ _id: res.insertedId });
        collection.current.add(newArticle, 0);
      });
    } else {
      alert('Не задано имя');
    }
  };

  const dataLoadCallback = (newCollection) =>
    (collection.current = newCollection);

  return (
    <div className="flexbox flexDirectionColumn fullWidth">
      <header
        className="flexbox marginLeft-pre-m marginBottom-pre-m"
        style={{ marginBottom: 6, position: 'sticky', top: 0 }}
      >
        <Button icon="ti-plus" onClick={openArticleAddDialog} />
      </header>
      <List
        idProperty="_id"
        source={service}
        onItemClick={(item) =>
          openLink(`/article?id=${item._id}&mode=view&page=true`, true)
        }
        itemTemplate={(props) => (
          <Article {...{ ...props, menuClickCallback }} />
        )}
        backgroundColor="transparent"
        itemsContainerPadding={{ left: 6, right: 6 }}
        itemPadding={{ bottom: 15 }}
        showShadow={false}
        showScrollBar={false}
        dataLoadCallback={dataLoadCallback}
      />
    </div>
  );
}
