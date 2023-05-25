import { POPUP_TYPE, CONFIRMATION_TYPE, Popup, IPopup } from 'popup';
import { Button, BUTTONS_TYPE } from 'button';
import { List } from 'list';
import { TreeList } from 'treeList';
import { SelectorList } from 'selectorList';
import { HintTemplate } from 'hintTemplate';
import { Header } from 'header';
import { LoadButton, LoadButtonType } from 'loadButton';
import { Carousel } from 'carousel';
import { ToggleButton } from 'toggleButton';
import Search from 'Search/Search';
import {default as DemoItem} from 'Demo/DemoItem';
import {listData, treeData} from 'test_data/TestData';
import {useState} from 'react';

export default function() {
  const [dialogBtnResult, setDialogBtnResult] = useState(
    'Результат выбора в диалоге'
  );
  const [btnResult, setBtnResult] = useState('Результат клика по кнопке');
  const listStyle = {
    height: '200px',
    width: '100%'
  }

  const imageLink = 'https://png.pngtree.com/png-clipart/20210128/ourmid/pngtree-cute-cat-cant-png-image_2819172.jpg';

  const openPopup = (type: string, options?: Partial<IPopup>) => {
    const dialog = new Popup();
    dialog.open({
      ...{
        type,
        title: `Header ${type}`,
        width: 300,
        content: () => {
          return <div>{`Content from ${type}`}</div>;
        },
      },
      ...options,
    });
  };

  const btnClick = (type) =>
    setBtnResult(
      `You click on btn ${type}`
    );

  const itemsContainerPadding = { top: 6, left: 6, right: 6, bottom: 6 };
  const listItems = [...listData, ...listData, ...listData];
  const treeItems = [...treeData, ...treeData, ...treeData];

  const carouselItemTemplate = ({ item }) => {
    return (
      <div>
        <img
          src={item.link}
          style={{
            height: '200px',
            width: '200px',
            borderRadius: 10,
            marginRight: 4
          }}
        />
        {item.title}
      </div>
    );
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '100%',
        padding: 6,
        boxSizing: 'border-box',
      }}
    >
      <DemoItem
        title="Поиск"
        content={
          <>
            <Search />
            <br />
            <Search expandable={true} />
          </>
        }
      />
      <DemoItem title="Кнопка-переключатель" content={<ToggleButton />} />
      <DemoItem
        title="Карусель"
        content={
          <Carousel
            items={listItems}
            itemTemplate={carouselItemTemplate}
            backgroundColor="transparent"
          />
        }
      />
      <DemoItem
        title="Кнопка и DropArea для загрузки файлов"
        content={
          <>
            <LoadButton />
            <br />
            <LoadButton type={LoadButtonType.DROP_AREA} />
          </>
        }
      />
      <DemoItem
        title="Диалоги"
        content={
          <>
            <span>{dialogBtnResult}</span>
            <div className="flexbox justify-spaceBetween align-center">
              <Button
                onClick={() => openPopup(POPUP_TYPE.DIALOG)}
                title="Открыть диалог"
              />
              <br />
              <Button
                onClick={() => openPopup(POPUP_TYPE.STACK)}
                title="Открыть стек панель"
              />
              <br />
              <Button
                onClick={() =>
                  openPopup(POPUP_TYPE.DIALOG, {
                    confirmationCfg: {
                      type: CONFIRMATION_TYPE.YES_NO_CANCEL,
                      callback: (res) =>
                        setDialogBtnResult(`You confirmation result ${res}`),
                    },
                  })
                }
                title="Открыть диалог с подтверждением"
              />
            </div>
          </>
        }
      />
      <DemoItem
        title="Кнопки"
        content={
          <>
            <span>{btnResult}</span>
            <div className="flexbox justify-spaceBetween align-center">
              <Button onClick={() => btnClick('Базовая')} title="Базовая" />
              <br />
              <Button
                onClick={() => btnClick('С фоном')}
                title="Прикладной фон"
                backgroundColor="rgb(229 218 254)"
              />
              <br />
              <Button
                onClick={() => btnClick('С иконкой')}
                title="Базовая с иконкой"
                icon="ti-cup"
              />
              <br />
              <Button
                onClick={() => btnClick('Ссылка')}
                type={BUTTONS_TYPE.LINK}
                title="Ссылка"
              />
              <br />
              <Button
                onClick={() => btnClick('Кнопка иконка')}
                icon="ti-close"
                type={BUTTONS_TYPE.ICON}
              />
            </div>
          </>
        }
      />
      <DemoItem
        title="Списки"
        content={
          <div className="flexbox justify-spaceBetween">
            <div className="flexDirectionColumn">
              <Header title="Базовый" size={16} />
              <div style={listStyle}>
                <List
                  items={listItems}
                  itemsContainerPadding={itemsContainerPadding}
                />
              </div>
            </div>
            <div className="flexDirectionColumn">
              <Header
                title="Список с произвольным шаблоном элемента"
                size={16}
              />
              <div style={listStyle}>
                <List
                  items={listItems}
                  itemsContainerPadding={itemsContainerPadding}
                  itemTemplate={({ item }) => (
                    <span style={{ color: 'green' }}>Прикладной шаблон</span>
                  )}
                />
              </div>
            </div>
            <div className="flexDirectionColumn">
              <Header title="Древовидный список" size={16} />
              <br />
              <div style={listStyle}>
                <TreeList
                  items={treeItems}
                  itemsContainerPadding={itemsContainerPadding}
                />
              </div>
            </div>
          </div>
        }
      />
      <DemoItem
        title="Списки с выбором значения"
        content={
          <>
            <SelectorList items={listData} />
            <br />
            <SelectorList
              items={listData}
              multiSelect={false}
              selectedKeys={[1]}
            />
          </>
        }
      />
      <DemoItem
        title="Компонент заглушка"
        content={
          <div className="flexbox justify-spaceBetween align-center">
            <HintTemplate
              imageSrc={imageLink}
              title="HEADER"
              additionalText="add text"
            />
            <br />
            <HintTemplate
              orientation="horizontal"
              imageSrc={imageLink}
              title="HEADER"
              additionalText="add text"
            />
            <br />
            <HintTemplate
              orientation="horizontal"
              imagePosition="end"
              imageSrc={imageLink}
              title="HEADER"
              additionalText="add text"
            />
          </div>
        }
      />
    </div>
  );
}