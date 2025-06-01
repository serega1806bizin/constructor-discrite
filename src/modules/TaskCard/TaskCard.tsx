import { Link } from 'react-router-dom';
import styles from './TaskCard.module.scss';
import classNames from 'classnames';
import { Task } from '../../types/Task';

type Props = {
  task: Task;
};

export const TaskCard: React.FC<Props> = ({ task }) => {
  const pageScroll = () => {
    document.body.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={styles.productCard}>
      <main className={styles.productCard__main}>
        <Link
          to={`/${task.type}/${task.id}`}
          className={styles.productCard__name}
          onClick={pageScroll}
        >
          {task.nazwa}
        </Link>

        <div className={styles.productCard__divider} />

        <div className={styles.productCard__specs}>
          {[
            { label: 'Номер роботи', value: task.nomer },
            { label: 'Кількість робіт', value: task.progress },
          ].map(({ label, value }) => (
            <div key={label} className={styles.productCard__specsRow}>
              <span className={styles.productCard__specsLabel}>{label}</span>
              <span className={styles.productCard__specsValue}>{value}</span>
            </div>
          ))}
        </div>
      </main>

      <footer className={styles.productCard__footer}>
        <Link
          className={styles.productCard__addToCart}
          to={`/${task.type}/${task.id}`}
        >
          <button className={classNames(styles.productCard__addToCart)}>
            Переглянути роботи
          </button>
        </Link>
      </footer>
    </div>
  );
};
