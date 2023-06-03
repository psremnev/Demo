import appConfig from 'configs/app.config.json';
import { MongoClient, ObjectId } from 'mongodb';
import {ERRORS} from './constants';
export class Database {
  private client = null;
  private db = null;
  private endpoint = null;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
    this.client = new MongoClient(
      `mongodb://${appConfig.host}:${appConfig.db_port}/${appConfig.db_path}`
    );
  }

  async connect() {
    try {
      // Подключаемся к серверу
      await this.client.connect();
      // обращаемся к базе данных
      this.db = await this.client.db(this.endpoint);
      // выполняем пинг для проверки подключения
      const result = await this.db.command({ ping: 1 });
      console.log('Подключение с сервером mongodb успешно установлено');
      console.log('Ping DataBase: ', result?.ok === 1 ? 'good' : 'bad');
    } catch (err) {
      console.log('Возникла ошибка');
      console.log(err);
    }
  }

  getEndpoint() {
    return this.endpoint;
  }

  close() {
    this.client.close();
  }

  createCollection(name: string) {
    if (!name) {
      return ERRORS.NO_COLLECTION;
    }
    return this.db.collection(name);
  }

  deleteCollection(name: string) {
    if (!name) {
      return ERRORS.NO_COLLECTION;
    }
    return this.db.collection(name).drop();
  }

  create(collectionName: string, data: object[]) {
    if (!collectionName || !data) {
      return ERRORS.NO_COLLECTION;
    }
    const collection = this.db.collection(collectionName);
    const callback = (error, response) => {
      if(error) {
          return error;
      } else {
        return response;
      }
    }
    return data.length === 1
      ? collection.insertOne(data[0], callback)
      : collection.insertMany(data, callback);
  }

  async read(collectionName: string, data: object) {
    if (!collectionName || !data) {
      return ERRORS.NO_COLLECTION;
    }
    const collection = this.db.collection(collectionName);
    const res = await collection.findOne({ _id: new ObjectId(data['_id']) });
    if (res) {
      return res;
    } else {
      return ERRORS.NOT_FOUND;
    }
  }

  update(collectionName: string, data: object, newData: object[]) {
    if (!collectionName || !data) {
      return ERRORS.NO_COLLECTION;
    }
    const collection = this.db.collection(collectionName);
    return collection.updateOne({ _id: new ObjectId(data['_id']) }, newData);
  }

  delete(collectionName: string, data: object[]) {
    if (!collectionName || !data) {
      return ERRORS.NO_COLLECTION;
    }
    const collection = this.db.collection(collectionName);
    const newData = data.map((item) => {
      return { _id: new ObjectId(item['_id']) };
    });
    return newData.length === 1
      ? collection.deleteOne(newData[0])
      : collection.deleteMany(newData);
  }

  query(
    collectionName: string,
    params: object | null,
    navigation: { skip: number; limit: number } = { skip: 0, limit: 30 }
  ) {
    if (!collectionName || !params) {
      return ERRORS.NO_COLLECTION;
    }
    const collection = this.db.collection(collectionName);
    return collection.find(params, navigation).toArray();
  }
}
