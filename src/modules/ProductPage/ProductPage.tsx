import styles from './ProductPage.module.scss';
import { useLocation } from 'react-router-dom';
import { useEffect, useMemo, useState, useCallback } from 'react';
import axios from 'axios';
import classNames from 'classnames';
import { Loader } from '../../components/Loader';
import { TestType } from '../../enums/TestType';
import { Task } from '../../types/Task';
import icon from '../../../public/img/icons/arrow-right-icon.svg';
import { TaskCard } from '../TaskCard/TaskCard';

// Простой debounce-хук
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

export const ProductPage = () => {
  const location = useLocation();
  const [testType, setTestType] = useState<TestType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Загружаем данные с сервера
  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await axios.get(
          'https://stradanie-production.up.railway.app/api/tests',
        );

        setTasks(res.data);
      } catch (err) {
        setError('Не удалось загрузить данные.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Определяем тип теста по пути
  useEffect(() => {
    if (location.pathname.includes(TestType.task)) {
      setTestType(TestType.task);
    }
  }, [location.pathname]);

  // Фильтруем задачи по типу и по строке поиска
  const filteredTasks: Task[] = useMemo(() => {
    return tasks.filter(
      task =>
        task.type === testType &&
        task.nazwa.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
    );
  }, [tasks, testType, debouncedSearchTerm]);

  // Используем useCallback для обработчика ввода, чтобы избежать лишних перерендериваний
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    },
    [],
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={styles.productPage}>
      <div className={styles.productPage__top}>
        <img
          src={icon}
          alt="arrow-right"
          className={styles.productPage__topArrowIcon}
        />
        <span className={styles.productPage__topText}>
          {testType && testType[0].toUpperCase() + testType.slice(1)}
        </span>
      </div>
      <h1 className={styles.productPage__title}>
        {testType === TestType.task ? 'Самостійні роботи' : ''}
      </h1>
      <span className={styles.productPage__modelsAmount}>
        {`Всього ${filteredTasks.length} робіт`}
      </span>

      <div className={styles.productPage__dropDownMenuContainer}>
        <div
          className={classNames(
            styles.productPage__dropDownMenu,
            styles.productPage__sortMenu,
          )}
        >
          <span className={styles.productPage__dropDownMenuLabel}>
            Пошук по назві
          </span>
          <input
            className={styles.productPage__dropDownMenuButton}
            placeholder="Введіть назву роботи"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {error ? (
        <span className={styles.productPage__productCardsError}>{error}</span>
      ) : (
        <div className={styles.productPage__productCards}>
          {filteredTasks.length > 0 ? (
            filteredTasks.map(task => <TaskCard task={task} key={task.id} />)
          ) : (
            <span className={styles.productPage__productCardsError}>
              {`Робіт не знайдено`}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
