import Panel from './Panel';
import styles from './page.module.css';
import Audios from './Audios';
import Test from './Test';

export default function Page(){
  return (
  <div className={styles.main}>
    <Panel />
    <Audios />
  </div>
  );
}
