// import { ThemeProvider } from './contexts/ThemeContext';
// import { useState, useEffect } from 'react';
// import ToggleTheme from './components/ToggleTheme';

// function App() {
//   const [theme, setTheme] = useState('light');
//   useEffect(() => {
//     const toggleTheme = () => {
//       setTheme(theme === 'light' ? 'dark' : 'light');
//     };
//     toggleTheme();
//   }, []);

//   const themeContextValue = {
//     theme: theme,
//     setTheme: setTheme
//   };

//   return (
//     <ThemeProvider value={themeContextValue}>
//       <div className="container">
//         <ToggleTheme />
//         <p>Hello World</p>
//       </div>
//     </ThemeProvider>
//   );
// }

// export default App;

import { ThemeProvider } from './contexts/ThemeContext';
import ToggleTheme from './components/ToggleTheme';
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      theme: localStorage.getItem('theme') || 'light',
      toggleTheme: () => {
        this.setState((prevState) => {
          const newTheme = prevState.theme === 'light' ? 'dark' : 'light';
          localStorage.setItem('theme', newTheme);
          return {
            theme: newTheme
          };
        });
      }
    };
  }
  componentDidMount() {
    document.documentElement.setAttribute('data-theme', this.state.theme);
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.theme !== this.state.theme) {
      document.documentElement.setAttribute('data-theme', this.state.theme);
    }
  }
  render() {
    return (
      <ThemeProvider value={this.state}>
        <div className="container">
          <ToggleTheme />
          <p>Hello, {this.state.theme === 'light' ? 'Early Bird' : 'Night Owl'}</p>
        </div>
      </ThemeProvider>
    );
  }
}
export default App;
