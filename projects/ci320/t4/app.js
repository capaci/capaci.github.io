function start(){
    $.get("files/alunos.xml", function(data){
        alunos = parseXML(data);
    });
    $("#grade>tbody td").each(function(td){
        $(this).mouseup(function(event){
            event.preventDefault();
            clickDisc(event, $(this));
        });
    });
    $("#submit").click(function(){
        preencheGrade($("#grr").val());
    })
}

var grrs = [];
function parseXML(xml){
    var alunosXML = xml.getElementsByTagName("ALUNO");
    for (var i = 0; i < alunosXML.length; i++)
    {
        var aluno = new Object();
        aluno.grr = alunosXML[i].getElementsByTagName("MATR_ALUNO")[0].firstChild.nodeValue;
        aluno.nome  = alunosXML[i].getElementsByTagName("NOME_ALUNO")[0].firstChild.nodeValue;
        aluno.numVersao  = alunosXML[i].getElementsByTagName("NUM_VERSAO")[0].firstChild.nodeValue;
        aluno.nomeDisc   = alunosXML[i].getElementsByTagName("NOME_ATIV_CURRIC")[0].firstChild.nodeValue;
        aluno.codDisc    = alunosXML[i].getElementsByTagName("COD_ATIV_CURRIC")[0].firstChild.nodeValue;
        if((alunosXML[i].getElementsByTagName("FREQUENCIA")[0].firstChild != null) && (alunosXML[i].getElementsByTagName("SIGLA")[0].firstChild != null))
        {
            aluno.ano        = alunosXML[i].getElementsByTagName("ANO")[0].firstChild.nodeValue;
            aluno.periodo    = alunosXML[i].getElementsByTagName("PERIODO")[0].firstChild.nodeValue;
            aluno.nota       = alunosXML[i].getElementsByTagName("MEDIA_FINAL")[0].firstChild.nodeValue;
            aluno.frequencia = alunosXML[i].getElementsByTagName("FREQUENCIA")[0].firstChild.nodeValue;
            aluno.situacao   = alunosXML[i].getElementsByTagName("SIGLA")[0].firstChild.nodeValue;
            aluno.tipo	   = alunosXML[i].getElementsByTagName("DESCR_ESTRUTURA")[0].firstChild.nodeValue;

        }

        if (grrs.indexOf(aluno.grr) < 0) {
            grrs.push(aluno.grr);
        }

        alunos.push(aluno);
    }

    $("#grr").autocomplete({
        source: grrs
    });

    return alunos;
}
function findAluno(grr){
    var aluno = [];
    for(var i = 0; i < alunos.length; i++){
        if(alunos[i].grr == grr){
            aluno.push(alunos[i]);
        }
    }
    return aluno;
}

function preencheGrade(grr){
    resetGrade();
    var opts = 0;
    var aluno = findAluno(grr);
    for(var i = 0; i < aluno.length; i++){
        var code = aluno[i].codDisc;
        var square = $("#" + code);
        if(square.length){
            setSquareColor(square, aluno[i].situacao);
        } else if(aluno[i].nomeDisc.indexOf("Trabalho")>-1){
            if (aluno[i].nomeDisc.indexOf("II")>-1){
                setSquareColor($("#TGII"), aluno[i].situacao);
                changeSquareId($("#TGII"), aluno[i].codDisc);
            }
            else {
                setSquareColor($("#TGI"), aluno[i].situacao);
                changeSquareId($("#TGI"), aluno[i].codDisc);
            }

        } else if(aluno[i].tipo == "Optativas"){
            opts++;
            setSquareColor($("#OPT" + opts), aluno[i].situacao);
            changeSquareId($("#OPT" + opts), aluno[i].codDisc);
        }

    }
}
function changeSquareId(td, id){
    td.attr('id', id);
}
function setSquareColor(square, sit){
    var cssClass;

    square.removeClass();
    // var regx = new RegExp('\\b' + 'square-' + '.*?\\b', 'g');
    //     square.className = square.className.replace(regx, '');

    if(sit == "Aprovado"){
        cssClass = "square-green";
    } else if(sit == "Reprovado"){
        cssClass = "square-red";
    } else if(sit == "Matricula"){
        cssClass = "square-blue";
    } else if(sit == "Equivale"){
        cssClass = "square-yellow";
    }
    console.log('xablau');
    // square.css('background', color);
    square.addClass(cssClass);
}
function resetGrade(){
    $("#grade>tbody td").each(function(td){
        // $(this).css('background', "white");

        $(this).removeClass();
        $(this).addClass('square-white');
        $(this).attr('id', $(this).html());
    });
}
function findDiscForAluno(aluno, disc){
    var tentativas = [];
    for(var i = 0; i < aluno.length; i++){
        if(aluno[i].codDisc == disc){
            tentativas.push(aluno[i]);
        }
    }
    return tentativas;
}
function clickDisc(event, td){
    if(event.button == 2){
        var grr = $("#grr").val()
        var aluno = findAluno(grr);
        var disc = findDiscForAluno(aluno, td.attr("id"));
        var html = "";
        for(var i = 0; i < disc.length; i++){
            html +='\
            <p>' + disc[i].nomeDisc + '</p>\
            <p>' + disc[i].ano + ' - ' + disc[i].periodo + '</p><br>\
            <p>Nota: ' + disc[i].nota + '</p>\
            <p>Frequencia: ' + disc[i].frequencia + '</p><hr class="hr-no-bootstrap">\
            ';
        }
        if(disc.length == 0){
            html = ('Nunca cursado!');
        }
        $("#popup").html(html);
        $('#popup').dialog({maxHeight: 350});
    } else {
        var grr = $("#grr").val()
        var aluno = findAluno(grr);
        var disc = findDiscForAluno(aluno, td.attr('id'));
        for(var i = 0; i < disc.length; i++){
            $("#popup").html('\
            <p>' + disc[i].nomeDisc + '</p>\
            <p>' + disc[i].ano + ' - ' + disc[i].periodo + '</p><br>\
            <p>Nota: ' + disc[i].nota + '</p>\
            <p>Frequencia: ' + disc[i].frequencia + '</p>\
            ');
        }
        if(disc.length == 0){
            $("#popup").html('Nunca cursado!');
        }
        $('#popup').dialog({maxHeight: 350});
    }
}

var alunos = [];
start();
