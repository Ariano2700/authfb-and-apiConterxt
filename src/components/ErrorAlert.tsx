import Swal from "sweetalert2";
type ErrorType = { error: string | null };

export function ErrorAlert({ error }: ErrorType) {
  if (!error) {
    return null;
  }
  Swal.fire({
    title: "Error!",
    text: error,
    icon: "error",
    confirmButtonText: "Accept",
  });
}