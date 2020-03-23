const child_process = require('child_process');

process.chdir('public/fs')
child_process.exec('node ../../node_modules/browserfs/dist/scripts/make_xhrfs_index > ../filesystem.json')