// src/components/TitleBar.tsx
import CurrentTime from '@/componentsUI/CurrentTime';
import CurrentDate from '@/componentsUI/CurrentDate';
import styles from '@/styles/Layout.module.css';

// Recibirá el título como una prop
const TitleBar = ({ title }: { title: string }) => {
  return (
    <header className={styles.titleBar}>
      <div className={styles.title}>
        <h3>{title}</h3>
      </div>
      <div className={styles.dateTimeContainer}>        
        <div className={styles.date}>
          <CurrentDate />
        </div>
        <div className={styles.time}>
          {/* Un ancho aproximado que cubra la hora más larga */}
          <CurrentTime width="115px" />
        </div>
      </div>
    </header>
  );
};

export default TitleBar;
