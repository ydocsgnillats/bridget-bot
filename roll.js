moodule.exports = message =>{
    let num = (Math.random() * (101-1) + 1)
    return message.channel.send(parseInt(num))
}