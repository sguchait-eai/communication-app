import React from 'react';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const RichTextEditor = ({ value, onChange }) => {
    // const [text, setText] = useState('');
    const modules = {
        toolbar: [
            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link'],
            ['clean'],
        ],
    };
    const formats = [
        'header', 'font',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link'
    ];

    const handleTextChange = (value) => {
        onChange(value); // Call the onChange prop to update the value in the CustomMessages component.
    };
    return (
        <div>
            <ReactQuill value={value} onChange={handleTextChange} modules={modules} formats={formats} style={{ height: '200px' }} />
        </div>

    )
}

export default RichTextEditor