import DarkTheme from "@/components/commons/DarkTheme";
import { Button, cn, Listbox, ListboxItem } from "@nextui-org/react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { JSX } from "react";
import { CiLogout } from "react-icons/ci";

interface SidebarItem {
  key: string;
  label: string;
  href: string;
  icon: JSX.Element;
}

interface PropTypes {
  sidebarItems: SidebarItem[];
  isOpen: boolean;
}

const DashboardLayoutSideBar = (props: PropTypes) => {
  const { sidebarItems, isOpen } = props;
  const router = useRouter();
  return (
    <div
      className={cn(
        "fixed z-50 flex h-screen w-full max-w-[300px] -translate-x-full flex-col justify-between border-r-1 border-default-200 bg-white px-4 py-6 transition-all dark:bg-[#181818] lg:relative lg:translate-x-0",
        { "translate-x-0": isOpen },
      )}
    >
      <div>
        <div
          className="flex flex-col justify-center pb-10 text-center font-bold text-primary-500"
          onClick={() => router.push("/")}
        >
          <p className="text-5xl">Server</p>
          <p className="text-3xl">Kimia Fisik</p>
        </div>
        <Listbox
          items={sidebarItems}
          variant="solid"
          aria-label="Dashboard Menu"
        >
          {(item) => (
            <ListboxItem
              key={item.key}
              className={cn("my-1 h-12 text-2xl", {
                "bg-primary-500 text-black": router.pathname.startsWith(
                  item.href,
                ),
              })}
              startContent={item.icon}
              textValue={item.label}
              aria-labelledby={item.label}
              aria-describedby={item.label}
              as={Link}
              href={item.href}
            >
              <p className="text-small">{item.label}</p>
            </ListboxItem>
          )}
        </Listbox>
      </div>
      <DarkTheme />
      <div className="flex items-center p-1">
        <Button
          fullWidth
          variant="light"
          className="flex justify-start rounded-lg px-2 py-1.5 font-semibold text-accent-500"
          size="lg"
          onPress={() => signOut()}
        >
          <CiLogout />
          Keluar
        </Button>
      </div>
    </div>
  );
};
export default DashboardLayoutSideBar;
