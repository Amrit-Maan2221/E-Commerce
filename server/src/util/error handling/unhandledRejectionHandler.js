exports.unhandledRejectionHandler = (server) =>{
    // Unhandled Promise Rejection
    process.on("unhandledRejection", (err) => {
        console.log(`Error: ${err.message}`);
        console.log(`Shutting down the server due to Unhandled Promise Rejection`);
    
        server.close(() => {
        process.exit(1);
        });
    });
}