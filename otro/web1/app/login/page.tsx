// app/login/page.tsx
"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation"; // 1. Importar useRouter

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // 2. Estado para la carga
  const [error, setError] = useState<string | null>(null); // 3. Estado para el error
  const router = useRouter(); // 4. Inicializar el router

  // app/login/page.tsx

  // ... (el resto del código de la página se queda igual)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true); // Inicia la carga
    setError(null); // Limpia errores previos

    // 1. Muestra un mensaje de "cargando" o deshabilita el botón (opcional pero bueno)
    // console.log("Enviando datos al backend...");

    try {
      // 2. Define la URL de tu API de Go. ¡Asegúrate de que el puerto sea el correcto!
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:9000/auth/login"; // Mejor con variables de entorno

      // 3. Envía los datos usando fetch
      const response = await fetch(apiUrl, {
        method: "POST", // Estamos enviando datos, así que usamos POST
        headers: {
          "Content-Type": "application/json", // Le decimos al backend que le enviamos JSON
        },
        body: JSON.stringify({
          // Convertimos el objeto de JS a una cadena de texto JSON
          email: email,
          password: password,
        }),
      });

      // 4. Revisa la respuesta del backend
      if (response.ok) {
        // Si la respuesta es exitosa (status 200-299)
        const data = await response.json();
        console.log("Login exitoso:", data);

        // 5. ¡Guarda el token! El backend te debería devolver un token.
        // Lo guardamos en una cookie para que el middleware lo pueda leer después.
        document.cookie = `auth_token=${data.token}; path=/;`; // Guarda el token en una cookie

        // 6. Redirige al usuario al panel de admin
        router.push("/admin"); // 5. Redirección con Next.js
      } else {
        // Si la respuesta es un error (ej. 401 Unauthorized)
        const errorData = await response.json();
        console.error("Error de login:", errorData.message);
        setError(errorData.message || "Credenciales incorrectas");
      }
    } catch (error) {
      // Si hay un error de red o el servidor no responde
      console.error("Error de conexión:", error);
      setError("No se pudo conectar al servidor. Intenta más tarde.");
    } finally {
      setLoading(false); // Termina la carga
    }
  };

  // ... (el resto del código de la página se queda igual)

  return (
    // Fondo de pantalla completo y centrado
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      {/* Contenedor blanco de la tarjeta de login */}
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        {/* Título */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800">Iniciar Sesión</h1>
          <p className="mt-2 text-sm text-gray-600">
            Ingresa tus credenciales para continuar
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Campo de Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Correo Electrónico
            </label>
            <input
              id="email"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Campo de Contraseña */}
          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Opciones extra (Recordarme y Olvidé mi contraseña) */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                disabled={loading}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label
                htmlFor="remember"
                className="ml-2 block text-sm text-gray-700"
              >
                Recordarme
              </label>
            </div>
            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </div>

          {/* Mensaje de Error */}
          {error && (
            <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Botón de Entrar */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 px-4 py-3 text-center text-base font-bold text-white shadow-md transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {loading ? "Cargando..." : "Entrar"}
          </button>
        </form>
      </div>
    </main>
  );
}
