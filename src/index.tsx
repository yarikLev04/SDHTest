import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from 'src/reportWebVitals';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from 'src/redux/store';
import { NotistackProvider } from 'src/components/NotistackProvider';
import App from 'src/App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
    <ReduxProvider store={store}>
        <NotistackProvider>
            <App />
        </NotistackProvider>
    </ReduxProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
