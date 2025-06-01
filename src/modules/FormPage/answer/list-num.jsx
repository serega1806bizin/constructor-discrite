import React, { useState, useEffect } from 'react';
import { Button, Card, InputNumber, Divider, Form, Typography } from 'antd';
// eslint-disable-next-line import/no-extraneous-dependencies
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { QuestionImages } from './QuestionImages';

const { Paragraph } = Typography;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const List_num = ({ question, onChange, index1 }) => {
  const [items, setItems] = useState([1, 2]); // Массив чисел

  // Передаём данные наверх при изменении items
  useEffect(() => {
    onChange(items);
  }, [items, onChange]);

  // Добавить новый элемент
  const addItem = () => {
    setItems([...items, 0]);
  };

  // Удалить элемент по индексу (не удаляем последний)
  const removeItem = index => {
    if (items.length === 1) {
      return;
    }

    setItems(items.filter((_, i) => i !== index));
  };

  // Обновить значение элемента
  const updateItem = (index, value) => {
    const updatedItems = [...items];

    updatedItems[index] = Number(value) || 0;
    setItems(updatedItems);
  };

  return (
    <Card>
      <b>Питання №{index1 + 1}</b>
      <Paragraph>{question.text}</Paragraph>
      <QuestionImages images={question.Images} />
      <Form.Item
        labelCol={{ span: 4.6 }}
        label="Ваша відповідь"
        name={`answer_${question.id}`}
        rules={[
          { required: true, message: 'Будь-ласка, заповніть список чисел' },
        ]}
      >
        <Card title="Список чисел" style={{ marginTop: 20 }}>
          <Divider>Додайте елементи</Divider>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 20,
              justifyContent: 'center',
            }}
          >
            {items.map((item, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <InputNumber
                  controls={false}
                  onClick={e => e.target.select()}
                  value={item}
                  placeholder={`Число ${index + 1}`}
                  onChange={value => updateItem(index, value)}
                  style={{
                    width: 50,
                    height: 50,
                    marginBottom: 5,
                  }}
                />
                <Button
                  type="text"
                  icon={<DeleteOutlined />}
                  danger
                  onClick={() => removeItem(index)}
                  disabled={items.length === 1}
                  style={{
                    padding: 0,
                    height: 20,
                  }}
                />
              </div>
            ))}
          </div>
          <div
            style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}
          >
            <Button
              type="dashed"
              icon={<PlusOutlined />}
              onClick={addItem}
              style={{ width: '50%' }}
            >
              Додати число
            </Button>
          </div>
        </Card>
      </Form.Item>
    </Card>
  );
};
