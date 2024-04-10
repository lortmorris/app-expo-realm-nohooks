import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';

import {
  resetDatabase,
} from './src/realm';


function randomData() {
  console.info('generating random data');
}


export default function App() {
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
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
