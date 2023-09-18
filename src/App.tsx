import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { About, Config, Main } from 'pages';

import './styles/styles.scss';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/about" element={<About />} />
        <Route path="/config" element={<Config />} />
      </Routes>
    </BrowserRouter>
  );
};
