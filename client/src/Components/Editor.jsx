import { useEffect, useState, useContext } from 'react';

import Quill from 'quill';
import 'quill/dist/quill.snow.css';

import { Box } from '@mui/material';
import styled from '@emotion/styled';

import { io } from 'socket.io-client';
import { useNavigate, useParams } from 'react-router-dom';
import HomeNav from './HomeNav';
import { ContentContext } from '../Context/ContentProvider';

const Component = styled.div`
    background: #F5F5F5;
`

const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],

    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction

    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],

    ['clean']                                         // remove formatting button
];


const Editor = () => {
    const [socket, setSocket] = useState();
    const [quill, setQuill] = useState();
    const { id } = useParams();
    const {content, setContent} = useContext(ContentContext)

    useEffect(() => {
        const quillServer = new Quill('#container', { theme: 'snow', modules: { toolbar: toolbarOptions }});
        quillServer.disable();
        quillServer.setText('Loading the document...')

        setQuill(quillServer);
    }, []);

    useEffect(() => {
        const socketServer = io('http://localhost:9000');
        setSocket(socketServer);

        return () => {
            socketServer.disconnect();
        }
    }, [])

    useEffect(() => {
        if (socket === null || quill === null) return;

        const handleChange = (delta, oldData, source) => {
            if (source !== 'user') return;
            socket.emit('send-changes', delta);
        }

        quill && quill.on('text-change', handleChange);

        return () => {
            quill && quill.off('text-change', handleChange);
        }
    }, [quill, socket])

    useEffect(() => {
        if (socket === null || quill === null) return;

        const handleChange = (delta) => {
            quill.updateContents(delta);
        }

        socket && socket.on('receive-changes', handleChange);

        return () => {
            socket && socket.off('receive-changes', handleChange);
        }
    }, [quill, socket]);

    useEffect(() => {
        if (quill === null || socket === null) return;

        socket && socket.once('load-document', document => {
            quill && quill.setContents(document);
            quill && quill.enable();
        })

        socket && socket.emit('get-document', id);
    },  [quill, socket, id]);

    useEffect(() => {
        if (socket === null || quill === null) return;

       const interval = setInterval(() => {
        socket.emit('save-document', quill.getContents())
        setContent(quill.getText())
        }, 2000);

         return () => {
        clearInterval(interval);
        }
    }, [socket, quill]);


    return (
        <div className = 'backdrop-blur-lg'>
            <Component>
                <HomeNav className = 'backdrop-blur-lg !bg-[#E31213]  bg-clip-padding backdrop-filter bg-opacity-30' id = {id}/>
                <Box className='backdrop-blur-lg bg-white container text-black rounded-md bg-clip-padding backdrop-filter bg-opacity-30 border border-gray-100 overflow-x-scroll hide-scroll-bar' id='container' />
            </Component>
        </div>
    )
}

export default Editor;