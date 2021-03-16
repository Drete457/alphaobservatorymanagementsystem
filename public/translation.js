if (typeof jQuery == 'undefined') {
  document.write(
    '<script type="text/javascript" src="http://free-website-translation.com/scripts/fwtjquery.js"></script>',
  );
} else {
  jQuery.noConflict();
  var FWTclink =
    '<a href="%trans_service%?u=%site%&hl=%user_lang%&ie=UTF8&sl=%user_lang%&tl=%target_lang%" id="ftw_%lang_long%" style="font-size:10px;font-family:verdana;color:#000;text-decoration: none;background:url(http://free-website-translation.com/img/flags/%target_lang%.png) no-repeat top left;padding:0 0 0 18px;margin:0 0 2px 0;line-height:16px;display:block;" onmouseover="this.style.textDecoration=\'underline\';" onmouseout="this.style.textDecoration=\'none\';">%lang_long%</a>';
  var ccode =
    '<div id="ftwtranslationWindow" style="-moz-border-radius:2px;-webkit-border-radius:2px;border:2px solid #e7e7e7;position:absolute;display:none;z-index:99999;"><div id="ftwtranslationContent" style="border:1px solid #d0d0d0;"><div id="ftwselector" style="background:#f3f5ec;padding:1px 3px;font-size:10px;font-family:verdana;color:#000;">Select a target language:</div><div id="ftwlanguages" style="width:220px;background:#fff;padding: 1px 3px;font-size:10px;font-family:verdana;color:#000;"><div class="ftwrow1" style="width: 110px;float:left;padding:5px 0 3px 0;">%row1%</div><div class="ftwrow2" style="width: 110px;float:left;padding:5px 0;">%row2%</div><a id="fwtmore" href="#" style="display:block;clear:both;font-size:10px;font-family:verdana;color:#000;">- more</a><div style="clear:both;line-height:1px;"> </div></div></div></div>';
  var FWTrows = [];
  var sourceSite = document.location;
  var sourceLang = jQuery('#ftwtranslation_button').attr('hreflang');
  jQuery(document).ready(function () {
    var trans_service = 'http://translate.google.com/translate';
    var ftw_site = 'http://free-website-translation.com/';
    langArrayRow1 = {
      en: 'English',
      de: 'German',
      es: 'Spanish',
      fr: 'French',
    };
    langArrayRow2 = {
      pt: 'Portuguese',
      ja: 'Japanese',
      it: 'Italian',
      ru: 'Russian',
    };
    extArrayRow1 = {
      ar: 'Arabic',
      cs: 'Czech',
      nl: 'Dutch',
      el: 'Greek',
      hi: 'Hindi',
      pl: 'Polish',
      ro: 'Romanian',
      sk: 'Slovak',
      sv: 'Swedish',
    };
    extArrayRow2 = {
      hr: 'Croatian',
      da: 'Danish',
      fi: 'Finnish',
      iw: 'Hebrew',
      hu: 'Hungarian',
      lv: 'Latvian',
      sr: 'Serbian',
      sl: 'Slovenian',
      uk: 'Ukrainian',
    };
    FWTclink = str_replace(FWTclink, '%user_lang%', sourceLang);
    FWTclink = str_replace(FWTclink, '%trans_service%', trans_service);
    ccode = str_replace(ccode, '%ftw_site%', ftw_site);
    ccode = FWTparseArrays(langArrayRow1, '%row1%', ccode);
    ccode = FWTparseArrays(langArrayRow2, '%row2%', ccode);
    jQuery('#ftwtranslation_button').after(ccode);
    var target = jQuery('#ftwtranslationWindow');
    var targetHover = false;
    var buttonHover = false;
    jQuery(target).hover(
      function () {
        targetHover = true;
      },
      function () {
        targetHover = false;
        setTimeout(function () {
          if (!targetHover) {
            jQuery(target).hide();
          }
        }, 1500);
      },
    );
    jQuery('#ftwtranslation_button').hover(
      function () {
        buttonHover = true;
        var posi = jQuery(this).position();
        var height = jQuery(this).height();
        jQuery(target)
          .css({ left: posi.left, top: posi.top + height })
          .show();
        if (!isScrolledIntoView(target)) {
          var targetHeight = jQuery(target).height();
          jQuery(target)
            .css({ left: posi.left, top: posi.top - targetHeight })
            .show();
        }
      },
      function () {
        buttonHover = false;
        setTimeout(function () {
          if (!targetHover && !buttonHover) {
            jQuery(target).hide();
          }
        }, 1500);
      },
    );
    var fwtmore = false;
    var morecode =
      '<div id="fwtextrow" style="display:none;"><div class="ftwextrow1" style="width: 110px;float:left;padding:5px 0 3px 0;">%extrow1%</div><div class="ftwextrow2" style="width: 110px;float:left;padding:5px 0 3px 0;">%extrow2%</div></div>';
    jQuery('#fwtmore').click(function () {
      if (!fwtmore) {
        fwtmore = FWTparseArrays(extArrayRow1, '%extrow1%', morecode);
        fwtmore = FWTparseArrays(extArrayRow2, '%extrow2%', fwtmore);
        jQuery(this).after(fwtmore);
      }
      jQuery('#fwtextrow')
        .css({ display: 'toggle' })
        .animate({ height: 'toggle' }, 'normal');
      if (jQuery(this).text() == '- more') jQuery(this).text('- less');
      else jQuery(this).text('- more');
      return false;
    });
    jQuery('#ftwrow1 a, #ftwrow2 a').hover(
      function () {
        jQuery(this).css({ background: '#f3f5ec' });
      },
      function () {
        jQuery(this).css({ background: 'none' });
      },
    );
  });
  function isScrolledIntoView(elem) {
    var docViewTop = jQuery(window).scrollTop();
    var docViewBottom = docViewTop + jQuery(window).height();
    var elemTop = jQuery(elem).offset().top;
    var elemBottom = elemTop + jQuery(elem).height();
    return (
      elemBottom >= docViewTop &&
      elemTop <= docViewBottom &&
      elemBottom <= docViewBottom &&
      elemTop >= docViewTop
    );
  }
  function str_replace(haystack, needle, replacement) {
    var temp = haystack.split(needle);
    return temp.join(replacement);
  }
  function FWTparseArrays(FWTpArray, FWTreplacer, toReplace) {
    FWTrows[FWTreplacer] = '';
    jQuery.each(FWTpArray, function (FWTlang, FWTlangLong) {
      if (FWTlang != sourceLang) {
        FWTrowHolder = FWTclink;
        FWTrowHolder = str_replace(FWTrowHolder, '%site%', sourceSite);
        FWTrowHolder = str_replace(FWTrowHolder, '%target_lang%', FWTlang);
        FWTrowHolder = str_replace(FWTrowHolder, '%lang_long%', FWTlangLong);
        FWTrows[FWTreplacer] += FWTrowHolder;
      } else {
        FWTrowHolder = FWTclink;
        FWTrowHolder = str_replace(FWTrowHolder, '%site%', sourceSite);
        FWTrowHolder = str_replace(FWTrowHolder, '%target_lang%', 'tr');
        FWTrowHolder = str_replace(FWTrowHolder, '%lang_long%', 'Turkish');
        FWTrows[FWTreplacer] += FWTrowHolder;
      }
    });
    return str_replace(toReplace, FWTreplacer, FWTrows[FWTreplacer]);
  }
}
var lang = document.referrer;

document.write(
  '<script type="text/javascript" src="http://free-website-translation.com/scripts/transserver.js?lang=' +
    lang +
    '"></script>',
);
