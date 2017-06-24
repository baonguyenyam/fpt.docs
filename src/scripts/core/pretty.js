//<![CDATA[
function html(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/#/g, '&#35;').replace(/\\/g, '\\\\').replace(/\n/g, '\<br />').replace(/\[/g, '&lt;').replace(/\]/g, '&gt;').replace(/\*/g, '&ensp;&ensp;');
};

function css(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/#/g, '&#35;').replace(/\\/g, '\\\\').replace(/\n/g, '\<br />').replace(/\*/g, '&ensp;&ensp;');
};
$('.quine:not(.lang-css)').each(function() {
    var newHTML = $(this).html()
    var quineHtml = html(newHTML);
    quineHtml = quineHtml.replace(/&lt;script src[\s\S]*?&gt;&lt;\/script&gt;|&lt;!--\?[\s\S]*?--&gt;|&lt;pre\b[\s\S]*?&lt;\/pre&gt;/g, '<span class="operative">$&</span>');
    $(this).html(quineHtml);
});
$('.quine:not(.lang-html)').each(function() {
    var newHTML = $(this).html()
    var quineHtml = css(newHTML);
    quineHtml = quineHtml.replace(/&lt;script src[\s\S]*?&gt;&lt;\/script&gt;|&lt;!--\?[\s\S]*?--&gt;|&lt;pre\b[\s\S]*?&lt;\/pre&gt;/g, '<span class="operative">$&</span>');
    $(this).html(quineHtml);
});