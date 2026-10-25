import { Link } from "react-router-dom";

function AdminPlaceholder() {
  return (
    <section>
      <h1 className="text-[32px] leading-tight md:text-[40px]">Próximamente</h1>
      <p className="mt-2 text-sm text-charcoal/60">
        Esta sección del panel todavía no está lista.
      </p>
      <Link
        to="/admin"
        className="mt-6 inline-block text-sm font-semibold text-dorado-oscuro hover:underline"
      >
        Volver al resumen
      </Link>
    </section>
  );
}

export default AdminPlaceholder;
