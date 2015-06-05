/* Author: Andrew Lucieer
   Version: 1.0
   Date: June 4, 2015

*/

  (function( $ ) {
	//This function is called after clicking on a filtered dropdown.  A filtered dropdown
	// is one which cannot share values with any other filtered dropdown, making choices unique.
	$.fn.prepareFilteredDropdown = function(availableDropdown, selectedDropdown) {
		var sourceDropdown = $(this);
		
		var className = $(this).attr('class');
		$('.' + className).each(function() {
			$(this).attr('oldVal', $(this).val());
		});

		// Restore missing options from selectedDropdown
		$(availableDropdown).find('option').each(function() {
			var hasOption = $(sourceDropdown).find('option[value=' + this.value + ']').length;
			if (!hasOption) $(sourceDropdown).append($(this).clone().removeAttr('selected'));
		});

		// Filter out already selected options:
		$(selectedDropdown).find('option').each(function() {
			var duplicate = $(sourceDropdown).find('option:not(:selected)[value=' + this.value + ']');
			if ($(duplicate).val() != null) $(duplicate).remove();
		});
	}

	//This function is called after changing a filtered dropdown.  A filtered dropdown
	// is one which cannot share values with any other filtered dropdown, making choices unique.
	$.fn.changeFilteredDropdown = function(availableDropdown, selectedDropdown) {
		var oldVal = $(this).attr('oldVal');
		var newVal = $(this).val();
		var newOption = $(availableDropdown).find('option[value=' + newVal + ']');
		var oldOption = $(selectedDropdown).find('option[value=' + oldVal + ']');
		$(availableDropdown).append(oldOption);
		$(selectedDropdown).append(newOption);
		$(this).find('option[value=-1]:not(:selected)').remove();
	}
	}
  })( jQuery );
