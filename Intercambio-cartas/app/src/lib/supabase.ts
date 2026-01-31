import { createClient } from '@supabase/supabase-js';
import type { Participant, Match } from '@/types';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Encryption utilities for sensitive data
const ENCRYPTION_KEY = import.meta.env.VITE_ENCRYPTION_KEY || 'default-key-change-in-production';

export function encryptData(text: string): string {
  if (!text) return '';
  // Simple XOR encryption for demo - use proper encryption in production
  let result = '';
  for (let i = 0; i < text.length; i++) {
    result += String.fromCharCode(text.charCodeAt(i) ^ ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length));
  }
  return btoa(result);
}

export function decryptData(encrypted: string): string {
  if (!encrypted) return '';
  try {
    const text = atob(encrypted);
    let result = '';
    for (let i = 0; i < text.length; i++) {
      result += String.fromCharCode(text.charCodeAt(i) ^ ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length));
    }
    return result;
  } catch {
    return '';
  }
}

// Database operations
export async function registerParticipant(data: {
  pseudonym: string;
  email: string;
  name_encrypted: string;
  address_encrypted: string;
  city_encrypted: string;
  postal_code_encrypted: string;
  country_encrypted: string;
  is_hospice: boolean;
  hospice_name?: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    // Check if pseudonym is unique
    const { data: existing } = await supabase
      .from('participants')
      .select('pseudonym')
      .eq('pseudonym', data.pseudonym)
      .single();

    if (existing) {
      return { success: false, error: 'Pseudonym already taken' };
    }

    const { error } = await supabase.from('participants').insert([{
      ...data,
      matched: false,
      created_at: new Date().toISOString(),
    }]);

    if (error) throw error;
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getParticipants(): Promise<Participant[]> {
  const { data, error } = await supabase
    .from('participants')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function getUnmatchedParticipants(): Promise<Participant[]> {
  const { data, error } = await supabase
    .from('participants')
    .select('*')
    .eq('matched', false);

  if (error) throw error;
  return data || [];
}

export async function createMatches(matches: Omit<Match, 'id' | 'created_at'>[]): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.from('matches').insert(matches);
    if (error) throw error;

    // Update participants as matched
    for (const match of matches) {
      await supabase
        .from('participants')
        .update({ 
          matched: true, 
          matched_to: match.receiver_id 
        })
        .eq('id', match.sender_id);
    }

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getMatches(): Promise<Match[]> {
  const { data, error } = await supabase
    .from('matches')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function clearAllData(): Promise<{ success: boolean; error?: string }> {
  try {
    await supabase.from('matches').delete().neq('id', '');
    await supabase.from('participants').delete().neq('id', '');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// Generate unique pseudonym
export function generatePseudonym(): string {
  const adjectives = ['Gentle', 'Silent', 'Wandering', 'Thoughtful', 'Curious', 'Dreaming', 'Serene', 'Mystic', 'Hidden', 'Quiet'];
  const nouns = ['Writer', 'Traveler', 'Dreamer', 'Observer', 'Poet', 'Storyteller', 'Messenger', 'Seeker', 'Wanderer', 'Friend'];
  const numbers = Math.floor(Math.random() * 999) + 1;
  
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  
  return `${adj}${noun}${numbers}`;
}

// Check pseudonym availability
export async function isPseudonymAvailable(pseudonym: string): Promise<boolean> {
  const { data } = await supabase
    .from('participants')
    .select('pseudonym')
    .eq('pseudonym', pseudonym)
    .single();
  
  return !data;
}
