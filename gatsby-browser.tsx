import React, { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'
import { useLocalStorage } from 'react-use'
import Footer from './src/components/commons/footer'
import Header from './src/components/commons/header'

import './src/style.global.scss'

export const wrapPageElement = ({ element, props }: any): ReactNode => {
  const [mode, setMode] = useLocalStorage('light', false)

  return (
    <main data-theme={mode ? 'dark' : 'light'} className='main'>
      <Header mode={mode ?? false} setMode={setMode} />
      <Toaster containerClassName="toast" />
      <div className="container">
        <div className="content">
          {element}
        </div>
        <Footer />
      </div>
    </main>
  )
}
