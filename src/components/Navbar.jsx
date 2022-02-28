import React, {useState, useEffect} from 'react';
import { Button, Menu, Typography, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined } from '@ant-design/icons';
import icon from '../images/cryptocurrency.png';

/**
 * @return This functions represents the Navbar and has the components connected for user to choose how to navigate.
 */
const Navbar = () => {
    const [activeMenu, setActiveMenu] = useState(true);
    const [screenSize, setScreenSize] = useState(null);

    useEffect(() => {                                                   //The useEffect hook is applied whenever the screen size changes default size.
        const handleResize = () => setScreenSize(window.innerWidth);

        window.addEventListener('resize',handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, [])

    useEffect(() => {
        if(screenSize < 768){
            setActiveMenu(false);
        } else {
            setActiveMenu(true);
        }
    },[screenSize])


    return (
        <div className='nav-container'>
            <div className='logo-container'>
                <Avatar src={icon} size='large' />
                <Typography.Title level={2} className='logo'>
                    <Link to='/'>Cryptoverse</Link>
                </Typography.Title>
                <Button className='menu-control-container' onClick={() => setActiveMenu(true)}>
                    <MenuOutlined/>
                </Button>
            </div>    
            {/**
            *Theme its set dark and with the components displayed as menu items. With every component there is designs from antd that allow icon modification for visualization ease.
            */}        
            {activeMenu && (
                <Menu theme='dark'>
                    <Menu.Item icon={<HomeOutlined/>}>
                        <Link to='/'>Home</Link>
                    </Menu.Item>
                    <Menu.Item icon={<FundOutlined/>}>
                        <Link to='/cryptocurrencies'>Cryptocurrencies</Link>
                    </Menu.Item>
                    <Menu.Item icon={<MoneyCollectOutlined/>}>
                        <Link to='/exchanges'>Exchanges</Link>
                    </Menu.Item>
                    <Menu.Item icon={<BulbOutlined/>}>
                        <Link to='/news'>News</Link>
                    </Menu.Item>
                </Menu>
            )}

        </div>
    )
}

//Default export is the value that will be importated form the module, if you use the simple import statement
//import X form 'module'. X is the name that will be given locally to the varibale assigned to contain the value,
//and it doesn't have to be named like the origin export. There can be only one default export.
export default Navbar;