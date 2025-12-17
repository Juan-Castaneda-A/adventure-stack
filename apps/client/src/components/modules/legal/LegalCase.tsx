"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { API_URL } from "@/lib/config";
import { Loader2, Save, Scale } from "lucide-react";

interface Props {
  tramiteId: string;
  detallesActuales: any;
  onSave: () => void;
}

export function LegalCase({ tramiteId, detallesActuales, onSave }: Props) {
  const [loading, setLoading] = useState(false);
  const [numeroProceso, setNumeroProceso] = useState(detallesActuales?.numeroProceso || "");
  const [juzgado, setJuzgado] = useState(detallesActuales?.juzgado || "");
  const [estadoProcesal, setEstadoProcesal] = useState(detallesActuales?.estadoProcesal || "");

  const guardarExpediente = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      await fetch(`${API_URL}/tramites/${tramiteId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          detalles: {
            ...detallesActuales,
            numeroProceso,
            juzgado,
            estadoProcesal,
            ultimaActualizacion: new Date().toISOString()
          }
        })
      });
      alert("Expediente Jurídico actualizado ⚖️");
      onSave();
    } catch (error) {
      alert("Error al guardar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 text-white p-4 rounded-lg border border-slate-700 space-y-4 mt-4">
      <div className="flex items-center gap-2 text-amber-500 font-bold border-b border-slate-700 pb-2">
        <Scale className="h-5 w-5" /> Expediente Jurídico
      </div>
      
      <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-slate-300">No. Proceso / Radicado</Label>
            <Input 
              className="bg-slate-800 border-slate-600 text-white"
              value={numeroProceso}
              onChange={(e) => setNumeroProceso(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-slate-300">Juzgado / Entidad</Label>
            <Input 
              className="bg-slate-800 border-slate-600 text-white"
              value={juzgado}
              onChange={(e) => setJuzgado(e.target.value)}
            />
          </div>
      </div>

      <div className="space-y-2">
        <Label className="text-slate-300">Estado Procesal Actual</Label>
        <Input 
          placeholder="Ej: En espera de fallo..."
          className="bg-slate-800 border-slate-600 text-white"
          value={estadoProcesal}
          onChange={(e) => setEstadoProcesal(e.target.value)}
        />
      </div>

      <Button onClick={guardarExpediente} disabled={loading} className="bg-amber-600 hover:bg-amber-700 text-white w-full">
        {loading ? <Loader2 className="animate-spin mr-2" /> : <Save className="mr-2 h-4 w-4" />}
        Actualizar Expediente
      </Button>
    </div>
  );
}