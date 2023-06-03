import { Database } from 'server/modules/Database/Database';

export class Articles extends Database {
  constructor() {
    super('articles');
  }
}
