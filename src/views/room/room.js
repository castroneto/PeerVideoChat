import React, { useState, useRef, useEffect } from 'react';
import Peer from 'peerjs';
import './room.css';
import HttpService from '../services/http';

const Room = ({ props }) => {
    console.log()
    const videoRef = useRef(null);
    const videoRefAnother = useRef(null);
    const [id, setId] = useState(null);
    navigator.getUserMedia = ( navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);

    const peer =  new Peer({
        host: '0.0.0.0',
        port: 80,
        key: 'peerjs',
    });

    if(props.match.params.id) {
        var conn = peer.connect(props.match.params.id);
        conn.on('open', function(){
          conn.send('Message from that id');
          navigator.getUserMedia({video: true, audio: true}, function(stream) {
            const call = peer.call(props.match.params.id, stream)
            call.on('stream', function(remotestream){
                try {
                    videoRefAnother.current.srcObject = remotestream
                } catch (error) {
                    videoRefAnother.current.src = window.URL.createObjectURL(remotestream)
                }
            })
            try {
                videoRef.current.srcObject = stream;
            } catch (error) {
                videoRef.current.src = (window.URL || window.webkitURL).createObjectURL(stream);
            }
          }, (error) => {
              console.log(error)
          })
        });
    }

    peer.on('call', function(call) {
        navigator.getUserMedia({video: true, audio: true}, function(stream) {
            call.answer(stream);
            call.on('stream', function(remotestream){
                try {
                    videoRefAnother.current.srcObject = remotestream
                } catch (error) {
                    videoRefAnother.current.src = window.URL.createObjectURL(remotestream)
                }
            })

            
            //const dataStream = window.URL.createObjectURL(stream);
            try {
                videoRef.current.srcObject = stream;
            } catch (error) {
                videoRef.current.src = (window.URL || window.webkitURL).createObjectURL(stream);
            }
        }, (error) => {
            console.log(error)
        })
    })


    useEffect(() => {
        const timer = setTimeout(() => {
            setId(peer.id);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    peer.on('connection', function (conn) {
        conn.on('data', function (data) {
            // Will print 'hi!'
            console.log(data);
        });
    });



    return (
        <div className="limiter">
            <div className="container-login100">
                <div className="container">
                    <h1>{id}</h1>
                    <video className="wrap-video-container" ref={videoRefAnother} autoPlay muted loop>
                    </video>
                    <video className="wrap-video-container-person" ref={videoRef} autoPlay muted loop>
                    </video> 
                </div>
            </div>
        </div>
    )
}

export default Room;