import React from 'react';
import { Layout, Dropdown, Menu } from 'antd';
import { MenuOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
// This React component creates a navigation bar, featuring a dropdown menu for navigation links and a logout option; it handles user logout by removing the token from local storage, navigating to the login page, and refreshing the application, while maintaining a fixed header layout that displays the application title.


const { Header } = Layout;

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    window.location.reload();

    console.log('Logging out');
  };

  const handleMenuClick = (e) => {
    console.log('Menu item clicked:', e);
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">
        <Link to="/">Fill Form</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/records">Form and Options</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout>
      <Header
        className="site-layout-background"
        style={{
          position: 'fixed',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 16px',
          boxSizing: 'border-box',
          backgroundColor: '#001529', // Ensure background covers content underneath
        }}
      >
        <div style={{ color: '#fff', fontSize: '24px' }}>
          TaskSync
        </div>
        <Dropdown overlay={menu} trigger={['click']}>
          <a onClick={(e) => e.preventDefault()}>
            <MenuOutlined style={{ fontSize: '24px', color: '#fff' }} />
          </a>
        </Dropdown>
        <div>
          <a onClick={handleLogout} style={{ color: '#fff', fontSize: '16px' }}>
            <LogoutOutlined style={{ fontSize: '20px', marginRight: '8px' }} />
            Logout
          </a>
        </div>
      </Header>
    </Layout>
  );
};

export default NavBar;
