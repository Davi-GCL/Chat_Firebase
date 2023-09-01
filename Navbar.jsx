import React from 'react'

import { myloginWithGoogle, myLogout, activateUpdate, writeUserData } from './Firebase';

export default function Navbar({user, setUser}) {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark fixed-top text-light" aria-label="Third navbar example" >
    <div className="container-fluid ">
      <span><img src={user.photo} className="logo navbar-brand" alt="React logo" /></span>
      <h4>{user.nome}</h4>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample03" aria-controls="navbarsExample03" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarsExample03">
        <ul className="navbar-nav ms-auto mb-2 mb-sm-0">
          <li className="nav-item ms-5">
            <button className="btn-login" onClick={() => myloginWithGoogle(setUser)}>
            Login com Google
            </button>
          </li>
          <li className="nav-item">
            <button className="btn-logout" onClick={() => myLogout()}>
            Deslogar
            </button>
          </li>

          {/* <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</a>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#">Action</a></li>
              <li><a className="dropdown-item" href="#">Another action</a></li>
              <li><a className="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li> */}
        </ul>
        {/* <form role="search">
          <input className="form-control" type="search" placeholder="Search" aria-label="Search"/>
        </form> */}
      </div>
    </div>
  </nav>
  )
}
