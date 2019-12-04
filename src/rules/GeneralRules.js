export default {
    name: [
        v => !!v || "Campo requerido"
    ],
    email: [
        v => !!v || "E-mail es requerido",
        v => /.+@.+/.test(v) || "E-mail must be valid"
    ],
    cedula: [
        v => !!v || "Cedula es requerida",
        v => /([0-9]{3})-?([0-9]{7})-?([0-9])/.test(v) || "Cedula invalida"
    ],
    telephone: [
        v => !!v || "Telefono es requerido"
    ]
}