'use strict';

module.exports = function(ret, conf, setting, opt){
    var path = feather.project.getCachePath() + '/info/' + feather.config.get('project.name') + '.json';
    var modulename = feather.config.get('project.modulename');

    if(modulename == 'common'){
        var content = {
            config: {
                template: feather.config.get('template'),
                project: {
                    domain: feather.config.get('project.domain', '')
                },
                statics: feather.config.get('statics'),
                autoPack: feather.config.get('autoPack')
            },
            components: feather.releaseInfo.components,
            map: {},
            modules: {}
        };

        feather.util.map(ret.src, function(subpath, file){
            if(file.release){
                content.map[file.id] = file.extras;
            }
        });
    }else{
        var content = feather.releaseInfo;

        //merge common map
        var uriMap = ret.uriMap = ret.uriMap|| {};

        feather.util.map(feather.releaseInfo.map, function(id){
            uriMap[id] = id;
        });
    }

    content.modules[modulename] = {
        modifyTime: Date.now()
    };

    feather.util.write(path, feather.util.json(content));
};