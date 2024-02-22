class InterfaceScraper {
    constructor() {
        if (new.target === InterfaceScraper) {
            throw new TypeError("Cannot construct InterfaceScraper instances directly");
        }
    }

    async scrape() {
        throw new Error('scrape method must be implemented');
    }
}

export default InterfaceScraper;