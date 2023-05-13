import Service from 'Service/Service';
import { ReactNode } from 'react';

export interface ICarousel {
  items?: object[];
  source?: Service;
  itemTemplate?: ReactNode;
  backgroundColor?: string;
}
