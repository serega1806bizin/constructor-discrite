import {
  Button,
  Card,
  Checkbox,
  Form,
  Image,
  Input,
  InputNumber,
  Select,
  Upload,
} from 'antd';
import { Matrix_q } from './answer/matrix-q';
import { Num_q } from './answer/num-q';
import { Text_q } from './answer/text-q';
import { useEffect, useState } from 'react';
import { Variants_q } from './answer/variants-q';
import { List_pars } from './answer/list-pars';
import { List_reber } from './answer/list-reber';
import { List_num } from './answer/list-num';
import axios from 'axios';

export const TaskItem = ({
  id,
  initialData = {},
  onDelete,
  onUpdate,
  index,
}) => {
  const [selectedType, setSelectedType] = useState(initialData.type || 'text');
  const [additionalData, setAdditionalData] = useState({
    points: initialData.points || 0,
    text: initialData.text || '',
    answer: initialData.answer || null,
    Images: initialData.Images || [],
  });
  const [is2Checked, setIs2Checked] = useState(
    initialData.Images && initialData.Images.length > 0,
  );
  // Инициализация fileList из initialData.Images, если они есть
  const [fileList, setFileList] = useState(() => {
    if (initialData.Images && initialData.Images.length > 0) {
      return initialData.Images.map((url, idx) => ({
        uid: `-initial-${idx}`,
        name: `image-${idx}.png`,
        status: 'done',
        url: url,
      }));
    }

    return [];
  });
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  useEffect(() => {
    if (typeof onUpdate === 'function') {
      onUpdate(id, {
        type: selectedType,
        ...additionalData,
      });
    }
  }, [selectedType, additionalData, id, onUpdate]);

  const onCheckbox2Change = e => {
    setIs2Checked(e.target.checked);
    if (!e.target.checked) {
      setFileList([]);
      setPreviewImage('');
      setPreviewOpen(false);
      setAdditionalData(prev => ({ ...prev, Images: [] }));
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const handleChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      const reader = new FileReader();

      reader.readAsDataURL(file.originFileObj);
      reader.onload = () => setPreviewImage(reader.result);
    } else {
      setPreviewImage(file.url);
    }

    setPreviewOpen(true);
  };

  const uploadButton = (
    <div>
      <Button>Додати фото</Button>
    </div>
  );

  const renderComponent = () => {
    switch (selectedType) {
      case 'text':
        return (
          <Text_q
            fieldName={`text_${id}`}
            onChange={data => setAdditionalData(prev => ({ ...prev, ...data }))}
          />
        );
      case 'number':
        return (
          <Num_q
            fieldName={`відповідь_${id}`}
            onChange={data => setAdditionalData(prev => ({ ...prev, ...data }))}
          />
        );
      case 'matrix':
        return (
          <Matrix_q
            fieldName={`matrix_${id}`}
            onChange={data => setAdditionalData(prev => ({ ...prev, ...data }))}
          />
        );
      case 'variants':
        return (
          <Variants_q
            fieldName={`variants_${id}`}
            onChange={data => setAdditionalData(prev => ({ ...prev, ...data }))}
          />
        );
      case 'list-num':
        return (
          <List_num
            fieldName={`list-num_${id}`}
            onChange={data => setAdditionalData(prev => ({ ...prev, ...data }))}
          />
        );
      case 'list-pars':
        return (
          <List_pars
            fieldName={`list-pars_${id}`}
            onChange={data => setAdditionalData(prev => ({ ...prev, ...data }))}
          />
        );
      case 'list-reber':
        return (
          <List_reber
            fieldName={`list-reber_${id}`}
            onChange={data => setAdditionalData(prev => ({ ...prev, ...data }))}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Card style={{ marginBottom: 10 }}>
      <b>Питання №{index + 1}</b>
      <Form.Item
        label="Виберіть тип:"
        name={`Тип завдання_${id}`}
        labelCol={{ span: 4.5 }}
        rules={[{ required: true, message: 'Будь-ласка оберіть тип' }]}
        initialValue={initialData.type || 'text'}
      >
        <Select
          placeholder="Оберіть тип завдання"
          onChange={value => setSelectedType(value)}
        >
          <Select.Option value="text">Текстова відповідь</Select.Option>
          <Select.Option value="number">Одне число</Select.Option>
          <Select.Option value="list-num">Список чисел</Select.Option>
          <Select.Option value="matrix">Матриця</Select.Option>
          <Select.Option value="variants">Варіанти відповідей</Select.Option>
          <Select.Option value="list-pars">Перелік пар</Select.Option>
          <Select.Option value="list-reber">Перелік ребер</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Кількість балів:"
        labelCol={{ span: 6 }}
        name={`кількість балів_${id}`}
        rules={[
          { required: true, message: 'Будь ласка, вкажіть кількість балів' },
          {
            validator: (_, value) => {
              if (value === undefined || value === null || value === '') {
                return Promise.reject('Поле не може бути порожнім');
              }

              if (value < 0) {
                return Promise.reject('Кількість балів не може бути відʼємною');
              }

              return Promise.resolve();
            },
          },
        ]}
        initialValue={initialData.points || undefined}
      >
        <InputNumber
          value={additionalData.points}
          onChange={value => {
            if (value < 0) {
              return;
            } else {
              setAdditionalData(prev => ({ ...prev, points: value }));
            }
          }}
        />
      </Form.Item>

      <Form.Item
        label="Текст питання:"
        name={`текст питання_${id}`}
        labelCol={{ span: 6 }}
        rules={[
          { required: true, message: 'Будь-ласка введіть текст питання' },
        ]}
        initialValue={initialData.text || ''}
      >
        <Input
          onChange={e =>
            setAdditionalData(prev => ({ ...prev, text: e.target.value }))
          }
        />
      </Form.Item>
      <Form.Item
        name={`checkbox2_${id}`}
        valuePropName="checked"
        initialValue={is2Checked}
      >
        <Checkbox onChange={onCheckbox2Change}>
          Додати фото до завдання
        </Checkbox>
      </Form.Item>
      {is2Checked && (
        <>
          <Upload
            customRequest={async ({ file, onSuccess, onError }) => {
              try {
                const formData = new FormData();

                formData.append('questionId', id);
                formData.append('images', file);
                const response = await axios.post(
                  'https://stradanie-production-f14d.up.railway.app/upload',
                  formData,
                  { headers: { 'Content-Type': 'multipart/form-data' } },
                );

                onSuccess(response.data, file);
                const { urls } = response.data;

                setAdditionalData(prev => ({
                  ...prev,
                  Images: [...(prev.Images || []), ...urls],
                }));
              } catch (error) {
                onError(error);
              }
            }}
            listType="picture-card"
            fileList={fileList}
            onChange={handleChange}
            onPreview={handlePreview}
            onRemove={file => {
              // Обновляем fileList, убирая удалённый файл
              const newFileList = fileList.filter(
                item => item.uid !== file.uid,
              );

              setFileList(newFileList);
              // Если файл имеет URL, убираем его из Images
              if (file.url) {
                setAdditionalData(prev => ({
                  ...prev,
                  Images: (prev.Images || []).filter(url => url !== file.url),
                }));
              }
            }}
            accept="image/*"
          >
            {fileList.length >= 8 ? null : uploadButton}
          </Upload>

          {previewImage && (
            <Image
              style={{ display: 'none' }}
              preview={{
                visible: previewOpen,
                onVisibleChange: visible => setPreviewOpen(visible),
              }}
              src={previewImage}
            />
          )}
        </>
      )}
      {renderComponent()}
      <Form.Item style={{ marginTop: 10 }}>
        <Button onClick={onDelete} style={{ color: 'red', borderColor: 'red' }}>
          Видалити це завдання
        </Button>
      </Form.Item>
    </Card>
  );
};

export default TaskItem;
