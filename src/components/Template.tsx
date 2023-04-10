import {Outlet} from 'react-router-dom'
import NavBar from './NavBar'
import ScrollToTop from './ScrollToTop'


function Template() {
  return (
    <div className='page'>
    <ScrollToTop/>
    <NavBar/>
    <Outlet/>
    </div>
  )
}

export default Template