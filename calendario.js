const fecha = "05-04-2023";
const partesFecha = fecha.split("-"); // Divide la fecha en un array ["05", "04", "2023"]
let fechaNueva =
  partesFecha[2] +
  "-" +
  partesFecha[1].padStart(2, "0") +
  "-" +
  partesFecha[0].padStart(2, "0");

let fechaTexto = fechaNueva + " " + "08:00";
//console.log(fechaTexto)
// Lista de eventos
let eventos;
let eventosStorage = localStorage.getItem("eventos");

eventosDefault = [
  {
    title: "Evento 1",
    start: fechaTexto,
    end: "2023-04-05T05:00:00",
    startStr: "2023-04-12",
    endStr: "2023-04-12",
    hour: "2-digit",
    minute: "2-digit",
    classNames: "evento",
    displayEventTime: true,
    display: "block",
    overlap: true,
    editable: true,
    startEditable: true,
    eventResizableFromStart: true,
    eventDurationEditable: true,
    durationEditable: true,
    resourceEditable: true,
    backgroundColor: "red",
    borderColor: "blue",
    textColor: "white",
    extendedProps: {
      department: "BioChemistry",
    },
    description: "Lecture",
    id: 1,
    fechaCreacion: "",
  },
  {
    title: "Evento 2",
    start: "2023-04-13",
    end: "2023-04-13",
    classNames: "evento",
    display: "block",
    overlap: true,
    id: 2,
    fechaCreacion: "",
    daysOfWeek: [2, 4],
    startTime: "08:00",
    endTime: "10:00",
    startRecur: new Date(2023, 03, 01),
    endRecur: new Date(2023, 03, 30),
  },
  {
    title: "Evento 3",
    start: "2023-04-25T09:00:00",
    end: "2023-04-30T10:30:00",
    classNames: "evento",
    display: "block",
    overlap: true,
    id: 3,
    fechaCreacion: "",
    eventInteractive: true,
  },
];

if (eventosStorage === null || eventosStorage === undefined) {
  eventos = eventosDefault;
} else {
  eventos = JSON.parse(eventosStorage);
}

