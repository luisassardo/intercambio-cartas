import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MailIcon, ShieldIcon, HeartIcon, UsersIcon } from 'lucide-react';
import type { View } from '@/types';

interface HomeProps {
  onNavigate: (view: View) => void;
}

export function Home({ onNavigate }: HomeProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <section className="relative px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-8 flex justify-center">
            <div className="rounded-full bg-indigo-100 p-6">
              <MailIcon className="h-16 w-16 text-indigo-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-6">
            Anonymous Letter Exchange
          </h1>
          <p className="text-lg leading-8 text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect with strangers through the lost art of handwritten letters. 
            Completely anonymous, secure, and heartwarming.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8"
              onClick={() => onNavigate('register')}
            >
              Join the Exchange
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => onNavigate('about')}
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white/80 backdrop-blur border-0 shadow-lg">
              <CardHeader>
                <div className="rounded-full bg-purple-100 w-12 h-12 flex items-center justify-center mb-4">
                  <ShieldIcon className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="text-xl">Complete Anonymity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Your identity is protected with pseudonyms. Only the person writing to you 
                  sees your address, and they never know your real name.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur border-0 shadow-lg">
              <CardHeader>
                <div className="rounded-full bg-pink-100 w-12 h-12 flex items-center justify-center mb-4">
                  <HeartIcon className="h-6 w-6 text-pink-600" />
                </div>
                <CardTitle className="text-xl">Write to Hospice Patients</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Choose to write to elderly residents in hospices who would love 
                  to receive a kind, thoughtful letter from a stranger.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur border-0 shadow-lg">
              <CardHeader>
                <div className="rounded-full bg-indigo-100 w-12 h-12 flex items-center justify-center mb-4">
                  <UsersIcon className="h-6 w-6 text-indigo-600" />
                </div>
                <CardTitle className="text-xl">Random Matching</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Our system randomly pairs participants when enough people have registered. 
                  Everyone writes, everyone receives.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-16 lg:px-8 bg-white/50">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Register', desc: 'Sign up with a pseudonym' },
              { step: '2', title: 'Wait', desc: 'We collect participants' },
              { step: '3', title: 'Match', desc: 'Receive your assignment' },
              { step: '4', title: 'Write', desc: 'Send your letter!' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Spread Some Joy?
          </h2>
          <p className="text-gray-600 mb-8">
            Join hundreds of people connecting through handwritten letters.
          </p>
          <Button 
            size="lg" 
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
            onClick={() => onNavigate('register')}
          >
            Get Started Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-gray-200">
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © 2024 Anonymous Letter Exchange. Open source and privacy-focused.
          </p>
          <div className="flex gap-6">
            <button 
              onClick={() => onNavigate('privacy')}
              className="text-sm text-gray-500 hover:text-indigo-600"
            >
              Privacy Policy
            </button>
            <button 
              onClick={() => onNavigate('admin')}
              className="text-sm text-gray-500 hover:text-indigo-600"
            >
              Admin
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
