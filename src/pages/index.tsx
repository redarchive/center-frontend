import React, { useEffect } from 'react'
import { HeadFC } from 'gatsby'
import Header from '../components/commons/header'
import MainSlide from '../components/main/slide'
import MainPopularityList from '../components/main/popularity-list'
import MainSchoolList from '../components/main/school-list'
import MainUpdateList from '../components/main/update-list'
import Footer from '../components/commons/footer'
import { useLocalStorage } from 'react-use'

const IndexPage = (): JSX.Element => {
  const [mode, setMode] = useLocalStorage('light', false)
  useEffect(() => {
    document.title = '경북소프트웨어고 포트폴리오'
  }, [])

  return (
    <main data-theme={mode ? 'dark' : 'light'} className='main'>
      <Header mode={mode ?? false} setMode={setMode} />
      <MainSlide />
      <MainPopularityList />
      <MainSchoolList />
      <MainUpdateList />
      <Footer />
    </main>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>경북소프트웨어고 포트폴리오</title>
