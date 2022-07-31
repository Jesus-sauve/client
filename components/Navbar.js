import React, { useContext, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button, Drawer } from 'antd';
import { useState } from 'react';
import { signout, isAuth } from '../actions/auth';
import Router from 'next/router';
import { API } from '../config';
import Noty from 'noty';
import axios from "axios";
import { Context } from "../context";

function Navbar() {

    const [current, setCurrent] = useState("");

    const { state, dispatch } = useContext(Context);
    const { user } = state;

    const [visible, setVisible] = useState(false);
    const [size, setSize] = useState();

    const showDefaultDrawer = () => {
        setSize('default');
        setVisible(true);
      };
    
      const showLargeDrawer = () => {
        setSize('large');
        setVisible(true);
      };
    
      const onClose = () => {
        setVisible(false);
      };

      useEffect(() => {
        process.browser && setCurrent(window.location.pathname);
      }, [process.browser && window.location.pathname]);

    const router = useRouter();

      const logout = async () => {
    dispatch({ type: "LOGOUT" });
    window.localStorage.removeItem("user");
    const { data } = await axios.get(`${API}/logout`);
    new Noty({
        type: 'success',
        layout: 'topRight',
        text: `Vous êtes déconnecté.`,
        timeout: 3000
      }).show();
    Router.push("/connexion");
  };

    const isActiveNav = (r) => {
        if (r === router.pathname) {
            return ' activeNav'
        } else {
            return ''
        }
    }

  return (
    <nav className="navbar navbar-expand-lg fixed-top navbar-dark navbar-bg d-lg-block" style={{zIndex: '2000'}}>
        <div className="container header_top ">
            <div className="header_top_1">
                <div className="header_top_1_logo">
                <Link href="/">
                <a>Base biblique</a> 
                </Link>
                </div>
                <p>L'Évangile est une puissance de Dieu pour le salut de qui conque croit...</p>
            </div>

            <div className="header_top_2">
                <div className="header_top_2_coordonnees">
                    <p className="numero mx-2"><i className="fa-solid fa-phone mx-1"></i>+1 44 38 39 40 79</p>
                    <p className="mail mx-2"><i className="fa-solid fa-envelope mx-1"></i>basebiblique@hotmail.com</p>
                </div>
            </div>
        </div>

        <div className="container header_bottom">
            <ul className="navbar-nav onglet_1 mb-2 mb-lg-0">
                <li className="nav-item">
                <Link href="/">
                <a className={"nav-link" + isActiveNav('/')}>Base biblique</a> 
                </Link>
                </li>
                <li className="nav-item">
                <Link href="/enseignements">
                    <a className={"nav-link" + isActiveNav('/enseignements')}>Enseignements</a> 
                </Link>
                </li>
                <li className="nav-item">
                <Link href="/theology">
                    <a className={"nav-link" + isActiveNav('/theology')}>Théologie</a> 
                </Link>
                </li>
                <li className="nav-item">
                <Link href="/videos">
                    <a className={"nav-link" + isActiveNav('/videos')}>Vidéos</a> 
                </Link>
                </li>
                <li className="nav-item">
                <Link href="/bible">
                    <a className={"nav-link" + isActiveNav('/bible')}>Bible en ligne</a> 
                </Link>
                </li>
                <li className="nav-item">
                <Link href="/church">
                    <a className={"nav-link" + isActiveNav('/church')}>Church Map</a> 
                </Link>
                </li>
                <li className="nav-item">
                <Link href="/contact">
                    <a className={"nav-link" + isActiveNav('/contact')}>Contact</a> 
                </Link>
                </li>
            </ul>

            <div>
                <ul className="navbar-nav onglet_2 list-inline">
                    {user === null && (
                        <Link href="/connexion"><a className="btn btn-sm myBtn px-3 mx-2 text-white"><i className="fas fa-braille"></i> Connexion</a></Link>
                    )}
                    {user !== null && (
                    <a className="btn btn-sm myBtn px-3 mx-2 text-white" onClick={logout}><i className="fas fa-sign-out-alt"></i> Déconnexion</a>
                    
                    )}
                    {user !== null && user.role.includes("Admin") && (
                    <Link href="/admin">
                        <a className="btn btn-sm myBtn px-3 mx-2 text-white"><i className="fas fa-lock"></i> Admin</a>
                    </Link>
                    )}
                </ul>
            </div>
                
                
                <Button id="side_bar" type="dark" onClick={showDefaultDrawer}>
                    <i className="fa-solid fa-bars"></i>
                </Button>
        </div>

        <Drawer
        id="drawer_side"
        title="Base Biblique"
        placement="right"
        size={size}
        onClose={onClose}
        visible={visible}
      >
        <div className='onglet_mobile'>
            <li className="nav-item">
            <Link href="/">
            <a className={"nav-link" + isActiveNav('/')}>Base biblique</a> 
            </Link>
            </li>
            <li className="nav-item">
            <Link href="/enseignements">
                <a className={"nav-link" + isActiveNav('/enseignements')}>Enseignements</a> 
            </Link>
            </li>
            <li className="nav-item">
            <Link href="/theology">
                <a className={"nav-link" + isActiveNav('/theology')}>Théologie</a> 
            </Link>
            </li>
            <li className="nav-item">
            <Link href="/videos">
                <a className={"nav-link" + isActiveNav('/videos')}>Vidéos</a> 
            </Link>
            </li>
            <li className="nav-item">
            <Link href="/bible">
                <a className={"nav-link" + isActiveNav('/bible')}>Bible en ligne</a> 
            </Link>
            </li>
            <li className="nav-item">
            <Link href="/church">
                <a className={"nav-link" + isActiveNav('/church')}>Church Map</a> 
            </Link>
            </li>
            <li className="nav-item">
            <Link href="/contact">
                <a className={"nav-link" + isActiveNav('/contact')}>Contact</a> 
            </Link>
            </li>
            <li>
                <p className="numero mx-2"><i className="fa-solid fa-phone mx-1"></i>+1 44 38 39 40 79</p>
            </li>
            <li>
                <p className="mail mx-2"><i className="fa-solid fa-envelope mx-1"></i>basebiblique@hotmail.com</p>
            </li>
            <li>
                {user === null && (
                    <Link href="/connexion"><a className="btn btn-sm myBtn px-3 mx-2 text-white"><i className="fas fa-braille"></i> Connexion</a></Link>
                )}
            </li>
            <li>
                {user !== null && (
                    <a className="btn btn-sm myBtn px-3 mx-2 text-white" onClick={logout}><i className="fas fa-sign-out-alt"></i> Déconnexion</a>
                )}
            </li>
            <li>
                {user !== null && user.role.includes("Admin") && (
                <Link href="/admin">
                    <a className="btn btn-sm myBtn px-3 mx-2 text-white"><i className="fas fa-lock"></i> Admin</a>
                </Link>
                )}
            </li>
        </div>
      </Drawer>
      
    </nav>
  )
}

export default Navbar;