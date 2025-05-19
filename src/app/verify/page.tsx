'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Verificando token...');
  const [canResend, setCanResend] = useState(false);
  const [email, setEmail] = useState('');
  const [resendStatus, setResendStatus] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('Token no proporcionado.');
      return;
    }

    const verifyToken = async () => {
      try {
        const res = await fetch(`/api/verify?token=${token}`);
        const json = await res.json();
        if (!res.ok) {
          throw new Error(json.error);
        }
        setStatus('success');
        setMessage('Token verificado. Redirigiendo...');
        setTimeout(() => router.push(`/set-password?token=${token}`), 1500);
      } catch (err: unknown) {
        setStatus('error');
        if (err instanceof Error) {
          setMessage(err.message);
          if (err.message === 'Invalid or expired token') setCanResend(true);
        } else {
          setMessage('Ocurrió un error desconocido.');
        }
      }
    };

    verifyToken();
  }, [token, router]);

  const handleResend = async () => {
    if (!email) return setMessage('Debes ingresar un correo');
    setResendStatus('sending');
    try {
      const res = await fetch('/api/resend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setResendStatus('sent');
      setMessage('Nuevo enlace enviado');
    } catch (err: unknown) {
      setResendStatus('failed');
      if (err instanceof Error) {
        setMessage(err.message || 'Error reenviando enlace');
      } else {
        setMessage('Error reenviando enlace');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h1 className="text-2xl font-semibold mb-4">Verificación de cuenta</h1>
      <p className={`text-${status === 'error' ? 'red' : status === 'success' ? 'green' : 'gray'}-600`}>{message}</p>
      {canResend && (
        <div className="mt-4 space-y-2">
          <input
            type="email"
            placeholder="Ingresa tu correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={handleResend}
            disabled={resendStatus === 'sending'}
          >
            {resendStatus === 'sending' ? 'Enviando...' : 'Reenviar enlace'}
          </button>
        </div>
      )}
    </div>
  );
}