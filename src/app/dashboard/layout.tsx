import Sidebar from "@/components/layout/Sidebar"
import Topbar from "@/components/layout/Topbar"

type DashboardLayoutProps = {
  children: React.ReactNode
}

export default function DashboardLayout(
  props: DashboardLayoutProps
) {
  return (
    <main>
      {props.children}
    </main>
  )
}