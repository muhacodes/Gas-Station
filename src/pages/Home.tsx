import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';

const Home = () => {
  return (
    <>
      <DefaultLayout>
        <div className="mx-auto">
          <Breadcrumb pageName="Home" />
          
        </div>
      </DefaultLayout>
    </>
  );
};

export default Home;
