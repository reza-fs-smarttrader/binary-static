const moment     = require('moment');
const template   = require('./utility').template;
const texts_json = require('../../autogenerated/texts').texts_json;

const Localize = (() => {
    'use strict';

    const texts = {};
    let localized_texts;

    const localizeForLang = (lang) => {
        // make texts objects localize-able
        Object.keys(texts_json).forEach((key) => {
            texts[key] = texts_json[key] || {};
        });
        localized_texts = texts[lang];
        moment.locale(lang.toLowerCase());
    };

    const doLocalize = (text, params) => {
        const index = text.replace(/[\s|.]/g, '_');
        text = (localized_texts && localized_texts[index]) || text;
        // only use template when explicitly required
        return params ? template(text, params) : text;
    };

    const localize = (text, params) => (
        Array.isArray(text) ? text.map(t => doLocalize(t, params)) : doLocalize(text, params)
    );

    return {
        localizeForLang: localizeForLang,
        localize       : localize,
    };
})();

module.exports = {
    localize       : Localize.localize,
    localizeForLang: Localize.localizeForLang,
};
