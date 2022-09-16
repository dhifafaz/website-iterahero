import './App.css';
import { ChakraProvider } from '@chakra-ui/react'
import Navigation from './component/navigation/navigation';

function App() {
  return (
    <ChakraProvider>
      <Navigation />
    </ChakraProvider>

  );
}

export default App;
