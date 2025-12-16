"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"; // (Si no tienes textarea, usa Input o instálalo)
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { API_URL } from "@/lib/config";

export default function NuevoTramitePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  // Estados del formulario
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      
      // Enviamos los datos al Backend
      const res = await fetch(`${API_URL}/tramites`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          titulo,
          descripcion,
          fechaCita: new Date(fecha).toISOString() // Convertimos la fecha a formato ISO universal
        })
      });

      if (!res.ok) throw new Error("Error al crear trámite");

      // ¡Éxito! Volvemos a la lista
      router.push("/dashboard/tramites");
      router.refresh(); // Refresca los datos para que aparezca el nuevo

    } catch (error) {
      alert("Ocurrió un error guardando el trámite");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      
      {/* Botón para volver atrás */}
      <div className="mb-6">
        <Link href="/dashboard/tramites">
            <Button variant="ghost" className="gap-2 pl-0 hover:pl-2 transition-all">
                <ArrowLeft className="h-4 w-4" /> Volver al listado
            </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Agendar Nuevo Trámite</CardTitle>
          <CardDescription>Completa la información para solicitar una cita en la notaría.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Campo: Título */}
            <div className="space-y-2">
              <Label htmlFor="titulo">Tipo de Trámite</Label>
              <Input 
                id="titulo" 
                placeholder="Ej: Autenticación de Documento" 
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                required
              />
            </div>

            {/* Campo: Fecha */}
            <div className="space-y-2">
              <Label htmlFor="fecha">Fecha y Hora de la Cita</Label>
              <Input 
                id="fecha" 
                type="datetime-local" // Esto saca un calendario nativo del navegador
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                required
              />
            </div>

            {/* Campo: Descripción */}
            <div className="space-y-2">
              <Label htmlFor="descripcion">Notas Adicionales (Opcional)</Label>
              {/* Si no tienes el componente Textarea instalado, cambia esto por <Input /> */}
              <Input 
                 id="descripcion"
                 placeholder="Detalles sobre el documento..."
                 value={descripcion}
                 onChange={(e) => setDescripcion(e.target.value)}
              />
            </div>

            <div className="flex justify-end gap-4 pt-4">
                <Link href="/dashboard/tramites">
                    <Button type="button" variant="outline">Cancelar</Button>
                </Link>
                <Button type="submit" disabled={loading} className="bg-indigo-600 hover:bg-indigo-700 text-white">
                    {loading ? "Guardando..." : "Agendar Cita"}
                </Button>
            </div>

          </form>
        </CardContent>
      </Card>
    </div>
  );
}