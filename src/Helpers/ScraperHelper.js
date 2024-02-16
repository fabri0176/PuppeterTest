class ScraperHelper {
    static async delay(seconds) {
        return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
    };
}

export default ScraperHelper;