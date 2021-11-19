
const socket = io.connect('http://localhost:3000')

socket.on('server:data', (data) => {
  console.log('Recibido con exito:')
  console.log(data)
})
