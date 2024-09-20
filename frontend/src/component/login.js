import React from 'react';
import { Breadcrumb, Layout, Button, Checkbox, Form, Input, message, theme } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'; 
// This React component renders a login form handling user authentication by sending login credentials to a server via Axios, storing the received token in local storage upon successful login, providing feedback messages for success or failure, and navigating back to the home page while maintaining a structured layout with breadcrumb navigation and a footer.


const { Content, Footer } = Layout;

const Login = () => {
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const onFinish = async (values) => {
    try {
      const response = await axios.post('http://localhost:4000/user/login', values);
      const { token } = response.data;
      localStorage.setItem('token', token);
      message.success('Login successful');
      navigate('/');
      window.location.reload();
    } catch (error) {
      message.error('Login failed. Please check your credentials.');
    }
  };

  const onFinishFailed = (errorInfo) => {
    message.error('Login failed. Please check your input.');
  };

  return (
    <Layout>
      <Content
        style={{
          padding: '0 16px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 'calc(100vh - 128px)',
        }}
      >
        <div
          style={{
            padding: '24px',
            width: '100%',
            maxWidth: '400px',
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
              textAlign: 'center',
            }}
          >
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Login</Breadcrumb.Item>
          </Breadcrumb>
          <Form
            name="login"
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Submit
              </Button>
            </Form.Item>
            <Form.Item>
              <span>
                Not registered? <Link to="/register">Sign up here</Link>
              </span>
            </Form.Item>
          </Form>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>©{new Date().getFullYear()} by Charles</Footer>
    </Layout>
  );
};

export default Login;
