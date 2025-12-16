"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Calendar, CheckCircle, Shield } from "lucide-react";
import { API_URL } from "@/lib/config";

export default function LandingPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Estado del formulario público
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    fecha: "",
    motivo: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Usamos el NUEVO endpoint público
      const res = await fetch(`${API_URL}/tramites/publico`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titulo: formData.motivo,          // Mapeamos motivo a titulo
          fechaCita: new Date(formData.fecha).toISOString(),
          nombreCliente: formData.nombre,
          emailCliente: formData.email,
          telefonoCliente: formData.telefono
        })
      });

      if (res.ok) {
        setSuccess(true);
        setFormData({ nombre: "", email: "", telefono: "", fecha: "", motivo: "" });
      } else {
        alert("Hubo un error al enviar la solicitud.");
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* HEADER / NAVBAR */}
      <header className="border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
             <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">A</div>
             <span className="font-bold text-xl text-slate-900">Dr. Adventure</span>
          </div>
          <nav>
             <Link href="/login">
                <Button variant="ghost">Soy el Doctor (Login)</Button>
             </Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* COLUMNA IZQUIERDA: TEXTO DE VENTA */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900">
              Agenda tu cita <span className="text-indigo-600">sin filas</span> ni esperas.
            </h1>
            <p className="text-lg text-slate-600">
              Gestionamos tus trámites jurídicos y médicos con la mayor eficiencia. 
              Reserva tu espacio en nuestra agenda digital en segundos.
            </p>
            
            <div className="space-y-4 pt-4">
               <div className="flex items-center gap-3">
                  <CheckCircle className="text-green-500 h-6 w-6" />
                  <span className="text-slate-700 font-medium">Confirmación inmediata</span>
               </div>
               <div className="flex items-center gap-3">
                  <Shield className="text-indigo-500 h-6 w-6" />
                  <span className="text-slate-700 font-medium">Datos 100% seguros</span>
               </div>
               <div className="flex items-center gap-3">
                  <Calendar className="text-blue-500 h-6 w-6" />
                  <span className="text-slate-700 font-medium">Sincronización con WhatsApp</span>
               </div>
            </div>
          </div>

          {/* COLUMNA DERECHA: FORMULARIO DE CAPTACIÓN */}
          <div>
            <Card className="shadow-2xl border-slate-200">
              <CardHeader className="bg-slate-50 border-b">
                <CardTitle className="text-xl">Solicitar Cita</CardTitle>
                <CardDescription>Déjanos tus datos y te contactaremos.</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                
                {success ? (
                  <div className="text-center py-10 space-y-4">
                    <div className="h-16 w-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800">¡Solicitud Enviada!</h3>
                    <p className="text-slate-500">
                        Hemos recibido tu solicitud. El profesional revisará su agenda y te contactará al WhatsApp.
                    </p>
                    <Button onClick={() => setSuccess(false)} variant="outline">Nueva solicitud</Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Nombre Completo</Label>
                            <Input 
                                placeholder="Juan Pérez" 
                                required 
                                value={formData.nombre}
                                onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Celular / WhatsApp</Label>
                            <Input 
                                placeholder="300 123 4567" 
                                required 
                                value={formData.telefono}
                                onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                            />
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        <Label>Email</Label>
                        <Input 
                            type="email" 
                            placeholder="juan@correo.com" 
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Fecha deseada</Label>
                        <Input 
                            type="datetime-local" 
                            required 
                            value={formData.fecha}
                            onChange={(e) => setFormData({...formData, fecha: e.target.value})}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Motivo de la consulta</Label>
                        <Input 
                            placeholder="Ej: Dolor de muela / Asesoría laboral" 
                            required 
                            value={formData.motivo}
                            onChange={(e) => setFormData({...formData, motivo: e.target.value})}
                        />
                    </div>

                    <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-lg py-6" disabled={loading}>
                        {loading ? "Enviando..." : "Confirmar Cita"}
                    </Button>
                  </form>
                )}

              </CardContent>
            </Card>
          </div>

        </div>
      </main>
    </div>
  );
}