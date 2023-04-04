import {Outlet} from 'react-router-dom'
import NavBar from './NavBar'


function Template() {
  return (
    <div className='page'>
    <NavBar/>
    <Outlet/>
    </div>
  )
}

export default Template