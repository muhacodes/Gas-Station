import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import PageTitle from './components/PageTitle';
import ProtectedRoute from './pages/Authentication/ProtectedRoute';
import ProductComponent from './pages/Product/Product';
import SignIn from './pages/Authentication/SignIn';
import Home from './pages/Home';
import Stock from './pages/Product/Stock';
import StockAdd from './pages/Product/StockAdd';
import { useAppDispatch, useAppSelector } from './hooks/customHooks';
import {
  fetchProduct,
  fetchPump,
  fetchStock,
} from './store/Slice/ProductSlice';
import Tank from './pages/Tank/Tank';
import {
  fetchDipping,
  fetchFuelDelivery,
  fetchMeter,
  fetchTank,
} from './store/Slice/Tank';
import Dipping from './pages/Tank/dipping';
import Fueldelivery from './pages/Tank/fueldelivery';
import Pump from './pages/Product/Pump';
import Creditors from './pages/Sales/Creditors';
import CreditorAdd from './pages/Sales/CreditorAdd';
import { fetchCreditors, fetchCreditSales, fetchSales } from './store/Slice/Sales';
import Sales from './pages/Sales/sales';
import SalesAdd from './pages/Sales/SalesAdd';
import Meter from './pages/Tank/Meter';
import CreditSales from './pages/Sales/CreditSales';
import CreditSalesAdd from './pages/Sales/CreditSalesAdd';

// import Calendar from './pages/Calendar

function App() {
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const fetch = async () => {
    try {
      const startTime = performance.now(); // Start timer
      await Promise.all([
        dispatch(fetchProduct()).unwrap(),
        dispatch(fetchPump()).unwrap(),
        dispatch(fetchStock()).unwrap(),
        dispatch(fetchCreditors()).unwrap(),
        dispatch(fetchMeter()).unwrap(),
        dispatch(fetchTank()).unwrap(),
        dispatch(fetchFuelDelivery()).unwrap(),
        dispatch(fetchDipping()).unwrap(),
        dispatch(fetchSales()).unwrap(),
        dispatch(fetchCreditSales()).unwrap(),
      ]);

      const endTime = performance.now(); // End timer
      const duration = endTime - startTime; // Calculate the time difference

      console.log('All Data fetched');
      console.log(`Fetching took ${duration.toFixed(2)} milliseconds.`);
    } catch (Error: any) {
      console.log('AppWide Fetching Error Occured!', Error);
    }
  };

  useEffect(() => {
    const persistedState = localStorage.getItem('persist:root');
    if (!persistedState) {
      // const parsedState = JSON.parse(persistedState);
    }
    fetch();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Routes>
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <>
                <PageTitle title="Home | PumpMaster" />
                <Home />
              </>
            </ProtectedRoute>
          }
        />
        <Route
          path="/product"
          element={
            <ProtectedRoute>
              <>
                <PageTitle title="Product" />
                <ProductComponent />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/product/add"
          element={
            <ProtectedRoute>
              <>
                <PageTitle title="Product | Add Product" />
                <ProductComponent />
              </>
            </ProtectedRoute>
          }
        />
        <Route
          path="/stock"
          element={
            <ProtectedRoute>
              <>
                <PageTitle title="Product" />
                <Stock />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/stock/add"
          element={
            <ProtectedRoute>
              <>
                <PageTitle title="Product" />
                <StockAdd />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/tank"
          element={
            <ProtectedRoute>
              <>
                <PageTitle title="Tank" />
                <Tank />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/tank/dipping"
          element={
            <ProtectedRoute>
              <>
                <PageTitle title="Dipping" />
                <Dipping />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/fuel-offload"
          element={
            <ProtectedRoute>
              <>
                <PageTitle title="Fuel Delivery" />
                <Fueldelivery />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/meter"
          element={
            <ProtectedRoute>
              <>
                <PageTitle title="Meter" />
                <Meter />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/pump"
          element={
            <ProtectedRoute>
              <>
                <PageTitle title="Pump" />
                <Pump />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/creditor"
          element={
            <ProtectedRoute>
              <>
                <PageTitle title="Creditors" />
                <Creditors />
              </>
            </ProtectedRoute>
          }
        />
        <Route
          path="/creditor/add"
          element={
            <ProtectedRoute>
              <>
                <PageTitle title="Creditors" />
                <CreditorAdd />
              </>
            </ProtectedRoute>
          }
        />


        <Route
          path="/credit/sales"
          element={
            <ProtectedRoute>
              <>
                <PageTitle title="Creditors" />
                <CreditSales />
              </>
            </ProtectedRoute>
          }
        />
        <Route
          path="/credit/sales/add"
          element={
            <ProtectedRoute>
              <>
                <PageTitle title="Creditors" />
                <CreditSalesAdd />
              </>
            </ProtectedRoute>
          }
        />

        

        <Route
          path="/sales"
          element={
            <ProtectedRoute>
              <>
                <PageTitle title="Fuel Delivery" />
                <Sales />
              </>
            </ProtectedRoute>
          }
        />
        <Route
          path="/sales/add"
          element={
            <ProtectedRoute>
              <>
                <PageTitle title="Fuel Delivery" />
                <SalesAdd />
              </>
            </ProtectedRoute>
          }
        />

        {/* <Route
          path="/pump"
          element={
            <ProtectedRoute>
              <>
                <PageTitle title="Fuel Delivery" />
                <Pump />
              </>
            </ProtectedRoute>
          }
        /> */}

        <Route
          path="/auth/login"
          element={
            <>
              <PageTitle title="Login | Focusing First on People" />
              <SignIn />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
