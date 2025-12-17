"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { API_URL } from "@/lib/config";
import { Loader2, Save } from "lucide-react";

export default function ConfigPage() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    nombreNegocio: "",
    descripcion: "",
    telefonoVisible: "",
    tipoNegocio: "GENERICO" // Aquí está la magia
  });

  // 1. Cargar datos al entrar
  useEffect(() => {
    fetch(`${API_URL}/configuracion`)
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // 2. Guardar cambios
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("token");

    // CREAMOS UN OBJETO LIMPIO (PAYLOAD) 🧼
    // Solo enviamos lo que el DTO espera recibir.
    const payload = {
        nombreNegocio: data.nombreNegocio,
        descripcion: data.descripcion,
        telefonoVisible: data.telefonoVisible,
        tipoNegocio: data.tipoNegocio
    };

    try {
      const res = await fetch(`${API_URL}/configuracion`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload) // <--- ENVIAMOS EL PAYLOAD LIMPIO, NO 'data'
      });
      
      if (res.ok) {
        alert("¡Identidad del negocio actualizada! 🦎");
        // Opcional: recargar la página para ver cambios
        window.location.reload(); 
      } else {
        // Si falla, mostramos qué pasó
        const errorData = await res.json();
        console.error(errorData); 
        alert("Error 400: El servidor rechazó los datos.");
      }
    } catch (error) {
      alert("Error guardando");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl animate-in fade-in">
      <h2 className="text-3xl font-bold tracking-tight mb-6">Configuración del Negocio</h2>
      
      <Card>
        <CardHeader>
          <CardTitle>Identidad del SaaS</CardTitle>
          <CardDescription>Define cómo se comporta y se ve tu plataforma.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-6">
            
            {/* SELECTOR DE MODO (MEDICO vs ABOGADO) */}
            <div className="space-y-2 bg-slate-50 p-4 rounded-lg border border-slate-200">
                <Label className="font-bold">Tipo de Negocio (Modo)</Label>
                <Select 
                    value={data.tipoNegocio} 
                    onValueChange={(value) => setData({...data, tipoNegocio: value})}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Selecciona el nicho" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="GENERICO">🏢 Genérico (Básico)</SelectItem>
                        <SelectItem value="MEDICO">🩺 Médico / Odontólogo</SelectItem>
                        <SelectItem value="LEGAL">⚖️ Abogado / Jurídico</SelectItem>
                        <SelectItem value="NOTARIA">📜 Notaría</SelectItem>
                    </SelectContent>
                </Select>
                <p className="text-xs text-slate-500">
                    Esto cambiará los formularios y módulos del dashboard automáticamente.
                </p>
            </div>

            <div className="space-y-2">
              <Label>Nombre de la Empresa</Label>
              <Input 
                value={data.nombreNegocio}
                onChange={e => setData({...data, nombreNegocio: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label>Slogan / Descripción</Label>
              <Input 
                value={data.descripcion}
                onChange={e => setData({...data, descripcion: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label>Teléfono Público</Label>
              <Input 
                value={data.telefonoVisible}
                onChange={e => setData({...data, telefonoVisible: e.target.value})}
              />
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? <Loader2 className="animate-spin mr-2"/> : <Save className="mr-2 h-4 w-4"/>}
              Guardar Configuración
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}