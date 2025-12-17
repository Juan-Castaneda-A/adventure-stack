"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Briefcase, Stethoscope, ScrollText, CheckCircle2, Zap, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function AgencyHome() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-100">
      
      {/* NAVBAR */}
      <header className="fixed w-full bg-white/80 backdrop-blur-md border-b z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
           <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shadow-indigo-500/20 shadow-lg">A</div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900">Adventure<span className="text-indigo-600">Stack</span></span>
           </div>
           <Link href="/login">
             <Button variant="ghost" className="font-medium hover:text-indigo-600">Acceso Clientes</Button>
           </Link>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="pt-32 pb-20 px-4 text-center relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-200/30 rounded-full blur-3xl -z-10 opacity-50"></div>
        
        <Badge className="mb-6 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 px-4 py-1.5 text-sm border-indigo-200">
           🚀 Software de Gestión v2.0
        </Badge>
        
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight leading-tight max-w-4xl mx-auto">
          Automatiza tu negocio <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">sin complicaciones.</span>
        </h1>
        
        <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          Agenda inteligente, recordatorios por WhatsApp y gestión de expedientes en una sola plataforma. Diseñado para profesionales que valoran su tiempo.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="#demos">
                <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-500/20 transition-all hover:scale-105">
                    Ver Demos en Vivo <ArrowRight className="ml-2 h-5 w-5"/>
                </Button>
            </Link>
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-slate-300 hover:bg-white text-slate-600">
                Cómo funciona
            </Button>
        </div>
      </section>

      {/* CARACTERÍSTICAS */}
      <section className="py-16 bg-white border-y border-slate-100">
          <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-4">
                  <div className="h-12 w-12 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mb-4">
                      <Zap className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Agenda Instantánea</h3>
                  <p className="text-slate-500">Tus clientes agendan solos. Tú solo recibes la notificación.</p>
              </div>
              <div className="flex flex-col items-center text-center p-4">
                  <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
                      <ShieldCheck className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Datos Seguros</h3>
                  <p className="text-slate-500">Expedientes y archivos guardados con encriptación bancaria.</p>
              </div>
              <div className="flex flex-col items-center text-center p-4">
                  <div className="h-12 w-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mb-4">
                      <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">100% Personalizable</h3>
                  <p className="text-slate-500">Adaptamos el software a tu marca, colores y procesos.</p>
              </div>
          </div>
      </section>

      {/* DEMOS SECTION */}
      <section id="demos" className="py-24 container mx-auto px-4">
        <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Elige tu Industria</h2>
            <p className="text-slate-600">Hemos preparado demostraciones específicas para cada nicho.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          {/* MÉDICOS */}
          <Link href="/medicos" className="group">
            <Card className="h-full border-2 border-transparent hover:border-sky-500 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                <div className="h-40 bg-gradient-to-br from-sky-50 to-sky-100 flex items-center justify-center rounded-t-xl group-hover:from-sky-500 group-hover:to-blue-600 transition-colors duration-500">
                    <Stethoscope className="h-16 w-16 text-sky-500 group-hover:text-white transition-colors" />
                </div>
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        Salud & Bienestar
                        <Badge variant="secondary" className="bg-sky-100 text-sky-700">Popular</Badge>
                    </CardTitle>
                    <CardDescription>Para clínicas, odontólogos y psicólogos.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-slate-600"><CheckCircle2 className="h-4 w-4 text-sky-500"/> Historia Clínica</div>
                    <div className="flex items-center gap-2 text-sm text-slate-600"><CheckCircle2 className="h-4 w-4 text-sky-500"/> Recetas Médicas</div>
                </CardContent>
                <CardFooter>
                    <span className="text-sky-600 font-bold group-hover:underline flex items-center text-sm">Ver Demo <ArrowRight className="ml-1 h-4 w-4"/></span>
                </CardFooter>
            </Card>
          </Link>

          {/* ABOGADOS */}
          <Link href="/abogados" className="group">
            <Card className="h-full border-2 border-transparent hover:border-slate-800 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                <div className="h-40 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center rounded-t-xl group-hover:from-slate-800 group-hover:to-slate-900 transition-colors duration-500">
                    <Briefcase className="h-16 w-16 text-slate-700 group-hover:text-amber-400 transition-colors" />
                </div>
                <CardHeader>
                    <CardTitle>Legal & Jurídico</CardTitle>
                    <CardDescription>Para bufetes, abogados independientes y consultores.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-slate-600"><CheckCircle2 className="h-4 w-4 text-slate-700"/> Gestión de Expedientes</div>
                    <div className="flex items-center gap-2 text-sm text-slate-600"><CheckCircle2 className="h-4 w-4 text-slate-700"/> Estado de Procesos</div>
                </CardContent>
                <CardFooter>
                    <span className="text-slate-800 font-bold group-hover:underline flex items-center text-sm">Ver Demo <ArrowRight className="ml-1 h-4 w-4"/></span>
                </CardFooter>
            </Card>
          </Link>

          {/* NOTARIOS */}
          <Link href="/notarios" className="group grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all">
            <Card className="h-full border-2 border-transparent hover:border-amber-500 transition-all">
                <div className="h-40 bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center rounded-t-xl">
                    <ScrollText className="h-16 w-16 text-amber-600" />
                </div>
                <CardHeader>
                    <CardTitle>Notarías</CardTitle>
                    <CardDescription>Gestión de firmas y escrituras.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-slate-600"><CheckCircle2 className="h-4 w-4 text-amber-600"/> Agendamiento de Firmas</div>
                    <div className="flex items-center gap-2 text-sm text-slate-600"><CheckCircle2 className="h-4 w-4 text-amber-600"/> Subida de Documentos</div>
                </CardContent>
                <CardFooter>
                    <span className="text-amber-700 font-bold group-hover:underline flex items-center text-sm">Próximamente...</span>
                </CardFooter>
            </Card>
          </Link>

        </div>
      </section>

      <footer className="bg-slate-900 text-white py-12 border-t border-slate-800">
        <div className="container mx-auto px-4 text-center">
            <p className="text-slate-400">© 2025 AdventureStack. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}