import App from './App.tsx';
import { Provider } from '@/components/ui/provider';
import { Container, Text } from '@chakra-ui/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider>
      <Container p="8" maxW="6xl">
        <Text textStyle="4xl" fontWeight="bold">
          NetMedica
        </Text>
        <App />
      </Container>
    </Provider>
  </StrictMode>
);
