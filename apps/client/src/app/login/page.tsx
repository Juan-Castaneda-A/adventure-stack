"use client"; // Necesario para usar hooks como useState

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("http://localhost:3000/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) throw new Error("Credenciales incorrectas");

            const data = await res.json();

            // 2. GUARDAR TOKEN Y REDIRIGIR
            // Guardamos el token en el almacenamiento local del navegador
            localStorage.setItem("token", data.access_token);
            localStorage.setItem("user", JSON.stringify(data.user)); // Guardamos nombre y email

            // Aquí redirigiríamos al dashboard...
            router.push("/dashboard");

        } catch (err) {
            setError("Email o contraseña incorrectos");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="w-[350px] shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">Adventure Stack</CardTitle>
                    <CardDescription className="text-center">Ingresa a tu cuenta</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Correo Electrónico</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="tu@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Contraseña</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "Entrando..." : "Iniciar Sesión"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}