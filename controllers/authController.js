function signUpController(req, res, next) {
    try {
        res.send("sign up controller");
    } catch (error) {
        next(error); // passes error to error handler middleware
    }
}
export { signUpController };