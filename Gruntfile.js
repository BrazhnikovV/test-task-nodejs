module.exports = function( grunt ) {
    grunt.initConfig({
        jshint: {},
        concat: {},
        uglify: {}           
    });

    grunt.loadNpmTask('grunt-contrib-jshint');
    grunt.loadNpmTask('grunt-contrib-concat');
    grunt.loadNpmTask('grunt-contrib-uglify');

    grunt.registerTask( 'default', [ 'jshint', 'concat', 'uglify' ] );
};