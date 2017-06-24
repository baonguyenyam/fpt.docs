$(function() {
    // $('.treeview').jstree();
    $('.treeview').jstree({
        'core': {
            'data': [{
                "text": "src",
                "state": { "opened": true },
                "children": [{
                        "id": 1,
                        "text": "css",
                        "state": { "opened": true },
                        "children": [
                            { "id": 100, "text": "reset.css", "state": { "selected": false }, "icon": "fa fa-css3" },
                            { "id": 101, "text": "style.css", "state": { "selected": false }, "icon": "fa fa-css3" }
                        ]
                    },
                    {
                        "id": 2,
                        "text": "js",
                        "state": { "opened": true },
                        "children": [
                            { "id": 200, "text": "main.js", "state": { "selected": false }, "icon": "fa fa-code" }
                        ]
                    },
                    {
                        "id": 3,
                        "text": "img",
                        "state": { "opened": true },
                        "children": [
                            { "id": 300, "text": "Image.{png,bpm,jpg,.gif}", "state": { "selected": false }, "icon": "fa fa-file-image-o" }
                        ]
                    }, {
                        "id": 4,
                        "text": "index.html",
                        "state": { "selected": false },
                        "icon": "fa fa-html5"
                    }, {
                        "id": 5,
                        "text": "readme.md",
                        // "state": { "disabled": true },
                        "icon": "fa fa-file-o"
                    }
                ]
            }]
        }
    }).on("changed.jstree", function(e, data) {
        getDataDemo(data.selected[0], data.node.text);
    });
});

function getDataDemo(e, f) {
    $('#getData').html($('#css_' + e).html());
    $('#getTitle').html(f);
    if (e == 100) {
        $('.quine:not(.lang-html)').each(function() {
            var newHTML = $(this).html()
            var quineHtml = css(newHTML);
            quineHtml = quineHtml.replace(/&lt;script src[\s\S]*?&gt;&lt;\/script&gt;|&lt;!--\?[\s\S]*?--&gt;|&lt;pre\b[\s\S]*?&lt;\/pre&gt;/g, '<span class="operative">$&</span>');
            $(this).html(quineHtml);
        });
        $('pre').each(function(i, block) {
            hljs.highlightBlock(block);
        });
    }
    // else if (e == 4 || e == 5) {
    //     $('.quine:not(.lang-css)').each(function() {
    //         var newHTML = $(this).html()
    //         var quineHtml = html(newHTML);
    //         quineHtml = quineHtml.replace(/&lt;script src[\s\S]*?&gt;&lt;\/script&gt;|&lt;!--\?[\s\S]*?--&gt;|&lt;pre\b[\s\S]*?&lt;\/pre&gt;/g, '<span class="operative">$&</span>');
    //         $(this).html(quineHtml);
    //     });
    //     $('pre').each(function(i, block) {
    //         hljs.highlightBlock(block);
    //     });
    // }
    //  else {

    // }
}