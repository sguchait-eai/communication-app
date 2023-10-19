import { grey } from "@mui/material/colors";


const Preview = ({ content }) => {
    const previewStyles = {
        maxHeight: '80%',
        padding: "0rem 0.2rem",
        background: grey
    };

    return (
        <div style={previewStyles} dangerouslySetInnerHTML={{ __html: content }} />
    );
}

export default Preview;