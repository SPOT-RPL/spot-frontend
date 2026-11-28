import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";
import App from "./App.tsx";
import MainLayout from "./layouts/MainLayout.tsx";
import Admin from "./pages/Admin.tsx";
import Mahasiswa from "@/pages/mahasiswa/Mahasiswa.tsx";
import Dosen from "@/pages/Dosen.tsx";
import MataKuliah from "@/pages/mahasiswa/MataKuliah.tsx";
import JadwalTugas from "@/pages/mahasiswa/JadwalTugas.tsx";
import TugasBesar from "@/pages/mahasiswa/TugasBesar.tsx";
import JadwalKuliah from "@/pages/mahasiswa/JadwalKuliah.tsx";
import JadwalUjian from "@/pages/mahasiswa/JadwalUjian.tsx";
import DetailTugasBesar from "@/pages/mahasiswa/TugasBesar/DetailTugasBesar.tsx";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <App />,
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
            path:"JadwalUjian",
            element:<JadwalUjian/>
          },
              {
                path:"TugasBesar",
                children:[
                  {
                    index:true,
                    element:<TugasBesar/>
                  },
                  {
                    path:":projectId",
                    element:<DetailTugasBesar/>
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
