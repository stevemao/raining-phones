// Created by Steve Mao
if ("undefined" == typeof jQuery) {
    throw new Error("rainingPhones's JavaScript requires jQuery");
}

!(function($, window, document, undefined) {

    // Create the defaults once
    var pluginName = "rainingPhones",
        defaults = {

            maxPhones: 20,
            // In sec
            spawingGap: 0.1,
            // In pixel
            height: 700,
            // In sec
            appearTime: 2
        };

    // The actual plugin constructor
    function Plugin(element, options) {
        this.element = element;
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.availablePhones = [];
        this.init();
    }

    function Phone(name, width, height) {
        this.name = name;
        this.width = width;
        this.height = height;
    }

    Plugin.prototype = {

        init: function() {
            this.allPhones = [];

            var phone = new Phone('galaxy_note_3', '63px', '100px');
            this.allPhones.push(phone);
            phone = new Phone('iPhone_4_black', '40px', '75px');
            this.allPhones.push(phone);
            phone = new Phone('iPhone_4_white', '40px', '75px');
            this.allPhones.push(phone);
            phone = new Phone('iPhone_5_black', '40px', '80px');
            this.allPhones.push(phone);
            phone = new Phone('iPhone_5_white', '40px', '80px');
            this.allPhones.push(phone);
            phone = new Phone('galaxy_s_3', '50px', '90px');
            this.allPhones.push(phone);
            phone = new Phone('galaxy_s_4', '50px', '90px');
            this.allPhones.push(phone);

            var _this = this;
            window.setInterval(function() {
                _this.spawnPhone();
            }, _this.settings.spawingGap * 1000);
        },
        spawnPhone: function() {

            var elem = this.element;

            // Create a phone
            var _this = this;

            if (this.availablePhones.length < this.settings.maxPhones) {
                var randomLeft = this.random(elem);
                var phone;
                phone = this.allPhones[Math.floor(Math.random() * this.allPhones.length)];

                var $phone = $('<div></div>')
                    .appendTo(elem)
                    .css('width', phone.width)
                    .css('height', phone.height)
                    .css('left', randomLeft)
                    .css('position', 'absolute')
                    .css('transition-duration', this.settings.appearTime + 's')
                    .css('transition-timing-function', 'linear');

                setTimeout(function() {
                    $phone.css('transform', 'translate(0, ' + _this.settings.height + 'px)');
                }, 10);


                $phone.on('webkitTransitionEnd', function(event) {
                    $phone.css('display', 'none');
                });

                $phone.css('background', 'url("images/' + phone.name + '.png ")')
                    .css('background-size', phone.width + ' ' + phone.height);

                this.availablePhones.push($phone);
            }

            // Get a phone from memory
            else {
                this.availablePhones.some(function($phone) {
                    if ($phone.css('display') == 'none') {
                        _this.reset($phone);
                        $phone.css('transition-duration', _this.settings.appearTime + 's');
                        setTimeout(function() {
                            $phone.css('transform', 'translate(0, ' + _this.settings.height + 'px)');
                        }, 10);
                        return true;
                    }
                });
            }
        },
        reset: function(phone) {
            var elem = this.element;
            var randomLeft = this.random(elem);
            phone.css('transform', 'translate(0, 0)')
                .css('display', 'block')
                .css('left', randomLeft);
        },
        random: function(elem) {
            return Math.floor(Math.random() * $(elem).css('width').replace('px', ''));
        }
    };

    // A really lightweight plugin wrapper around the constructor,
    // Preventing against multiple instantiations
    $.fn[pluginName] = function(options) {
        this.each(function() {
            if (!$.data(this, "plugin_ " + pluginName)) {
                $.data(this, "plugin_ " + pluginName, new Plugin(this, options));
            }
        });

        // Chain jQuery functions
        return this;
    };

})(jQuery, window, document);