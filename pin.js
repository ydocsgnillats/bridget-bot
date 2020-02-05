module.exports = message => {
    if (message == 'pin!'){
        var msgCollect = message.channel.messages;
        var msgArray = Array.from(msgCollect.values());
        var prevMsg = msgArray[msgArray.length -2];
        prevMsg.pin();
        return;
    }
    else if(message == 'undo!'){
        var channel = message.channel
        var msg = channel.fetchPinnedMessages()
        var msgArray = Array.from(msg.values());
        msgArray[0].unpin()
        return;
    } 
}