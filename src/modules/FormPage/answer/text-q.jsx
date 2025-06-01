import React from 'react';
import { Card, Form, Input, Typography } from 'antd';
import { QuestionImages } from './QuestionImages';

const { Paragraph } = Typography;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Text_q = ({ question, onChange, index1 }) => {
  // Функция, которая вызывается при изменении поля ввода
  const handleChange = e => {
    onChange(e.target.value);
  };

  return (
    <Card>
      <b>Питання №{index1 + 1}</b>
      <Paragraph>{question.text}</Paragraph>

      <QuestionImages images={question.Images} />

      <Form.Item
        label="Ваша відповідь"
        name={`answer_${question.id}`}
        labelCol={{ span: 4.6 }}
        rules={[{ required: true, message: 'Будь-ласка, дайте відповідь' }]}
      >
        <Input onChange={handleChange} />
      </Form.Item>
    </Card>
  );
};
