import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { store } from 'store';
import { About, Config, Main } from 'pages';

import { MenuBtn } from 'components/MenuBtn';
import { Popup } from 'components/Popup';

import './styles/styles.scss';

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <>
          <MenuBtn />
          <Popup />
        </>

        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/about" element={<About />} />
          <Route path="/config" element={<Config />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};
