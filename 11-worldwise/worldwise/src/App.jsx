import { Suspense, lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import CountryList from './components/CountryList';
import City from './components/City';
import Form from './components/Form';
import { CitiesProvider } from './contexts/CitiesContext';
import { AuthProvider } from './contexts/FakeAuthContext';
import ProtectedRoute from './pages/ProtectedRoute';
import CityList from './components/CityList';
import SpinnerFullPage from './components/SpinnerFullPage';

// import Homepage from './pages/Homepage';
// import Product from './pages/Product';
// import Pricing from './pages/Pricing';
// import PageNotFound from './pages/PageNotFound';
// import Login from './pages/Login';
// import AppLayout from './pages/AppLayout';

const Homepage = lazy(() => import('./pages/Homepage'));
const Product = lazy(() => import('./pages/Product'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Login = lazy(() => import('./pages/Login'));
const AppLayout = lazy(() => import('./pages/AppLayout'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));

// Before lazy loading
// dist/index.html                   0.48 kB │ gzip:   0.32 kB
// dist/assets/index-9372c298.css   29.91 kB │ gzip:   5.07 kB
// dist/assets/index-c7d418af.js   514.42 kB │ gzip: 148.18 kB
// After lazy loading
// dist/index.html                           0.48 kB │ gzip:   0.32 kB
// dist/assets/Logo-515b84ce.css             0.03 kB │ gzip:   0.05 kB
// dist/assets/Login-f39ef3ff.css            0.35 kB │ gzip:   0.22 kB
// dist/assets/Product-cf1be470.css          0.47 kB │ gzip:   0.27 kB
// dist/assets/PageNav-d3c5d403.css          0.51 kB │ gzip:   0.28 kB
// dist/assets/Homepage-380f4eeb.css         0.51 kB │ gzip:   0.30 kB
// dist/assets/AppLayout-c52a8417.css        1.91 kB │ gzip:   0.70 kB
// dist/assets/index-d31de767.css           26.24 kB │ gzip:   4.38 kB
// dist/assets/Product.module-02d70b80.js    0.06 kB │ gzip:   0.07 kB
// dist/assets/PageNotFound-29816e32.js      0.15 kB │ gzip:   0.15 kB
// dist/assets/Logo-f89333d0.js              0.21 kB │ gzip:   0.19 kB
// dist/assets/PageNav-bfe3e0a2.js           0.48 kB │ gzip:   0.27 kB
// dist/assets/Pricing-dc022c8f.js           0.65 kB │ gzip:   0.41 kB
// dist/assets/Homepage-2aaa996a.js          0.67 kB │ gzip:   0.41 kB
// dist/assets/Product-e9ac0bcb.js           0.86 kB │ gzip:   0.49 kB
// dist/assets/Login-89bdf6d9.js             1.01 kB │ gzip:   0.54 kB
// dist/assets/AppLayout-34c70a89.js       156.89 kB │ gzip:  46.22 kB
// dist/assets/index-b3441695.js           356.04 kB │ gzip: 101.64 kB

const App = () => {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<Homepage />} />
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="login" element={<Login />} />
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
};

export default App;
