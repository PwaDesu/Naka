const sourceUpdater = new (require("./src/SourceUpdater"))();

(async () => {
    await sourceUpdater.checkForUpdates();
    const naka = new (require("./src/SourceUpdater"))();
    await naka.launch();
})();