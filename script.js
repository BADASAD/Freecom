const remoteAudio = document.getElementById('remoteAudio');

const peer = new Peer();
peer.on('open', id => {
  document.getElementById('my-id').textContent = id;
});

navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
  peer.on('call', call => {
    call.answer(stream);
    call.on('stream', remoteStream => {
      remoteAudio.srcObject = remoteStream;
    });
  });

  window.callPeer = function () {
    const peerId = document.getElementById('peer-id').value;
    const call = peer.call(peerId, stream);
    call.on('stream', remoteStream => {
      remoteAudio.srcObject = remoteStream;
    });
  };
}).catch(error => {
  console.error('Error accessing microphone:', error);
});
