import { IoGridOutline } from "react-icons/io5";
import { LuFileUser } from "react-icons/lu";
import { HiQueueList } from "react-icons/hi2";
import { LuSend } from "react-icons/lu";
import { GoGear } from "react-icons/go";
import { MdOutlineAssignment } from "react-icons/md";

const SIDEBAR_ADMIN = [
  {
    key: "dashboard",
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: <IoGridOutline />,
  },
  {
    key: "submit",
    label: "Kirim Perhitungan",
    href: "/admin/submit",
    icon: <LuSend />,
  },
  {
    key: "queue",
    label: "Antrian",
    href: "/admin/queue",
    icon: <HiQueueList />,
  },
  {
    key: "result",
    label: "Hasil Perhitungan",
    href: "/admin/result",
    icon: <LuFileUser />,
  },
  {
    key: "config",
    label: "Konfigurasi",
    href: "/admin/configuration",
    icon: <GoGear />,
  },
  {
    key: "assignment",
    label: "Tugas",
    href: "/admin/assignment",
    icon: <MdOutlineAssignment />,
  },
];

const SIDEBAR_MEMBER = [
  {
    key: "dashboard",
    label: "Dashboard",
    href: "/member/dashboard",
    icon: <IoGridOutline />,
  },
  {
    key: "submit",
    label: "Kirim Perhitungan",
    href: "/member/submit",
    icon: <LuSend />,
  },
  {
    key: "queue",
    label: "Antrian",
    href: "/member/queue",
    icon: <HiQueueList />,
  },
  {
    key: "result",
    label: "Hasil Perhitungan",
    href: "/member/result",
    icon: <LuFileUser />,
  },
  {
    key: "assignment",
    label: "Tugas",
    href: "/member/assignment",
    icon: <MdOutlineAssignment />,
  },
];

export { SIDEBAR_ADMIN, SIDEBAR_MEMBER };
