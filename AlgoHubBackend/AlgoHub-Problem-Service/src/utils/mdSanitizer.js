const marked = require('marked');
const sanitizeHtml = require('sanitize-html');
const TurndownService = require('turndown');

function sanitizeMarkdown(mdContent) {

    const turndownService = new TurndownService();

    const htmlContent = marked.parse(mdContent);

    const sanitizedContent = sanitizeHtml(htmlContent, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img'])
    });

    const sanitizedMarkdown = turndownService.turndown(sanitizedContent);

    return sanitizedMarkdown;

}

module.exports = sanitizeMarkdown;