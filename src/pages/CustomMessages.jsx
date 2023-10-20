import React, { useState } from 'react';
import { TextField, Button , Card , CardContent } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import RichTextEditor from '../components/custom-message/RichTextEditor';
import Preview from '../components/custom-message/Preview';
import Timeline from "../components/custom-message/Timeline"

const CustomMessages = () => {
    const [tabValue, setTabValue] = useState("email");
    const [richTextValue, setRichTextValue] = useState('');
    const [previewMode, setPreviewMode] = useState(false);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    // Function to update the rich text value
    const updateRichTextValue = (value) => {
        setRichTextValue(value);
    };

    const togglePreviewMode = () => {
        setPreviewMode(!previewMode);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Tabs
                value={tabValue}
                onChange={handleTabChange}
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="secondary tabs example"
            >
                <Tab value="email" label="Email" />
                <Tab value="whatsapp" label="WhatsApp" />
                <Tab value="sms" label="SMS" />
            </Tabs>
            <Box>
                {previewMode ? (
                    <Card sx={{ minWidth: 275}}>
                        <CardContent>
                        <Preview content={richTextValue} />
                        </CardContent>
                    </Card>
                    ) : (
                    <Box mt={2} sx={{ padding: '0rem 0rem 3rem 0rem' }}>
                        {tabValue === "email" ? (
                            <RichTextEditor value={richTextValue} onChange={updateRichTextValue} />
                        ) : (
                            <TextField
                                id="outlined-multiline-static"
                                multiline
                                rows={10}
                                defaultValue="Custom Message"
                                sx={{ width: '100%' }}
                            />
                        )}
                    </Box>
                )}

            </Box>
            <Box>
                {
                   !previewMode ? <Timeline/> : ""
                }
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                {!previewMode ?
                    (<Button onClick={togglePreviewMode} variant="contained" color="primary">Preview</Button>) :
                    ((<Button onClick={togglePreviewMode} variant="contained" color="primary">Edit</Button>))}
                <Button variant="contained" color="primary">Submit</Button>
            </Box>
        </Box>
    );
}

export default CustomMessages;
