module.exports = message => {
    motionbase = app.Motionbase
    var msg = message.content.split(" ").slice(1).join(" ")
    const filter = m => m.author.id !== message.author.id
    async function motionFunc(msg){
        if (msg === 'motion!')
            message.reply("Motion **" + msg + "** initiated. \nDoes anyone second the motion?\n(REPLY  *yes* or *no*)")
            .then(function(){
                message.channel.awaitMessages(response=>message.content, 
                    {
                        max: 1, 
                        time: 30000,
                        errors: ['time'],
                    }).then(async collected =>{
                    if (collected.first().content === 'second'){
                        const dbMotion = motionbase.create({
                            motion: msg,
                            username: message.author.username,
                            guild: message.guild.name,
                            date: now,
                            })
                        dbMotion;
                        // var Membed = new Discord.RichEmbed()
                        //  	Membed.setTitle("MOTION: ")
                        //  	Membed.setColor("BLURPLE")
                        //  	Membed.setDescription(msg)
                        //  	Membed.setThumbnail(message.user.displayAvatarURL)
                        //  	Membed.addField("Author: ", message.author, true)
                        //  	Membed.addField("Seconded: ", collected.first().author, true)
                        //  	Membed.setFooter('**MOTION GRANTED**', client.user.displayAvatarURL);
                        // return message.channel.send({embed: Membed})
                        return message.channel.send("MOTION " + msg + " GRANTED")
                    }
                    else if (collected.first().content === 'no'){
                        const r = await message.channel.send("MOTION DENIED")
                        return r.delete(5000)
                    }
                    else if (collected.first().content === 'cancel'){
                        const r_1 = await message.reply("Motion Canceled.")
                        return r_1.delete(5000)
                    }
                    }).catch(err =>{ 
                        message.reply("Motion " + msg + " denied due to timeout.").then(r => r.delete(5000));
                    })
            })
        if (msg === 'motions!'){
            const motionList = await motionbase.findAll({ where: {guild: message.guild.name}}, { attributes: ['motion'] })
            const motionString = motionList.map(t => t.motion).join(', \n ') || 'No motions stored.'
            return message.channel.send(`Motions: ${motionString}`)
        }  
    } 
}
