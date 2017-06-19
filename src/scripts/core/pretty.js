//<![CDATA[
function html(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/#/g, '&#35;').replace(/\\/g, '\\\\').replace(/\n/g, '\<br />').replace(/\[/g, '&lt;').replace(/\]/g, '&gt;').replace(/\*/g, '&ensp;&ensp;');
}

function htmlLinenum(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/#/g, '&#35;').replace(/\\/g, '\\\\').replace(/\[/g, '&lt;').replace(/\]/g, '&gt;').replace(/\*/g, '&ensp;&ensp;');
}
//]]>
$('.quine:not(.linenums)').each(function() {
    var newHTML = $(this).html()
    var quineHtml = html(newHTML);
    quineHtml = quineHtml.replace(/&lt;script src[\s\S]*?&gt;&lt;\/script&gt;|&lt;!--\?[\s\S]*?--&gt;|&lt;pre\b[\s\S]*?&lt;\/pre&gt;/g, '<span class="operative">$&</span>');
    $(this).html(quineHtml);
});
$('.quine.linenums').each(function() {
    var newHTML = $(this).html()
    var quineHtml = htmlLinenum(newHTML);
    quineHtml = quineHtml.replace(/&lt;script src[\s\S]*?&gt;&lt;\/script&gt;|&lt;!--\?[\s\S]*?--&gt;|&lt;pre\b[\s\S]*?&lt;\/pre&gt;/g, '<span class="operative">$&</span>');
    $(this).html(quineHtml);
});