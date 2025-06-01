// eslint-disable-next-line import/no-extraneous-dependencies
import { Form, Input } from 'antd';
import React from 'react';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Text_q = ({ onChange, fieldName }) => {
  const handleInputChange = e => {
    onChange({ answer: e.target.value });
  };

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <>
      <Form.Item
        label="Введіть відповідь"
        name={fieldName}
        labelCol={{ span: 4.6 }}
        rules={[{ required: true, message: 'Будь-ласка, дайте відповідь' }]}
      >
        <Input id="name" onChange={handleInputChange} />
      </Form.Item>
    </>
  );
};
