/* eslint-disable no-console */
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Link, useNavigate, useParams, Outlet } from 'react-router-dom';
import {
  Table,
  Space,
  Input,
  Button,
  Modal,
  Tooltip,
  Row,
  Col,
  message,
} from 'antd';
// eslint-disable-next-line import/no-extraneous-dependencies
import { AudioOutlined, CopyOutlined } from '@ant-design/icons';
import { handleBackButton } from '../../utils/handleBackButton';
import styles from './DetailsTask.module.scss';
import { Loader } from '../../components/Loader';

const { Search } = Input;

export const DetailsTask = () => {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [test, setTest] = useState(null);
  const [studentWorks, setStudentWorks] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Функция для форматирования даты
  const formatDate = isoString => {
    if (!isoString) {
      return '';
    }

    const date = new Date(isoString);

    // Применяем смещение для Киева, учитывая его текущий часовой пояс.
    // Для Киева UTC+3 зимой и UTC+2 летом
    const kievOffset = 0; // Если необходимо учитывать летнее время, можно сделать динамическую проверку для получения смещения.

    date.setHours(date.getHours() + kievOffset);

    return `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  };

  // Функция для загрузки данных
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const testRes = await fetch(
        `https://stradanie-production-f14d.up.railway.app/api/tests/${taskId}`,
      );
      const testData = await testRes.json();

      setTest(testData);

      const answersRes = await fetch(
        `https://stradanie-production-f14d.up.railway.app/api/answers/${taskId}`,
      );
      const answersData = await answersRes.json();
      const formattedData = answersData.map(item => ({
        ...item,
        date: formatDate(item.dueTime),
      }));

      setStudentWorks(formattedData);
      setFilteredData(formattedData);
    } catch (error) {
      console.error('Помилка завантаження даних:', error);
    } finally {
      setIsLoading(false);
    }
  }, [taskId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Функция удаления теста
  const onDelete = useCallback(
    async testId => {
      try {
        const res = await fetch(
          `https://stradanie-production-f14d.up.railway.app/api/tests/${testId}`,
          {
            method: 'DELETE',
          },
        );

        await res.json();
        message.success(`Тест "${test?.nazwa}" успішно видалено!`);
        navigate('/task');
      } catch (error) {
        console.error('Ошибка удаления теста:', error);
        message.error('Помилка видалення тесту');
      }
    },
    [navigate, test],
  );

  // Мемоизированные колонки таблицы
  const columns = useMemo(
    () => [
      { title: 'Студент', dataIndex: 'student', key: 'student' },
      { title: 'Група', dataIndex: 'group', key: 'group' },
      { title: 'Дата', dataIndex: 'date', key: 'date' },
      { title: 'Оцінка', dataIndex: 'mark', key: 'mark' },
      {
        title: 'Дія',
        key: 'action',
        render: (_, record) => (
          <Space size="middle">
            <Button
              type="link"
              onClick={() =>
                navigate(`/answer/${record['id-answer']}/test/${taskId}`)
              }
            >
              Переглянути
            </Button>
          </Space>
        ),
      },
    ],
    [navigate, taskId],
  );

  // Обработчик поиска
  const onSearch = useCallback(
    value => {
      setSearchValue(value);
      if (!value) {
        setFilteredData(studentWorks);

        return;
      }

      const filtered = studentWorks.filter(student =>
        student.student.toLowerCase().includes(value.toLowerCase()),
      );

      setFilteredData(filtered);
    },
    [studentWorks],
  );

  // Голосовой поиск
  const startVoiceRecognition = useCallback(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Ваш браузер не підтримує голосовий ввід!');

      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = 'uk-UA';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = event => {
      const transcript = event.results[0][0].transcript.trim();

      console.log(`🎙 Розпізнаний текст: ${transcript}`);
      setSearchValue(transcript);
      onSearch(transcript);
    };

    recognition.onerror = event => {
      console.error('Помилка розпізнавання:', event.error);
    };

    recognition.start();
  }, [onSearch]);

  const url = `https://serega1806bizin.github.io/kursova-robota/#/test/${taskId}`;

  const copyUrl = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url);
      message.success('Покликання скопійовано!');
    } catch (error) {
      message.error('Помилка при копіюванні');
    }
  }, [url]);

  // Управление модальным окном удаления
  const showModal = () => setIsModalVisible(true);
  const handleOk = () => {
    onDelete(taskId);
    setIsModalVisible(false);
  };

  const handleCancel = () => setIsModalVisible(false);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Row justify="center">
        <Col xs={24} sm={20} md={16} lg={12} xl={10}>
          <div className={styles.productDetails}>
            <section className={styles.productDetails__top}>
              <div className={styles.productDetails__breadcrumbs}>
                <Link
                  to={`/${test?.type}`}
                  className={styles.productDetails__breadcrumbsHomeIcon}
                />
                <div className={styles.productDetails__breadcrumbsArrowIcon} />
                <Link
                  to={`/${test?.type}`}
                  className={styles.productDetails__breadcrumbsCategory}
                >
                  Всі роботи
                </Link>
                <div className={styles.productDetails__breadcrumbsArrowIcon} />
                <span className={styles.productDetails__breadcrumbsName}>
                  {test?.nazwa}
                </span>
              </div>
              <div className={styles.productDetails__back}>
                <button
                  className={styles.productDetails__backArrow}
                  onClick={handleBackButton}
                />
                <button
                  className={styles.productDetails__backText}
                  onClick={handleBackButton}
                >
                  Назад
                </button>
              </div>
              <h2 className={styles.productDetails__title}>{test?.name}</h2>
            </section>

            <div className={styles.contentWrapper}>
              <p>Покликання на тест:</p>
              <div className={styles.linkWrapper}>
                <Link to={`/test/${taskId}`}>{url}</Link>
                <Tooltip title="Скопіювати">
                  <CopyOutlined onClick={copyUrl} className={styles.copyIcon} />
                </Tooltip>
              </div>
              <div className={styles.buttonsWrapper} style={{ marginTop: 20 }}>
                <Space wrap>
                  <Button type="primary" danger onClick={showModal}>
                    Видалити цей тест
                  </Button>
                  <Link to={`/task/${taskId}/edit`}>
                    <Button style={{ backgroundColor: 'yellow' }}>
                      Відкоригувати цей тест
                    </Button>
                  </Link>
                </Space>
                <Modal
                  title="Підтвердження видалення"
                  open={isModalVisible}
                  onOk={handleOk}
                  onCancel={handleCancel}
                  okText="Видалити"
                  cancelText="Скасувати"
                  okButtonProps={{ danger: true }}
                >
                  <p>Ви точно бажаєте видалити цей тест?</p>
                  <p>
                    <strong>Його не можна буде відновити!</strong>
                  </p>
                </Modal>
              </div>

              <div style={{ marginTop: 20 }}>
                <Search
                  value={searchValue}
                  placeholder="Пошук студента по імені"
                  enterButton="Пошук"
                  size="large"
                  suffix={
                    <AudioOutlined
                      style={{
                        fontSize: 16,
                        color: '#1677ff',
                        cursor: 'pointer',
                      }}
                      onClick={startVoiceRecognition}
                    />
                  }
                  onChange={e => onSearch(e.target.value)}
                  onSearch={onSearch}
                />
              </div>

              <Table
                columns={columns}
                dataSource={filteredData}
                scroll={{ x: 'max-content' }}
              />
            </div>
          </div>
        </Col>
      </Row>
      <Outlet />
    </>
  );
};
