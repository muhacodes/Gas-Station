import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';

const Home = () => {
  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Home" />
      </DefaultLayout>
    </>
  );
};

export default Home;
