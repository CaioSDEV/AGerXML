import '../css/app.css';

const pdfButton = document.getElementById('pdf');
const searchName = document.querySelector('#searchName');
const searchCnpj = document.querySelector('#searchCnpj');
const searchSystem = document.querySelector('#searchSystem');

function mask() {
  $('textarea')
    .each(function () {
      this.parentElement.style.height = 'auto'; // Set next element height to auto
      this.style.height = this.scrollHeight + 'px'; // Set height of textarea to current content height
    })
    .on('input', function () {
      this.style.height = 'auto'; // Set height of textarea to auto to allow it to expand and collapse
      this.style.height = this.scrollHeight + 'px'; // Set height of textarea to current content height
    });

  var PhoneMaskBehavior = function (val) {
    return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
  };
  var phoneOptions = {
    onKeyPress: function (val, e, field, options) {
      field.mask(PhoneMaskBehavior.apply({}, arguments), options);
    },
    placeholder: '(00) 00000-0000',
    selectOnFocus: true,
  };

  $('.dynamicPhone').mask(PhoneMaskBehavior, phoneOptions);

  $('.tel').mask('(00) 0000-0000', {
    clearIfNotMatch: true,
    placeholder: '(00) 0000-0000',
    selectOnFocus: true,
  });

  $('.cel').mask('(00) 00000-0000', {
    clearIfNotMatch: true,
    placeholder: '(00) 00000-0000',
    selectOnFocus: true,
  });

  $('.nf').mask('#.##Z,ZZ', {
    translation: {
      Z: {
        pattern: /[0-9]/,
        optional: true,
      },
    },
    reverse: true,
    placeholder: '0,00',
  });

  $('.cep').mask('00.000-000', {
    reverse: true,
    clearIfNotMatch: true,
    placeholder: '00.000-000',
  });

  $('.cnpj').mask('00.000.000/0000-00', {
    reverse: true,
    clearIfNotMatch: true,
    placeholder: '00.000.000/0001-00',
  });

  $('.dateTimeSearch').mask('00/00/0000 00:00:00', {
    reverse: false,
    clearIfNotMatch: true,
    selectOnFocus: true,
    placeholder: 'Pesquisar data',
  });

  $('.cnpjSearch').mask('00.000.000/0000-00', {
    reverse: false,
    selectOnFocus: true,
    placeholder: 'Pesquisar CNPJ',
  });
}

$(document).ready(mask());

if (searchName) {
  searchName.addEventListener('input', function searchName(e) {
    // Declare variables
    var input;
    var filter;
    var table;
    var tr;
    var td;
    var i;
    var txtValue;
    input = e.target;
    filter = input.value.toUpperCase();
    table = document.getElementById('myTable');
    tr = table.getElementsByTagName('tr');
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName('td')[1];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = '';
        } else {
          tr[i].style.display = 'none';
        }
      }
    }
  });
}

if (searchCnpj) {
  searchCnpj.addEventListener('input', function searchCnpj(e) {
    // Declare variables
    var input;
    var filter;
    var table;
    var tr;
    var td;
    var i;
    var txtValue;
    input = e.target;
    filter = input.value.toUpperCase();
    table = document.getElementById('myTable');
    tr = table.getElementsByTagName('tr');
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName('td')[2];
      if (td) {
        txtValue =
          td.textContent.replaceAll('\n', '').replaceAll('\t', '') ||
          td.innerText.replaceAll('\n', '').replaceAll('\t', '');
        // if (txtValue.toUpperCase().indexOf(filter) > -1) { // Any index of filter in txtValue
        if (txtValue.toUpperCase().startsWith(filter)) {
          tr[i].style.display = '';
        } else {
          tr[i].style.display = 'none';
        }
      }
    }
  });
}

if (searchSystem) {
  searchSystem.addEventListener('input', function searchSystem(e) {
    // Declare variables
    var input;
    var filter;
    var table;
    var tr;
    var td;
    var i;
    var txtValue;
    input = e.target;
    filter = input.value.toUpperCase();
    table = document.getElementById('myTable');
    tr = table.getElementsByTagName('tr');
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName('td')[4];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = '';
        } else {
          tr[i].style.display = 'none';
        }
      }
    }
  });
}

function fnExcelReport() {
  var tabText = "<html xmlns:x='urn:schemas-microsoft-com:office:excel'>";
  tabText += '<head><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>';
  tabText += '<x:Name>Clientes XML Zipper</x:Name>';
  tabText += '<x:WorksheetOptions><x:Panes></x:Panes></x:WorksheetOptions></x:ExcelWorksheet>';
  tabText += '</x:ExcelWorksheets></x:ExcelWorkbook></xml></head><body>';
  tabText += "<table border='1px'>";
  tabText += $('#myTableHidden').html();
  tabText += '</table></body></html>';
  var dataType = 'data:application/vnd.ms-excel';
  var ua = window.navigator.userAgent;
  var msie = ua.indexOf('MSIE ');

  if (
    msie > 0 ||
    !!navigator.userAgent.match(
      /Trident.*rv\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\:11\./
    )
  ) {
    if (window.navigator.msSaveBlob) {
      var blob = new Blob([tabText], {
        type: 'application/csv;charset=utf-8;',
      });
      navigator.msSaveBlob(
        blob,
        `Relatorio-${new Date(Date.now()).toLocaleDateString('pt-BR')}.xls`
      );
    }
  } else {
    $('#pdf').attr('href', dataType + ', ' + encodeURIComponent(tabText));
    $('#pdf').attr('download', `Relatorio-${new Date(Date.now()).toLocaleDateString('pt-BR')}.xls`);
  }
}

if (pdfButton) {
  pdfButton.addEventListener('click', fnExcelReport);
}
