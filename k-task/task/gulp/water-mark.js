'use strict';

import path from 'path';
import header from 'gulp-header';

module.exports = function(gulp, setgulp, plugins, config, target, browserSync) {
    let url = config;
    let dest = path.join(target);
    let banner = ['<!--//',
        '.##....##..######...##.....##.##....##.########.##....##',
        '.###...##.##....##..##.....##..##..##..##.......###...##',
        '.####..##.##........##.....##...####...##.......####..##',
        '.##.##.##.##...####.##.....##....##....######...##.##.##',
        '.##..####.##....##..##.....##....##....##.......##..####',
        '.##...###.##....##..##.....##....##....##.......##...###',
        '.##....##..######....#######.....##....########.##....##',
        ' Coding by: Bao Nguyen',
        ' Tel: 0.96.96.89.89.3',
        ' Tel: 0.933.112.900',
        ' Email: baonguyenyam@gmail.com',
        ' URL: fb.com/pham.nguyen.bao.nguyen',
        ' baonguyenyam.github.io',
        ' baonguyenyam.blogspot.com',
        '//-->'
    ].join('\n');

    // Run task
    gulp.task('water-mark', () => {
        return gulp.src(path.join(target, '**/*html'))
            .pipe(header(banner, {
                url: url
            }))
            .pipe(gulp.dest(dest));

    });

}