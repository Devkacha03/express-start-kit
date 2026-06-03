export function signUpController(req, res, next) {
    try {
        res.send("sign up controller");
    } catch (error) {
        next(error); // passes error to error handler middleware
    }
}

export function signInController(req, res, next) {
    try {
        res.send("sign in controller");
    } catch (error) {
        next(error); // passes error to error handler middleware
    }
}