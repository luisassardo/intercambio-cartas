import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { useParticipants } from '@/hooks/useParticipants';
import { generateMatches, validateMatches } from '@/lib/matching';
import { createMatches, clearAllData, supabase } from '@/lib/supabase';
import { 
  ArrowLeftIcon, 
  UsersIcon, 
  ShuffleIcon, 
  MailIcon, 
  TrashIcon,
  LockIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  RefreshCwIcon
} from 'lucide-react';
import type { View } from '@/types';

interface AdminProps {
  onNavigate: (view: View) => void;
}

export function Admin({ onNavigate }: AdminProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [generatedMatches, setGeneratedMatches] = useState<any[]>([]);
  const [showConfirmClear, setShowConfirmClear] = useState(false);
  
  const { participants, matches, stats, refresh } = useParticipants();

  const ADMIN_PASSWORD = 'letter-exchange-2024'; // In production, use proper auth

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setMessage(null);
    } else {
      setMessage({ type: 'error', text: 'Invalid password' });
    }
  };

  const handleGenerateMatches = () => {
    const unmatched = participants.filter(p => !p.matched);
    
    if (unmatched.length < 2) {
      setMessage({ type: 'error', text: 'Need at least 2 unmatched participants' });
      return;
    }

    const newMatches = generateMatches(unmatched);
    
    if (!validateMatches(newMatches)) {
      setMessage({ type: 'error', text: 'Generated invalid matches. Please try again.' });
      return;
    }

    setGeneratedMatches(newMatches);
    setMessage({ type: 'success', text: `Generated ${newMatches.length} matches` });
  };

  const handleSaveMatches = async () => {
    if (generatedMatches.length === 0) return;
    
    setLoading(true);
    const result = await createMatches(generatedMatches);
    setLoading(false);
    
    if (result.success) {
      setMessage({ type: 'success', text: 'Matches saved successfully!' });
      setGeneratedMatches([]);
      refresh();
    } else {
      setMessage({ type: 'error', text: result.error || 'Failed to save matches' });
    }
  };

  const handleSendEmails = async () => {
    setLoading(true);
    
    // In a real implementation, this would call your email service
    // For now, we'll simulate by updating the database
    const { error } = await supabase
      .from('matches')
      .update({ emails_sent: true })
      .eq('emails_sent', false);
    
    setLoading(false);
    
    if (error) {
      setMessage({ type: 'error', text: 'Failed to mark emails as sent' });
    } else {
      setMessage({ type: 'success', text: 'Emails marked as sent!' });
      refresh();
    }
  };

  const handleClearAll = async () => {
    setLoading(true);
    const result = await clearAllData();
    setLoading(false);
    
    if (result.success) {
      setMessage({ type: 'success', text: 'All data cleared!' });
      setShowConfirmClear(false);
      refresh();
    } else {
      setMessage({ type: 'error', text: result.error || 'Failed to clear data' });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-6">
        <div className="mx-auto max-w-md">
          <Button 
            variant="ghost" 
            className="mb-6 -ml-4"
            onClick={() => onNavigate('home')}
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back
          </Button>

          <Card className="bg-white/90 backdrop-blur border-0 shadow-xl">
            <CardHeader className="text-center">
              <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-4">
                <LockIcon className="h-6 w-6 text-indigo-600" />
              </div>
              <CardTitle>Admin Access</CardTitle>
              <CardDescription>Enter password to access admin panel</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {message && (
                <Alert variant="destructive">
                  <AlertCircleIcon className="h-4 w-4" />
                  <AlertDescription>{message.text}</AlertDescription>
                </Alert>
              )}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                />
              </div>
              <Button 
                className="w-full bg-indigo-600 hover:bg-indigo-700"
                onClick={handleLogin}
              >
                Access Admin Panel
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => onNavigate('home')}
            >
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          </div>
          <Button variant="outline" onClick={refresh} disabled={loading}>
            <RefreshCwIcon className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>

        {message && (
          <Alert 
            className={`mb-6 ${message.type === 'success' ? 'bg-green-50 border-green-200' : ''}`}
            variant={message.type === 'error' ? 'destructive' : 'default'}
          >
            {message.type === 'success' ? (
              <CheckCircleIcon className="h-4 w-4 text-green-600" />
            ) : (
              <AlertCircleIcon className="h-4 w-4" />
            )}
            <AlertDescription>{message.text}</AlertDescription>
          </Alert>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white/80 backdrop-blur">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
                <UsersIcon className="h-8 w-8 text-indigo-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Unmatched</p>
                  <p className="text-2xl font-bold text-amber-600">{stats.unmatched}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                  <span className="text-amber-600 text-sm">?</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Matched</p>
                  <p className="text-2xl font-bold text-green-600">{stats.matched}</p>
                </div>
                <CheckCircleIcon className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Hospice</p>
                  <p className="text-2xl font-bold text-pink-600">{stats.hospiceRecipients}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center">
                  <span className="text-pink-600 text-sm">♥</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="participants" className="space-y-6">
          <TabsList className="bg-white/80">
            <TabsTrigger value="participants">Participants</TabsTrigger>
            <TabsTrigger value="matching">Matching</TabsTrigger>
            <TabsTrigger value="matches">Matches</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="participants">
            <Card className="bg-white/80 backdrop-blur">
              <CardHeader>
                <CardTitle>All Participants</CardTitle>
                <CardDescription>
                  {stats.total} total participants, {stats.unmatched} waiting to be matched
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Pseudonym</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Joined</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {participants.map((p) => (
                      <TableRow key={p.id}>
                        <TableCell className="font-mono font-medium">{p.pseudonym}</TableCell>
                        <TableCell>{p.email}</TableCell>
                        <TableCell>
                          {p.matched ? (
                            <Badge variant="default" className="bg-green-100 text-green-700">Matched</Badge>
                          ) : (
                            <Badge variant="outline" className="text-amber-600">Waiting</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          {p.is_hospice ? (
                            <Badge variant="outline" className="text-pink-600">Hospice</Badge>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </TableCell>
                        <TableCell className="text-sm text-gray-500">
                          {new Date(p.created_at).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="matching">
            <Card className="bg-white/80 backdrop-blur">
              <CardHeader>
                <CardTitle>Generate Matches</CardTitle>
                <CardDescription>
                  Create random matches for {stats.unmatched} unmatched participants
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex gap-4">
                  <Button 
                    onClick={handleGenerateMatches}
                    disabled={stats.unmatched < 2 || loading}
                    className="bg-indigo-600 hover:bg-indigo-700"
                  >
                    <ShuffleIcon className="h-4 w-4 mr-2" />
                    Generate Random Matches
                  </Button>
                  
                  {generatedMatches.length > 0 && (
                    <Button 
                      onClick={handleSaveMatches}
                      disabled={loading}
                      variant="outline"
                    >
                      <CheckCircleIcon className="h-4 w-4 mr-2" />
                      Save Matches
                    </Button>
                  )}
                </div>

                {generatedMatches.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="font-semibold">Preview ({generatedMatches.length} matches)</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Sender</TableHead>
                          <TableHead>→</TableHead>
                          <TableHead>Receiver</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {generatedMatches.map((match, idx) => (
                          <TableRow key={idx}>
                            <TableCell className="font-mono">{match.sender_pseudonym}</TableCell>
                            <TableCell>→</TableCell>
                            <TableCell className="font-mono">{match.receiver_pseudonym}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="matches">
            <Card className="bg-white/80 backdrop-blur">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>All Matches</CardTitle>
                    <CardDescription>
                      {matches.length} total matches created
                    </CardDescription>
                  </div>
                  <Button 
                    onClick={handleSendEmails}
                    disabled={matches.filter(m => !m.emails_sent).length === 0 || loading}
                    variant="outline"
                  >
                    <MailIcon className="h-4 w-4 mr-2" />
                    Send Pending Emails
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Sender</TableHead>
                      <TableHead>Receiver</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Email Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {matches.map((match) => (
                      <TableRow key={match.id}>
                        <TableCell className="font-mono">{match.sender_pseudonym}</TableCell>
                        <TableCell className="font-mono">{match.receiver_pseudonym}</TableCell>
                        <TableCell className="text-sm text-gray-500">
                          {new Date(match.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {match.emails_sent ? (
                            <Badge variant="default" className="bg-green-100 text-green-700">Sent</Badge>
                          ) : (
                            <Badge variant="outline" className="text-amber-600">Pending</Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="bg-white/80 backdrop-blur">
              <CardHeader>
                <CardTitle>Danger Zone</CardTitle>
                <CardDescription>
                  These actions cannot be undone
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!showConfirmClear ? (
                  <Button 
                    variant="destructive"
                    onClick={() => setShowConfirmClear(true)}
                  >
                    <TrashIcon className="h-4 w-4 mr-2" />
                    Clear All Data
                  </Button>
                ) : (
                  <div className="space-y-4 p-4 bg-red-50 rounded-lg border border-red-200">
                    <p className="text-red-700 font-medium">
                      Are you sure? This will delete ALL participants and matches.
                    </p>
                    <div className="flex gap-4">
                      <Button 
                        variant="destructive"
                        onClick={handleClearAll}
                        disabled={loading}
                      >
                        Yes, Clear Everything
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => setShowConfirmClear(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
