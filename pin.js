module.exports = message => {
    if(message == 'undo!'){
        var channel = message.channel
        var msg = channel.fetchPinnedMessages()
        var msgArray = Array.from(msg);
        msgArray[0].unpin()
        return;
    } 
    else{
        var msgCollect = message.channel.messages;
        var msgArray = Array.from(msgCollect.values());
        var prevMsg = msgArray[msgArray.length -2];
        prevMsg.pin();
        return;
    }
}