import { supabase } from '@/lib/supabase';
import { redirect } from 'next/navigation';

export default async function UseThemeRedirect({ params }: { params: { id: string } }) {
  const targetId = params.id;
  
  console.log("DEBUG: Looking for share_id:", targetId);

  const { data, error } = await supabase
    .from('themes')
    .select('link')
    .eq('share_id', targetId)
    .single();

  if (error) console.error("DEBUG: Supabase Error:", error);
  if (!data) console.log("DEBUG: Database returned no results for:", targetId);

  if (error || !data) {
    return (
      <div style={{ color: 'white', padding: '20px' }}>
        <h1>Theme not found.</h1>
        <p>Check the console/terminal logs. The ID <strong>{targetId}</strong> does not exist in the 'share_id' column.</p>
      </div>
    );
  }

  redirect(data.link);
}
