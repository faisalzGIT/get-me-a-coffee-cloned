// This is a Server Component
import PaymentPage from '@/components/PaymentPage';
import { notFound } from 'next/navigation';

// // Metadata for SEO
// export const metadata = {
//   title: 'Get Me a Coffee - User Profile',
//   description: 'Support content creators with a coffee!',
// };

// Main page component (Server Component)
export default async function Username({ params }) {
    const resolvedParams = await params; // 👈 await params first

    if (!resolvedParams?.username) {
        notFound();
    }

  return <PaymentPage username={resolvedParams.username} />;
}
