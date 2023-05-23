import appConfig from 'app.config.json';
import { MongoClient, ObjectId } from 'mongodb';

export class Database {
  client = null;
  db = null;
  endpoint = null;
  constructor(endpoint: string) {
    this.endpoint = endpoint;
    this.client = new MongoClient(
      `mongodb://${appConfig.host}:${appConfig.db_port}/${appConfig.db_path}`
    );
  }

  async connect() {
    try {
        // Подключаемся к серверу
        await this.client.connect();;
        // обращаемся к базе данных
        this.db = await this.client.db(this.endpoint);
        // выполняем пинг для проверки подключения
        const result = await this.db.command({ ping: 1 });
        console.log("Подключение с сервером успешно установлено");
        console.log('Ping DB: ', result?.ok === 1 ? 'good' : 'bad');
    }catch(err) {
        console.log("Возникла ошибка");
        console.log(err);
    }
  }

  close() {
    this.client.close();
  }

  createCollection(name: string) {
    if (!name) {
      return new Error('collection name not set');
    }
    return this.db.collection(name);
  }

  deleteCollection(name: string) {
    if (!name) {
      return new Error('collection name not set');
    }
    return this.db.collection(name).drop();
  }

  create(collectionName: string, data: object[]) {
    if (!collectionName || !data) {
      return new Error('collection name or data not set');
    }
    const collection = this.db.collection(collectionName);
    return data.length === 1
      ? collection.insertOne(data[0])
      : collection.insertMany(data);
  }

  async read(collectionName: string, data: object) {
    if (!collectionName || !data) {
      return new Error('collection name or data not set');
    }
    const collection = this.db.collection(collectionName);
    return collection.findOne({ _id: new ObjectId(data['id']) });
  }

  update(collectionName: string, data: object, newData: object[]) {
    if (!collectionName || !data) {
      return new Error('collection name or data not set');
    }
    const collection = this.db.collection(collectionName);
    return collection.updateOne({ _id: new ObjectId(data['id']) }, newData);
  }

  delete(collectionName: string, data: object[]) {
    if (!collectionName || !data) {
      return new Error('collection name or data not set');
    }
    const collection = this.db.collection(collectionName);
    const newData = data.map((item) => {
      return { _id: new ObjectId(item['id']) };
    });
    return data.length === 1
      ? collection.deleteOne(newData[0])
      : collection.deleteMany(newData);
  }

  query(
    collectionName: string, params: object | null,
    navigation: {skip: number, limit: number} = {skip: 0, limit: 30}
  ) {
    if (!collectionName || !params) {
      return new Error('collection name or params not set');
    }
    const collection = this.db.collection(collectionName);
    return collection.find(params, navigation).toArray();
  }
}
