function applyCpfMask(input) {

    let value = input.value.replace(/\D/g, "");

    if (value.length <= 3) {
        value = value;
    } else if (value.length <= 6) {
        value = value.replace(/^(\d{3})(\d{1,3})/, "$1.$2");
    } else if (value.length <= 9) {
        value = value.replace(/^(\d{3})(\d{3})(\d{1,3})/, "$1.$2.$3");
    } else {
        value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{1,2})/, "$1.$2.$3-$4");
    }

    input.value = value.slice(0, 14);
}

function validateCpfSalvar(input) {
    const cpf = input.replace(/\D/g, ""); // Strip out non-numeric characters
    return isValidCpf(cpf);


}
function validateCpf(input) {
    const cpf = input.value.replace(/\D/g, ""); // Strip out non-numeric characters
    return isValidCpf(cpf);


}
function isValidCpf(cpf) {
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false; // Basic checks

    // Validate first digit
    let sum = 0;
    for (let i = 0; i < 9; i++) sum += parseInt(cpf.charAt(i)) * (10 - i);
    let checkDigit = (sum * 10) % 11;
    if (checkDigit === 10 || checkDigit === 11) checkDigit = 0;
    if (checkDigit !== parseInt(cpf.charAt(9))) return false;

    // Validate second digit
    sum = 0;
    for (let i = 0; i < 10; i++) sum += parseInt(cpf.charAt(i)) * (11 - i);
    checkDigit = (sum * 10) % 11;
    if (checkDigit === 10 || checkDigit === 11) checkDigit = 0;
    return checkDigit === parseInt(cpf.charAt(10));
}