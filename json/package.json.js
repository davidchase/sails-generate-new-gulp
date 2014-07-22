/**
 * Module dependencies
 */

var _ = require('lodash'),
    util = require('util');



/**
 *
 * @param  {[type]} scope [description]
 * @return {[type]}       [description]
 */
module.exports = function dataForPackageJSON(scope) {

    var sailsPkg = scope.sailsPackageJSON || {};

    // To determine the sails dep. to inject in the newly created package.json,
    // use `sails.prerelease` specified in the package.json of Sails itself.
    // If a `prerelease` version no. is not specified, just use `version`
    var sailsVersionDependency = (sailsPkg.sails && sailsPkg.sails.prerelease) || ('~' + sailsPkg.version);

    return _.defaults(scope.appPackageJSON || {}, {
        name: scope.appName,
        private: true,
        version: '0.0.0',
        description: 'a Sails application',
        keywords: [],
        dependencies: {
            'sails': sailsVersionDependency,
            'sails-disk': getDependencyVersion(sailsPkg, 'sails-disk'),
            'rc': getDependencyVersion(sailsPkg, 'rc'),
            'include-all': getDependencyVersion(sailsPkg, 'include-all'),
            'ejs': getDependencyVersion(sailsPkg, 'ejs'),
            'gulp': '~3.8.6'

        },
        scripts: {
            start: 'node app.js',
            debug: 'node debug app.js'
        },
        main: 'app.js',
        repository: {
            type: 'git',
            url: util.format('git://github.com/%s/%s.git', scope.github.username, scope.appName)
        },
        author: scope.author || '',
        license: ''
    });
};





/**
 * getDependencyVersion
 *
 * @param  {Object} packageJSON
 * @param  {String} module
 * @return {String}
 * @api private
 */

function getDependencyVersion(packageJSON, module) {
    return (
        packageJSON.dependencies && packageJSON.dependencies[module] ||
        packageJSON.devDependencies && packageJSON.devDependencies[module] ||
        packageJSON.optionalDependencies && packageJSON.optionalDependencies[module]
    );
}