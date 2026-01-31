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
          Atrás
        </Button>

        <div className="space-y-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Sobre el Intercambio Anónimo de Cartas
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Reviviendo el arte perdido de las cartas escritas a mano mientras protegemos tu privacidad.
            </p>
          </div>

          <Card className="bg-white/80 backdrop-blur border-0 shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Nuestra Historia</h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 mb-4">
                  Este proyecto comenzó como una idea simple: conectar desconocidos a través de cartas 
                  escritas a mano. Originalmente, las personas enviaban sus nombres y direcciones, y 
                  nosotros las distribuíamos aleatoriamente entre los participantes.
                </p>
                <p className="text-gray-600 mb-4">
                  También manteníamos una lista de personas mayores que vivían en hospicios — aquellos 
                  que podrían apreciar una palabra amable de un desconocido.
                </p>
                <p className="text-gray-600">
                  A medida que crecieron las preocupaciones de privacidad, supimos que necesitábamos 
                  evolucionar. La versión de hoy usa encriptación moderna y seudonimización.
                </p>
              </div>
            </CardContent>
          </Card>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Cómo Funciona</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: 'Regístrate con un Seudónimo', desc: 'Elige tu propio seudónimo único o déjanos generar uno para ti.' },
                { title: 'Espera el Lote', desc: 'Recolectamos participantes hasta alcanzar un umbral, luego creamos emparejamientos aleatorios.' },
                { title: 'Recibe Tu Emparejamiento', desc: 'Recibirás un correo con el seudónimo y dirección de tu destinatario.' },
                { title: 'Escribe y Envía', desc: 'Escribe tu carta, fírmala con tu seudónimo y envíala por correo.' },
              ].map((item, idx) => (
                <Card key={idx} className="bg-white/80 backdrop-blur border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                        <span className="font-bold text-indigo-600">{idx + 1}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                        <p className="text-gray-600 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Características Principales</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-white/80 backdrop-blur border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                    <ShieldIcon className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Privacidad Completa</h3>
                  <p className="text-gray-600 text-sm">Tu dirección está encriptada y solo se comparte con tu escritor asignado.</p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center mx-auto mb-4">
                    <HeartIcon className="h-6 w-6 text-pink-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Programa de Hospicio</h3>
                  <p className="text-gray-600 text-sm">Elige escribir a residentes de hospicio ancianos.</p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <MailIcon className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Emparejamiento Aleatorio</h3>
                  <p className="text-gray-600 text-sm">Distribución justa y aleatoria. Todos escriben, todos reciben.</p>
                </CardContent>
              </Card>
            </div>
          </div>

          <Card className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-0">
            <CardContent className="p-8 text-center">
              <GithubIcon className="h-12 w-12 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">Código Abierto y Gratuito</h2>
              <p className="text-indigo-100 mb-6 max-w-xl mx-auto">
                Este proyecto es completamente de código abierto. Creemos en la transparencia.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" onClick={() => onNavigate('register')}>
                  Unirme al Intercambio
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white/10" onClick={() => onNavigate('privacy')}>
                  Leer Política de Privacidad
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
