"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, LayoutDashboard, Users, Calendar, Settings, LogOut } from "lucide-react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    // Componente de Enlaces (Reutilizable)
    // Ahora aceptan un prop "isMobile" para cambiar los colores según dónde estén
    const NavLinks = ({ isMobile = false }: { isMobile?: boolean }) => (
        <div className="space-y-2">
            <Link href="/dashboard" className="block">
                <Button
                    variant="ghost"
                    className={`w-full justify-start gap-3 text-base ${isMobile
                        ? "text-slate-700 hover:bg-slate-100" // Color para móvil (fondo claro)
                        : "text-slate-300 hover:text-white hover:bg-white/10" // Color para Desktop (fondo oscuro)
                        }`}
                >
                    <LayoutDashboard className="h-5 w-5" /> Dashboard
                </Button>
            </Link>
            <Link href="/dashboard/usuarios" className="block">
                <Button
                    variant="ghost"
                    className={`w-full justify-start gap-3 text-base ${isMobile ? "text-slate-700 hover:bg-slate-100" : "text-slate-300 hover:text-white hover:bg-white/10"
                        }`}
                >
                    <Users className="h-5 w-5" /> Usuarios
                </Button>
            </Link>
            <Link href="/dashboard/tramites" className="block">
                <Button
                    variant="ghost"
                    className={`w-full justify-start gap-3 text-base ${isMobile ? "text-slate-700 hover:bg-slate-100" : "text-slate-300 hover:text-white hover:bg-white/10"
                        }`}
                >
                    <Calendar className="h-5 w-5" /> Mis Trámites
                </Button>
            </Link>

            <div className={`pt-4 mt-4 border-t ${isMobile ? "border-slate-200" : "border-slate-700"}`}>
                <Link href="/dashboard/config" className="block">
                    <Button
                        variant="ghost"
                        className={`w-full justify-start gap-3 text-base ${isMobile ? "text-slate-500" : "text-slate-400 hover:text-white hover:bg-white/10"
                            }`}
                    >
                        <Settings className="h-5 w-5" /> Configuración
                    </Button>
                </Link>
            </div>
        </div>
    );

    return (
        <div className="flex min-h-screen bg-slate-50/50">

            {/* SIDEBAR DE ESCRITORIO (PREMIUM DARK) 
          Aquí usamos bg-slate-900 para darle ese toque oscuro y elegante
      */}
            <aside
                className="hidden md:flex w-64 flex-col border-r border-gray-800 px-4 py-6 text-white shadow-xl"
                style={{ backgroundColor: '#000000' }} // <--- AGREGA ESTO (Forzamos el negro sí o sí)
            >
                <div className="flex items-center gap-3 px-2 mb-10">
                    <div className="h-10 w-10 rounded-xl bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                        <span className="text-white font-bold text-xl">A</span>
                    </div>
                    <div>
                        <h1 className="text-lg font-bold tracking-tight text-white">Adventure</h1>
                        <p className="text-xs text-indigo-200/60 font-medium">Startup Studio</p>
                    </div>
                </div>

                <nav className="flex-1">
                    <NavLinks />
                </nav>

                <div className="mt-auto pt-6 border-t border-slate-800">
                    <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                        onClick={() => {
                            localStorage.clear();
                            window.location.href = '/login';
                        }}
                    >
                        <LogOut className="h-5 w-5" /> Cerrar Sesión
                    </Button>
                </div>
            </aside>

            {/* CONTENIDO PRINCIPAL */}
            <div className="flex-1 flex flex-col min-w-0">

                {/* BARRA SUPERIOR MÓVIL (Blanca con borde) */}
                <header
                    className="md:hidden sticky top-0 z-10 flex h-16 items-center border-b-2 border-gray-200 px-4 justify-between"
                    style={{ backgroundColor: '#ffffff' }} // <--- AGREGA ESTO
                >
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                            <span className="text-white font-bold">A</span>
                        </div>
                        <span className="font-bold text-slate-800">Adventure</span>
                    </div>

                    {/* MENU HAMBURGUESA (Móvil) */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-slate-600">
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-72 p-0">
                            <div className="p-6 bg-slate-900 text-white">
                                <h2 className="text-lg font-bold">Menú</h2>
                                <p className="text-xs text-slate-400">Navegación principal</p>
                            </div>
                            <div className="p-4">
                                <NavLinks isMobile={true} />
                                <div className="mt-8">
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start gap-2 text-red-500 border-red-200 hover:bg-red-50"
                                        onClick={() => {
                                            localStorage.clear();
                                            window.location.href = '/login';
                                        }}
                                    >
                                        <LogOut className="h-4 w-4" /> Salir
                                    </Button>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </header>

                {/* AREA DE CONTENIDO (Gris muy suave) */}
                <main className="flex-1 overflow-y-auto p-4 md:p-8 md:pt-10 scroll-smooth">
                    <div className="mx-auto max-w-6xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}