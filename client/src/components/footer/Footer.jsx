import styles from './Footer.module.css';
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <span>All rights reserved! &copy; 2024&nbsp; </span>
      <span>Recipes by Martin Dobrudzhanski</span>
    </footer>
  );
};

export default Footer;
