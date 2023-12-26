import { DataTable } from '@/components/ui/DataTable'
import prisma from '@/lib/db'
import { formatPrice } from '@/lib/utils'
import { ProductColumn, columns } from './components/columns'

export default async function ProductsPage({
  params,
}: {
  params: { storeId: string }
}) {
  const data = await prisma.product.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      Category: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  const formattedData: ProductColumn[] = data.map((item) => ({
    id: item.id,
    // @ts-expect-error
    price: formatPrice(parseFloat(item.price)),
    name: item.name,
    slug: item.slug,
    storeId: item.storeId,
    category: item.Category.name,
    createdAt: item.createdAt,
  }))

  return (
    <div>
      <DataTable searchKey='name' columns={columns} data={formattedData} />
    </div>
  )
}
