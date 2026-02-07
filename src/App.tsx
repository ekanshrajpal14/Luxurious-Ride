import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './navigation/RootNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { persistor, store } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import 'react-native-gesture-handler';
import Toaster from './components/global/Toaster';
import { useState } from 'react';

function App() {
  const [isAppReady, setIsAppReady] = useState<boolean>(false);
  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <RootNavigator isAppReady={isAppReady} setIsAppReady={setIsAppReady} />
          </NavigationContainer>
          <Toaster />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;
