/*!
 * froala_editor
 * Created By- Ankit Jain
 * Email- ankitjain28may77@gmail.com
 * Github- http://github.com/ankitjain28may
 * Copyright 2018 Ankit Jain
 */

!function(a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof module && module.exports ? module.exports = function(b, c) {
        return void 0 === c && (c = "undefined" != typeof window ? require("jquery") : require("jquery")(b)), a(c)
    } : a(window.jQuery)
}(function(a) {
    a.extend(a.FE.DEFAULTS, {}),
    a.FE.VIDEO_PROVIDERS = [{
        test_regex: /^.*((youtu.be)|(youtube.com))\/((v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))?\??v?=?([^#\&\?]*).*/,
        url_regex: /(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/)?([0-9a-zA-Z_\-]+)(.+)?/g,
        url_text: "//www.youtube.com/embed/$1",
        html: '<div class="embed-container-youtube responsive-video-embed"><iframe width="640" height="360" src="{url}?wmode=opaque" frameborder="0" allowfullscreen></iframe></div>'
    }, {
        test_regex: /^.*(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/,
        url_regex: /(?:https?:\/\/)?(?:www\.)?(?:vimeo\.com)\/(?:channels\/[A-z]+\/|groups\/[A-z]+\/videos\/)?(.+)/g,
        url_text: "//player.vimeo.com/video/$1",
        html: '<div class="embed-container-vimeo responsive-video-embed"><iframe width="640" height="360" src="{url}" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowfullscreen></iframe></div>'
    }, {
        test_regex: /^.+(dailymotion.com|dai.ly)\/(video|hub)?\/?([^_]+)[^#]*(#video=([^_&]+))?/,
        url_regex: /(?:https?:\/\/)?(?:www\.)?(?:dailymotion\.com|dai\.ly)\/(?:video|hub)?\/?([a-z0-9]+).*/g,
        url_text: "//www.dailymotion.com/embed/video/$1",
        html: '<div class="embed-container-dailymotion responsive-video-embed"><iframe width="640" height="360" src="{url}" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowfullscreen></iframe></div>'
    }, {
        test_regex: /^.+(screen.yahoo.com)\/[^_&]+/,
        url_regex: "",
        url_text: "",
        html: '<iframe width="640" height="360" src="{url}?format=embed" frameborder="0" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" allowtransparency="true"></iframe>'
    }, {
        test_regex: /^.*instagram\.com\/p?\/([a-zA-Z0-9]+).*/,
        url_regex: /(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:instagram\.com)\/(?:p\/)?([0-9a-zA-Z_\-]+)(.+)?/g,
        url_text: "//www.instagram.com/p/$1/embed/",
        html: '<div class="embed-container-instagram responsive-video-embed"><iframe width="650" height="650" src="{url}" frameborder="0" scrolling="no" allowtransparency="true"></iframe></div>'
    }, {
        test_regex: /^.*((fb)|(facebook)\.com)\/([\w\.]+)\/videos\/(?:vb\.\d+\/)?(\d+).*/,
        url_regex: /(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:fb|facebook\.com)\/(?:([\w\.]+)\/videos\/)+(?:vb\.\d+\/)?(\d+).*/g,
        url_text: "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2F$1%2Fvideos%2F$2%2F&show_text=0&width=560",
        html: '<div class="embed-facebook-video-responsive responsive-video-embed"><iframe src="{url}" width="560" height="315" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allowFullScreen="true"></iframe></div>'
    }, {
        test_regex: /^.*giphy\.com\/gifs\/(?:\w*-)*([0-9a-zA-Z_\-]+).*/,
        url_regex: /(?:https?:\/\/)?(?:www\.)?(?:giphy\.com)\/gifs\/(?:\w*-)*([0-9a-zA-Z_\-]+).*/g,
        url_text: "//giphy.com/embed/$1?html5=true&playOnHover=true&hideSocial=true",
        html: '<iframe src="{url}" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>'
    }, {
        test_regex: /^.*(?:vine.co)\/(?:v)\/+(\w+).*/,
        url_regex: /(?:https?:\/\/)?(?:www\.)?(?:vine.co)\/(?:v)\/+(\w+).*/g,
        url_text: "https://vine.co/v/$1/embed/simple",
        html: '<iframe class="vine-embed" src="{url}" width="600" height="600" frameborder="0"></iframe>'
    }, {
        test_regex: /^.*(soundcloud.com)\/([^\s\/]+)\/([^\s\/]+).*/,
        url_regex: /(?:https?:\/\/)?(?:www\.)?((?:soundcloud\.com)\/([^\s\/]+)\/([^\s\/]+)).*/g,
        url_text: "https%3A//$1",
        html: '<iframe width="100%" height="150" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url={url}&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true"></iframe>'
    }, {
        test_regex: /^.+(rutube.ru)\/[^_&]+/,
        url_regex: /(?:https?:\/\/)?(?:www\.)?(?:rutube\.ru)\/(?:video)?\/?(.+)/g,
        url_text: "//rutube.ru/play/embed/$1",
        html: '<iframe width="640" height="360" src="{url}" frameborder="0" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" allowtransparency="true"></iframe>'
    }],
    a.FE.URLRegEx = "(\\s|^|>)(((http|https|ftp|ftps)\\:\\/\\/)?[a-zA-Z0-9\\-\\.]+(\\.[a-zA-Z]{2,3})(:\\d*)?(\\/[^\\s<]*)?)(\\s|$|<)", a.FE.PLUGINS.url = function(b) {
        function c(a) {
            for (; a.parentNode;)
                if (a = a.parentNode, ["A", "BUTTON", "TEXTAREA"].indexOf(a.tagName) >= 0) return !0;
            return !1
        }

        function d() {
            for (var d, e = b.doc.createTreeWalker(b.el, NodeFilter.SHOW_TEXT, b.node.filter(function(b) {

                    return new RegExp(a.FE.URLRegEx, "gi").test(b.textContent.replace(/&nbsp;/gi, " ")) && !c(b)
                }), !1), f = []; e.nextNode();) d = e.currentNode, f.push(d);
            for (var g = 0; g < f.length; g++) {
                d = f[g];
                var h = null;
                a(d).before(d.textContent.replace(new RegExp(a.FE.URLRegEx, "gi"),isVideo(d.textContent))), d.parentNode.removeChild(d)
            }
        }
        function isVideo(i) {
            for (var s = 0; s < a.FE.VIDEO_PROVIDERS.length; s++) {
                var n = a.FE.VIDEO_PROVIDERS[s];
                if (n.test_regex.test(i)) {
                    r = i.replace(n.url_regex, n.url_text), r = n.html.replace(/\{url\}/, r);
                    r = '<span class="fr-video fr-dvb fr-draggable" draggable="true" contenteditable="false">' + r + '</span>';
                    return r;
                }
            }
            return '<a href="'+i+'" target="_blank">' + i + '</a>';
        }
        function e() {
            b.events.on("paste.afterCleanup", function(c) {
                if (new RegExp(a.FE.URLRegEx, "gi").test(c))
                    var i = isVideo(c);
                    return c.replace(new RegExp(a.FE.URLRegEx, "gi"), i);
            }), b.events.on("keyup", function(c) {
                var e = c.which;
                e != a.FE.KEYCODE.ENTER && e != a.FE.KEYCODE.SPACE || d(b.node.contents(b.el))
                console.log(e);
            }, !0), b.events.on("keydown", function(c) {
                var d = c.which;
                console.log("keydown");
                if (d == a.FE.KEYCODE.ENTER) {
                    var e = b.selection.element();
                    if (("A" == e.tagName || a(e).parents("a").length) && b.selection.info(e).atEnd) return c.stopImmediatePropagation(), "A" !== e.tagName && (e = a(e).parents("a")[0]), a(e).after("&nbsp;" + a.FE.MARKERS), b.selection.restore(), !1
                }
            })
        }
        return {
            _init: e
        }
    }
});