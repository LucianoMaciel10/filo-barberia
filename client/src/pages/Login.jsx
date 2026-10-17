import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import AuthLayout from "../components/layout/AuthLayout";
import Input from "../components/ui/Input";
import FormAlert from "../components/ui/FormAlert";
import { useFocusFirstError } from "../hooks/useFocusFirstError";

const schema = z.object({
  email: z.email("Ingresá un correo válido"),
  password: z.string().min(1, "Ingresá tu contraseña"),
});

function Login() {
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors, isSubmitting, submitCount },
  } = useForm({ resolver: zodResolver(schema), shouldFocusError: false });
  const hasErrors = Object.keys(errors).length > 0;
  useFocusFirstError({ errors, submitCount, setFocus });

  const onSubmit = async (data) => {
    // TODO: conectar con la API cuando esté el backend
    console.log("login", data.email);
  };

  return (
    <AuthLayout>
      <h1 className="text-[32px] leading-tight md:text-[40px]">
        Qué bueno verte
      </h1>
      <p className="mt-2 text-sm text-charcoal/60">
        Ingresá para reservar o ver tus próximos turnos
      </p>

      <FormAlert
        show={hasErrors}
        title="Revisá tus datos"
        message="Corregí los campos marcados para ingresar."
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="mt-6 space-y-2"
      >
        <Input
          label="Correo electrónico"
          type="email"
          placeholder="vos@ejemplo.com"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />

        <Input
          label="Contraseña"
          type="password"
          placeholder="Ingresá tu contraseña"
          autoComplete="current-password"
          error={errors.password?.message}
          {...register("password")}
        />

        <div className="text-right">
          <a href="#" className="text-xs text-dorado-oscuro hover:underline">
            ¿Te olvidaste la contraseña?
          </a>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="h-12 w-full rounded-brand bg-dorado text-sm font-semibold transition-colors hover:bg-dorado/90 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
        >
          {isSubmitting ? "Ingresando..." : "Ingresar"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm">
        ¿Todavía no tenés cuenta?{" "}
        <Link to="/registro" className="font-semibold hover:text-dorado">
          Registrate
        </Link>
      </p>
    </AuthLayout>
  );
}

export default Login;
