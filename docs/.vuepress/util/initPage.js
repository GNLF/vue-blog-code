const fs = require('fs');

// 排除检查的文件
const excludes = ['README.md','sidebar.js'];
const fileTypes = /\.md$/;

const getSidebar = (rpath,collapsable = false) => {
    let sideArr = [];
    let fileArr = fs.readdirSync(rpath);
    fileArr.forEach(file => {
        if (excludes.indexOf(file) < 0 ) {
            const fullpath = rpath+"/"+file;
            const filename = file.replace(fileTypes,'');
            const title = filename.replace(/\d+-/g,'');
            const filepath = rpath.split('\docs')[1] +'/'+ filename
            const fileinfo = fs.statSync(fullpath);
            if(fileinfo.isFile()){
                if(fileTypes.test(file) > 0) {
                    sideArr.push(filepath)
                }
            } else {
                const children = getSidebar(fullpath,true);
                sideArr.push({
                    title,
                    collapsable,
                    children
                })
            }
        }
    });
    return sideArr;
};
module.exports = getSidebar
