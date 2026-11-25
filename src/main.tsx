import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";
import App from "./App.tsx";
import MainLayout from "./layouts/MainLayout.tsx";
import Admin from "./pages/Admin.tsx";
import Mahasiswa from "@/pages/Mahasiswa.tsx";
import Dosen from "@/pages/Dosen.tsx";
import MataKuliah from "@/pages/MataKuliah.tsx";
import JadwalTugas from "@/pages/JadwalTugas.tsx";
import TugasBesar from "@/pages/TugasBesar.tsx";
import JadwalKuliah from "@/pages/JadwalKuliah.tsx";
import LoginPage from "./pages/Login.tsx";

const router = createBrowserRouter([
  {
    // element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/admin",
        element: <Admin />,
      },
      {
        path: "/mahasiswa",
        children:[
              {
                index:true,
                element:<Mahasiswa/>
              },
              {
                path:"MataKuliah",
                element:<MataKuliah/>
              },
          {
            path:"JadwalKuliah",
            element:<JadwalKuliah/>
          },
              {
                path:"TugasBesar",
                children:[
                  {
                    index:true,
                    element:<TugasBesar/>
                  },
                  {
                    path:"Jadwal",
                    element:<JadwalTugas/>
                  }
                ]
              }
            ]
      },
      {
        path: "/dosen",
        element: <Dosen/>,
      }
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
