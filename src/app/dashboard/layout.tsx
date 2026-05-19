import Sidebar from "@/components/layout/Sidebar"
import Topbar from "@/components/layout/Topbar"

type DashboardLayoutProps = {
  children: React.ReactNode
}

export default function DashboardLayout(props: DashboardLayoutProps) {
  return (
    <main className="flex min-h-screen">
      <Sidebar />

      <section className="flex-1 bg-zinc-100">
        <Topbar />

        <div className="p-8">
          {props.children}
        </div>
      </section>
    </main>
  )
}