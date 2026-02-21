import { createClientComponentClient } from "./supabase/client";

export async function signInWithEmailAndPassword(email: string, password: string) {
  const supabase = createClientComponentClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
}

export async function signUpWithEmailAndPassword(email: string, password: string) {
  const supabase = createClientComponentClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) throw error;

  if (data.user) {
    const { error: profileError } = await supabase
      .from('users')
      .insert([
        { 
          user_id: data.user.id,
          email: email,
          name: email.split('@')[0],
        }
      ]);
    
    if (profileError) {
      console.error('Error creating user profile:', profileError);
    }
  }

  return data;
}

export async function signOut() {
  const supabase = createClientComponentClient();
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}
