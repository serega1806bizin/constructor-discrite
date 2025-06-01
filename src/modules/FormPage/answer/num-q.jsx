import React from 'react';
import { Typography, Form, InputNumber, Card } from 'antd';
import { QuestionImages } from './QuestionImages';

const { Paragraph } = Typography;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Num_q = ({ question, onChange, index1 }) => {
  const handleChange = value => {
    onChange(Number(value));
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
        <InputNumber onChange={handleChange} />
      </Form.Item>
    </Card>
  );
};
