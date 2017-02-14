module.exports = Config;


function Config(c){
    var isExisted,
        self = this
    ;
    this.options = {
        port: 9000,
        open: true,
        livereload: 30000,
        hostname: '192.168.180.94'
    };

    this.livereload = {
        options: {
            middleware: function(connect) {
                return [
                    connect.static(c.app)
                ];
            }
        }
    }

}