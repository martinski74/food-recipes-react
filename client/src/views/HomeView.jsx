import RecentList from '../components/recent/RecentList';
import styles from './HomeView.module.css';

const HomeView = () => {
  return (
    <main className={styles.home}>
      <section className={styles.welcome}>
        <h1>Welcome to Food World</h1>
        <h2>
          Welcome to Foodie Haven, your ultimate destination for all things
          delicious! Whether you’re a seasoned chef or a culinary novice, we’re
          here to inspire and guide you through a world of flavors, recipes, and
          food adventures.
        </h2>
      </section>

      <section className={styles['last-added']}>
        <h4>Last Added</h4>
        <RecentList />

        {/* <p className='no-post'>There are no recipes!</p> */}
      </section>
    </main>
  );
};

export default HomeView;
