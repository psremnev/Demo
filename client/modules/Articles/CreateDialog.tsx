import { Button, BUTTONS_TYPE } from 'button';
import { useState } from 'react';
import { Header } from 'header';
import { LoadButton } from 'loadButton';
/**
 * Диалог создания статьи
 */
export const CreateDialog = ({ eventHandlers }) => {
  const defaultPhoto = 'public/default_profile_photo.jpg';
  const [photo, setPhoto] = useState(defaultPhoto);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  const inputStyle = {
    width: '100%',
    outline: 'none',
    border: '1px solid #d9d9d9',
    borderRadius: 4,
    padding: 4,
    boxSizing: 'border-box'
  };

  const onImageLoad = (res) => {
    setPhoto(res.data);
  };

  const titleChanged = (e) => {
    setTitle(e.target.value);
  };

  const authorChanged = (e) => {
    setAuthor(e.target.value);
  };

  const contentChanged = (e) => {
    setContent(e.target.value);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minWidth: 450 }}>
      <div
        style={{
          display: 'flex',
          position: 'relative',
          width: 200,
          height: 200
        }}
      >
        <img style={{ width: 200, height: 200, borderRadius: 6 }} src={photo} />
        <div
          style={{ display: 'flex', position: 'absolute', bottom: 6, right: 6 }}
        >
          <div style={{marginRight: 4}}><LoadButton loadCallback={onImageLoad} /></div>
          {photo !== defaultPhoto && (
            <Button
              type={BUTTONS_TYPE.ICON}
              icon="ti-trash"
              iconSize={25}
              onClick={() => setPhoto(defaultPhoto)}
            />
          )}
        </div>
      </div>
      <Header title="Заголовок" size={16} />
      <input
        className="articlesAdd__name"
        style={inputStyle}
        placeholder="Введите заголовок статьи"
        onChange={titleChanged}
      />
      <Header title="Автор" size={16} />
      <input
        className="articlesAdd__author"
        style={inputStyle}
        placeholder="Введите автора статьи"
        onChange={authorChanged}
      />
      <Header title="Контент" size={16} />
      <textarea
        className="articlesAdd__content"
        style={{ ...inputStyle, height: 400, width: '100%' }}
        placeholder="Введите контент статьи"
        onChange={contentChanged}
      />
      <Button
        title="Сохранить"
        onClick={() =>
          eventHandlers.onResult({ photo, title, author, content })
        }
      />
    </div>
  );
};
