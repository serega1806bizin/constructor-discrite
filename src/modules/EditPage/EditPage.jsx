import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Form,
  Input,
  InputNumber,
  Button,
  Divider,
  Row,
  Col,
  Checkbox,
  Space,
  message,
  notification,
} from 'antd';
import axios from 'axios';
import { Loader } from '../../components/Loader';
import { TaskItem } from '../ConstructorPage/Task';

export const EditPage = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  // Состояния для загрузки теста и вопросов (тема, номер, коммент теперь управляются Form)
  const [loading, setLoading] = useState(false);
  const [test, setTest] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [isCommentEnabled, setIsCommentEnabled] = useState(false);

  // Подсчёт общей суммы баллов
  const totalPoints = questions.reduce((sum, q) => sum + (q.points || 0), 0);
  const API_URL = 'https://stradanie-production.up.railway.app/api/tests';

  const updateQuestion = (id, updatedData) => {
    setQuestions(prev =>
      prev.map(q => (q.id === id ? { ...q, ...updatedData } : q)),
    );
  };

  const removeQuestion = useCallback(id => {
    setQuestions(prev => prev.filter(q => q.id !== id));
  }, []);

  const addQuestion = () => {
    const newQuestion = {
      id: Date.now(),
      type: 'text',
      questionText: '',
      points: 0,
    };

    setQuestions(prev => [...prev, newQuestion]);
  };

  // Загрузка теста с сервера
  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/${taskId}`)
      .then(res => res.json())
      .then(data => {
        setTest(data);
        setQuestions(data.questions || []);
        setIsCommentEnabled(!!data.additional);
        // Предзаполнение формы: поле "Tema" для назви тесту
        form.setFieldsValue({
          Tema: data.nazwa || '',
          Nomer: data.nomer || 0,
          checkbox1: !!data.additional,
          коментар: data.additional || '',
        });
        setLoading(false);
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch(error => {
        message.error('Не удалось загрузить тест.');
        setLoading(false);
      });
  }, [taskId, form]);

  const onFinish = useCallback(
    values => {
      if (questions.length === 0) {
        message.warning('Додайте хоча б одне питання');

        return;
      }

      const updatedTest = {
        type: 'task',
        id: Number(taskId),
        nazwa: values.Tema,
        nomer: values.Nomer,
        totalPoints,
        progress: test?.progress || 0,
        additional: values.коментар || '',
        questions,
      };

      axios
        .put(`${API_URL}/${taskId}`, updatedTest)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .then(response => {
          notification.success({
            message: 'Успіх!',
            description: 'Тест оновлено успішно!',
            placement: 'topRight',
            duration: 3,
          });
          navigate('/task');
        })
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .catch(error => {
          message.error('Не вдалося оновити тест');
        });
    },
    [questions, taskId, test, totalPoints, navigate],
  );

  const onFinishFailed = useCallback(
    errorInfo => {
      if (errorInfo.errorFields?.length) {
        const firstErrorField = errorInfo.errorFields[0].name;

        form.scrollToField(firstErrorField, {
          behavior: 'smooth',
          block: 'center',
        });
        setTimeout(() => {
          const fieldInstance = form.getFieldInstance(firstErrorField);

          if (fieldInstance?.focus) {
            fieldInstance.focus();
          }
        }, 600);
      }

      message.error('Виправте помилки у формі');
    },
    [form],
  );

  if (loading) {
    return <Loader />;
  }

  return (
    <Row justify="center" style={{ padding: 10 }}>
      <Col xs={24} sm={20} md={16} lg={12} xl={10}>
        <h1>Редагування тесту</h1>
        <Form
          form={form}
          onFinish={onFinish}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          style={{ maxWidth: 600 }}
          onFinishFailed={onFinishFailed}
          scrollToFirstError
        >
          <Divider>Загальна інформація про роботу</Divider>
          {/* Поле для темы тесту управляется через Form. Добавлен onChange для логирования */}
          <Form.Item
            label="Тема роботи:"
            name="Tema"
            rules={[{ required: true, message: 'Введіть тему тесту' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Номер:"
            name="Nomer"
            rules={[{ required: true, message: 'Введіть номер тесту' }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item name="checkbox1" valuePropName="checked">
            <Checkbox
              onChange={e => {
                setIsCommentEnabled(e.target.checked);
                if (!e.target.checked) {
                  form.setFieldsValue({ коментар: '' });
                }
              }}
            >
              Додати коментар для студентів
            </Checkbox>
          </Form.Item>
          {isCommentEnabled && (
            <Form.Item
              label="Коментар"
              name="коментар"
              rules={[
                {
                  required: true,
                  message: 'Введіть коментар або зніміть прапорець',
                },
                {
                  min: 10,
                  message: 'Коментар повинен містити мінімум 10 символів',
                },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
          )}
          <Divider>Редагування питань</Divider>
          {questions.map((question, index) => (
            <div key={question.id}>
              <h3>Питання {index + 1}</h3>
              <TaskItem
                id={question.id}
                initialData={question}
                index={index}
                onDelete={() => removeQuestion(question.id)}
                onUpdate={(id, updatedData) => updateQuestion(id, updatedData)}
              />
              <Divider />
            </div>
          ))}
          <Space
            style={{ width: '100%', marginTop: 10, marginBottom: 10 }}
            wrap
            align="center"
            size="middle"
          >
            <Button type="dashed" onClick={addQuestion}>
              Додати питання
            </Button>
            <Button type="primary" htmlType="submit">
              Оновити тест
            </Button>
          </Space>
        </Form>
      </Col>
    </Row>
  );
};

export default EditPage;
