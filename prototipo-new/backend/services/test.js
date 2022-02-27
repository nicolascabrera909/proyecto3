/*const inventario = [
    {nombre: 'manzanas', cantidad: 2},
    {nombre: 'bananas', cantidad: 0},
    {nombre: 'cerezas', cantidad: 5}
];

function esCereza(fruta) {
    return fruta.nombre === 'cerezas';
}

inventario.delete();

console.log(inventario.find(esCereza));

console.log(inventario.length === 3);
*/
function OrderList(actual) {
    var array = new Array();
    for (var i = 0, j = actual.length; i < j; i++) {
        if (actual[i]) {
            array.push(actual[i]);
        }
    }
    return array;
}

const pruebaOrderList = [1,2,4,,,,,5];
console.log(pruebaOrderList);
console.log("Array ordenado");
console.log(OrderList(pruebaOrderList));