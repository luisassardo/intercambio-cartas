import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import type { Participant, Match } from '@/types';

export function useParticipants() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      
      // Fetch participants
      const { data: participantsData, error: participantsError } = await supabase
        .from('participants')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (participantsError) throw participantsError;
      
      // Fetch matches
      const { data: matchesData, error: matchesError } = await supabase
        .from('matches')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (matchesError) throw matchesError;
      
      setParticipants(participantsData || []);
      setMatches(matchesData || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    
    // Subscribe to real-time changes
    const participantsSubscription = supabase
      .channel('participants_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'participants' }, fetchData)
      .subscribe();
    
    const matchesSubscription = supabase
      .channel('matches_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'matches' }, fetchData)
      .subscribe();
    
    return () => {
      participantsSubscription.unsubscribe();
      matchesSubscription.unsubscribe();
    };
  }, [fetchData]);

  const refresh = useCallback(() => {
    return fetchData();
  }, [fetchData]);

  const unmatchedCount = participants.filter(p => !p.matched).length;
  const matchedCount = participants.filter(p => p.matched).length;

  return {
    participants,
    matches,
    loading,
    error,
    refresh,
    stats: {
      total: participants.length,
      unmatched: unmatchedCount,
      matched: matchedCount,
      hospiceRecipients: participants.filter(p => p.is_hospice).length,
    },
  };
}
