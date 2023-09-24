import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { store } from 'store';
import { About, Config, Main } from 'pages';

import { MenuBtnAndPopup } from './components/MenuBtnAndPopup';

import './styles/styles.scss';

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <MenuBtnAndPopup />

        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/standalone" element={<Main />} />

          <Route path="/about" element={<About />} />
          <Route path="/config" element={<Config />} />

          <Route path="*" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};
