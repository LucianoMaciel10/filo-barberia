import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useLocation } from "react-router-dom";
import { z } from "zod";
import FormAlert from "../components/ui/FormAlert";
import Input from "../components/ui/Input";
import { business } from "../data/business";
import { useAuth } from "../hooks/useAuth";
import { changePassword, updateProfile } from "../services/account";
import { formatMonthYear, initials } from "../utils/format";
import { nameSchema, passwordSchema, phoneSchema } from "../utils/validation";

const profileSchema = z.object({
  name: nameSchema,
  phone: phoneSchema,
});

const passwordFormSchema = z
  .object({
    currentPassword: z.string().min(1, "Ingresá tu contraseña actual"),
    newPassword: passwordSchema,
    confirmPassword: z.string().min(1, "Repetí la nueva contraseña"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

const cardClass =
  "rounded-brand border border-borde bg-white p-5 shadow-sm md:p-6";

function Profile() {
  const { user, updateUser } = useAuth();
  const { state } = useLocation();
  const [notice, setNotice] = useState(null);

  const profileForm = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: user.name, phone: user.phone ?? "" },
  });
  const passwordForm = useForm({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const {
    errors: profileErrors,
    isDirty,
    isSubmitting: savingProfile,
  } = profileForm.formState;
  const { errors: passwordErrors, isSubmitting: savingPassword } =
    passwordForm.formState;

  const saveProfile = async (data) => {
    setNotice(null);
    await updateProfile(data);
    updateUser(data);
    profileForm.reset(data);
    setNotice({
      title: "Tu perfil se guardó",
      message: "Tus datos personales ya están actualizados.",
    });
  };

  const savePassword = async (data) => {
    setNotice(null);
    await changePassword(data);
    passwordForm.reset();
    setNotice({
      title: "Actualizamos tu contraseña",
      message: "La próxima vez ingresá con la nueva.",
    });
  };

  const whatsapp = business.socials.find(
    (social) => social.label === "WhatsApp",
  );

  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-10 md:py-14">
      <h1 className="text-[32px] leading-tight md:text-[40px]">Tu perfil</h1>
      <p className="mt-1 text-sm text-charcoal/60">
        Mantené tus datos al día para que podamos avisarte sobre tus turnos.
      </p>

      <div className="mt-8 flex items-center gap-4">
        <span
          aria-hidden="true"
          className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-dorado-suave font-heading text-2xl"
        >
          {initials(user.name)}
        </span>
        <div>
          <p className="text-sm font-semibold">{user.name}</p>
          <p className="text-xs text-charcoal/60">
            Cliente de Filo
            {user.createdAt && ` desde ${formatMonthYear(user.createdAt)}`}
          </p>
        </div>
      </div>

      <div className="mt-6 grid items-start gap-6 lg:grid-cols-2">
        <form
          onSubmit={profileForm.handleSubmit(saveProfile)}
          noValidate
          aria-labelledby="personal-title"
          className={cardClass}
        >
          <h2 id="personal-title" className="text-2xl md:text-3xl">
            Datos personales
          </h2>

          <div className="mt-4 space-y-2">
            <Input
              label="Nombre y apellido"
              autoComplete="name"
              error={profileErrors.name?.message}
              {...profileForm.register("name")}
            />
            <Input
              label="Teléfono"
              type="tel"
              autoComplete="tel"
              error={profileErrors.phone?.message}
              {...profileForm.register("phone")}
            />
            <Input
              label="Correo electrónico"
              type="email"
              readOnly
              defaultValue={user.email}
              hint="El correo identifica tu cuenta y no se puede editar."
            />
          </div>

          <button
            type="submit"
            disabled={!isDirty || savingProfile}
            className="mt-2 h-12 w-full cursor-pointer rounded-brand bg-dorado text-sm font-semibold transition-colors hover:bg-dorado/90 disabled:cursor-not-allowed disabled:bg-arena disabled:text-charcoal/40 disabled:hover:bg-arena"
          >
            {savingProfile ? "Guardando..." : "Guardar cambios"}
          </button>
        </form>

        <form
          onSubmit={passwordForm.handleSubmit(savePassword)}
          noValidate
          aria-labelledby="password-title"
          className={cardClass}
        >
          <h2 id="password-title" className="text-2xl md:text-3xl">
            Cambiar contraseña
          </h2>

          <div className="mt-4 space-y-2">
            <Input
              label="Contraseña actual"
              type="password"
              placeholder="Ingresá tu contraseña actual"
              autoComplete="current-password"
              error={passwordErrors.currentPassword?.message}
              {...passwordForm.register("currentPassword")}
            />
            <Input
              label="Nueva contraseña"
              type="password"
              placeholder="Ingresá una nueva contraseña"
              autoComplete="new-password"
              hint="Al menos 8 caracteres, una letra y un número"
              error={passwordErrors.newPassword?.message}
              {...passwordForm.register("newPassword")}
            />
            <Input
              label="Repetí la nueva contraseña"
              type="password"
              placeholder="Volvé a escribirla"
              autoComplete="new-password"
              error={passwordErrors.confirmPassword?.message}
              {...passwordForm.register("confirmPassword")}
            />
          </div>

          <button
            type="submit"
            disabled={savingPassword}
            className="mt-2 h-12 w-full cursor-pointer rounded-brand border border-borde bg-white text-sm font-semibold transition-colors hover:border-dorado disabled:cursor-not-allowed disabled:opacity-60"
          >
            {savingPassword ? "Actualizando..." : "Actualizar contraseña"}
          </button>
        </form>
      </div>

      <FormAlert
        show={!!notice}
        variant="success"
        title={notice?.title}
        message={notice?.message}
      />

      {notice && state?.returnTo && (
        <Link
          to={state.returnTo}
          className="mt-4 inline-block text-sm font-semibold text-dorado-oscuro hover:underline"
        >
          Volver a mi reserva
        </Link>
      )}

      <p className="mt-8 text-xs text-charcoal/60">
        ¿Necesitás ayuda con tu cuenta? Escribinos por{" "}
        <a
          href={whatsapp?.href}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-dorado"
        >
          WhatsApp al {business.phoneDisplay}
        </a>
        .
      </p>
    </section>
  );
}

export default Profile;
