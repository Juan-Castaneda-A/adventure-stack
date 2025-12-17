"use client";

import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, Loader2 } from "lucide-react";

export default function MedicosLanding() {
  
  // --- LÓGICA DEL FORMULARIO (Cerebro) ---
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    fecha: "",
    motivo: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Usamos el endpoint público
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/tramites/publico`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titulo: formData.motivo,
          fechaCita: new Date(formData.fecha).toISOString(),
          nombreCliente: formData.nombre,
          telefonoCliente: formData.telefono,
          detalles: { tipo: "Consulta Médica", origen: "Landing Unimaxifaces" }
        })
      });

      if (res.ok) {
        setSuccess(true);
        setFormData({ nombre: "", telefono: "", fecha: "", motivo: "" });
      } else {
        const error = await res.json();
        alert(error.message || "Error al agendar");
      }
    } catch (error) {
      alert("Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  // --- INICIALIZAR ANIMACIONES ---
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div className="font-sans text-slate-600 antialiased overflow-x-hidden bg-white">
      
      {/* NAV */}
      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2">
              <div className="bg-sky-50 text-sky-600 p-2 rounded-lg flex items-center">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="font-bold text-xl text-slate-800 tracking-tight uppercase">UNIMAXIFACES</span>
            </div>
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-500">
              <a href="#inicio" className="hover:text-sky-600 transition">Inicio</a>
              <a href="#servicios" className="hover:text-sky-600 transition">Servicios</a>
              <a href="#equipo" className="hover:text-sky-600 transition">Equipo</a>
              <a href="#contacto" className="bg-sky-600 hover:bg-sky-700 text-white px-5 py-2.5 rounded-full transition shadow-lg shadow-sky-500/30 flex items-center gap-2 hover:scale-105 transform">
                Agendar Cita
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section id="inicio" className="pt-32 pb-20 lg:pt-48 lg:pb-32 relative overflow-hidden bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left" data-aos="fade-right">
              <span className="inline-block py-1 px-3 rounded-full bg-white text-slate-700 text-xs font-bold uppercase tracking-wider mb-6 border border-slate-200 shadow-sm">
                Unimaxifaces: Salud & Estética
              </span>
              <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
                Salud integral y <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-teal-500">
                  sonrisas perfectas.
                </span>
              </h1>
              <p className="text-lg text-slate-600 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                Medicina General y Cirugía Maxilofacial en un solo lugar. Unimos la salud humana con la estética facial para tu bienestar total.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a href="#contacto" className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800 transition flex items-center justify-center gap-2 hover:shadow-lg transform hover:-translate-y-1">
                   Agendar Ahora
                </a>
              </div>
            </div>

            <div className="relative mt-12 lg:mt-0" data-aos="fade-left">
               <div className="absolute inset-0 bg-gradient-to-tr from-sky-100 to-blue-100 rounded-[2rem] transform rotate-3 scale-105 -z-10"></div>
               <img 
                 src="https://img.freepik.com/foto-gratis/mujer-sonriente-silla-dentista_1153-655.jpg" 
                 alt="Paciente feliz" 
                 className="rounded-[2rem] shadow-2xl w-full object-cover h-[500px] border-4 border-white relative z-10 hover:scale-[1.02] transition duration-500"
               />
            </div>
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section id="servicios" className="py-20 bg-white">
         <div className="max-w-6xl mx-auto px-4 text-center">
             <h2 className="text-3xl font-bold text-slate-900 mb-12">Nuestros Servicios</h2>
             <div className="grid md:grid-cols-3 gap-8">
                 {/* Card 1 */}
                 <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-xl transition group" data-aos="fade-up">
                     <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-sky-600 shadow-sm mb-6 group-hover:bg-sky-600 group-hover:text-white transition mx-auto">
                        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                     </div>
                     <h3 className="text-xl font-bold text-slate-800 mb-3">Consulta General</h3>
                     <p className="text-slate-500 text-sm">Diagnóstico y tratamiento integral.</p>
                 </div>
                 {/* Card 2 */}
                 <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-xl transition group" data-aos="fade-up" data-aos-delay="100">
                     <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-teal-500 shadow-sm mb-6 group-hover:bg-teal-500 group-hover:text-white transition mx-auto">
                        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                     </div>
                     <h3 className="text-xl font-bold text-slate-800 mb-3">Maxilofacial</h3>
                     <p className="text-slate-500 text-sm">Cirugía y estética funcional.</p>
                 </div>
                 {/* Card 3 */}
                 <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-xl transition group" data-aos="fade-up" data-aos-delay="200">
                     <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm mb-6 group-hover:bg-blue-600 group-hover:text-white transition mx-auto">
                        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                     </div>
                     <h3 className="text-xl font-bold text-slate-800 mb-3">Certificados</h3>
                     <p className="text-slate-500 text-sm">Documentación médica oficial.</p>
                 </div>
             </div>
         </div>
      </section>

      {/* CONTACTO CON EL FORMULARIO INTEGRADO */}
      <section id="contacto" className="py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row" data-aos="fade-up">
            
            {/* IZQUIERDA: INFORMACIÓN */}
            <div className="p-10 md:w-1/2 flex flex-col justify-center bg-slate-900 text-white">
              <h2 className="text-3xl font-bold mb-6">Agenda tu consulta</h2>
              <p className="text-slate-300 mb-8">
                Selecciona la fecha que mejor te convenga. Te confirmaremos vía WhatsApp de inmediato.
              </p>
              <div className="space-y-6">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">📍</div>
                    <div>
                        <p className="font-bold">Ubicación</p>
                        <p className="text-sm text-slate-400">Cra 12 # 13B - 35, Valledupar</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">📱</div>
                    <div>
                        <p className="font-bold">WhatsApp Directo</p>
                        <p className="text-sm text-slate-400">+57 321 480 6862</p>
                    </div>
                 </div>
              </div>
            </div>

            {/* DERECHA: EL FORMULARIO DEL SOFTWARE */}
            <div className="p-10 md:w-1/2 bg-white">
               {success ? (
                   <div className="h-full flex flex-col items-center justify-center text-center space-y-4 animate-in fade-in">
                       <div className="h-20 w-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                           <CheckCircle className="h-10 w-10" />
                       </div>
                       <h3 className="text-2xl font-bold text-slate-800">¡Solicitud Enviada!</h3>
                       <p className="text-slate-500">
                           El Dr. Willis ha recibido tu solicitud. Revisa tu correo o espera nuestro mensaje.
                       </p>
                       <Button onClick={() => setSuccess(false)} variant="outline">Agendar otra</Button>
                   </div>
               ) : (
                   <form onSubmit={handleSubmit} className="space-y-4">
                       <div className="space-y-2">
                           <Label>Nombre Completo</Label>
                           <Input 
                             placeholder="Tu nombre" 
                             required 
                             value={formData.nombre}
                             onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                           />
                       </div>
                       <div className="space-y-2">
                           <Label>WhatsApp / Celular</Label>
                           <Input 
                             placeholder="300 123 4567" 
                             required 
                             value={formData.telefono}
                             onChange={(e) => setFormData({...formData, telefono: e.target.value})}
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
                           <Label>Motivo de Consulta</Label>
                           <Input 
                             placeholder="Ej: Dolor de muela / Valoración" 
                             required 
                             value={formData.motivo}
                             onChange={(e) => setFormData({...formData, motivo: e.target.value})}
                           />
                       </div>
                       <Button type="submit" className="w-full bg-sky-600 hover:bg-sky-700 text-lg py-6 mt-2" disabled={loading}>
                           {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Confirmar Cita"}
                       </Button>
                   </form>
               )}
            </div>

          </div>
        </div>
      </section>

      <footer className="bg-white border-t border-slate-100 py-12 text-center text-slate-400 text-sm">
        © 2025 UNIMAXIFACES. Potenciado por Adventure Stack.
      </footer>
    </div>
  );
}