export function loggerMiddleware(req, res, next) {
    const start = Date.now();

    // Capture response completion
    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
    });

    // Log request details immediately
    console.log(`Incoming: ${req.method} ${req.url}`);

    next();
}