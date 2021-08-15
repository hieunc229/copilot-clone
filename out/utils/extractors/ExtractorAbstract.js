"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config");
const fetchPageContent_1 = require("../fetchPageContent");
const config_2 = require("../../config");
const config = config_2.getConfig();
class ExtractorAbstract {
    constructor() {
        /**
        * Return a list of Source URLs from Google Search's result
        */
        this.extractURLFromKeyword = (keyword) => {
            return new Promise((resolve, reject) => {
                fetchPageContent_1.fetchPageTextContent(config_1.getSearchURL(this.URL, keyword))
                    .then(rs => {
                    const regex = new RegExp(`(https://${this.URL}/[a-z0-9-/]+)`, "g");
                    let urls = rs.textContent.match(regex);
                    urls && (urls = urls.filter((url, i, list) => list.indexOf(url) === i));
                    resolve(urls || []);
                })
                    .catch(reject);
            });
        };
    }
    isEnabled() {
        return this.URL in config.settings.sites && config.settings.sites[this.URL];
    }
}
exports.default = ExtractorAbstract;