// Inicializar FullCalendar
document.addEventListener("DOMContentLoaded", function () {
  var calendar = FullCalendar.Calendar;
  var Draggable = FullCalendar.Draggable;

  var calendarEl = document.getElementById("calendar");
  var containerEl = document.getElementById("external-events");

  new Draggable(containerEl, {
    itemSelector: ".fc-event",
    eventData: function (eventEl) {
      return {
        title: eventEl.innerText,
      };
    },
  });

  calendar = new FullCalendar.Calendar(calendarEl, {
    locale: "es",
    firstDay: 1, //Dia que empieza la semana Sunday=0(defecto), Monday=1, Tuesday=2, etc.
    initialView: "multiMonthYear", //multiMonthYear=año dayGridMonth=mes timeGridWeek=semana timeGridDay=dia listWeek=agenda
    initialDate: new Date(),
    droppable: true, // this allows things to be dropped onto the calendar
    titleFormat: { year: "numeric", month: "long", day: "numeric" },
    titleRangeSeparator: " al ",
    themeSystem: "bootstrap5",
    height: 650,
    dayMaxEventRows: 3, //maximo de eventos que se muestran antes de sacar el boton de ver mas
    contentHeight: 600,
    nowIndicator: true, //marca con la hora actual en la vista de dia y semana
    dragScroll: true,
    selectMirror: true, //resalta el lugar donde quedara al soltar algo que arrastras
    weekNumbers: false, //numeros de semana
    //weekText: "Semana", //nombre de numeros de semana
    expandRows: true,
    stickyHeaderDates: true,
    datesAboveResources: true,
    fixedWeekCount: false, //botonera encabezado sticky
    stickyFooterScrollbar: true, //botonera footer sticky
    showNonCurrentDates: false, //Para que los dias de otros meses salgan sin numero
    eventMaxStack: 2, //Maximo de stack de eventos el mismo dia antes de sacar el popover
    slotDuration: "00:10:00", //Cambia la hora de 10 min en 10 min
    //dayHeaderFormat: { weekday: 'long' }, //Nombre del dia en encabezados
    multiMonthMaxColumns: 3, // En la vista del año entero cuantas columnas se deben mostrar
    views: {
      multiMonthYear: {
        type: "multiMonthYear",
        //duration: { days: 4 }
        multiMonthMinWidth: 350,
      },
      dayGridMonth: {
        type: "dayGridMonth",
        //duration: { days: 4 }
        dayHeaderFormat: { weekday: "long" },
      },
    },
    headerToolbar: {
      left: "prev,next today guardar",
      center: "title",
      right: "multiMonthYear,dayGridMonth,timeGridWeek,timeGridDay listWeek",
    },
    buttonText: {
      prev: "Anterior",
      next: "Siguiente",
      today: "Hoy",
      year: "Año",
      month: "Mes",
      week: "Semana",
      day: "Dia",
      list: "Agenda",
    },

    footerToolbar: {
      left: "prev,next today guardar añadirEvento",
      center: "",
      right: "prevYear nextYear",
    },
    buttonText: {
      prev: "Anterior",
      next: "Siguiente",
      today: "Hoy",
      year: "Año",
      month: "Mes",
      week: "Semana",
      day: "Dia",
      list: "Agenda",
    },
    customButtons: {
      guardar: {
        text: "Guardar",
        hint: "Boton para guardar el calendario",
        click: function () {
          //alert("clicked the custom button!");
          console.log(calendar.getEvents());
          localStorage.setItem("eventos", JSON.stringify(calendar.getEvents()));
        },
      },
      añadirEvento: {
        text: "Añadir evento",
        hint: "Boton para Añadir evento al calendario",
        click: function () {
          calendar.addEvent({
            title: "Evento 4",
            start: "2023-04-01T09:00:00",
            end: "2023-04-01T10:30:00",
            classNames: "evento",
            display: "block",
            overlap: true,
          });
        },
      },
    },
    //Funcion cuando seleccionas un dia o rango de dias
    /* select: function(info) {
      console.log('Seleccionado desde ' + info.startStr + ' hasta ' + info.endStr)
    }, */
    select: function (fechaSeleccionada) {
      console.log(new Date(fechaSeleccionada.startStr));
      let fechaSeleccionadaFin = new Date(fechaSeleccionada.endStr);
      fechaSeleccionadaFin.setUTCDate(fechaSeleccionadaFin.getUTCDate() - 1);
      $("#ModalEventos").modal("toggle");
      $("#botonGuardar").click(function () {
        let titulo = $("#tituloEvento").val();
        let fechaInicio = new Date(fechaSeleccionada.startStr);
        let fechaFin = new Date(fechaSeleccionadaFin);
        calendar.addEvent({
          title: titulo,
          start: fechaInicio,
          end: fechaFin,
          classNames: "evento",
          display: "block",
          overlap: true,
        });
        $("#ModalEventos").modal("toggle");
        //console.log(titulo)
      });
    },
    //Funcion al hacer click en un evento
    /*eventClick: function (info) {
      if (confirm("¿Quieres eliminar el evento '" + info.event.title + "'?")) {
        info.event.remove();
        //guardarEventos();
      }
    },*/
    //FUNCION PARA CUANDO HACES CLICK EN UNA FECHA
    /* dateClick: function(info) {
      console.log('Clicked on: ' + info.dateStr);
      console.log("date " + info.date)
      console.log('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
      console.log('Current view: ' + info.view.type);
      console.log("allDay " + info.allDay)
      console.log("dayEl " + info.dayEl)
      console.log("jsEvent " + info.jsEvent)
      console.log("view " + info.view)
      console.log(info)
      // change the day's background color just for fun
      //info.dayEl.style.backgroundColor = 'red';
    }, */
    //eventColor: "red",
    /*day: "2-digit",
    year: "numeric",
    month: "long",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12 : false,*/
    /*views: {
      dayGridMonth: { // name of view
        ////titleFormat: { year: 'numeric', month: '2-digit', day: '2-digit' }
        // other view-specific options here
      }
    },*/

    allDayText: "Todo el día",
    moreLinkText: "más",
    noEventsText: "No hay eventos para mostrar",
    buttonHints: {
      prev: "$0 anterior",
      next: "$0 siguiente",
      today: (e) =>
        "Día" === e
          ? "Hoy"
          : ("Semana" === e ? "Esta" : "Este") + " " + e.toLocaleLowerCase(),
    },
    viewHint: (e) =>
      "Vista " +
      ("Semana" === e ? "de la" : "del") +
      " " +
      e.toLocaleLowerCase(),
    weekTextLong: "Semana",
    moreLinkHint: (e) => `Mostrar ${e} eventos más`,
    navLinkHint: "Ir al $0",
    closeHint: "Cerrar",
    timeHint: "La hora",
    eventHint: "Evento",
    events: eventos,
    selectable: true,
    selectHelper: true,

    /* drop: function (info) {
      // is the "remove after drop" checkbox checked?
      if (checkbox.checked) {
        // if so, remove the element from the "Draggable Events" list
        info.draggedEl.parentNode.removeChild(info.draggedEl);
      }
    }, */
    editable: true,
    eventOverlap: true,

    /*select: function (info) {
      var title = prompt("Introduce un título para el evento:");
      if (title) {
        calendar.addEvent({
          title: title,
          start: info.startStr,
          end: info.endStr,
          allDay: info.allDay,
        });
        guardarEventos();
      }
      calendar.unselect();
    },*/
    /* drop: function (info) {
      if (info.draggedEl.classList.contains("fc-event")) {
        var title = info.draggedEl.innerText.trim();
        calendar.addEvent({
          title: title,
          start: info.date,
          allDay: info.allDay,
          backgroundColor: info.draggedEl.style.backgroundColor,
        });
        //guardarEventos();
      }
    }, */
  });
  calendar.render();
  calendar.scrollToTime(new Date()); //haz scroll a la fecha actual
});