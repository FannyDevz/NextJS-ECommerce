import { redirect } from 'next/navigation'

import Footer from '@/components/layouts/Footer'
import Navbar from '@/components/layouts/Navbar'
import { SidebarNav } from '@/components/layouts/SidebarNav'
import { getAuthSession } from '@/lib/auth'

export default async function DashboardLayout({
  children,
}: React.PropsWithChildren) {
  const session = await getAuthSession()

  if (!session?.user) {
    redirect('/sign-in')
  }

  return (
    <>
      <Navbar user={session?.user} />
      <div className='flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <aside className='hidden md:block border-r min-h-screen pt-10 pr-6 w-[200px]'>
          <SidebarNav />
        </aside>
        <main className='pt-6 md:pt-10 md:pl-10 w-full'>{children}</main>
      </div>
      <Footer />
    </>
  )
}
