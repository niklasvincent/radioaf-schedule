function renderTable() {
	var monday = getMonday(new Date());
	var y = monday.getYear();

	$('#calendar').fullCalendar({
		header: {
			left: '',
			center: '',
			right: ''
		},
		aspectRatio: 1,
		allDaySlot: false,
		firstDay: 1,
		weekends: false,
		minTime: 7,
		maxTime: 24,
		firstHour: 8,
		slotMinutes: 30,
		timeFormat: {
		    agenda: 'HH:mm{ - HH:mm}'
		},
		axisFormat: 'HH:mm',
		defaultView: 'agendaWeek',
		dayNamesShort: ['Sön','Mån','Tis','Ons','Tor','Fre','Lör'],
		dayNames: ['Söndag','Måndag','Tisdag','Onsdag','Torsdag','Fredag','Lördag'],
		columnFormat: {
			week: 'dddd'
		},
		editable: false,
		eventClick: function(event) {
			if (event.url) {
				window.open(event.url);
				return false;
			}
		}
	});
	
	$.getJSON('shows.json', function(shows) {
		$.each(shows, function(name, data) {
			$.each(data.airs, function(index, when) {
				var newShow = {
					title: name,
					start: calculateDate(monday, when.day, when.start),
					end: calculateDate(monday, when.day, when.end),
					allDay: false,
					url: data.url
				};
				$("#calendar").fullCalendar( 'renderEvent', newShow, true);
			});
		});
	});
	
}

function getMonday(d) {
  d = new Date(d);
  var day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
  return new Date(d.setDate(diff));
}

function calculateDate(date, day, time) {
	var t = time.split(':');
	var hours = parseInt(t[0]);
	var minutes = parseInt(t[1]);
    var newDate = new Date();
	newDate.setDate(date.getDate() + (day-1));
	newDate.setHours(hours);
	newDate.setMinutes(minutes);
	newDate.setSeconds(0);
	return newDate;
}