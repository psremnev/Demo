import { Database } from 'Db/Database';

export class Articles extends Database {
   constructor() {
    super('articles');
   }
}
