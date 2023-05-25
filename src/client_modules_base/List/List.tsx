import { ListLoader } from 'listLoader';
import { IList } from 'src/client_modules_base/List/IList';
import BaseList from 'src/client_modules_base/List/Base';

/**
 * @link List/List
 * @description Плоский список
 */
export default function List({
  items,
  source,
  idProperty,
  displayProperty,
  filter,
  navigation,
  itemTemplate,
  onItemClick,
  dataLoadCallback,
  itemsContainerPadding,
  itemPadding,
  canDrag,
  backgroundColor = 'var(--default_background_color)',
  borderRadius = true,
  showScrollBar,
  showShadow,
  showUpBtn,
  orientation,
  showNavBtns,
}: IList) {
  const style = {
    background: backgroundColor,
    borderRadius: borderRadius ? 4 : 0,
    width: '100%',
    height: '100%',
  };
  /**
   * Обертка над элементом списка
   */
  const ListWrapper = ({ items }) => {
    return (
      <BaseList
        items={items}
        idProperty={idProperty}
        displayProperty={displayProperty}
        onItemClick={onItemClick}
        itemTemplate={itemTemplate}
        itemsContainerPadding={itemsContainerPadding}
        itemPadding={itemPadding}
        canDrag={canDrag}
        orientation={orientation}
      />
    );
  };

  return (
    <section className="list" style={style}>
      <ListLoader
        source={source}
        filter={filter}
        navigation={navigation}
        items={items}
        dataLoadCallback={dataLoadCallback}
        showScrollBar={showScrollBar}
        showShadow={showShadow}
        showNavBtns={showNavBtns}
        showUpBtn={showUpBtn}
        orientation={orientation}
      >
        {ListWrapper}
      </ListLoader>
    </section>
  );
}
