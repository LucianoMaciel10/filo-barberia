import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import AuthLayout from "../components/layout/AuthLayout";
import Checkbox from "../components/ui/Checkbox";
import Input from "../components/ui/Input";

const schema = z.object({
  name: z.string().trim().min(3, "Ingresá tu nombre y apellido"),
  email: z.email("Ingresá un correo válido"),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[\d\s-]{8,}$/, "Ingresá un teléfono válido"),
  password: z
    .string()
    .min(8, "Usá al menos 8 caracteres")
    .regex(/[A-Za-z]/, "Incluí al menos una letra")
    .regex(/\d/, "Incluí al menos un número"),
  terms: z.boolean().refine((value) => value, {
    message: "Tenés que aceptar los términos para continuar",
  }),
});

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { terms: false },
  });

  const onSubmit = async (data) => {
    // TODO: conectar con la API cuando esté el backend
    console.log("registro", data.email);
  };

  return (
    <AuthLayout>
      <h1 className="text-[32px] leading-tight md:text-[40px]">
        Tu cuenta, tu estilo
      </h1>
      <p className="mt-2 text-sm text-charcoal/60">
        Creá tu cuenta y reservá tu primer turno
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="mt-8 space-y-5"
      >
        <Input
          label="Nombre y apellido"
          placeholder="Por ejemplo, Tomás Molina"
          autoComplete="name"
          error={errors.name?.message}
          {...register("name")}
        />

        <Input
          label="Correo electrónico"
          type="email"
          placeholder="vos@ejemplo.com"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />

        <Input
          label="Teléfono"
          type="tel"
          placeholder="+54 9 11 2345-6789"
          autoComplete="tel"
          error={errors.phone?.message}
          {...register("phone")}
        />

        <Input
          label="Contraseña"
          type="password"
          placeholder="Ingresá tu contraseña"
          autoComplete="new-password"
          hint="Al menos 8 caracteres, una letra y un número"
          error={errors.password?.message}
          {...register("password")}
        />

        <Checkbox
          label="Acepto los términos y la política de privacidad de Filo"
          error={errors.terms?.message}
          {...register("terms")}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="h-12 w-full cursor-pointer rounded-brand bg-dorado text-sm font-semibold transition-colors hover:bg-dorado/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Creando cuenta..." : "Crear cuenta"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm">
        ¿Ya tenés cuenta?{" "}
        <Link to="/login" className="font-semibold hover:text-dorado">
          Ingresá
        </Link>
      </p>

      <p className="mt-10 text-xs text-charcoal/60">
        Tu información está segura. Solo la usamos para gestionar tus turnos.
      </p>
    </AuthLayout>
  );
}

export default Register;
