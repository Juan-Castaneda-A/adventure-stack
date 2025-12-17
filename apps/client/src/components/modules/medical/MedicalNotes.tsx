"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { API_URL } from "@/lib/config";
import { Loader2, Save } from "lucide-react";

interface Props {
  tramiteId: string;
  detallesActuales: any;
  onSave: () => void; // Para avisarle al padre que recargue
}

export function MedicalNotes({ tramiteId, detallesActuales, onSave }: Props) {
  const [loading, setLoading] = useState(false);
  const [diagnostico, setDiagnostico] = useState(detallesActuales?.diagnostico || "");
  const [tratamiento, setTratamiento] = useState(detallesActuales?.tratamiento || "");

  const guardarHistoria = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      // Guardamos en el campo JSON 'detalles'
      await fetch(`${API_URL}/tramites/${tramiteId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          detalles: {
            ...detallesActuales, // Mantenemos lo que ya existía (ej: síntomas)
            diagnostico: diagnostico,
            tratamiento: tratamiento,
            fechaAtencion: new Date().toISOString()
          }
        })
      });
      alert("Historia Clínica guardada ✅");
      onSave();
    } catch (error) {
      alert("Error al guardar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 space-y-4 mt-4">
      <div className="flex items-center gap-2 text-blue-800 font-bold">
        🩺 Módulo Médico: Historia Clínica
      </div>
      
      <div className="space-y-2">
        <Label className="text-blue-900">Diagnóstico Médico</Label>
        <Textarea 
          placeholder="Escribe el diagnóstico del paciente..." 
          className="bg-white"
          value={diagnostico}
          onChange={(e) => setDiagnostico(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label className="text-blue-900">Tratamiento / Receta</Label>
        <Textarea 
          placeholder="Medicamentos y recomendaciones..." 
          className="bg-white"
          value={tratamiento}
          onChange={(e) => setTratamiento(e.target.value)}
        />
      </div>

      <Button onClick={guardarHistoria} disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white w-full">
        {loading ? <Loader2 className="animate-spin mr-2" /> : <Save className="mr-2 h-4 w-4" />}
        Guardar Historia
      </Button>
    </div>
  );
}