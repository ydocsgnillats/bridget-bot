module.exports = {
	name: 'roll',
	description: 'roll!',
	execute(message, args) {
        let num = (Math.random() * (101-1) + 1)
        return message.channel.send(parseInt(num))
}
}