import Service from 'Service/Service';
import { POPUP_TYPE, CONFIRMATION_TYPE, Popup, IPopup } from 'popup';
import { Button, BUTTONS_TYPE } from 'button';
import { List } from 'list';
import { TreeList } from 'treeList';
import Channel from 'Channel/Channel';
import { useState, useMemo } from 'react';
import { SelectorList } from 'selectorList';
import { HintTemplate } from 'hintTemplate';
import { Header } from 'header';
import { FileLoader, FileLoaderType } from 'fileLoader';
import { Carousel } from 'carousel';
import 'Demo/Demo';

export default function ({ preloadData }) {
  const channel = useMemo(() => new Channel(), []);
  const [isSubscribe, setIsSubscribe] = useState(false);

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

  const channelSubscribe = () => {
    isSubscribe
      ? channel.unsubscribe('eventone')
      : channel.subscribe('eventone', (msg) => console.log(msg));
    setIsSubscribe(!isSubscribe);
  };

  const itemsContainerPadding = { top: 6, left: 6, right: 6, bottom: 6 };

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
      <Header title="Carousel" />
      <br />
      <Carousel
        items={preloadData.list}
        source={new Service({ endpoint: 'List' })}
        itemTemplate={carouselItemTemplate}
      />
      <br />
      <Header title="LOAD BUTTON" />
      <br />
      <FileLoader />
      <br />
      <FileLoader type={FileLoaderType.DROP_AREA} />
      <br />
      <Header title="DIALOGS" />
      <br />
      <Button onClick={() => openPopup(POPUP_TYPE.DIALOG)} title="OpenDialog" />
      <br />
      <Button onClick={() => openPopup(POPUP_TYPE.STACK)} title="OpenStack" />
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
      <br />
      <Header title="BUTTONS" />
      <br />
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
      <Button onClick={btnClick} icon="ti-close" type={BUTTONS_TYPE.ICON} />
      <br />
      <Header title="LISTS" />
      <br />
      <Header title="Base" size={15} />
      <div className="demoList">
        <List
          items={preloadData.list}
          itemsContainerPadding={itemsContainerPadding}
          source={new Service({ endpoint: 'List' })}
        />
      </div>
      <br />
      <Header title="WithCustomTemplate" size={15} />
      <div className="demoList">
        <List
          items={preloadData.list}
          itemsContainerPadding={itemsContainerPadding}
          source={new Service({ endpoint: 'List' })}
          itemTemplate={({ item }) => <span>Custom {item.title}</span>}
        />
      </div>
      <br />
      <Header title="TreeList" />
      <br />
      <div className="demoList">
        <TreeList
          items={preloadData.tree}
          itemsContainerPadding={itemsContainerPadding}
          source={new Service({ endpoint: 'TreeList' })}
        />
      </div>
      <br />
      <Header title="ServerChannel" />
      <br />
      <Button
        onClick={channelSubscribe}
        title={isSubscribe ? 'Unsubscribe' : 'Subscribe'}
      />
      <br />
      <Header title="SelectorList" />
      <br />
      <SelectorList items={preloadData.list} />
      <br />
      <SelectorList
        items={preloadData.list}
        multiSelect={false}
        selectedKeys={[1]}
      />
      <br />
      <Header title="HintTEmplate" />
      <br />
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
      <br />
    </div>
  );
}
