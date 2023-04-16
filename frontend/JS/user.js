var meses = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho",
"Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
var body = document.querySelector(`body`);

var dataHora = new Date();
dataHora.setDate(1);
dataHora.setMonth(3);
var dia = dataHora.getDate();
var mes = dataHora.getMonth();
var ano = dataHora.getFullYear();
// var diaSemana = dataHora.getDay();
var proximoMes = new Date(dataHora).setMonth(mes + 1);

function defineDates(){
    dataHora.setDate(1);
    dia = dataHora.getDate();
    mes = dataHora.getMonth();
    ano = dataHora.getFullYear();
}

function imprimeCalendario(){
    var existe = document.querySelector(`table`);
    if(existe){
        existe.remove();
    }
    var table = document.createElement(`table`);
    table.setAttribute(`cellpadding`, `0`);
    table.setAttribute(`cellspacing`, `0`);
    var thead = document.createElement(`thead`);
    var tr = document.createElement(`tr`);
    //cria a coluna com o botao voltar
    var td = document.createElement(`td`);
    td.innerHTML = ` <button onclick='backMonth()'> << </button> `;
    tr.appendChild(td);


    var td = document.createElement(`td`);
    td.setAttribute(`colspan`,`5`);
    td.innerHTML = `${meses[mes]} ${ano}`;

    tr.appendChild(td);
    var td = document.createElement(`td`);
    td.innerHTML = `<button onclick='goMonth()'> >> </button>`;
    tr.appendChild(td);

    var tbody = document.createElement(`tbody`);
    
    table.appendChild(thead);
    table.appendChild(tbody);
    thead.appendChild(tr);
    tr.appendChild(td);

    body.appendChild(table);
    daysWeek(tbody);
    imprimeDiasMesCorrente(tbody);
}

function backMonth(){
    dataHora.setMonth(dataHora.getMonth() - 1);
    defineDates();
    imprimeCalendario();
}

function goMonth(){
    dataHora.setMonth(dataHora.getMonth() + 1);
    defineDates();
    imprimeCalendario();
}

function daysWeek(tbodyStart){
    var tr = document.createElement(`tr`);  
    days = [`Dom`,`Seg`,`Ter`,`Qua`,`Qui`,`Sex`,`Sáb`];
    for(day of days){
    var td = document.createElement(`td`);
    if(day === `Dom` || day === `Sáb`){
        td.setAttribute(`class`, `fds`)
    }
    td.innerText = day;
    tr.appendChild(td);
    }
    tbodyStart.appendChild(tr);
};

function imprimeDiasMesCorrente(tbody){
    var tr = document.createElement(`tr`);
    var comecaNoDia = dataHora.getDay();
    var terminaNoDia = null;
    var nDia = 1;
    var x = 1;
    var maximoCelulas = 42; 
    var tdsRestantes = 1;
    while(true){
        var dataHoraCopia = new Date(dataHora);
        dataHoraCopia.setDate(nDia);
        var td = document.createElement(`td`);

        if(nDia <= getLastDay(dataHora)){
            if(x <= comecaNoDia){
                tdsRestantes = defineDates() + tdsRestantes;
                td.innerText = tdsRestantes;
                console.log(defineDates());
            }else{
                td.innerText = nDia;
                terminaNoDia = dataHoraCopia.getDay();
                nDia++;
            }
            if(x % 7 === 0 || x % 7 === 1){
                td.setAttribute(`class`, `fds`);
            }
            tr.appendChild(td);
            if(x % 7 === 0){
                tbody.appendChild(tr);
                var tr = document.createElement(`tr`);
            }
        }else if(x <= maximoCelulas){
            td.innerText = tdsRestantes;
            tdsRestantes++;
            console.log(x, maximoCelulas);
            console.log(tdsRestantes);
            if(x % 7 === 0 || x % 7 === 1){
                td.setAttribute(`class`, `fds`);
            }
            tr.appendChild(td);
            if(x % 7 === 0){
                tbody.appendChild(tr);
                var tr = document.createElement(`tr`);
            }
        }else{
            break;
        }
        x++;
    }

}
function getLastDay(data){
    var dataCopia = new Date(data);
    dataCopia.setMonth(data.getMonth() + 1);
    dataCopia.setDate(1);
    dataCopia.setDate(dataCopia.getDate() - 1);
    return dataCopia.getDate();
}
// function imprimeDiasOutroMes(){
//     var tr = document.createElement(`tr`);
//     var nDia = dataHora.getDate();
//     var ultimosDiasMes = proximoMes.setMonth(data.getDate() % nDia);
//     var proximosDiasMes = proximoMes.setMonth(dataCopia.getDate() % nDia);
//     while(nDia < ultimosDiasMes){
//         var td = document.createElement(`td`);
//         td.setAttribute(`class`, `rest`);
//         tbody.appendChild(tr);
//     };
//     while(nDia > proximosDiasMes){
//         var td = document.createElement(`td`);
//         td.setAttribute(`class`, `rest`);
//         tbody.appendChild(tr);
//     }
// }
imprimeCalendario();

// function numbersWeek(){
//     var tbody = document.createElement(`tbody`);
//     var tr = document.createElement(`tr`);
//     var inicioNoCalendario = dataHora.getDay();
//     var terminoNoCalendario = null;
//     var nDia = 1;
//     var x = 1;
//     while(nDia <= getLastDay(dataHora)){
//         var td = document.createElement(`td`);
//         var dataHoraCopia = new Date(dataHora);
//         dataHoraCopia.setDate(nDia);
//         td.innerText = x;
//         tr.appendChild(td);
//         if(x <= inicioNoCalendario){
//             td.innerText = "";
//         }else{
//             td.innerText = nDia;
//             terminoNoCalendario = dataHoraCopia.getDay();
//             nDia++;
//         }
//         tr.appendChild(td);

//         if(x % 7 === 0){
//             tbody.appendChild(tr);
//             var tr = document.createElement(`tr`);
//         }
//         x++;
//     };

//     var tds = 6 - terminoNoCalendario;
//     for(var x = 0; x < tds; x++){
//         var td = document.createElement(`td`);
//         td.innerText = "";
//         tr.appendChild(td);
//     }
 
//     tbody.appendChild(tr)
// };


// body.appendChild(table);
// daysWeek();
// numbersWeek();

