import Service from 'Service/Service';
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

export default function Demo({ preloadData }) {
  const listStyle = {
    height: '200px',
    width: '100%'
  }

  const openPopup = (type: string, options?: Partial<IPopup>) => {
    const dialog = new Popup();
    dialog.open({
      ...{
        type,
        title: `Header ${type}`,
        width: 300,
        content: () => {
          return <div>{`Hi, i m content node from ${type}`}</div>;
        },
      },
      ...options,
    });
  };

  const btnClick = () => alert('You click on btn');

  const itemsContainerPadding = { top: 6, left: 6, right: 6, bottom: 6 };
  const listService = new Service({ endpoint: 'List' });

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
        title="Search"
        content={
          <>
            <Search />
            <br />
            <Search expandable={true} />
          </>
        }
      />
      <DemoItem title="ToggleButton" content={<ToggleButton />} />
      <DemoItem
        title="Carousel"
        content={
          <Carousel
            items={preloadData.list}
            source={listService}
            itemTemplate={carouselItemTemplate}
            backgroundColor="transparent"
          />
        }
      />
      <DemoItem
        title="Load button"
        content={
          <>
            <LoadButton />
            <br />
            <LoadButton type={LoadButtonType.DROP_AREA} />
          </>
        }
      />
      <DemoItem
        title="Dialogs"
        content={
          <div className="flexbox justify-spaceBetween align-center">
            <Button
              onClick={() => openPopup(POPUP_TYPE.DIALOG)}
              title="OpenDialog"
            />
            <br />
            <Button
              onClick={() => openPopup(POPUP_TYPE.STACK)}
              title="OpenStack"
            />
            <br />
            <Button
              onClick={() =>
                openPopup(POPUP_TYPE.DIALOG, {
                  confirmationCfg: {
                    type: CONFIRMATION_TYPE.YES_NO_CANCEL,
                    callback: (res) => alert(`You confirmation result ${res}`),
                  },
                })
              }
              title="OpenConfirmationDialog"
            />
          </div>
        }
      />
      <DemoItem
        title="Buttons"
        content={
          <div className="flexbox justify-spaceBetween align-center">
            <Button onClick={btnClick} title="Base" />
            <br />
            <Button
              onClick={btnClick}
              title="Base with background"
              backgroundColor="rgb(229 218 254)"
            />
            <br />
            <Button onClick={btnClick} title="Base with icon" icon="ti-cup" />
            <br />
            <Button onClick={btnClick} type={BUTTONS_TYPE.LINK} title="Link" />
            <br />
            <Button
              onClick={btnClick}
              icon="ti-close"
              type={BUTTONS_TYPE.ICON}
            />
          </div>
        }
      />
      <DemoItem
        title="Lists"
        content={
          <>
            <Header title="Base" size={15} />
            <div style={listStyle}>
              <List
                items={preloadData.list}
                itemsContainerPadding={itemsContainerPadding}
                source={listService}
              />
            </div>
            <br />
            <Header title="With custom template" size={15} />
            <div style={listStyle}>
              <List
                items={preloadData.list}
                itemsContainerPadding={itemsContainerPadding}
                source={listService}
                itemTemplate={({ item }) => <span>Custom {item.title}</span>}
              />
            </div>
            <br />
            <Header title="Tree list" />
            <br />
            <div style={listStyle}>
              <TreeList
                items={preloadData.tree}
                itemsContainerPadding={itemsContainerPadding}
                source={new Service({ endpoint: 'TreeList' })}
              />
            </div>
          </>
        }
      />
      <DemoItem
        title="Selector list"
        content={
          <>
            <SelectorList items={preloadData.list} />
            <br />
            <SelectorList
              items={preloadData.list}
              multiSelect={false}
              selectedKeys={[1]}
            />
          </>
        }
      />
      <DemoItem
        title="Hint template"
        content={
          <div className="flexbox justify-spaceBetween align-center">
            <HintTemplate
              imageSrc="public/header.gif"
              title="HEADER"
              additionalText="add text"
            />
            <br />
            <HintTemplate
              orientation="horizontal"
              imageSrc="public/header.gif"
              title="HEADER"
              additionalText="add text"
            />
            <br />
            <HintTemplate
              orientation="horizontal"
              imagePosition="end"
              imageSrc="public/header.gif"
              title="HEADER"
              additionalText="add text"
            />
          </div>
        }
      />
    </div>
  );
}

export {Demo};