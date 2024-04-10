import Realm from 'realm';

import * as definitions from './definitions';

const arrayDefinitions = [];
for (let def in definitions) {
	arrayDefinitions.push(definitions[def]);
}

let realm = null

export async function deleteDatabase() {
	try {
    const dbPath = Realm.defaultPath;
    Realm.deleteFile({ path: dbPath });
  } catch (error) {
    console.error('Error remove database:', error);
    throw error;
  }
}

export async function initializeDatabase() {
  try {
    realm = new Realm({ schema: arrayDefinitions });
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};

export async function resetDatabase() {
  await deleteDatabase();
  await initializeDatabase();
};

export async function insert(collection, newDocument) {
	if (!realm) throw new Error('Error: database is not initialized');
	realm.write(() => {
		realm.create(collection, newDocument);
	});
}

export async function find(collection, query) {
	if (!realm) throw new Error('Error: database is not initialized');
	if (query) {
		return realm.objects(collection).filtered(query);
	}
	return realm.objects(collection);

}