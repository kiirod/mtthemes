import { supabase } from '@/lib/supabase';
import ThemeCard from '@/components/ThemeCard';
import { notFound } from 'next/navigation';

export default async function ThemePage({ params }: { params: { id: string } }) {
  console.log("DEBUG: Attempting to find theme with ID:", params.id);

  const { data, error } = await supabase
    .from('themes')
    .select('*')
    .eq('share_id', params.id)
    .maybeSingle();

  if (error) {
    console.error("DEBUG: Supabase Error:", error);
  }

  console.log("DEBUG: Theme found:", data);

  if (!data) {
    console.log("DEBUG: No data found for this ID.");
    notFound();
  }

  return (
    <main style={{ padding: '40px', display: 'flex', justifyContent: 'center' }}>
      <ThemeCard theme={data} />
    </main>
  );
}

// holy fuck this shit is too hard i need to get claude to do this
