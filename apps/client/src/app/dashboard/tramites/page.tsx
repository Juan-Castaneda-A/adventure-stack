"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MessageCircle, Phone, Mail, MoreHorizontal, Check, X, Trash2, Clock, FileText } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from "@/components/ui/sheet";
import { MedicalNotes } from "@/components/modules/medical/MedicalNotes";
import { LegalCase } from "@/components/modules/legal/LegalCase";
import Link from "next/link";
import { API_URL } from "@/lib/config"; // Asegúrate de tener esto, o usa la URL directa si prefieres

interface Tramite {
  id: string;
  titulo: string;
  fechaCita: string;
  estado: string;
  nombreCliente?: string;
  emailCliente?: string;
  telefonoCliente?: string;
  archivoUrl?: string;
  detalles?: any;
}

export default function TramitesPage() {
  const [tramites, setTramites] = useState<Tramite[]>([]);
  const [loading, setLoading] = useState(true);
  const [config, setConfig] = useState<any>(null);
  const [selectedTramite, setSelectedTramite] = useState<Tramite | null>(null);

  // Función para cargar datos
  const fetchTramites = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_URL}/tramites`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setTramites(data.reverse());
      }
    } catch (error) {
      console.error("Error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch(`${API_URL}/configuracion`)
      .then(res => res.json())
      .then(setConfig);
    fetchTramites();
  }, []);

  // Función para CAMBIAR ESTADO
  const cambiarEstado = async (id: string, nuevoEstado: string) => {
    const token = localStorage.getItem("token");
    // Actualización optimista (cambia visualmente antes de esperar al servidor)
    setTramites(prev => prev.map(t => t.id === id ? { ...t, estado: nuevoEstado } : t));

    try {
      await fetch(`${API_URL}/tramites/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ estado: nuevoEstado })
      });
      // Opcional: Recargar datos reales
      // fetchTramites(); 
    } catch (error) {
      alert("Error al actualizar");
      fetchTramites(); // Revertir si falla
    }
  };

  // Función para ELIMINAR
  const eliminarTramite = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar esta solicitud?")) return;

    const token = localStorage.getItem("token");
    setTramites(prev => prev.filter(t => t.id !== id)); // Quitar visualmente

    try {
      await fetch(`${API_URL}/tramites/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
    } catch (error) {
      alert("Error al eliminar");
      fetchTramites();
    }
  };

  const contactarWhatsApp = (telefono: string | undefined, nombre: string | undefined) => {
    if (!telefono) return alert("No hay teléfono registrado");
    const numeroLimpio = telefono.replace(/\D/g, '');
    const mensaje = `Hola ${nombre || ""}, te escribo del consultorio para confirmar tu cita.`;
    window.open(`https://wa.me/57${numeroLimpio}?text=${encodeURIComponent(mensaje)}`, '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Solicitudes de Citas</h2>
          <p className="text-muted-foreground">Gestiona los pacientes que llegan desde la web.</p>
        </div>
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
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tramites.map((t) => (
                  <TableRow key={t.id} className="hover:bg-slate-50/50">
                    <TableCell>
                      <div className="font-medium">{t.nombreCliente || "Anónimo"}</div>
                      <div className="text-xs text-muted-foreground flex gap-2 mt-1">
                        {t.telefonoCliente && <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {t.telefonoCliente}</span>}
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="font-medium text-indigo-600">{t.titulo}</div>

                      {/* MOSTRAR DETALLES SI EXISTEN */}
                      {t.detalles && (
                        <div className="text-xs bg-slate-100 p-1 rounded mt-1 text-slate-600">
                          {t.detalles.sintomas && <span>🤒 {t.detalles.sintomas}</span>}
                          {t.detalles.tipo_caso && <span>⚖️ {t.detalles.tipo_caso}</span>}
                        </div>
                      )}

                      <div className="text-xs text-slate-500">
                        {new Date(t.fechaCita).toLocaleString()}
                      </div>
                    </TableCell>

                    <TableCell>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border inline-flex items-center gap-1 ${t.estado === 'PENDIENTE' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                        t.estado === 'CONFIRMADO' ? 'bg-green-50 text-green-700 border-green-200' :
                          t.estado === 'CANCELADO' ? 'bg-red-50 text-red-700 border-red-200' :
                            'bg-slate-100 text-slate-700'
                        }`}>
                        {t.estado === 'PENDIENTE' && <Clock className="h-3 w-3" />}
                        {t.estado === 'CONFIRMADO' && <Check className="h-3 w-3" />}
                        {t.estado === 'CANCELADO' && <X className="h-3 w-3" />}
                        {t.estado}
                      </span>
                    </TableCell>

                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {t.archivoUrl && (
                          <Link href={t.archivoUrl} target="_blank">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                              title="Ver Documento Adjunto"
                            >
                              <FileText className="h-5 w-5" />
                            </Button>
                          </Link>
                        )}
                        {/* Botón WhatsApp Rápido */}
                        <Button
                          size="icon"
                          variant="ghost"
                          className="text-green-600 hover:text-green-700 hover:bg-green-50"
                          onClick={() => contactarWhatsApp(t.telefonoCliente, t.nombreCliente)}
                        >
                          <MessageCircle className="h-5 w-5" />
                        </Button>

                        <Sheet>
                          <SheetTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setSelectedTramite(t)}>
                              Ver Detalles
                            </Button>
                          </SheetTrigger>

                          {selectedTramite && (
                            <SheetContent className="overflow-y-auto w-[400px] sm:w-[540px]">
                              <SheetHeader>
                                <SheetTitle>Detalles de la Cita</SheetTitle>
                                <SheetDescription>
                                  Paciente: {selectedTramite.nombreCliente}
                                </SheetDescription>
                              </SheetHeader>

                              <div className="py-6 space-y-6">
                                {/* INFORMACIÓN BÁSICA (PARA TODOS) */}
                                <div className="space-y-1">
                                  <h4 className="font-medium text-sm text-slate-500">Motivo</h4>
                                  <p className="text-lg font-bold">{selectedTramite.titulo}</p>
                                </div>

                                {/* MOSTRAR SÍNTOMAS SI EXISTEN */}
                                {selectedTramite.detalles?.sintomas && (
                                  <div className="bg-slate-100 p-3 rounded">
                                    <span className="font-bold text-xs text-slate-500 uppercase">Síntomas Reportados:</span>
                                    <p>{selectedTramite.detalles.sintomas}</p>
                                  </div>
                                )}

                                {/* --- ZONA DE MÓDULOS INTELIGENTES --- */}

                                {/* SI ES MÉDICO -> MOSTRAR LEGO MÉDICO */}
                                {config?.tipoNegocio === 'MEDICO' && (
                                  <MedicalNotes
                                    tramiteId={selectedTramite.id}
                                    detallesActuales={selectedTramite.detalles}
                                    onSave={fetchTramites} // Recargar al guardar
                                  />
                                )}

                                {/* SI ES ABOGADO -> MOSTRAR LEGO LEGAL */}
                                {config?.tipoNegocio === 'LEGAL' && (
                                  <LegalCase
                                    tramiteId={selectedTramite.id}
                                    detallesActuales={selectedTramite.detalles}
                                    onSave={fetchTramites}
                                  />
                                )}

                              </div>
                            </SheetContent>
                          )}
                        </Sheet>

                        {/* Menú de Acciones (Cambiar Estado / Borrar) */}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-5 w-5 text-slate-500" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Cambiar Estado</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => cambiarEstado(t.id, 'PENDIENTE')}>
                              ⏳ Pendiente
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => cambiarEstado(t.id, 'CONFIRMADO')}>
                              ✅ Confirmado
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => cambiarEstado(t.id, 'CANCELADO')}>
                              ❌ Cancelado
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => cambiarEstado(t.id, 'FINALIZADO')}>
                              🏁 Finalizado
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem
                              className="text-red-600 focus:text-red-600"
                              onClick={() => eliminarTramite(t.id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" /> Eliminar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
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