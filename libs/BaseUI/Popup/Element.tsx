import { IElement } from 'Popup/IPopup';
import {
  POPUP_TYPE,
  DEFAULT_TARGET_OFFSET,
  CONFIRMATION_TITLES,
  KEY_CODE_ESCAPE
} from 'Popup/constants';
import { Button, BUTTONS_TYPE } from 'button';
import { useEffect, useState } from 'react';
import { DnDDialogContainer } from 'dndContainer';
import { useComponentDidMount } from 'App/effects/isMounted';
import 'Popup/Popup.scss';

const getStyle = (width, target, targetOffset, type) => {
  const { left, top } = getDialogCoor(target, targetOffset);

  const style = {
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    background: '#ffffff',
    width,
    padding: 6,
    zIndex: 10,
    maxWidth: '100%'
  };

  const dialogStyle = {
    top,
    left,
    transform: target ? 'none' : 'translate(-50%, -50%)',
    borderRadius: 6,
    boxShadow: '0px 0px 11px #626060'
  };

  const stackStyle = {
    top: 0,
    right: 0,
    height: '100%',
    borderLeft: '3px solid #eaeaea',
    boxSizing: 'border-box'
  };

  return type === POPUP_TYPE.DIALOG
    ? { ...style, ...dialogStyle }
    : { ...style, ...stackStyle };
};

const getDialogCoor = (target, targetOffset) => {
  const targetCoor = target?.getBoundingClientRect();
  return {
    top: targetCoor?.top
      ? targetCoor.top + (targetOffset?.top || DEFAULT_TARGET_OFFSET.top)
      : '50%',
    left: targetCoor?.left
      ? targetCoor.left + (targetOffset?.left || DEFAULT_TARGET_OFFSET.left)
      : '50%'
  };
};

export default function Element({
  type,
  title,
  width,
  content,
  target,
  targetOffset,
  canDrag,
  confirmationCfg,
  closeCallback,
  onOutsideClickCallback,
  eventHandlers
}: IElement) {
  const Content = content;

  const confirmationBtnClick = (res) => {
    closeCallback && closeCallback();
    confirmationCfg?.callback && confirmationCfg?.callback(res);
  };

  const Footer = () => {
    const titles = CONFIRMATION_TITLES[confirmationCfg?.type];
    return (
      <footer className="popup-footer">
        {titles.map((item) => {
          return (
            <div key={item.title}>
              <Button
                onClick={() => confirmationBtnClick(item.result)}
                accentColor={item.accentColor}
                title={item.title}
              />
            </div>
          );
        })}
      </footer>
    );
  };

  useEffect(() => {
    document.documentElement.addEventListener('click', (e) =>
      onOutsideClickCallback(e)
    );
  }, []);

  const onKeyDown = (e) => {
    if (e.keyCode === KEY_CODE_ESCAPE) {
      closeCallback && closeCallback();
    }
  };
  
  const setContainer = (element) => {
    element.focus();
  }

  return (
    <DnDDialogContainer
      style={getStyle(width, target, targetOffset, type)}
      canDrag={canDrag && type !== POPUP_TYPE.STACK}
    >
      <section ref={setContainer} tabIndex={-1} onKeyDown={onKeyDown}>
        {title && (
          <header className="popup-header">
            <span className="popup-header__title">{title}</span>
            <Button
              onClick={closeCallback}
              icon="ti-close"
              type={BUTTONS_TYPE.ICON}
            />
          </header>
        )}
        <main
          className="popup-content"
          onPointerDown={(e) => e.stopPropagation()}
        >
          {Content && <Content eventHandlers={eventHandlers} />}
        </main>
        {confirmationCfg && <Footer />}
      </section>
    </DnDDialogContainer>
  );
}
