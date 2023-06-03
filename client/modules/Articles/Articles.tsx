import Service from 'Service/Service';
import List from 'List/List';
import { openLink } from 'base_utils/openLink';
import { Button } from 'button';
import { Popup, POPUP_TYPE } from 'popup';
import { useMemo } from 'react';
import { Header } from 'header';
import Article from 'Article/Article';
import { useRef } from 'react';

/**
 * @link Articles/Articles
 * @description Список Статей
 */
export default function () {
  const collection = useRef(null);
  const service = new Service({ endpoint: 'articles' });
  const popup = useMemo(() => new Popup(), []);

  /**
   * Диалог создания статьи
   */
  const CreateDialog = () => {
    const rowStyle = {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: 6
    };

    const inputStyle = {
      width: '50%',
      outline: 'none',
      border: '1px solid #d9d9d9',
      borderRadius: 4,
      padding: 4
    };

    return (
      <div style={{minWidth: 450}}>
        <div style={rowStyle}>
          <Header title="Заголовок" size={16} />
          <input
            className="articlesAdd__name"
            style={inputStyle}
            placeholder="Введите заголовок статьи"
          />
        </div>
        <div style={rowStyle}>
          <Header title="Описание" size={16} />
          <input
            className="articlesAdd__description"
            style={inputStyle}
            placeholder="Введите краткое описание статьи"
          />
        </div>
        <div style={rowStyle}>
          <Header title="Автор" size={16} />
          <input
            className="articlesAdd__author"
            style={inputStyle}
            placeholder="Введите автора статьи"
          />
        </div>
        <div style={rowStyle}>
          <Header title="Контент" size={16} />
          <textarea
            className="articlesAdd__content"
            style={{ ...inputStyle, height: 80 }}
            placeholder="Введите контент статьи"
          />
        </div>
        <Button title="Сохранить" onClick={() => saveArticle()} />
      </div>
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
      content: CreateDialog
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
  }

  /**
   * Сохранить статью на БЛ
   */
  const saveArticle = () => {
    const title = (
      document.querySelector('.articlesAdd__name') as HTMLInputElement
    ).value;
    const author = (
      document.querySelector('.articlesAdd__author') as HTMLInputElement
    ).value;
    const content = (
      document.querySelector('.articlesAdd__content') as HTMLInputElement
    ).value;
    const data = {
      title,
      author,
      authorPhoto: author
        ? 'https://avatars.dzeninfra.ru/get-zen_doc/4460346/pub_6085d3c1e2c7114111efc2a2_6085e4803b735b52f85124ce/scale_1200'
        : null,
      content
    };
    if (title) {
      service
        .create([data])
        .then(async(res) => {
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
        idProperty='_id'
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
