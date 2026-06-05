export const userProfileController = async (req, res, next) => {
  try {
    const { createdAt, updatedAt, passwordChangedAt, ...user } =
      req.user.toObject();

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};
