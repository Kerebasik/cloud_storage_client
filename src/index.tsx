import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.style.scss';
import { Provider } from 'react-redux';

import English from 'src/languages/en.json';
import Ukrainian from 'src/languages/ua.json';
import Russian from 'src/languages/ru.json';

import { setupStore } from './store/store';
import { IntlProvider } from 'react-intl';

const store = setupStore();
const userLocation = 'en'; // navigator.language.split(/[-_]/)[0];

const checkLanguages = (language: string): any => {
  switch (language) {
    case 'en':
      return English;
    case 'ua':
      return Ukrainian;
    case 'ru':
      return Russian;
    default:
      return English;
  }
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <IntlProvider
      locale={navigator.language}
      messages={checkLanguages(userLocation)}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </IntlProvider>
  </React.StrictMode>,
);
