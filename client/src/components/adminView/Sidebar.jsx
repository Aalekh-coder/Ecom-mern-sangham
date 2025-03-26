import { BadgeCheck, LayoutDashboard, ShoppingBasket } from "lucide-react";
import { ChartNoAxesCombined } from 'lucide-react'
import React, { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

const adminSidebarMenuItem = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icons: <LayoutDashboard />,
  },
  {
    id: "products", label: "Products", path: "/admin/product",
    icons: <ShoppingBasket />
  },
  {
    id: "order", label: "Order", path: "/admin/order",
    icons: <BadgeCheck />
  },
];



function Menuitems({ setOpen }) {
  const navigate = useNavigate()


  return <nav className='mt-8 flex-col flex gap-2'>
    {
      adminSidebarMenuItem.map(menuItem => <div key={menuItem.id} onClick={() => {
        setOpen ? setOpen(false) : null
        navigate(menuItem.path)
      }} className='flex items-center gap-2 rounded-md px-3 py-2 hover:text-blue-300 text-muted-foreground hover:bg-muted hover:text-foreground text-xl cursor-pointer
        '>
        {menuItem.icons}
        <span>{menuItem.label}</span>
      </div>)
    }
  </nav>
}


const AdminSidebar = ({ open, setOpen }) => {

  const navigate = useNavigate()

  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full">
            <SheetHeader className={"border-b"}>
              <SheetTitle className="flex gap-2 mt-5 mb-5">
                <ChartNoAxesCombined size={30} />
                Admin Panel
              </SheetTitle>
            </SheetHeader>
            <Menuitems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>
      <aside className='hidden w-64 flex-col border-r bg-background p-6 lg:flex'>
        <div onClick={() => navigate("/admin/dashboard")} className="flex items-center gap-2 cursor-pointer">
          <ChartNoAxesCombined size={30} />
          <h2 className="text-2xl font-extrabold">Admin panel</h2>
        </div>
        <Menuitems />
      </aside>
    </Fragment>
  )
}

export default AdminSidebar