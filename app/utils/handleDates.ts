import { format } from "date-fns";
import { fr } from "date-fns/locale";

export const displayLightDateTime = (date: Date) => {
  const dateToFormat = new Date(date);
  return format(dateToFormat, "Pp", { locale: fr });
};
