const num1 = Number(process.argv[2])
const num2 = Number(process.argv[3])

if(isNaN(num1) || isNaN(num2)){
  console.log('Debe ser algun numero por ejemplo:');
  console.log('node calculadora.js 5 3');
  process.exit(1)
}

console.log('Suma:', num1 + num2)
console.log('Resta:', num1 - num2)
console.log('Multiplicacion:', num1 * num2)