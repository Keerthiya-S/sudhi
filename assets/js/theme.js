(function($) {
    "use strict";
    var $body = $("body"),
        $window = $(window),
        $document = $(document);
    var WT = {
        init: function() {
            this.loadPage();
            this.headerSticky();
            this.navActive();
            this.btnToggler();
            this.dataBgImg();
            this.imgResize();
            this.backTop();
        },
        loadPage: function() {
            $body.addClass("is-loading");
            setTimeout(function() {
                $body.removeClass("is-loading");
                $body.addClass("is-loaded");
            }, 500);
        },
        headerSticky: function() {
            var $headerHeight = $(header).outerHeight();
            function updatePaddingTop() {
                $(".main-banner").css({
                    "padding-top": $headerHeight
                });
            }
            updatePaddingTop();
            $window.scroll(function() {
                var $header = $("#header"),
                    $sticky = $window.scrollTop();
                if($sticky >= 100) {
                    $header.addClass("ptb-xl-20 stickyheader body-bg smoothScroll beb");
                    $header.removeClass("ptb-xl-30");
                } else {
                    $header.addClass("ptb-xl-30");
                    $header.removeClass("ptb-xl-20 stickyheader body-bg smoothScroll beb");
                }
            });
            window.onscroll = function() {
                updatePaddingTop();
            };
            $(window).on("resize", function() {
                updatePaddingTop();
            });
        },
        navActive: function() {
            var $nav_active = $("#main-menu")
            $nav_active.onePageNav({
                navItems: 'a.menu-link',
                currentClass: 'current',
                changeHash: false,
                easing: 'swing',
                filter: '',
                scrollSpeed: 100,
                scrollThreshold: 0.5,
                begin: false,
                end: false,
                scrollChange: false
            });
        },
        btnToggler: function() {
            var $btn_toggler = $("button.navbar-toggler"),
                $header_top = $(".main-header");
            $btn_toggler.on("click", function() {
                $header_top.toggleClass("active");
            });
        },
        dataBgImg: function() {
            var $dataBgImg = $("[data-bgimg]");
            $dataBgImg.each(function() {
                var url = $(this).data("bgimg");
                $(this).css("background-image","url("+ url +")");
            });
        },
        imgResize: function() {
            $window.bind("load resize", function() {
                $("img").each(function(index) {
                    var $width = $(this).width(),
                        $height = $(this).height();
                    $(this).attr("width", $width);
                    $(this).attr("height", $height);
                });
            });
        },
        backTop: function() {
            var $backTop = $("#top"),
                $htmlBody = $("html, body");
            $window.scroll(function() {
                if($(this).scrollTop() > 600) {
                    $backTop.removeClass("opacity-0 invisible").addClass("opacity-100 visible");
                } else {
                    $backTop.addClass("opacity-0 invisible").removeClass("opacity-100 visible");
                }
            });
            $backTop.on("click", function() {
                $htmlBody.animate({
                    scrollTop: 0
                }, 100);
                return false;
            });
        }
    };
    WT.animateTemplate = {
        aDelay: 50,
        aQueue: [],
        aTimer: null,
        aBody: null,
        init: function() {
            var $at = this;
                $at.aBody = $body;
                $at.aQueue = [];
                $at.aTimer = null;
            if(typeof aDelay !== 'undefined') {
                $at.aDelay = aDelay;
            }
            $at.aQueue["animate__animated_0"] = [];
            $body.find("#main").find(">div, >section").each(function(index) {
                $(this).attr("data-animated-id", (index + 1));
                $at.aQueue["animate__animated_" + (index + 1)] = [];
            });
            setTimeout(function() {
                $at.registerAnimation();
            }, 100);
        },
        registerAnimation: function() {
            var $at = this;
            $("[data-animate]:not(.animate__animated)", $at.aBody).waypoint(function() {
                var $at_el = this.element ? this.element : this,
                    $this = $($at_el);
                if($this.is(":visible")) {
                    var $at_animated_wrap = $this.closest("[data-animated-id]"),
                        $at_animated_id = '0';
                    if($at_animated_wrap.length) {
                        $at_animated_id = $at_animated_wrap.data("animated-id");
                    }
                    $at.aQueue["animate__animated_" + $at_animated_id].push($at_el);
                    $at.processItemQueue();
                } else {
                    $this.addClass($this.data("animate")).addClass("animate__animated");
                }
            }, {
                offset: "90%",
                triggerOnce: true
            });
        },
        processItemQueue: function() {
            var $at = this;
            if($at.aTimer) {
                return;
            }
            $at.aTimer = window.setInterval(function() {
                var $at_queue = false;
                for(var $at_animated_id in $at.aQueue) {
                    if($at.aQueue[$at_animated_id].length) {
                        $at_queue = true;
                        break;
                    }
                }
                if($at_queue) {
                    for(var $at_animated_id in $at.aQueue) {
                        var $at_item = $($at.aQueue[$at_animated_id].shift());
                        $at_item.addClass($at_item.data("animate")).addClass("animate__animated");
                    }
                    $at.processItemQueue();
                } else {
                    window.clearInterval($at.aTimer);
                    $at.aTimer = null
                }
            }, $at.aDelay);
        }
    };
    WT.tabSlider = {
        init: function() {
            this.tab1();
            this.tab2();
            this.tab3();
            this.tab4();
        },
        tab1: function() {
            var swiper = new Swiper('.swiper#tab1-slider', {
                loop: false,
                rewind: true,
                slidesPerView: 4,
                spaceBetween: 30,
                observer: true,
                observeParents: true,
                watchSlidesProgress: true,
                navigation: {
                    prevEl: '.swiper-prev-tab1-slider',
                    nextEl: '.swiper-next-tab1-slider'
                },
                pagination: {
                    el: ".swiper-pagination-tab1-slider",
                    clickable: true
                },
                scrollbar: {
                    el: '.swiper-scrollbar-tab1-slider',
                    draggable: true
                },
                speed: 5000,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                },
                breakpoints: {
                    0: {
                        slidesPerView: 1,
                        spaceBetween: 15
                    },
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 15
                    },
                    360: {
                        slidesPerView: 1,
                        spaceBetween: 15
                    },
                    576: {
                        slidesPerView: 3,
                        spaceBetween: 30
                    },
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 30
                    },
                    992: {
                        slidesPerView: 4,
                        spaceBetween: 30
                    },
                    1200: {
                        slidesPerView: 4,
                        spaceBetween: 30
                    }
                }
            });
        },
        tab2: function() {
            var swiper = new Swiper('.swiper#tab2-slider', {
                loop: false,
                rewind: true,
                slidesPerView: 4,
                spaceBetween: 30,
                observer: true,
                observeParents: true,
                watchSlidesProgress: true,
                navigation: {
                    prevEl: '.swiper-prev-tab2-slider',
                    nextEl: '.swiper-next-tab2-slider'
                },
                pagination: {
                    el: ".swiper-pagination-tab2-slider",
                    clickable: true
                },
                scrollbar: {
                    el: '.swiper-scrollbar-tab2-slider',
                    draggable: true
                },
                speed: 5000,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                },
                breakpoints: {
                    0: {
                        slidesPerView: 1,
                        spaceBetween: 15
                    },
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 15
                    },
                    360: {
                        slidesPerView: 1,
                        spaceBetween: 15
                    },
                    576: {
                        slidesPerView: 3,
                        spaceBetween: 30
                    },
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 30
                    },
                    992: {
                        slidesPerView: 4,
                        spaceBetween: 30
                    },
                    1200: {
                        slidesPerView: 4,
                        spaceBetween: 30
                    }
                }
            });
        },
        tab3: function() {
            var swiper = new Swiper('.swiper#tab3-slider', {
                loop: false,
                rewind: true,
                slidesPerView: 3,
                spaceBetween: 30,
                observer: true,
                observeParents: true,
                watchSlidesProgress: true,
                navigation: {
                    prevEl: '.swiper-prev-tab3-slider',
                    nextEl: '.swiper-next-tab3-slider'
                },
                pagination: {
                    el: ".swiper-pagination-tab3-slider",
                    clickable: true
                },
                scrollbar: {
                    el: '.swiper-scrollbar-tab3-slider',
                    draggable: true
                },
                speed: 5000,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                },
                breakpoints: {
                    0: {
                        slidesPerView: 3,
                        spaceBetween: 15
                    },
                    320: {
                        slidesPerView: 3,
                        spaceBetween: 15
                    },
                    360: {
                        slidesPerView: 3,
                        spaceBetween: 15
                    },
                    576: {
                        slidesPerView: 3,
                        spaceBetween: 30
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 30
                    },
                    992: {
                        slidesPerView: 3,
                        spaceBetween: 30
                    },
                    1200: {
                        slidesPerView: 3,
                        spaceBetween: 30
                    }
                }
            });
        },
        tab4: function() {
            var swiper = new Swiper('.swiper#tab4-slider', {
                loop: false,
                rewind: true,
                slidesPerView: 3,
                spaceBetween: 30,
                observer: true,
                observeParents: true,
                watchSlidesProgress: true,
                navigation: {
                    prevEl: '.swiper-prev-tab4-slider',
                    nextEl: '.swiper-next-tab4-slider'
                },
                pagination: {
                    el: ".swiper-pagination-tab4-slider",
                    clickable: true
                },
                scrollbar: {
                    el: '.swiper-scrollbar-tab4-slider',
                    draggable: true
                },
                speed: 5000,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                },
                breakpoints: {
                    0: {
                        slidesPerView: 3,
                        spaceBetween: 15
                    },
                    320: {
                        slidesPerView: 3,
                        spaceBetween: 15
                    },
                    360: {
                        slidesPerView: 3,
                        spaceBetween: 15
                    },
                    576: {
                        slidesPerView: 3,
                        spaceBetween: 30
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 30
                    },
                    992: {
                        slidesPerView: 3,
                        spaceBetween: 30
                    },
                    1200: {
                        slidesPerView: 3,
                        spaceBetween: 30
                    }
                }
            });
        }
    };
    WT.readySectionSlider = {
        init: function() {
            var swiper = new Swiper('.swiper#ready-section-slider', {
                loop: true,
                freeMode: true,
                slidesPerView: 3,
                grid: {
                    rows: 3,
                    fill: 'row' | 'column',
                },
                spaceBetween: 30,
                navigation: {
                    prevEl: '.swiper-prev-ready-section-slider',
                    nextEl: '.swiper-next-ready-section-slider'
                },
                pagination: {
                    el: ".swiper-pagination-ready-section-slider",
                    clickable: true
                },
                scrollbar: {
                    el: '.swiper-scrollbar-ready-section-slider',
                    draggable: true
                },
                speed: 5000,
                loopAddBlankSlides: true,
                grabCursor: true,
                autoplay: {
                    delay: 0,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                },
                simulateTouch: false,
                breakpoints: {
                    0: {
                        slidesPerView: 1,
                        grid: {
                            rows: 3,
                            fill: 'row' | 'column',
                        },
                        spaceBetween: 15
                    },
                    320: {
                        slidesPerView: 1,
                        grid: {
                            rows: 3,
                            fill: 'row' | 'column',
                        },
                        spaceBetween: 15
                    },
                    360: {
                        slidesPerView: 1,
                        grid: {
                            rows: 3,
                            fill: 'row' | 'column',
                        },
                        spaceBetween: 15
                    },
                    576: {
                        slidesPerView: 1,
                        grid: {
                            rows: 3,
                            fill: 'row' | 'column',
                        },
                        spaceBetween: 30
                    },
                    768: {
                        slidesPerView: 2,
                        grid: {
                            rows: 3,
                            fill: 'row' | 'column',
                        },
                        spaceBetween: 30
                    },
                    992: {
                        slidesPerView: 2,
                        grid: {
                            rows: 3,
                            fill: 'row' | 'column',
                        },
                        spaceBetween: 30
                    },
                    1200: {
                        slidesPerView: 3,
                        grid: {
                            rows: 3,
                            fill: 'row' | 'column',
                        },
                        spaceBetween: 30
                    }
                }
            });
        }
    },
    WT.htmlDemoSlider = {
        init: function() {
            var swiper = new Swiper('.swiper#html-demo-slider', {
                loop: true,
                rewind: true,
                slidesPerView: 5,
                spaceBetween: 30,
                observer: true,
                observeParents: true,
                watchSlidesProgress: true,
                navigation: {
                    prevEl: '.swiper-prev-html-demo',
                    nextEl: '.swiper-next-html-demo'
                },
                pagination: {
                    el: ".swiper-pagination-html-demo",
                    clickable: true
                },
                scrollbar: {
                    el: '.swiper-scrollbar-html-demo',
                    draggable: true
                },
                speed: 5000,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                },
                breakpoints: {
                    0: {
                        slidesPerView: 1,
                        spaceBetween: 15
                    },
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 15
                    },
                    360: {
                        slidesPerView: 1,
                        spaceBetween: 15
                    },
                    576: {
                        slidesPerView: 3,
                        spaceBetween: 30
                    },
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 30
                    },
                    992: {
                        slidesPerView: 5,
                        spaceBetween: 30
                    },
                    1200: {
                        slidesPerView: 5,
                        spaceBetween: 30
                    }
                }
            });
        }
    };
    $document.ready(function() {
        WT.init();
        WT.animateTemplate.init();
        WT.tabSlider.init();
        WT.readySectionSlider.init();
        WT.htmlDemoSlider.init();
    });
})(jQuery);
