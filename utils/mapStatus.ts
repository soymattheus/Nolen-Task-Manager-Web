export const mapStatus = (title: string) => {
  switch (title) {
    case "C":
      return "Completa";
    case "P":
      return "Pendente";
    case "E":
      return "Em Andamento";
    default:
      return title;
  }
};
