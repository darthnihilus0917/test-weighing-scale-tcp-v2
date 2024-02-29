const net = require('net');

function generateValues() {
    let values = [];
    for (let i = 0; i <= 10; i++) {
        for (let j = 0; j < 10; j++) {
            values.push(i);
        }
    }
    return values;
}

const server = net.createServer((socket) => {
    console.log('Client connected');

    let index = 0;

    const interval = setInterval(() => {
        const values = generateValues();
        if (index < values.length) {
            socket.write(values[index].toString());
            index++;
        } else {
            index = 0; // Reset index to 0
        }
    }, 50); // Repeat every half a second (500 milliseconds)

    socket.on('end', () => {
        clearInterval(interval); // Stop interval when client disconnects
        console.log('Client disconnected');
    });
});

server.on('error', (err) => {
    console.error('Server error:', err.message);
});

server.listen(3002, () => {
    console.log('Server running on port 3002');
});
