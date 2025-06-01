import React from 'react';
import { InputNumber } from 'antd';

export const Matrix = ({ Ans, Corr }) => {
  if (!Corr || !Array.isArray(Corr) || Corr.length === 0) {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const cols = Corr[0].length;

  return (
    <>
      {Corr.map((row, rowIndex) => (
        <div
          key={`row-${rowIndex}`}
          style={{ display: 'flex', marginBottom: 0 }}
        >
          {row.map((correctCell, colIndex) => {
            const studentCell =
              Ans && Ans[rowIndex] ? Ans[rowIndex][colIndex] : undefined;
            const displayValue =
              Ans && Ans[rowIndex] ? studentCell : correctCell;
            const isCorrect = Ans
              ? Number(studentCell) === Number(correctCell)
              : true;
            const bgColor = isCorrect ? '#e6ffed' : '#ffebeb';

            return (
              <div
                key={`cell-${rowIndex}-${colIndex}`}
                style={{ padding: '4px' }}
              >
                <InputNumber
                  controls={false}
                  value={displayValue}
                  readOnly
                  style={{
                    width: 50,
                    height: 50,
                    textAlign: 'center',
                    backgroundColor: bgColor,
                  }}
                />
              </div>
            );
          })}
        </div>
      ))}
    </>
  );
};
