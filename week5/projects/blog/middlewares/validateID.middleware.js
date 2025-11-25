const validateID = (req, res, next) => {
  const idString = req.params.id;
  const idNumber = parseInt(idString, 10);

  // Validate: Check if conversion failed (NaN) or if the string contained extra characters (e.g., '123a')
  if (isNaN(idNumber) || String(idNumber) !== idString) {
    return res.status(400).json({
      success: false,
      data: null,
      error: `Invalid ID format. Expected a valid integer: ${idString}`
    });
  }

  // Attach the safe, numeric value to the request object
  req.validatedID = idNumber;

  next();
};

export default validateID
