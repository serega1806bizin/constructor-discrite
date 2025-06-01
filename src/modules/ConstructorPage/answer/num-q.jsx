// eslint-disable-next-line import/no-extraneous-dependencies
import { Form, InputNumber } from 'antd';
import React from 'react';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Num_q = ({ onChange, fieldName }) => {
  const handleInputChange = value => {
    onChange({ answer: value });
  };

  return (
    <>
      <Form.Item
        label="Введіть відповідь"
        name={fieldName}
        labelCol={{ span: 4.6 }}
        rules={[{ required: true, message: 'Будь-ласка, дайте відповідь' }]}
      >
        <InputNumber id="name" onChange={handleInputChange} />
      </Form.Item>
    </>
  );
};
