import { supabase } from '@/lib/supabase';
import ThemeCard from '@/components/ThemeCard';
import { notFound } from 'next/navigation';

export default async function ThemePage({ params }: { params: { id: string } }) {
  const { data, error } = await supabase
    .from('themes')
    .select('*')
    .eq('share_id', params.id);

  if (error || !data || data.length === 0) {
    console.log("404 Error: No theme found for ID:", params.id);
    notFound();
  }

  return (
    <main style={{ padding: '40px', display: 'flex', justifyContent: 'center' }}>
      <ThemeCard theme={data[0]} />
    </main>
  );
}
