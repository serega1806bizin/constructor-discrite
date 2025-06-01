import React, { useState, useEffect } from 'react';
import { Form, InputNumber, Card } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import { QuestionImages } from './QuestionImages';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Matrix_q = ({ question, onChange, index1 }) => {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [matrix, setMatrix] = useState(() =>
    Array.from({ length: 3 }, () => Array(3).fill(undefined)),
  );

  useEffect(() => {
    setMatrix(prevMatrix => {
      const newMatrix = Array.from({ length: rows }, (_, i) =>
        // eslint-disable-next-line @typescript-eslint/no-shadow
        Array.from({ length: cols }, (_, j) =>
          prevMatrix[i] && j < prevMatrix[i].length
            ? prevMatrix[i][j]
            : undefined,
        ),
      );

      return newMatrix;
    });
  }, [rows, cols]);

  // Передаём родителю обновлённую матрицу
  useEffect(() => {
    onChange({
      answer: matrix,
    });
  }, [matrix, onChange]);

  // Обработчик изменения значения ячейки
  const handleCellChange = (rowIndex, colIndex, value) => {
    setMatrix(prevMatrix => {
      const newMatrix = prevMatrix.map(row => [...row]);

      newMatrix[rowIndex][colIndex] = value ?? 0;

      return newMatrix;
    });
  };

  return (
    <Card>
      <b>Питання №{index1 + 1}</b>
      <Paragraph>{question.text}</Paragraph>
      <QuestionImages images={question.Images} />
      <Form.Item
        label="Кількість рядків"
        name={`matrix_${question.id}_rows`}
        labelCol={{ span: 6.5 }}
        rules={[
          { required: true, message: 'Вкажіть кількість рядків' },
          {
            type: 'number',
            min: 1,
            max: 10,
            message: 'Мінімум 1, максимум 10',
          },
        ]}
      >
        <InputNumber
          min={1}
          max={10}
          value={rows}
          onChange={value => setRows(value ?? 1)}
        />
      </Form.Item>

      <Form.Item
        label="Кількість стовпців"
        name={`matrix_${question.id}_cols`}
        labelCol={{ span: 6.5 }}
        rules={[
          { required: true, message: 'Вкажіть кількість стовпців' },
          {
            type: 'number',
            min: 1,
            max: 10,
            message: 'Мінімум 1, максимум 10',
          },
        ]}
      >
        <InputNumber
          min={1}
          max={9}
          value={cols}
          onChange={value => setCols(value ?? 1)}
        />
      </Form.Item>

      <Card style={{ marginBottom: 16, width: cols * 52 + 40 }}>
        {matrix.map((row, rowIndex) => (
          <div
            key={`matrix_${question.id}_row-${rowIndex}`}
            style={{ display: 'flex', marginBottom: -19 }}
          >
            {row.map((cellValue, colIndex) => (
              <Form.Item
                key={`matrix_${question.id}_cell-${rowIndex}-${colIndex}`}
                name={`matrix_${question.id}_cell-${rowIndex}-${colIndex}`}
                rules={[{ required: true, message: '' }]}
                validateTrigger="onBlur"
                validateStatus={cellValue === undefined ? 'error' : ''}
                style={{ marginRight: 1 }}
              >
                <InputNumber
                  controls={false}
                  value={cellValue}
                  onChange={value =>
                    handleCellChange(rowIndex, colIndex, value)
                  }
                  onFocus={e => e.target.select()}
                  style={{
                    width: 50,
                    height: 50,
                    textAlign: 'center',
                  }}
                />
              </Form.Item>
            ))}
          </div>
        ))}
      </Card>
    </Card>
  );
};
