export function geraSenha(tamanho) {
    let senhaAleatoria = '';
    let caracteres = 'ABCD$EFG85HIJKLMNO*PQR5STUV@WXZabc3def7gmnopq6rswxyz0123456789';
    for (var i = 0; i < tamanho; i++) {
        senhaAleatoria += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return stringAleatoria;
}
