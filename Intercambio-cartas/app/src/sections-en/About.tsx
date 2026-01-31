import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeftIcon, HeartIcon, ShieldIcon, MailIcon, GithubIcon } from 'lucide-react';
import type { View } from '@/types';

interface AboutProps {
  onNavigate: (view: View) => void;
}

export function About({ onNavigate }: AboutProps) {
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
              About Anonymous Letter Exchange
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Reviving the lost art of handwritten letters while protecting your privacy 
              in an increasingly digital world.
            </p>
          </div>

          {/* Story */}
          <Card className="bg-white/80 backdrop-blur border-0 shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 mb-4">
                  This project began as a simple idea: connect strangers through handwritten 
                  letters. Originally, people would send their names and addresses, and we'd 
                  randomly distribute them among participants. Everyone who wanted to write 
                  would also receive a letter.
                </p>
                <p className="text-gray-600 mb-4">
                  We also maintained a list of elderly people living in hospices — those who 
                  might appreciate a kind word from a stranger, a story from the outside world, 
                  or simply the knowledge that someone, somewhere, was thinking of them.
                </p>
                <p className="text-gray-600">
                  As privacy concerns grew in our digital world, we knew we needed to evolve. 
                  Today's version uses modern encryption, pseudonymization, and secure matching 
                  to ensure that your personal information stays private while the magic of 
                  connection continues.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* How It Works */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white/80 backdrop-blur border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                      <span className="font-bold text-indigo-600">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Register with a Pseudonym</h3>
                      <p className="text-gray-600 text-sm">
                        Choose your own unique pseudonym or let us generate one for you. 
                        This becomes your anonymous identity.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                      <span className="font-bold text-indigo-600">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Wait for the Batch</h3>
                      <p className="text-gray-600 text-sm">
                        We collect participants until we reach a threshold, then create 
                        random matches. No one knows who they'll be paired with.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                      <span className="font-bold text-indigo-600">3</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Receive Your Match</h3>
                      <p className="text-gray-600 text-sm">
                        You'll get an email with your recipient's pseudonym and address. 
                        Your real name is never revealed.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                      <span className="font-bold text-indigo-600">4</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Write & Send</h3>
                      <p className="text-gray-600 text-sm">
                        Write your letter, sign it with your pseudonym, and mail it. 
                        No return address needed — keep the mystery alive!
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Features */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-white/80 backdrop-blur border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                    <ShieldIcon className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Complete Privacy</h3>
                  <p className="text-gray-600 text-sm">
                    Your address is encrypted and only shared with your assigned writer. 
                    Your real name stays hidden.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center mx-auto mb-4">
                    <HeartIcon className="h-6 w-6 text-pink-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Hospice Program</h3>
                  <p className="text-gray-600 text-sm">
                    Choose to write to elderly hospice residents who would love to receive 
                    a thoughtful letter.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <MailIcon className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Random Matching</h3>
                  <p className="text-gray-600 text-sm">
                    Our algorithm ensures fair, random distribution. Everyone writes, 
                    everyone receives.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Open Source */}
          <Card className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-0">
            <CardContent className="p-8 text-center">
              <GithubIcon className="h-12 w-12 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">Open Source & Free</h2>
              <p className="text-indigo-100 mb-6 max-w-xl mx-auto">
                This project is completely open source. We believe in transparency 
                and community-driven development. Feel free to contribute, fork, 
                or host your own instance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="secondary"
                  onClick={() => onNavigate('register')}
                >
                  Join the Exchange
                </Button>
                <Button 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10"
                  onClick={() => onNavigate('privacy')}
                >
                  Read Privacy Policy
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
