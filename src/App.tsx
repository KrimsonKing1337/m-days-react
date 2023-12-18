import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { store } from 'store';
import {
  About,
  ChooseTopics,
  Config,
  Main,
  Widget,
} from 'pages';

import { MenuBtnAndPopup } from './components/MenuBtnAndPopup';

import './styles/styles.scss';

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <MenuBtnAndPopup />

        <Routes>
          <Route path="/" element={<Main />} />

          <Route path="/choose-topics" element={<ChooseTopics />} />

          <Route path="/widget" element={<Widget />} />
          <Route path="/standalone" element={<Widget />} />

          <Route path="/about" element={<About />} />
          <Route path="/config" element={<Config />} />

          <Route path="*" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};
