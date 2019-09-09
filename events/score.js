module.exports = message => {
    const member = message.mentions.members.first()
	if (!member) {
      return message.reply(
        `Who?`
		)
    }

    return member
      //somehow add a point somewhere in the ether
      .then(() => message.reply(`${member.user.tag} gets one good boi point.`))
      .catch(error => message.reply(`Sorry, an error occured.`))
  }
)}