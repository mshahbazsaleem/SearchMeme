(function ($) {
    $.fn.extend({
        searchMeme: function (options) {

            var settings = $.extend({ animationSpeed: 500, defaultText: 'Search...', button: 'orange', buttonPlacement: 'left', onSearch: null, searchComplete: false }, options);

            return this.each(function () {
                var searchBox;
                var searchButton;
                var searchButtonIcon;

                if (settings.searchComplete) {
                    searchButtonIcon = $('.searchMeme-button-inner');
                    onSearchComplete();
                    return false;
                }

                //prepare markup
                var wrapper = $('<div class="wrapper-' + settings.button + '"><div class="searchMeme-button-' + settings.buttonPlacement + ' ' + settings.button + '-normal  searchMeme-round-' + settings.buttonPlacement + '"> ' +
                                '<div class="searchMeme-button-icon searchMeme-button-inner"></div></div> <div class="searchMeme-input-' + settings.buttonPlacement + '"></div></div>');
                $(this).before(wrapper);

                $('.searchMeme-input-' + settings.buttonPlacement + '', wrapper).append($(this));


                searchBox = $('.searchMeme-input-' + settings.buttonPlacement + ' input', wrapper);
                searchButton = $('.searchMeme-button-' + settings.buttonPlacement + '', wrapper);
                searchButtonIcon = $('.searchMeme-button-inner', searchButton);

                var w = 0; //width
                var p = 0; //padding
                var m = 0; //margin
                var waterMark = settings.defaultText;

                w = searchBox.width();
                p = searchBox.css('padding-left');
                m = parseInt(w) + (parseInt(p) * 2);
                if (settings.buttonPlacement == 'left')
                    searchBox.css({ 'width': 0, paddingLeft: 0, paddingRight: 0 }).animate({ width: 0, paddingLeft: 0, paddingRight: 0 }, settings.animationSpeed);
                else
                    searchBox.css({ 'margin-left': m, paddingLeft: 0, paddingRight: 0 }).animate({ marginLeft: m, paddingLeft: 0, paddingRight: 0 }, settings.animationSpeed);

                searchBox.val(waterMark).addClass('searchMeme-water-mark');

                searchButton.hover(function () {
                    $(this).addClass('' + settings.button + '-hover');
                    $(this).removeClass('' + settings.button + '-normal');


                }, function () {
                    $(this).addClass('' + settings.button + '-normal');
                    $(this).removeClass('' + settings.button + '-hover');

                });

                searchButton.mouseenter(function () {
                    if (settings.buttonPlacement == 'left')
                        searchBox.addClass('searchMeme-water-mark').animate({ width: w, paddingLeft: p, paddingRight: p }, settings.animationSpeed);
                    else
                        searchBox.addClass('searchMeme-water-mark').animate({ marginLeft: 0, paddingLeft: p, paddingRight: p }, settings.animationSpeed);
                }).click(function () { triggerSearch(); return false; });

                searchBox.keydown(function (e) {
                    if (e.which == 13) {
                        triggerSearch();
                    }
                }).click(function () { searchBox.removeClass('searchMeme-water-mark').val(''); return false; }).blur(function () {
                    if ($(this).val() == '')
                        $(this).addClass('searchMeme-water-mark');
                });
                $(document).click(function (e) {
                    if (settings.buttonPlacement == 'left') {
                        searchBox.removeClass('searchMeme-water-mark').animate({ width: 0, paddingLeft: 0, paddingRight: 0 }, settings.animationSpeed, function () {
                            searchBox.val(waterMark).addClass('searchMeme-water-mark');
                        });
                    }
                    else {
                        searchBox.animate({ marginLeft: m, paddingLeft: 0, paddingRight: 0 }, settings.animationSpeed, function () {
                            searchBox.val(waterMark).addClass('searchMeme-water-mark');
                        });
                    }
                });

                function triggerSearch() {
                    if (searchBox.val() != '' && searchBox.val() != waterMark) {
                        searchButtonIcon.removeClass('searchMeme-button-icon');
                        searchButtonIcon.addClass('searchMeme-button-searching');
                        if (settings.onSearch != null)
                            settings.onSearch(searchBox.val());
                    }
                }
                function onSearchComplete() {
                    searchButtonIcon.removeClass('searchMeme-button-searching');
                    searchButtonIcon.addClass('searchMeme-button-icon');
                }

            });
        }
    });
})(jQuery);