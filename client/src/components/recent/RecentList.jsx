import styles from './RecentList.module.css';

const RecentList = () => {
  return (
    <>
      <div className={styles.item}>
        <img src='https://static01.nyt.com/images/2021/02/14/dining/carbonara-horizontal/carbonara-horizontal-square640-v2.jpg' />
        <p>Spagetti Carbonara</p>

        <a className={styles['details-btn']} href='#'>
          Details
        </a>
      </div>
      <div className={styles.item}>
        <img src='https://www.wholesomeyum.com/wp-content/uploads/2020/11/wholesomeyum-Stir-Fry-Vegetables-15.jpg' />
        <p>Vegetable Stir Fry</p>

        <a className={styles['details-btn']} href='#'>
          Details
        </a>
      </div>
      <div className={styles.item}>
        <img src='https://images.immediate.co.uk/production/volatile/sites/30/2023/03/Cowboy-pie-cef67be.jpg?quality=90&resize=556,505' />
        <p>Baked Tomato</p>

        <a className={styles['details-btn']} href='#'>
          Details
        </a>
      </div>
    </>
  );
};

export default RecentList;
