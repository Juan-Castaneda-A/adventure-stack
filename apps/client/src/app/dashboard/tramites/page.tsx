"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MessageCircle, Phone, Mail } from "lucide-react"; // Iconos para acciones
import Link from "next/link";
import { API_URL } from "@/lib/config";

interface Tramite {
  id: string;
  titulo: string;
  fechaCita: string;
  estado: string;
  // Agregamos los campos nuevos del visitante
  nombreCliente?: string;
  emailCliente?: string;
  telefonoCliente?: string;
}

export default function TramitesPage() {
  const [tramites, setTramites] = useState<Tramite[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTramites = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await fetch(`${API_URL}/tramites`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          // Ordenamos para ver los más recientes primero
          setTramites(data.reverse());
        }
      } catch (error) {
        console.error("Error", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTramites();
  }, []);

  // Función para abrir WhatsApp
  const contactarWhatsApp = (telefono: string | undefined, nombre: string | undefined) => {
    if (!telefono) return alert("No hay teléfono registrado");
    
    // Limpiamos el número (quitamos espacios o guiones)
    const numeroLimpio = telefono.replace(/\D/g, '');
    const mensaje = `Hola ${nombre || ""}, te escribo del consultorio del Dr. Adventure para confirmar tu cita.`;
    
    // Abrimos la API de WhatsApp
    window.open(`https://wa.me/57${numeroLimpio}?text=${encodeURIComponent(mensaje)}`, '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
            <h2 className="text-3xl font-bold tracking-tight">Solicitudes de Citas</h2>
            <p className="text-muted-foreground">Gestiona los pacientes que llegan desde la web.</p>
        </div>
        {/* Este botón ahora es para agendar manualmente si alguien llama por teléfono */}
        <Link href="/dashboard/tramites/nuevo">
          <Button variant="outline">+ Agendar Manualmente</Button>
        </Link>
      </div>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-8 text-center text-muted-foreground">Cargando agenda...</div>
          ) : tramites.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg font-medium">Agenda libre 🎉</p>
              <p className="text-muted-foreground">No hay solicitudes pendientes.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Paciente</TableHead>
                  <TableHead>Motivo / Cita</TableHead>
                  <TableHead>Contacto</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tramites.map((t) => (
                  <TableRow key={t.id} className="hover:bg-slate-50/50">
                    {/* COLUMNA PACIENTE */}
                    <TableCell>
                        <div className="font-medium">{t.nombreCliente || "Anónimo"}</div>
                        <div className="text-xs text-muted-foreground">{t.emailCliente}</div>
                    </TableCell>

                    {/* COLUMNA MOTIVO */}
                    <TableCell>
                        <div className="font-medium text-indigo-600">{t.titulo}</div>
                        <div className="text-xs text-slate-500">
                            {new Date(t.fechaCita).toLocaleString()}
                        </div>
                    </TableCell>

                    {/* COLUMNA DATOS (Solo iconos visuales) */}
                    <TableCell>
                        <div className="flex gap-2 text-slate-400">
                            {t.telefonoCliente && <Phone className="h-4 w-4" />}
                            {t.emailCliente && <Mail className="h-4 w-4" />}
                        </div>
                    </TableCell>

                    {/* COLUMNA ESTADO */}
                    <TableCell>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                        t.estado === 'PENDIENTE' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 
                        t.estado === 'CONFIRMADO' ? 'bg-green-50 text-green-700 border-green-200' : 
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {t.estado}
                      </span>
                    </TableCell>

                    {/* COLUMNA ACCIONES (WhatsApp) */}
                    <TableCell className="text-right">
                        <Button 
                            size="sm" 
                            className="bg-green-600 hover:bg-green-700 text-white gap-2"
                            onClick={() => contactarWhatsApp(t.telefonoCliente, t.nombreCliente)}
                        >
                            <MessageCircle className="h-4 w-4" /> 
                            <span className="hidden md:inline">WhatsApp</span>
                        </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}