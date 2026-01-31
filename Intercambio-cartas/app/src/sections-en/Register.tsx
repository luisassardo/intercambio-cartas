import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  generatePseudonym, 
  isPseudonymAvailable, 
  encryptData, 
  registerParticipant 
} from '@/lib/supabase';
import { ArrowLeftIcon, RefreshCwIcon, CheckCircleIcon, AlertCircleIcon } from 'lucide-react';
import type { View } from '@/types';

interface RegisterProps {
  onNavigate: (view: View) => void;
}

export function Register({ onNavigate }: RegisterProps) {
  const [step, setStep] = useState<'pseudonym' | 'details'>('pseudonym');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Pseudonym step
  const [useCustomPseudonym, setUseCustomPseudonym] = useState(false);
  const [pseudonym, setPseudonym] = useState('');
  const [generatedPseudonym, setGeneratedPseudonym] = useState(generatePseudonym());
  
  // Details step
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [isHospice, setIsHospice] = useState(false);
  const [hospiceName, setHospiceName] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleGenerateNewPseudonym = () => {
    setGeneratedPseudonym(generatePseudonym());
  };

  const handlePseudonymSubmit = async () => {
    const finalPseudonym = useCustomPseudonym ? pseudonym : generatedPseudonym;
    
    if (!finalPseudonym.trim()) {
      setError('Please enter or generate a pseudonym');
      return;
    }

    if (finalPseudonym.length < 3) {
      setError('Pseudonym must be at least 3 characters');
      return;
    }

    setLoading(true);
    setError(null);

    const available = await isPseudonymAvailable(finalPseudonym);
    
    if (!available) {
      setError('This pseudonym is already taken. Please choose another.');
      setLoading(false);
      return;
    }

    if (!useCustomPseudonym) {
      setPseudonym(generatedPseudonym);
    }
    
    setLoading(false);
    setStep('details');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agreeTerms) {
      setError('Please agree to the terms and privacy policy');
      return;
    }

    const finalPseudonym = useCustomPseudonym ? pseudonym : generatedPseudonym;
    
    setLoading(true);
    setError(null);

    const result = await registerParticipant({
      pseudonym: finalPseudonym,
      email: email.toLowerCase().trim(),
      name_encrypted: encryptData(name.trim()),
      address_encrypted: encryptData(address.trim()),
      city_encrypted: encryptData(city.trim()),
      postal_code_encrypted: encryptData(postalCode.trim()),
      country_encrypted: encryptData(country.trim()),
      is_hospice: isHospice,
      hospice_name: isHospice ? hospiceName : undefined,
    });

    setLoading(false);

    if (result.success) {
      setSuccess(true);
    } else {
      setError(result.error || 'Registration failed. Please try again.');
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-6">
        <div className="mx-auto max-w-md">
          <Card className="bg-white/90 backdrop-blur border-0 shadow-xl">
            <CardContent className="pt-8 pb-8 text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <CheckCircleIcon className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Registration Successful!
              </h2>
              <p className="text-gray-600 mb-6">
                Thank you for joining the Anonymous Letter Exchange. 
                You'll receive an email when matches are made.
              </p>
              <p className="text-sm text-gray-500 mb-8">
                Your pseudonym: <span className="font-mono font-semibold text-indigo-600">
                  {useCustomPseudonym ? pseudonym : generatedPseudonym}
                </span>
              </p>
              <Button 
                onClick={() => onNavigate('home')}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                Return Home
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-6">
      <div className="mx-auto max-w-lg">
        <Button 
          variant="ghost" 
          className="mb-6 -ml-4"
          onClick={() => step === 'pseudonym' ? onNavigate('home') : setStep('pseudonym')}
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Back
        </Button>

        <Card className="bg-white/90 backdrop-blur border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl">
              {step === 'pseudonym' ? 'Choose Your Pseudonym' : 'Complete Registration'}
            </CardTitle>
            <CardDescription>
              {step === 'pseudonym' 
                ? 'This will be your anonymous identity in the exchange.' 
                : 'Your information is encrypted and kept private.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircleIcon className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {step === 'pseudonym' ? (
              <div className="space-y-6">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="custom" 
                    checked={useCustomPseudonym}
                    onCheckedChange={(checked) => setUseCustomPseudonym(checked as boolean)}
                  />
                  <Label htmlFor="custom" className="text-sm font-medium">
                    I want to choose my own pseudonym
                  </Label>
                </div>

                {useCustomPseudonym ? (
                  <div className="space-y-2">
                    <Label htmlFor="pseudonym">Your Pseudonym</Label>
                    <Input
                      id="pseudonym"
                      value={pseudonym}
                      onChange={(e) => setPseudonym(e.target.value)}
                      placeholder="Enter a unique pseudonym"
                      className="h-12"
                    />
                    <p className="text-xs text-gray-500">
                      Must be unique and at least 3 characters
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-indigo-50 rounded-lg p-6 text-center">
                      <p className="text-sm text-gray-600 mb-2">Your generated pseudonym:</p>
                      <p className="text-2xl font-mono font-bold text-indigo-700">
                        {generatedPseudonym}
                      </p>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={handleGenerateNewPseudonym}
                    >
                      <RefreshCwIcon className="h-4 w-4 mr-2" />
                      Generate New
                    </Button>
                  </div>
                )}

                <Button 
                  className="w-full h-12 bg-indigo-600 hover:bg-indigo-700"
                  onClick={handlePseudonymSubmit}
                  disabled={loading}
                >
                  {loading ? 'Checking...' : 'Continue'}
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                  />
                  <p className="text-xs text-gray-500">
                    We'll notify you when you have a match
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">Your Real Name *</Label>
                  <Input
                    id="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="This is kept private"
                  />
                  <p className="text-xs text-gray-500">
                    Only used for our records, never shared
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Street Address *</Label>
                  <Input
                    id="address"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="123 Main Street, Apt 4B"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postal">Postal Code *</Label>
                    <Input
                      id="postal"
                      required
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">Country *</Label>
                  <Input
                    id="country"
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </div>

                <div className="flex items-center space-x-2 pt-2">
                  <Checkbox 
                    id="hospice" 
                    checked={isHospice}
                    onCheckedChange={(checked) => setIsHospice(checked as boolean)}
                  />
                  <Label htmlFor="hospice" className="text-sm">
                    This is a hospice/recipient address
                  </Label>
                </div>

                {isHospice && (
                  <div className="space-y-2">
                    <Label htmlFor="hospiceName">Hospice/Facility Name</Label>
                    <Input
                      id="hospiceName"
                      value={hospiceName}
                      onChange={(e) => setHospiceName(e.target.value)}
                      placeholder="Sunshine Care Home"
                    />
                  </div>
                )}

                <div className="flex items-start space-x-2 pt-4">
                  <Checkbox 
                    id="terms" 
                    checked={agreeTerms}
                    onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                  />
                  <Label htmlFor="terms" className="text-sm leading-relaxed">
                    I agree to the privacy policy and understand that my address 
                    will only be shared with my assigned letter writer.
                  </Label>
                </div>

                <Button 
                  type="submit"
                  className="w-full h-12 bg-indigo-600 hover:bg-indigo-700"
                  disabled={loading}
                >
                  {loading ? 'Registering...' : 'Complete Registration'}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
