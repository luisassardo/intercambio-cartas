import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeftIcon, LockIcon, EyeIcon, ServerIcon, MailIcon } from 'lucide-react';
import type { View } from '@/types';

interface PrivacyProps {
  onNavigate: (view: View) => void;
}

export function Privacy({ onNavigate }: PrivacyProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Button 
          variant="ghost" 
          className="mb-8 -ml-4"
          onClick={() => onNavigate('home')}
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="space-y-12">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Privacy & Security
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Your privacy is our top priority. Learn how we protect your data 
              and keep your identity anonymous.
            </p>
          </div>

          {/* Security Principles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white/80 backdrop-blur border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                    <LockIcon className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Encryption</h3>
                    <p className="text-gray-600 text-sm">
                      All personal information (name, address) is encrypted before 
                      storage. Only the matching system can decrypt it when sending 
                      assignment emails.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <EyeIcon className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Pseudonymization</h3>
                    <p className="text-gray-600 text-sm">
                      Your real identity is never shared. Only your pseudonym appears 
                      in the system and on letters you receive.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0">
                    <ServerIcon className="h-5 w-5 text-pink-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Data Minimization</h3>
                    <p className="text-gray-600 text-sm">
                      We only collect what's necessary: email for notifications, 
                      address for mailing. No phone numbers, no social media, no tracking.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <MailIcon className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">One-Time Sharing</h3>
                    <p className="text-gray-600 text-sm">
                      Your address is shared exactly once — with your assigned writer. 
                      After matching, no new participants see your information.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Policy */}
          <Card className="bg-white/80 backdrop-blur border-0 shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Privacy Policy</h2>
              
              <div className="space-y-6 text-gray-600">
                <section>
                  <h3 className="font-semibold text-gray-900 mb-2">Information We Collect</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Email address:</strong> For match notifications only</li>
                    <li><strong>Pseudonym:</strong> Your anonymous identifier</li>
                    <li><strong>Mailing address:</strong> Encrypted, shared only with your writer</li>
                    <li><strong>Real name:</strong> Encrypted, never shared, for our records only</li>
                  </ul>
                </section>

                <section>
                  <h3 className="font-semibold text-gray-900 mb-2">How We Use Your Information</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>To notify you when you've been matched with a recipient</li>
                    <li>To provide your writer with the address to send their letter</li>
                    <li>To maintain the integrity of the exchange program</li>
                  </ul>
                </section>

                <section>
                  <h3 className="font-semibold text-gray-900 mb-2">Data Security</h3>
                  <p className="text-sm mb-2">
                    We implement multiple layers of security:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>All sensitive data is encrypted at rest</li>
                    <li>Database connections use TLS/SSL encryption</li>
                    <li>Access is restricted to authorized administrators only</li>
                    <li>Regular security audits and updates</li>
                  </ul>
                </section>

                <section>
                  <h3 className="font-semibold text-gray-900 mb-2">Data Retention</h3>
                  <p className="text-sm">
                    Your data is retained only as long as necessary for the current exchange round. 
                    After the exchange completes and all letters have been sent, you can request 
                    deletion of your data. Administrative records may be kept for program integrity 
                    but will be anonymized.
                  </p>
                </section>

                <section>
                  <h3 className="font-semibold text-gray-900 mb-2">Your Rights</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Request access to your personal data</li>
                    <li>Request correction of inaccurate data</li>
                    <li>Request deletion of your data</li>
                    <li>Withdraw from the exchange at any time before matching</li>
                  </ul>
                </section>

                <section>
                  <h3 className="font-semibold text-gray-900 mb-2">Open Source</h3>
                  <p className="text-sm">
                    This project is open source. You can inspect the code to verify our privacy 
                    claims, suggest improvements, or host your own instance. Transparency is 
                    fundamental to trust.
                  </p>
                </section>

                <section>
                  <h3 className="font-semibold text-gray-900 mb-2">Contact</h3>
                  <p className="text-sm">
                    For privacy concerns, data requests, or questions about this policy, 
                    please contact the project administrator.
                  </p>
                </section>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="text-center">
            <p className="text-gray-600 mb-6">
              Ready to join a community that values both connection and privacy?
            </p>
            <Button 
              size="lg"
              className="bg-indigo-600 hover:bg-indigo-700"
              onClick={() => onNavigate('register')}
            >
              Join the Exchange
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
