import React, { useState, useRef, useEffect } from 'react';
import Peer from 'peerjs';
import './room.css';
import HttpService from '../services/http';

const Room = ({ props }) => {
    console.log()
    const videoRef = useRef(null);
    const videoRefAnother = useRef(null);
    const [id, setId] = useState(null);

    const peer =  new Peer({
        host: '0.0.0.0',
        port: 80,
        key: 'peerjs',
    });

    if(props.match.params.id) {
        var conn = peer.connect(props.match.params.id);
        conn.on('open', function(){
          conn.send('Message from that id');
          navigator.mediaDevices.getUserMedia({video: true, audio: true})
          .then((stream) => {
            const call = peer.call(props.match.params.id, stream)
            call.on('stream', function(remotestream){
                videoRefAnother.current.src = window.URL.createObjectURL(remotestream)
            })
            videoRef.current.src = window.URL.createObjectURL(stream);
            videoRef.current.onloadedmetadata = function(e) {
              //fetchAB(dataStream)
            };
          })
          .catch((error) => console.log(error))
        });
    }

    peer.on('call', function(call) {
        navigator.mediaDevices.getUserMedia({video: true, audio: true})
        .then((stream) => {
          call.answer(stream);
          call.on('stream', function(remotestream){
                videoRefAnother.current.src = window.URL.createObjectURL(remotestream)
          })
          const dataStream = window.URL.createObjectURL(stream);
          videoRef.current.src = dataStream;
          videoRef.current.onloadedmetadata = function(e) {
            //fetchAB(dataStream)
          };
        })
        .catch((error) => console.log(error))
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