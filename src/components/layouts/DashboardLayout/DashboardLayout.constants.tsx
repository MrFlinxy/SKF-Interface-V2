import { CiGrid41 } from "react-icons/ci";

const SIDEBAR_ADMIN = [
  {
    key: "dashboard",
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: <CiGrid41 />,
  },
  {
    key: "submit",
    label: "Kirim Perhitungan",
    href: "/admin/submit",
    icon: <CiGrid41 />,
  },
  {
    key: "queue",
    label: "Antrian",
    href: "/admin/queue",
    icon: <CiGrid41 />,
  },
  {
    key: "result",
    label: "Hasil Perhitungan",
    href: "/admin/result",
    icon: <CiGrid41 />,
  },
  {
    key: "config",
    label: "Konfigurasi",
    href: "/admin/configuration",
    icon: <CiGrid41 />,
  },
  {
    key: "assignment",
    label: "Tugas",
    href: "/admin/assignment",
    icon: <CiGrid41 />,
  },
];

const SIDEBAR_MEMBER = [
  {
    key: "dashboard",
    label: "Dashboard",
    href: "/member/dashboard",
    icon: <CiGrid41 />,
  },
  {
    key: "submit",
    label: "Kirim Perhitungan",
    href: "/member/submit",
    icon: <CiGrid41 />,
  },
  {
    key: "queue",
    label: "Antrian",
    href: "/member/queue",
    icon: <CiGrid41 />,
  },
  {
    key: "result",
    label: "Hasil Perhitungan",
    href: "/member/result",
    icon: <CiGrid41 />,
  },
  {
    key: "assignment",
    label: "Tugas",
    href: "/member/assignment",
    icon: <CiGrid41 />,
  },
];

export { SIDEBAR_ADMIN, SIDEBAR_MEMBER };
