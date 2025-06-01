import React from 'react';
import { InputNumber } from 'antd';

export const ListNum = ({ Ans, Corr }) => {
  if (Ans && Corr) {
    return (
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 20,
          justifyContent: 'center',
        }}
      >
        {Ans.map((num, index) => {
          let bgColor = '#e6ffed';

          if (Corr.massiv) {
            if (Corr.consistencyImportant) {
              if (num !== Corr.massiv[index]) {
                bgColor = '#ffebeb';
              }
            } else {
              if (!Corr.massiv.includes(num)) {
                bgColor = '#ffebeb';
              }
            }
          }

          return (
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
                value={num}
                readOnly
                style={{
                  width: 40,
                  height: 40,
                  textAlign: 'center',
                  backgroundColor: bgColor,
                }}
              />
            </div>
          );
        })}
      </div>
    );
  }

  if (Ans && !Corr) {
    return (
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 20,
          justifyContent: 'center',
        }}
      >
        {Ans.map((num, index) => (
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
              value={num}
              readOnly
              style={{
                width: 40,
                height: 40,
                textAlign: 'center',
                backgroundColor: '#e6ffed',
              }}
            />
          </div>
        ))}
      </div>
    );
  }

  return null;
};
