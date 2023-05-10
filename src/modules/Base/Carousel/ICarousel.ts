import Service from "Service/Service";
import {VFC} from 'react';

export interface ICarousel {
    items?: object[];
    source?: Service;
    itemTemplate?: VFC;
}