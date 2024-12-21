export const dateFormat = (date: string, type = "long") => {
  return new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: type === "short" ? "numeric" : "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
};
