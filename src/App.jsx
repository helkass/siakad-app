import { Route, Routes } from "react-router-dom";
import {
   BiayaKuliahPage,
   DashboardPage,
   ErrorPage,
   HasilStudi,
   HomePage,
   LoginPage,
   PhotoProfile,
   ProfilePage,
   RegistrasiPage,
   RencanaStudi,
   TagihanPage,
   Transkrip,
   ValidationRegister,
} from "./pages";
import PublicLayout from "./components/layout/PublicLayout";
import ProtectRoute from "./middleware/ProtectRoute";
import UserLayout from "./components/Layout/UserLayout";

function App() {
   return (
      <div className="App">
         <Routes>
            <Route path="/">
               <Route
                  index
                  element={
                     <PublicLayout>
                        <HomePage />
                     </PublicLayout>
                  }
               />
               <Route
                  path="login"
                  element={
                     <PublicLayout>
                        <LoginPage />
                     </PublicLayout>
                  }
               />
               <Route
                  path="registrasi"
                  element={
                     <PublicLayout>
                        <ValidationRegister />
                     </PublicLayout>
                  }
               />
               <Route
                  path="registrasi/:id"
                  element={
                     <PublicLayout>
                        <RegistrasiPage />
                     </PublicLayout>
                  }
               />
               <Route
                  path="mhs/:nim"
                  element={
                     <ProtectRoute>
                        <UserLayout />
                     </ProtectRoute>
                  }>
                  <Route index element={<DashboardPage />} />
                  <Route path="dashboard" element={<DashboardPage />} />
                  <Route path="profile" element={<ProfilePage />} />
                  <Route path="photo" element={<PhotoProfile />} />
                  <Route path="krs" element={<RencanaStudi />} />
                  <Route path="khs" element={<HasilStudi />} />
                  <Route path="transkrip" element={<Transkrip />} />
                  <Route path="biaya" element={<BiayaKuliahPage />} />
                  <Route path="tagihan" element={<TagihanPage />} />
               </Route>
               <Route path="*" element={<ErrorPage />} />
            </Route>
         </Routes>
      </div>
   );
}

export default App;
