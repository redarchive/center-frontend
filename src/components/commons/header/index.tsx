import React, { useEffect, useState } from 'react'
import * as style from './style.module.scss'
import Logo from './assets/symbol-logo.svg'
import { Link } from 'gatsby'
import { useLocation } from '@reach/router'

interface Props {
  mode: boolean
  setMode: (v: boolean) => any
}

const Header = ({ mode, setMode }: Props): JSX.Element => {
  const location = useLocation()
  const url = new URL(location.href)

  const path = url.pathname
  const type = url.searchParams.get('type')

  const [me, setMe] = useState<any>(null)

  useEffect(() => {
    void fetch('/api/users/@me')
      .then(async (res) => await res.json())
      .then((res) => {
        setMe(res.data?.me)
      })
  }, [])

  const onLogout = (): void => {
    void fetch('/api/sessions/@this', {
      method: 'DELETE'
    }).then(() => {
      window.location.reload()
    })
  }

  if (['/login', '/regist'].includes(path) && url.searchParams.get('internal') !== '✔') return <></>

  return (
    <>
      <div className={style.back}></div>
      <div className={style.header}>
        <div onClick={() => setMode(!mode)} className={style.toggle}></div>
        <input type="checkbox" id="menu__btn" className={style.none}/>
        <label htmlFor="menu__btn" className={style.menu}></label>
        <div className={style.menu_back}></div>
        <div className={style.left}>
          <Link to='/' className={style.logo}>
            <img src={Logo} alt="logo" />
            <h1>Store</h1>
          </Link>
          <ul className={style.nav}>
            <li className={path === '/' && style.click}><Link to="/">홈</Link></li>
            <li className={path === '/categories' && type === 'WEBSITE' && style.click}><Link to="/categories?type=WEBSITE">웹</Link></li>
            <li className={path === '/categories' && type === 'MOBILE' && style.click}><Link to="/categories?type=MOBILE">앱</Link></li>
            <li className={path === '/categories' && type === 'GAME' && style.click}><Link to="/categories?type=GAME">게임</Link></li>
            <li className={path === '/categories' && type === 'DESKTOP' && style.click}><Link to="/categories?type=DESKTOP">데스크톱</Link></li>
            <li className={path === '/categories' && type === 'PHYSICAL' && style.click}><Link to="/categories?type=PHYSICAL">IOT</Link></li>
          </ul>
        </div>
        <div className={style.right}>
          <div className={style.search}>
            <input type="checkbox" id="search__btn" className={style.none}/>
            {me !== null && (
              <label htmlFor="search__btn" className={style.search__btn}></label>
            )}
            <form action="/" className={style.search__box}>
              <input type="text" placeholder='검색어를 입력해주세요.' required />
              <button type='submit'></button>
            </form>
              <div className={style.search__back}></div>
          </div>
          <div className={style.links}>
            {me === undefined && (
              <>
                <div className={style.login}><Link to="/login?internal=%E2%9C%94&scope=openid">로그인</Link></div>
                <div className={style.sign__up}><Link to="/regist?internal=%E2%9C%94&scope=openid">회원가입</Link></div>
              </>
            )}

            {me !== null && me !== undefined && (
              <>
                <div className={style.login}><strong>
                  <Link to={`/profile?id=${me.id as string}`}>
                    {me.nickname ?? me.person.name}
                  </Link></strong>님 안녕하세요.
                </div>
                <div className={style.login} onClick={onLogout}><Link to="#logout">로그아웃</Link></div>
                <div className={style.sign__up}><Link to={`/profile?id=${me.id as string}#new`}>신규등록</Link></div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Header