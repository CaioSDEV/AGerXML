import '../css/app.css';

const pdfButton = document.getElementById('pdf');
const searchName = document.querySelector('#searchName');
const searchCnpj = document.querySelector('#searchCnpj');
const searchSystem = document.querySelector('#searchSystem');
const submit = document.querySelector('button[type="submit"]');
const form = document.querySelector('form');

// CLIENTS
const cnpjButton = document.querySelector('.cnpjBtn');
const nameInput = document.querySelector('#name');
const corporateNameInput = document.querySelector('#corporateName');
const cnpjInput = document.getElementsByName('cnpj')[0];
const emailInput = document.querySelector('#clientEmail');
const accountantEmailInput = document.querySelector('#accountantEmail');
const phoneInput = document.querySelector('#phone');
const accountantPhoneInput = document.querySelector('#accountantPhone');
const cellphoneInput = document.querySelector('#cellphone');
const accountantCellphoneInput = document.querySelector('#accountantCellphone');
const satCheckbox = document.querySelector('#sat');
const nfeCheckbox = document.querySelector('#nfe');
const satDirectoryInput = document.querySelector('#satDirectory');
const nfeDirectoryInput = document.querySelector('#nfeDirectory');
const openButtonConfig = document.querySelector('.openButtonConfig');
const configModal = document.querySelector('.configModal');
const caixaInput = document.querySelector('input[name="caixa"]');
const closeButtonConfig = document.querySelector('.closeConfig');
const saveButtonConfig = document.querySelector('.saveConfig');
// CLIENTS

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

  $('#myTable').tablesorter({
    sortList: [
      [0, 0],
      [1, 0],
    ],
  });
}

function unmask() {
  $('.money').unmask();

  $('.tel').unmask();

  $('.cel').unmask();

  $('.n').unmask();

  $('.n3').unmask();

  $('.n5').unmask();

  $('.nf').unmask();

  $('.nf2').unmask();

  $('.nf3').unmask();

  $('.discount').unmask();

  $('.ncm').unmask();

  $('.cest').unmask();

  $('.icms').unmask();

  $('.cst').unmask();

  $('.cep').unmask();

  $('.cnpj').unmask();
}

$(document).ready(mask());

if (form) {
  let formChanged = false;
  let submitClicked = false;
  form.addEventListener('change', () => {
    formChanged = true;
    if (openButtonConfig) {
      openButtonConfig.disabled = true;
      openButtonConfig.innerHTML = 'Salve para habilitar';
    }
  });
  if (submit) {
    submit.addEventListener('click', () => (submitClicked = true));
    window.onbeforeunload = () => {
      if (formChanged && !submitClicked) {
        return 'Você quer mesmo sair da página?';
      }
    };
  }
}

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

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    cnpjInput.value = $(cnpjInput).cleanVal();
    form.submit();
  });
}

// CLIENTS
function saveFile() {
  let satDirectory = satDirectoryInput.value.replace(/\\/g, '/');
  let nfeDirectory = nfeDirectoryInput.value.replace(/\\/g, '/');
  satDirectory = satDirectory.endsWith('/') ? satDirectory : satDirectory + '/';
  nfeDirectory = nfeDirectory.endsWith('/') ? nfeDirectory : nfeDirectory + '/';

  let data = `module.exports = {
    SAT: ${satCheckbox.checked},
    NFe: ${nfeCheckbox.checked},
    caixa:"${caixaInput.value}",
    dirSAT: "${satDirectory}",
    dirNFe: "${nfeDirectory}",
    nomecli: "${nameInput.value}",
    CNPJ: "${$(cnpjInput).cleanVal()}",
    emailcont: "${accountantEmailInput.value}"
  }`;

  const textToBLOB = new Blob([data], { type: 'text/plain' });
  const sFileName = 'config.js'; // The file to save the data.
  let newLink = document.createElement('a');

  newLink.download = sFileName;

  if (window.webkitURL !== null) {
    newLink.href = window.webkitURL.createObjectURL(textToBLOB);
  } else {
    newLink.href = window.URL.createObjectURL(textToBLOB);
    newLink.style.display = 'none';
    document.body.appendChild(newLink);
  }

  newLink.click();

  configModal.classList.toggle('hidden');
}

if (satCheckbox && nfeCheckbox) {
  satCheckbox.addEventListener('change', function (e) {
    if (e.target.checked) {
      satDirectoryInput.disabled = false;
      satDirectoryInput.required = true;
    } else {
      satDirectoryInput.disabled = true;
      satDirectoryInput.required = false;
    }
  });

  nfeCheckbox.addEventListener('change', function (e) {
    if (e.target.checked) {
      nfeDirectoryInput.disabled = false;
      nfeDirectoryInput.required = true;
    } else {
      nfeDirectoryInput.disabled = true;
      nfeDirectoryInput.required = false;
    }
  });
}

if (cnpjButton) {
  cnpjButton.addEventListener('click', async (e) => {
    async function getCnpj(cnpj) {
      if (cnpj) {
        const data = await fetch(`https://publica.cnpj.ws/cnpj/${cnpj}`);
        return await data.json();
      }
    }

    const cnpj = $('.cnpj').cleanVal();
    const cnpjData = await getCnpj(cnpj);
    try {
      const name = cnpjData.estabelecimento.nome_fantasia || cnpjData.razao_social || '';
      const corporateName = cnpjData.razao_social || cnpjData.estabelecimento.nome_fantasia || '';
      const email = cnpjData.estabelecimento.email || '';
      const phone =
        (cnpjData.estabelecimento.ddd1 + cnpjData.estabelecimento.telefone1).length === 10 ||
        (cnpjData.estabelecimento.ddd2 + cnpjData.estabelecimento.telefone2).length === 10
          ? cnpjData.estabelecimento.ddd1 + cnpjData.estabelecimento.telefone1 ||
            cnpjData.estabelecimento.ddd2 + cnpjData.estabelecimento.telefone2
          : '0000000000';
      const cellphone =
        (cnpjData.estabelecimento.ddd2 + cnpjData.estabelecimento.telefone2).length === 11 ||
        (cnpjData.estabelecimento.ddd1 + cnpjData.estabelecimento.telefone1).length === 11
          ? cnpjData.estabelecimento.ddd2 + cnpjData.estabelecimento.telefone2 ||
            cnpjData.estabelecimento.ddd1 + cnpjData.estabelecimento.telefone1
          : '00000000000';

      nameInput.value = name.replace(/\s+/g, ' ');
      corporateNameInput.value = corporateName.replace(/\s+/g, ' ');
      emailInput.value = email.replace(/\s+/g, ' ') || 'acaoautocom@gmail.com';
      phoneInput.value = phone.replace(/\s+/g, ' ');
      cellphoneInput.value = cellphone.replace(/\s+/g, ' ');
      accountantEmailInput.value = 'zipperxml@gmail.com';
      accountantPhoneInput.value = '0000000000';
      accountantCellphoneInput.value = '00000000000';
      unmask();
      mask();
    } catch (error) {
      console.log(error);
      alert('CNPJ não encontrado ou limite de requisições por minuto atingido.');
    }
  });
}

if (openButtonConfig) {
  openButtonConfig.addEventListener('click', () => {
    configModal.classList.toggle('hidden');
    caixaInput.focus();
  });
}

if (saveButtonConfig) {
  saveButtonConfig.addEventListener('click', saveFile);
}

if (closeButtonConfig) {
  closeButtonConfig.addEventListener('click', () => {
    configModal.classList.toggle('hidden');
  });
}
// CLIENTS

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
