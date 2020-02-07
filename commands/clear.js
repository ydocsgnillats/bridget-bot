module.exports = message => {

    message.channel.fetchMessages()
		.then(messages => {
			if(message.author.bot){
				message.channel.bulkDelete(10)
				messagesDeleted = messages.array().length; // number of messages deleted
				// Logging the number of messages deleted on both the channel and console.
				message.channel.sendMessage("Bridget messages deleted: "+messagesDeleted);
				console.log('Deletion of messages successful. Total messages deleted: '+messagesDeleted)
			}
			else{
				return message.channel.sendMessage("failed to clear messages");
			}
		})
		.catch(err => {
			console.log('Error while doing Bulk Delete');
			console.log(err);
        })
}