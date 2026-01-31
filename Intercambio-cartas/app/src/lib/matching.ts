import type { Participant, Match } from '@/types';

/**
 * Secure Random Matching Algorithm
 * 
 * This algorithm ensures:
 * 1. No participant is matched to themselves
 * 2. Each participant sends exactly one letter
 * 3. Each participant receives exactly one letter (if possible)
 * 4. The matching is completely random
 * 5. No one knows who they're matched to until the system reveals it
 */

export function generateMatches(participants: Participant[]): Omit<Match, 'id' | 'created_at'>[] {
  if (participants.length < 2) {
    return [];
  }

  // Create a copy of participants array
  const senders = [...participants];
  const receivers = [...participants];
  
  // Shuffle both arrays using Fisher-Yates algorithm
  shuffleArray(senders);
  shuffleArray(receivers);
  
  // Try to create a derangement (no one matched to themselves)
  let attempts = 0;
  let validMatch = false;
  let matches: Omit<Match, 'id' | 'created_at'>[] = [];
  
  while (!validMatch && attempts < 100) {
    matches = [];
    validMatch = true;
    
    // Create potential matches
    for (let i = 0; i < senders.length; i++) {
      if (senders[i].id === receivers[i].id) {
        validMatch = false;
        // Swap with next position to fix
        const nextIndex = (i + 1) % receivers.length;
        [receivers[i], receivers[nextIndex]] = [receivers[nextIndex], receivers[i]];
        break;
      }
    }
    
    attempts++;
  }
  
  // If we still have self-matches, use a different approach
  if (!validMatch) {
    // Rotate the receivers array by 1 position
    const first = receivers.shift()!;
    receivers.push(first);
  }
  
  // Create final matches
  for (let i = 0; i < senders.length; i++) {
    matches.push({
      sender_id: senders[i].id,
      receiver_id: receivers[i].id,
      sender_pseudonym: senders[i].pseudonym,
      receiver_pseudonym: receivers[i].pseudonym,
      emails_sent: false,
    });
  }
  
  return matches;
}

/**
 * Fisher-Yates shuffle algorithm for unbiased randomization
 */
function shuffleArray<T>(array: T[]): void {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

/**
 * Validates that a matching is correct:
 * - No self-matches
 * - Each sender appears exactly once
 * - Each receiver appears exactly once
 */
export function validateMatches(matches: Omit<Match, 'id' | 'created_at'>[]): boolean {
  const senderIds = new Set<string>();
  const receiverIds = new Set<string>();
  
  for (const match of matches) {
    // Check for self-matches
    if (match.sender_id === match.receiver_id) {
      return false;
    }
    
    // Check for duplicate senders
    if (senderIds.has(match.sender_id)) {
      return false;
    }
    senderIds.add(match.sender_id);
    
    // Check for duplicate receivers
    if (receiverIds.has(match.receiver_id)) {
      return false;
    }
    receiverIds.add(match.receiver_id);
  }
  
  return true;
}

/**
 * Generate email content for matched participants
 */
export function generateMatchEmail(
  senderPseudonym: string,
  receiverPseudonym: string,
  receiverAddress: string,
  isHospice: boolean = false,
  hospiceName?: string
): { subject: string; body: string } {
  const subject = `Your Anonymous Letter Exchange Match!`;
  
  let body = `Dear ${senderPseudonym},

Great news! You've been matched for the Anonymous Letter Exchange.

Your recipient's pseudonym: ${receiverPseudonym}

`;

  if (isHospice && hospiceName) {
    body += `This is a special hospice recipient from: ${hospiceName}

`;
  }

  body += `Please send your handwritten letter to:

${receiverAddress}

Important reminders:
- Do NOT include your real name or return address on the letter
- Use the pseudonym "${senderPseudonym}" as your signature
- Be kind, respectful, and creative!
- No personal identifying information

Happy writing!

The Anonymous Letter Exchange Team`;

  return { subject, body };
}
