module.exports = {
	name: 'undo',
	description: 'undo!',
	execute(message, args) {
        var channel = message.channel
        var msg = channel.fetchPinnedMessages()
        return message.channel.send("not finished yet.")
    }
}