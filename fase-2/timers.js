let i = 0

const contador = setInterval(() => {
  console.log(i += 1)
}, 1000)

setTimeout(() => {
  clearInterval(contador)
}, 5000)