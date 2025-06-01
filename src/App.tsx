import './App.scss';
import './utils/font-styles.scss';
import { Header } from './components/Header';
import { Outlet, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { Menu } from './components/Menu';
import { Footer } from './components/Footer';
import { StateContext } from './Store/Store';
import { Button, Col, Form, Input, message, Row } from 'antd';
// eslint-disable-next-line import/no-extraneous-dependencies
import { motion } from 'framer-motion';

type FieldType = {
  username?: string;
  password?: string;
};

export const App = () => {
  const { isMenuVisible } = useContext(StateContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  const isTestRoute = location.pathname.startsWith('/test');
  const isLoginRoute = location.pathname === '/';
  const isProtectedRoute =
    location.pathname.startsWith('/task') ||
    location.pathname.startsWith('/create');

  useEffect(() => {
    const storedAuth = localStorage.getItem('authData');

    if (storedAuth) {
      try {
        const authData = JSON.parse(storedAuth);

        if (authData.expires && authData.expires > Date.now()) {
          setIsAuth(true);
        } else {
          localStorage.removeItem('authData');
        }
      } catch (error) {
        localStorage.removeItem('authData');
      }
    }
  }, []);

  useEffect(() => {
    if (!isAuth && isProtectedRoute) {
      message.warning('Спершу увійдіть');
    }
  }, [isAuth, isProtectedRoute]);

  if (!isAuth && isProtectedRoute) {
    return <Navigate to="/" replace />;
  }

  if (isAuth && isLoginRoute) {
    return <Navigate to="/task" replace />;
  }

  const onFinish = (values: FieldType) => {
    setLoading(true);
    setTimeout(() => {
      if (
        values.username === 'Викладач-2025-математика' &&
        values.password === 'Цей пароль ніколи не розгадають'
      ) {
        const expiration = Date.now() + 7 * 24 * 60 * 60 * 1000;

        localStorage.setItem(
          'authData',
          JSON.stringify({ expires: expiration }),
        );
        setIsAuth(true);
        message.success('Успішний вхід');
        navigate('/task');
      } else {
        message.error('Невірні учетні дані');
      }

      setLoading(false);
    }, 2000);
  };

  return (
    <div className="App">
      {!isTestRoute && <Header />}
      {isMenuVisible ? (
        <Menu />
      ) : (
        <>
          <main className="main">
            <Outlet />
            {isLoginRoute && !isAuth && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  minHeight: '100vh',
                }}
              >
                <Row justify="center" style={{ width: '100%', padding: 10 }}>
                  <Col xs={24} sm={20} md={16} lg={12} xl={10}>
                    <motion.div
                      // eslint-disable-next-line max-len
                      className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm"
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 className="text-2xl font-semibold text-center mb-4">
                        Вхід
                      </h2>
                      <Form name="basic" layout="vertical" onFinish={onFinish}>
                        <Form.Item
                          label="Ім'я користувача"
                          name="username"
                          rules={[
                            {
                              required: true,
                              message: "Введіть ім'я користувача!",
                            },
                          ]}
                        >
                          <Input
                            placeholder="Введіть ім'я"
                            className="rounded-lg p-2 text-lg"
                          />
                        </Form.Item>

                        <Form.Item
                          label="Пароль"
                          name="password"
                          rules={[
                            { required: true, message: 'Введіть пароль!' },
                          ]}
                        >
                          <Input.Password
                            placeholder="••••••••"
                            className="rounded-lg p-2 text-lg"
                          />
                        </Form.Item>

                        <Form.Item>
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Button
                              type="primary"
                              htmlType="submit"
                              loading={loading}
                              // eslint-disable-next-line max-len
                              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg"
                            >
                              {loading ? 'Завантаження...' : 'Увійти'}
                            </Button>
                          </motion.div>
                        </Form.Item>
                      </Form>
                    </motion.div>
                  </Col>
                </Row>
              </motion.div>
            )}
          </main>
          <Footer />
        </>
      )}
    </div>
  );
};
