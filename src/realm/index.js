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
    console.error('Error al eliminar la base de datos:', error);
    throw error;
  }
}

export async function initializeDatabase() {
  try {
    realm = new Realm({ schema: arrayDefinitions });
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
    throw error;
  }
};

export async function resetDatabase() {
  await deleteDatabase();
  await initializeDatabase();
};

