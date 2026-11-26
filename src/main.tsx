import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";
import App from "./App.tsx";

import MainLayout from "@/layouts/MainLayout.tsx";

import AdminDashboard from "@/pages/Admin/Dashboard.tsx";
import Mahasiswa from "@/pages/Mahasiswa.tsx";
import Dosen from "@/pages/Dosen.tsx";
import MataKuliah from "@/pages/MataKuliah.tsx";
import JadwalTugas from "@/pages/JadwalTugas.tsx";
import TugasBesar from "@/pages/TugasBesar.tsx";
import JadwalKuliah from "@/pages/JadwalKuliah.tsx";
import ManajemenMahasiswa from "@/pages/Admin/ManajemenMahasiswa.tsx";
import ManajemenDosen from "@/pages/Admin/ManajemenDosen.tsx";
import LoginPage from "./pages/Login.tsx";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/admin",
        children: [
          {
            index: true,
            element: <AdminDashboard />,
          },
          {
            path: "manajemen-mahasiswa",
            element: <ManajemenMahasiswa />
          },
          {
            path: "manajemen-dosen",
            element: <ManajemenDosen />
          }
        ]
      },
      {
        path: "/mahasiswa",
        children: [
          {
            index: true,
            element: <Mahasiswa />,
          },
          {
            path: "MataKuliah",
            element: <MataKuliah />,
          },
          {
            path: "JadwalKuliah",
            element: <JadwalKuliah />,
          },
          {
            path: "TugasBesar",
            children: [
              {
                index: true,
                element: <TugasBesar />,
              },
              {
                path: "Jadwal",
                element: <JadwalTugas />,
              },
            ],
          },
        ],
      },
      {
        path: "/dosen",
        element: <Dosen />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
