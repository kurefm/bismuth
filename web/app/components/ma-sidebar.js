import Ember from 'ember';

export default Ember.Component.extend({
  elementId: 'sidebar',
  tagName: 'aside',
  classNames: ['sidebar', 'c-overflow'],

  didInsertElement() {
    this._super(...arguments);

    $('body').addClass('sw-toggled');

    /* --------------------------------------------------------
        Scrollbar
    -----------------------------------------------------------*/
    function scrollBar(selector, theme, mousewheelaxis) {
      $(selector).mCustomScrollbar({
        theme: theme,
        scrollInertia: 100,
        axis: 'yx',
        mouseWheel: {
          enable: true,
          axis: mousewheelaxis,
          preventDefault: true
        }
      });
    }

    if (!$('html').hasClass('ismobile')) {
      //On Custom Class
      if ($('.c-overflow')[0]) {
        scrollBar('.c-overflow', 'minimal-dark', 'y');
      }
    }

    //Submenu
    $('body').on('click', '.sub-menu > a', function (e) {
      e.preventDefault();
      $(this).next().slideToggle(200);
      $(this).parent().toggleClass('toggled');
    });
  }
});
