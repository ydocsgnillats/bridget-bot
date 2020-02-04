module.exports = message => {
	var msgarray = message.content.split(" ").slice(1).join(" ");
	message.channel.fetchMessages({ 
		limit: 3 // Fetch last 50 messages.
	}).then((msgCollection) => { // Resolve promise
	msgCollection.forEach((msg) => { // forEach on message collection
		msg.delete(); // Delete each message
	)};
	return message.channel.send("When should I remind you about " + "*" + msgarray + "?*").catch(e => console.log(e));
}
