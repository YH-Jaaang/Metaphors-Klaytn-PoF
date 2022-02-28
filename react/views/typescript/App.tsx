import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import RoutesComponent from './Pages/RoutesComponent';
import { ThemeProvider } from 'styled-components';
import { theme } from './Styles/Theme';
import GlobalStyle from './Styles/GlobalStyle';
import GlobalFont from './Styles/GlobalFont';
import Header from './Components/Header/Header';

function App(): JSX.Element {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <GlobalFont />
        <Router>
          <Header />
          <RoutesComponent />
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
