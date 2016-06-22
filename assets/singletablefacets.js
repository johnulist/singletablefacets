/**
 * @file
 * Javascript enhancements for SingleTableFacets.
 */
$(document).ready(function() {

  // Checkboxes.
  $('.facet-checkboxes a').not('.facet-processed').each(function(index) {
    // To avoid confusion with "this", a variable referring to the link.
    var link = this;
    // Add the class now so that it is not processed twice.
    $(link).addClass('facet-processed');
    // Unique id and text for checkbox/label.
    var id = 'doj-facet-cb-' + index;
    var labelText = $(link).text();
    // Decide whether the checkbox should be checked.
    var checked = '';
    if ($(link).hasClass('doj-facet-item-active')) {
      checked = ' checked="checked"';
    }
    // Create the DOM elements for the checkbox and label.
    var $checkbox = $('<input type="checkbox" id="' + id + '"' + checked + ' />');
    var $label = $('<label for="' + id + '">' + labelText + '</label>');
    // Insert them before the link.
    $checkbox.insertBefore(link);
    $label.insertBefore(link);
    // Hide the link.
    $(link).hide();
    // Give the checkbox/label click behavior, similar to the link.
    $checkbox.change(function() {
      window.location = $(link).attr('href');
    });
  });

  // Help text collapsing.
  $('.doj-facet-collapse').not('.facet-collapse-processed').each(function(index) {
    // To avoid confusion with "this", a variable referring to the item.
    var collapsible = this;
    // Add the class now so that it is not processed twice.
    $(collapsible).addClass('facet-collapse-processed');

    var trigger = $(collapsible).find('.doj-facet-collapse-trigger');
    var contents = $(collapsible).find('.doj-facet-collapse-inner');

    // Hide the contents.
    $(contents).hide();
    // Add the behavior.
    $(trigger).click(function() {
      $(contents).slideToggle();
      $(this).toggleClass('doj-facet-collapse-active');
    });
  });

  // Facet item collapsing.
  $('.doj-facet-collapse-outer').not('.facet-collapse-processed').each(function(index) {
    // To avoid confusion with "this", a variable referring to the item.
    var collapsible = this;
    // Add the class now so that it is not processed twice.
    $(collapsible).addClass('facet-collapse-processed');

    // First hide all the collapsed items.
    $(collapsible).find('.doj-facet-item-collapsed').hide();

    var labelOn = 'Show more';
    var labelOff = 'Show fewer';
    if ($(collapsible).hasClass('doj-facet-collapse-all')) {
      labelOn = 'Show filters';
      labelOff = 'Hide filters';
    }
    var trigger = $('<div>' + labelOn + '</div>')
      .addClass('doj-facet-collapse-trigger')
      .click(function() {
        $(this).parent().find('.doj-facet-item-collapsed').slideToggle();
        if ($(this).text() == labelOn) {
          $(this).text(labelOff);
        }
        else {
          $(this).text(labelOn);
        }
        $(this).toggleClass('doj-facet-collapse-active');
      });
    $(collapsible).append(trigger);
  });
});
