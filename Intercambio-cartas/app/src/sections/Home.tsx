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
            Intercambio Anónimo de Cartas
          </h1>
          <p className="text-lg leading-8 text-gray-600 mb-8 max-w-2xl mx-auto">
            Conecta con desconocidos a través del arte perdido de las cartas escritas a mano. 
            Completamente anónimo, seguro y reconfortante.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8"
              onClick={() => onNavigate('register')}
            >
              Unirme al Intercambio
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => onNavigate('about')}
            >
              Saber Más
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
                <CardTitle className="text-xl">Anonimato Completo</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Tu identidad está protegida con seudónimos. Solo la persona que te escribe 
                  ve tu dirección, y nunca saben tu nombre real.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur border-0 shadow-lg">
              <CardHeader>
                <div className="rounded-full bg-pink-100 w-12 h-12 flex items-center justify-center mb-4">
                  <HeartIcon className="h-6 w-6 text-pink-600" />
                </div>
                <CardTitle className="text-xl">Escribe a Pacientes de Hospicio</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Elige escribir a residentes ancianos en hospicios que amarían 
                  recibir una carta amable y reflexiva de un desconocido.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur border-0 shadow-lg">
              <CardHeader>
                <div className="rounded-full bg-indigo-100 w-12 h-12 flex items-center justify-center mb-4">
                  <UsersIcon className="h-6 w-6 text-indigo-600" />
                </div>
                <CardTitle className="text-xl">Emparejamiento Aleatorio</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Nuestro sistema empareja participantes aleatoriamente cuando hay suficientes 
                  personas registradas. Todos escriben, todos reciben.
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
            Cómo Funciona
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Regístrate', desc: 'Regístrate con un seudónimo' },
              { step: '2', title: 'Espera', desc: 'Recolectamos participantes' },
              { step: '3', title: 'Empareja', desc: 'Recibe tu asignación' },
              { step: '4', title: 'Escribe', desc: '¡Envía tu carta!' },
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
            ¿Listo para Compartir Alegría?
          </h2>
          <p className="text-gray-600 mb-8">
            Únete a cientos de personas conectando a través de cartas escritas a mano.
          </p>
          <Button 
            size="lg" 
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
            onClick={() => onNavigate('register')}
          >
            Comenzar Ahora
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-gray-200">
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © 2024 Intercambio Anónimo de Cartas. Código abierto y enfocado en la privacidad.
          </p>
          <div className="flex gap-6">
            <button 
              onClick={() => onNavigate('privacy')}
              className="text-sm text-gray-500 hover:text-indigo-600"
            >
              Política de Privacidad
            </button>
            <button 
              onClick={() => onNavigate('admin')}
              className="text-sm text-gray-500 hover:text-indigo-600"
            >
              Administrador
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
