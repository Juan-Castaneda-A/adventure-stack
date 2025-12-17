"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Scale, Shield, Clock, CheckCircle2, FileText, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function AbogadosDemo() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [archivo, setArchivo] = useState<File | null>(null);
  const [tipoCaso, setTipoCaso] = useState("");
  const [formData, setFormData] = useState({
    nombre: "", email: "", telefono: "", fecha: "", motivo: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let archivoSubidoUrl = null;
      if (archivo) {
        const fileName = `${Date.now()}_${archivo.name}`;
        const { error } = await supabase.storage.from('documentos').upload(fileName, archivo);
        if (error) throw error;
        const { data } = supabase.storage.from('documentos').getPublicUrl(fileName);
        archivoSubidoUrl = data.publicUrl;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/tramites/publico`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titulo: `Consulta Legal: ${tipoCaso} - ${formData.motivo}`,
          fechaCita: new Date(formData.fecha).toISOString(),
          detalles: { tipo_caso: tipoCaso, numero_proceso: "Pendiente" },
          nombreCliente: formData.nombre,
          emailCliente: formData.email,
          telefonoCliente: formData.telefono,
          archivoUrl: archivoSubidoUrl
        })
      });

      if (res.ok) {
        setSuccess(true);
        setFormData({ nombre: "", email: "", telefono: "", fecha: "", motivo: "" });
        setArchivo(null);
      } else {
        const errorData = await res.json();
        alert(errorData.message || "Hubo un error al agendar.");
      }
    } catch (error) {
      alert("Error de conexión.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-serif">
      
      {/* NAVBAR */}
      <nav className="bg-slate-900 text-white sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-6 h-20 flex justify-between items-center">
            <div className="flex items-center gap-3">
                <Scale className="text-amber-500 h-8 w-8" />
                <div>
                    <h1 className="text-xl font-bold tracking-wide uppercase">Suárez & Asociados</h1>
                    <p className="text-xs text-slate-400 font-sans tracking-widest">BUFETE JURÍDICO</p>
                </div>
            </div>
            <Link href="/login">
                <Button variant="outline" className="border-amber-600 text-amber-500 hover:bg-amber-950 font-sans">
                    Acceso Clientes
                </Button>
            </Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="relative bg-slate-900 text-white py-24 overflow-hidden">
         <div className="absolute inset-0 opacity-20">
            {/* Imagen de fondo de biblioteca legal o similar */}
            <img src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2000&auto=format&fit=crop" className="w-full h-full object-cover" alt="Biblioteca Legal" />
         </div>
         <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-transparent"></div>
         
         <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 text-sm font-sans font-bold">
                    <Shield className="h-4 w-4" /> Defensa Legal Experta
                </div>
                <h2 className="text-5xl md:text-6xl font-bold leading-tight">
                    Justicia con <br/> <span className="text-amber-500">Excelencia.</span>
                </h2>
                <p className="text-lg text-slate-300 font-sans max-w-lg leading-relaxed">
                    Más de 15 años protegiendo sus derechos. Expertos en Derecho Penal, Civil y Corporativo. Su tranquilidad es nuestra prioridad.
                </p>
                <div className="flex gap-4 font-sans pt-4">
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="text-amber-500" /> +500 Casos Ganados
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="text-amber-500" /> Atención 24/7
                    </div>
                </div>
            </div>

            {/* FORMULARIO FLOTANTE */}
            <div className="md:w-1/2 w-full font-sans">
                <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur">
                    <CardHeader className="bg-slate-50 border-b border-slate-100 pb-4">
                        <CardTitle className="text-slate-900 text-xl flex items-center gap-2">
                            <Clock className="text-amber-600 h-5 w-5" /> Reserva tu Asesoría
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        {success ? (
                            <div className="text-center py-10">
                                <div className="h-16 w-16 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle2 className="h-8 w-8" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-800 mb-2">Solicitud Recibida</h3>
                                <p className="text-slate-600 mb-6">Uno de nuestros abogados revisará su caso y lo contactará en breve.</p>
                                <Button onClick={() => setSuccess(false)} variant="outline" className="w-full">Nueva Consulta</Button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <Label>Nombre Completo</Label>
                                        <Input required value={formData.nombre} onChange={e => setFormData({...formData, nombre: e.target.value})} placeholder="Ej: Carlos Ruiz" />
                                    </div>
                                    <div className="space-y-1">
                                        <Label>Teléfono</Label>
                                        <Input required value={formData.telefono} onChange={e => setFormData({...formData, telefono: e.target.value})} placeholder="300 123 4567" />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <Label>Correo Electrónico</Label>
                                    <Input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="carlos@email.com" />
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <Label>Fecha Preferida</Label>
                                        <Input type="datetime-local" required value={formData.fecha} onChange={e => setFormData({...formData, fecha: e.target.value})} />
                                    </div>
                                    <div className="space-y-1">
                                        <Label>Tipo de Caso</Label>
                                        <select 
                                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                            value={tipoCaso}
                                            onChange={e => setTipoCaso(e.target.value)}
                                            required
                                        >
                                            <option value="">Seleccione...</option>
                                            <option value="Penal">Derecho Penal</option>
                                            <option value="Civil">Derecho Civil</option>
                                            <option value="Laboral">Laboral</option>
                                            <option value="Familia">Familia</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <Label>Breve descripción del caso</Label>
                                    <Input required value={formData.motivo} onChange={e => setFormData({...formData, motivo: e.target.value})} placeholder="Describa brevemente su situación..." />
                                </div>

                                <div className="space-y-1">
                                    <Label className="flex items-center gap-2"><FileText className="h-4 w-4"/> Adjuntar Expediente (PDF)</Label>
                                    <Input type="file" accept=".pdf,.doc,.docx" onChange={e => e.target.files && setArchivo(e.target.files[0])} />
                                    <p className="text-xs text-slate-500">Opcional. Confidencialidad garantizada.</p>
                                </div>

                                <Button type="submit" disabled={loading} className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold h-12 text-lg">
                                    {loading ? <Loader2 className="animate-spin mr-2"/> : "Solicitar Asesoría Gratuita"}
                                </Button>
                            </form>
                        )}
                    </CardContent>
                </Card>
            </div>
         </div>
      </header>

      {/* ÁREAS DE PRÁCTICA */}
      <section className="py-20 bg-white font-sans">
          <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                  <h3 className="text-amber-600 font-bold tracking-widest uppercase mb-2">Áreas de Práctica</h3>
                  <h2 className="text-4xl font-serif font-bold text-slate-900">Experiencia que da Resultados</h2>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                  {[
                      { title: "Derecho Penal", desc: "Defensa estratégica en juicios y procesos penales complejos." },
                      { title: "Derecho Civil", desc: "Resolución de conflictos, contratos y responsabilidad civil." },
                      { title: "Derecho de Familia", desc: "Divorcios, sucesiones y custodia con un trato humano." },
                  ].map((area, i) => (
                      <div key={i} className="p-8 bg-slate-50 border border-slate-100 hover:border-amber-500 transition-colors group">
                          <div className="h-1 w-12 bg-amber-500 mb-6 group-hover:w-20 transition-all"></div>
                          <h4 className="text-xl font-serif font-bold text-slate-900 mb-4">{area.title}</h4>
                          <p className="text-slate-600 leading-relaxed">{area.desc}</p>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      <footer className="bg-slate-950 text-slate-400 py-12 font-sans border-t border-slate-900">
          <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
              <p>© 2025 Suárez & Asociados. Todos los derechos reservados.</p>
              <div className="flex gap-6 mt-4 md:mt-0">
                  <span>Política de Privacidad</span>
                  <span>Términos de Servicio</span>
              </div>
          </div>
      </footer>
    </div>
  );
}