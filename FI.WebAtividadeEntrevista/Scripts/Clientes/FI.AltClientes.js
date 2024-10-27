let listBeneficiario = [];
$(document).ready(function () {

   
    if (obj) {
        $('#formCadastro #Nome').val(obj.Nome);
        $('#formCadastro #CEP').val(obj.CEP);
        $('#formCadastro #Email').val(obj.Email);
        $('#formCadastro #Sobrenome').val(obj.Sobrenome);
        $('#formCadastro #Nacionalidade').val(obj.Nacionalidade);
        $('#formCadastro #Estado').val(obj.Estado);
        $('#formCadastro #Cidade').val(obj.Cidade);
        $('#formCadastro #Logradouro').val(obj.Logradouro);
        $('#formCadastro #Telefone').val(obj.Telefone);
        $('#formCadastro #cpf').val(obj.CPF);

       listBeneficiario =  obj.Beneficiarios.map(obj => ({
            nome: obj.Nome,
            cpf: obj.Cpf,
            idCliente: obj.IdCliente
       }));

        addListaBeneficiario(listBeneficiario);
    }

    $('#formCadastro').submit(function (e) {
        e.preventDefault();

        let cpf = $(this).find("#cpf").val();

        var result = validateCpfSalvar(cpf);

        if (!result) {
            ModalDialog("Atenção", "CPF invalido!");
            return;
        }

        $.ajax({
            url: urlPost,
            method: "POST",
            data: {
                "NOME": $(this).find("#Nome").val(),
                "CEP": $(this).find("#CEP").val(),
                "Email": $(this).find("#Email").val(),
                "Sobrenome": $(this).find("#Sobrenome").val(),
                "Nacionalidade": $(this).find("#Nacionalidade").val(),
                "Estado": $(this).find("#Estado").val(),
                "Cidade": $(this).find("#Cidade").val(),
                "Logradouro": $(this).find("#Logradouro").val(),
                "Telefone": $(this).find("#Telefone").val(),
                "CPF": $(this).find("#cpf").val(),
                "Beneficiarios": listBeneficiario,
            },
            error:
            function (r) {
                if (r.status == 400)
                    ModalDialog("Ocorreu um erro", r.responseJSON);
                else if (r.status == 500)
                    ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
            },
            success:
                function (r) {
                    listBeneficiario = [];
                ModalDialog("Sucesso!", r)
                $("#formCadastro")[0].reset();                                
                window.location.href = urlRetorno;
            }
        });
    })

})

function ModalDialog(titulo, texto) {
    var random = Math.random().toString().replace('.', '');
    var texto = '<div id="' + random + '" class="modal fade">                                                               ' +
        '        <div class="modal-dialog">                                                                                 ' +
        '            <div class="modal-content">                                                                            ' +
        '                <div class="modal-header">                                                                         ' +
        '                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>         ' +
        '                    <h4 class="modal-title">' + titulo + '</h4>                                                    ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-body">                                                                           ' +
        '                    <p>' + texto + '</p>                                                                           ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-footer">                                                                         ' +
        '                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>             ' +
        '                                                                                                                   ' +
        '                </div>                                                                                             ' +
        '            </div><!-- /.modal-content -->                                                                         ' +
        '  </div><!-- /.modal-dialog -->                                                                                    ' +
        '</div> <!-- /.modal -->                                                                                        ';

    $('body').append(texto);
    $('#' + random).modal('show');
}


function modalDialogBeneficiario() {
    $('#beneficiarioModal').modal('show');
}

function addBeneficiario() {
    var nome = $('#nome').val();
    var cpf = $('#cpfBeneficiario').val();

    if (!validateCpfSalvar(cpf)) {
        ModalDialog("Atenção", "CPF invalido!");
        return;
    }

    listBeneficiario.push({ nome: nome, cpf: cpf, idCliente: obj.Id })
    // Verifica se os campos estão preenchidos
    if (nome === "" || cpf === "") {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    var newRow = '<tr>' +
        '<td>' + nome + '</td>' +
        '<td>' + cpf.replace(/\D/g, "") + '</td>' +
        '<td>' +
        '<button class="btn btn-primary btn-sm" onclick="editBeneficiario(this)">Alterar</button> ' +
        '<button class="btn btn-primary btn-sm" onclick="deleteBeneficiario(this)">Excluir</button>' +
        '</td>' +
        '</tr>';

    $('#beneficiariosTable tbody').append(newRow);

    // Limpa os campos do formulário e fecha o modal
    $('#beneficiarioForm')[0].reset();
    
}

function addListaBeneficiario(list) {
    if (list == undefined || list.length === 0)
        return;

    for (var i = 0; i < list.length; i++) {
        var newRow = '<tr>' +
            '<td>' + list[i].nome + '</td>' +
            '<td>' + list[i].cpf + '</td>' +
            '<td>' +
            '<button class="btn btn-primary btn-sm" onclick="editBeneficiario(this)">Alterar</button> ' +
            '<button class="btn btn-primary btn-sm" onclick="deleteBeneficiario(this)">Excluir</button>' +
            '</td>' +
            '</tr>';

        $('#beneficiariosTable tbody').append(newRow);
    }



    // Limpa os campos do formulário e fecha o modal
    $('#beneficiarioForm')[0].reset();

}

// Edita um beneficiário
function editBeneficiario(button) {
    var row = $(button).closest('tr');
    var nome = row.find('td:eq(0)').text();
    var cpf = row.find('td:eq(1)').text();

    $('#nome').val(nome);
    $('#cpfBeneficiario').val(cpf);

    $('#beneficiarioModal').modal('show');

    // Remove a linha anterior e substitui ao salvar
    row.remove();
}

// Exclui um beneficiário
function deleteBeneficiario(button) {
    //$(button).closest('tr').remove();
    var row = $(button).closest('tr');
    var cpf = row.find('td:eq(1)').text()

    listBeneficiario = listBeneficiario.filter(p => p.cpf !== cpf);

    $(button).closest('tr').remove();
}