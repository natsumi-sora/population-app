//スタイルの読み込み
import styles from './header.module.css';
const Header = () => {
    return (<header className={styles.header}>
        <div>
         Population graph by prefecture from Yumemi API
        </div>
      </header>);
};
export default Header;
