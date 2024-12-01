import { StyleSheet, Text, View } from 'react-native';
import { Cep } from './src/pages/cep';
import axios from 'axios';

axios.defaults.baseURL = 'https://viacep.com.br/ws/';

export default function App() {
  return (
    <Cep />
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
