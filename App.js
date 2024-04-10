import {
  useState,
} from 'react';

import { faker } from '@faker-js/faker';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
} from 'react-native';

import {
  resetDatabase,
  insert,
  find,
} from './src/realm';


function randomData() {
  for (let x =0; x < 1000; x++) {
    const product = {
      CompanyId: Math.round(Math.random() * 10),
      productId: x,
      name: faker.commerce.product(),
      price: parseFloat(faker.commerce.price(), 10),
    };
    insert('Products', product);
  }
}


const Item = ({ name, price }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{`${name} : $ ${price}`}</Text>
  </View>
);

export default function App() {
  const [products, setProducts] = useState([]);
  
  async function getProducts() {
    const rows = find('Products');
    setProducts(rows._j);
  }
  return (
    <View style={styles.container}>
      <Text>Realm without hooks</Text>
      <Button
        onPress={() => resetDatabase()}
        title="ResetDB"
        color="#841584"
      />
      <Button
        onPress={() => randomData()}
        title="RandomData"
        color="#841584"
      />
      <Button
        onPress={() => getProducts()}
        title="getProducts"
        color="#841584"
      />
       <FlatList
       ListHeaderComponent={(<Text>{`${products.length} products`}</Text>)}
        data={products}
        renderItem={({item}) => <Item name={item.name} price={item.price} />}
        keyExtractor={item => item.productId}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  list: {
    flex: 1,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 18,
  },
});
