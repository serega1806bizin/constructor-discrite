import React, { useState, useEffect } from 'react';
import { Checkbox, Typography, Space, Card, Form, Tooltip } from 'antd';
import { QuestionImages } from './QuestionImages';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Variant_Q = ({ question, onChange, index1 }) => {
  const { text, answer } = question;
  const { variants } = answer;

  // Локальное состояние — массив, где для каждого варианта хранится 1 (выбран) или 0 (не выбран)
  const [checked, setChecked] = useState(Array(variants.length).fill(0));

  const handleCheckboxChange = (index, e) => {
    const updatedChecked = [...checked];

    updatedChecked[index] = e.target.checked ? 1 : 0;
    setChecked(updatedChecked);
  };

  // При каждом изменении локального состояния уведомляем родителя
  useEffect(() => {
    onChange(checked);
  }, [checked, onChange]);

  return (
    <Card>
      <b>Питання №{index1 + 1}</b>
      <Typography.Paragraph>{text}</Typography.Paragraph>
      <QuestionImages images={question.Images} />
      <Form.Item>
        <Space direction="vertical" size="middle" style={{ marginTop: 8 }}>
          {variants.map((variant, index) => (
            <Checkbox
              key={index}
              checked={!!checked[index]}
              onChange={e => handleCheckboxChange(index, e)}
            >
              <Tooltip title={variant}>
                <span
                  style={{
                    display: 'inline-block',
                    maxWidth: 300, // можно задать нужное значение или использовать процентное соотношение
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {variant}
                </span>
              </Tooltip>
            </Checkbox>
          ))}
        </Space>
      </Form.Item>
    </Card>
  );
};
