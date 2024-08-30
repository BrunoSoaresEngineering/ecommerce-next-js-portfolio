import DashboardCard from '@/components/Dashboard-card';
import db from '@/db/db';
import { formatNumber, formatCurrency } from '@/lib/formatters';

async function getSalesData() {
  const data = await db.order.aggregate({
    _sum: { pricePaidInCents: true },
    _count: true
  });

  return {
    amount: (data._sum.pricePaidInCents || 0) / 100,
    numberOfSales: data._count
  };
}

async function getUserData() {
  const [userCount, orderData] = await Promise.all([
    db.user.count(),
    db.order.aggregate({
      _sum: { pricePaidInCents: true }
    })
  ]);

  const averageValuePerUser = userCount === 0 
    ? 0 
    : (orderData.__sum.pricePaidInCents || 0) / userCount / 100;

  return {
    userCount,
    averageValuePerUser
  }
}

async function getProductData() {
  const [activeCount, inactiveCount] = await Promise.all([
    db.product.count({ where: { isAvailableForPurchase: true }}),
    db.product.count({ where: { isAvailableForPurchase: false }})
  ]);

  return {
    activeCount,
    inactiveCount
  };
}

type Props = {}
const AdminDashboard = async (props: Props) => {
  const [salesData, userData, productData] = await Promise.all([
    getSalesData(),
    getUserData(),
    getProductData()
  ]);

  return (
    <div className='grid grid-cols-1 md:grid-flow-cols-2 lg:grid-cols-3 gap-4'>
      <DashboardCard
        title='Sales'
        subtitle={`${formatNumber(salesData.numberOfSales)} Orders`}
        body={`${formatCurrency(salesData.amount)}`}
      />

      <DashboardCard
        title='Customers'
        subtitle={`${formatCurrency(userData.averageValuePerUser)} Average Value`}
        body={`${formatNumber(userData.userCount)}`}
      />

      <DashboardCard
        title='Active Products'
        subtitle={`${formatNumber(productData.inactiveCount)} Inactive`}
        body={`${formatNumber(productData.activeCount)}`}
      />
    </div>
  )
}
export default AdminDashboard;