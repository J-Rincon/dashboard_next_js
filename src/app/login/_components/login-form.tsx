'use client';

import { AtSign, KeyRound, ArrowRight, CircleAlert } from 'lucide-react';
import { lusitana } from '@/ui/fonts';
import { Button } from './button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

const schema = z.object({
  email: z.string().email({ message: 'Correo inválido' }),
  password: z.string().min(8, { message: 'Mínimo 8 caracteres' })
});

type LoginFormData = z.infer<typeof schema>;

export default function LoginForm() {
  const [error, setError] = useState('');
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid }
  } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
    mode: 'onChange'
  });


  const onSubmit = async (data: LoginFormData) => {
    setError('');
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const json = await res.json();
      console.log('res :>> ', json);
      if (!res.ok) throw new Error(json.error || 'Error al iniciar sesión');
      toast.success('Sesión iniciada');
      router.push('/dashboard');
    } catch (err: unknown) {
      console.error('login error :>> ', error);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error al iniciar sesión');
      }
    }
  };
  
  return (
    <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          Por favor inicia sesión para continuar.
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                placeholder="Ingresa tu email"
                {...register('email')}
                required
              />
              <AtSign className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Contraseña
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                {...register('password')}
                placeholder="Ingresa tu contraseña"
                required
                minLength={6}
              />
              <KeyRound className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>
        </div>
        <Button className="mt-4 w-full" disabled={isSubmitting || !isValid}>
          {isSubmitting ? 'Ingresando...' : 'Ingresar'} <ArrowRight className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
        <div className="flex h-8 items-end space-x-1">
          {error && (
            <>
              <CircleAlert className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{error}</p>
            </>
          )}
        </div>
      </div>
    </form>
  );
}
