window.onload = function () {
  const pickr = Pickr.create({
    el: '.color-picker',
    theme: 'monolith',
    showAlways: true,
    useAsButton: true,

    swatches: [
      '#f23d3d',
      '#ffbaa1',
      '#fff2ab',
      '#cbf1c4',
      '#ffcce5',
      '#e7cfff',
      '#cde9ff',
      '#f9f9f9'
    ],

    default: '#fff2ab',

    components: {
      preview: true,
      opacity: true,
      hue: true,

      interaction: {
        rgba: true,
        hex: true,
        input: true,
        clear: true,
        save: true
      }
    },

    strings: {
      save: '適用',
      clear: 'キャンセル'
    }
  });

  pickr.on('init', function (e) {
    var current = onValueFromBackground();
    if (current == null || !current) {
      return;
    }
    console.log(current);
    pickr.setColor(current);
  }).on('save', function (color, e) {
    sendToContents(color.toHEXA().toString());
  }).on('clear', function (e) {
  });
};

/**
 * backgroundから受け取ったValue戻り値として返す。
 */
var onValueFromBackground = function () {
  if(!chrome.extension.getBackgroundPage()){
    return null;
  }
  return chrome.extension.getBackgroundPage().toPopupValue;
};

var sendToContents = function (color) {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id,
      color,
      function (response) {});
  });
};