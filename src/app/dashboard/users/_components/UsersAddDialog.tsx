'use client';

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleAlert, UserPlus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

const roleOptions = [
  { value: '6a7844e7-95df-4505-b232-e76d89eca215', label: 'Administrador' },
  { value: '8610b806-2977-41ee-9bfb-4bd9ea45c9fe', label: 'Operador' },
];

const schema = z.object({
  email: z.string().email({ message: 'Correo inválido' }),
  name: z.string().min(6, { message: 'Mínimo 6 caracteres' }),
  roleId: z.enum(['6a7844e7-95df-4505-b232-e76d89eca215', '8610b806-2977-41ee-9bfb-4bd9ea45c9fe'], { message: 'Rol es requerido' })
});

type AddUserFormData = z.infer<typeof schema>;

export default function UsersAddDialog() {
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid }
  } = useForm<AddUserFormData>({
    resolver: zodResolver(schema),
    mode: 'all'
  });

  const onSubmit = async (data: AddUserFormData) => {
    setError('');
    console.log('data', data)
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const json = await res.json();
      console.log('res :>> ', json);
      if (!res.ok) throw new Error(json.error || 'Error al crear usuario');
    } catch (err: unknown) {
      console.error('register error :>> ', error);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error al crear usuario');
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" className="mt-4 w-40">
        Añadir usuario <UserPlus className="ml-auto h-5 w-5 text-gray-50" />
      </Button>
      </DialogTrigger>
      <DialogContent className="w-full bg-white sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Agregar Usuario</DialogTitle>
            <DialogDescription>
              Ingresa el usuario aquí. Haz clic en guardar cuando hayas
              terminado.
            </DialogDescription>
          </DialogHeader>
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
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>
            <div className="mt-4">
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="name"
              >
                Nombre
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="name"
                  type="text"
                  placeholder="Ingresa tu nombre"
                  {...register('name')}
                  required
                />
              </div>
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>
            <div className="mt-4">
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="role"
              >
                Rol
              </label>
              <div className="relative">
                <select
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="role"
                  {...register('roleId')}
                  required
                >
                  <option value="">Selecciona un rol</option>
                  {roleOptions.map((role) => (
                    <option key={role.value} value={role.value}>
                      {role.label}
                    </option>
                  ))}
                </select>
              </div>
              {errors.roleId && <p className="text-red-500 text-sm mt-1">{errors.roleId.message}</p>}
            </div>
          </div>
          <div className="flex h-8 items-end space-x-1">
          {error && (
              <>
                <CircleAlert className="h-5 w-5 text-red-500" />
                <p className="text-sm text-red-500">{error}</p>
              </>
            )}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button">Cancelar</Button>
            </DialogClose>
            <Button disabled={isSubmitting || !isValid} type="submit"> {isSubmitting ? 'Guardando...' : 'Agregar usuario'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
