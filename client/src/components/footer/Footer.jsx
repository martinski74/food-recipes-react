import styles from './Footer.module.css';
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <span>All rights reserved! &copy; {new Date().getFullYear()}&nbsp;</span>
      <span>Recipes by Martin Dobrudzhanski</span>
    </footer>
  );
};

export default Footer;
