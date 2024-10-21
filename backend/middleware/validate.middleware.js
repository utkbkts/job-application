export function validateRequestBody(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        errors: result.error.errors.map((err) => ({
          path: err.path.join("."),
          message: err.message,
        })),
      });
    }

    const hasEmptyField = Object.values(req.body).some((value) => value === "");

    if (hasEmptyField) {
      return res.status(400).json({
        errors: [{ message: "Tüm alanlar zorunludur" }],
      });
    }

    next();
  };
}
