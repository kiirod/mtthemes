import { supabase } from '@/lib/supabase';
import { redirect } from 'next/navigation';

export default async function UseThemeRedirect({ params }: { params: { id: string } }) {
  const { data: theme, error } = await supabase
    .from('themes')
    .select('link')
    .eq('share_id', params.id)
    .single();

  if (error || !theme) {
    return <div>Theme not found. Check that the share_id is correct.</div>;
  }

  redirect(theme.link);
}
