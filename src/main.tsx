import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import App from './app'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <HashRouter>
        <App />
      </HashRouter>
    </RecoilRoot>
  </React.StrictMode>
)