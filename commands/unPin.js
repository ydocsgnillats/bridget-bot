module.exports = {
	name: 'unPin',
	description: 'unPin!',
	execute(message, args) {
        var channel = message.channel
        var msg = channel.fetchPinnedMessages()
        var msgArray = Array.from(msg);
        msgArray.unpin()
        return;
    }
}