import {VFC} from "react";
import {IListItem} from "List/IListItem";

export interface IItemTemplate {
    item: IListItem;
    idProperty: string;
    displayProperty: string;
    itemTemplate: VFC
}