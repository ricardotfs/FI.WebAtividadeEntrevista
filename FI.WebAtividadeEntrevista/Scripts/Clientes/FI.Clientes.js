let listBeneficiario = [];
$(document).ready(function () {
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
                    if (r == "CPF já foi cadastrado na base") {
                        ModalDialog("Atenção!", r)
                        return;
                    }
                        

                ModalDialog("Sucesso!", r)
                

                $("#formCadastro")[0].reset();
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

    var row = $(button).closest('tr');
    var cpf = row.find('td:eq(1)').text()

    listBeneficiario = listBeneficiario.filter(p => p.cpf !== cpf);

    $(button).closest('tr').remove();
}