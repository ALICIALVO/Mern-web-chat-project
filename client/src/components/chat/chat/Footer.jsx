import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, InputBase, styled, Typography, CircularProgress, IconButton } from '@mui/material';
import { EmojiEmotionsOutlined, AttachFile, Mic, Send } from '@mui/icons-material';
import { uploadFile } from '../../../service/api.mjs';
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data';


const Footer = ({ sendText, setValue, value, file, setFile, setImage }) => {

    const [uploading, setUploading] = useState(false);
    const [uploadComplete, setUploadComplete] = useState(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    useEffect(() => {

        const uploadImage = async () => {

            if (file) {
                setUploading(true);
                setUploadComplete(false);
                const data = new FormData();
                data.append("name", file.name);
                data.append("file", file);

                const response = await uploadFile(data);
                setImage(response.data);
                setUploading(false);
                setUploadComplete(true);
            }
        };

        uploadImage();

    }, [file, setImage]);

    const onFileChange = (e) => {

        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setValue(selectedFile.name);
        }
    };

    const handleSendText = (e) => {

        if (e.type === 'click' || (e.key === 'Enter' && value.trim())) {
            sendText(e);
            setValue('');
            setFile(null);
            setUploadComplete(false);
        }
    };

    const addEmoji = (emoji) => {

        setValue(value + emoji.native);
        setShowEmojiPicker(false);
    };

    return (
        <Container>
            <IconButton onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                <EmojiEmotionsOutlined />
            </IconButton>
            {showEmojiPicker && (
                <EmojiPickerContainer>
                    <Picker data={data} onEmojiSelect={addEmoji} />
                </EmojiPickerContainer>
            )}
            <input 
                type="file"
                id="fileInput"
                style={{ display: 'none' }}
                onChange={onFileChange}
            />
            <label htmlFor="fileInput">
                <IconButton component="span">
                    <ClipIcon style={{ color: '#919191' }} />
                </IconButton>
            </label>
            <Search>
                <InputField
                    id="textInput"
                    placeholder="Type a message"
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={handleSendText}
                    value={value}
                />
                {uploading && <CircularProgress size={20} />}
                {uploadComplete && <Typography variant="body2" color="green">Upload complete</Typography>}
            </Search>
            <IconButton onClick={handleSendText} color="primary">
                <Send style={{ color: '#919191' }} />
            </IconButton>
            <Mic />
        </Container>
    );
};


export default Footer;

Footer.propTypes = {
    sendText: PropTypes.func.isRequired,
    setValue: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    file: PropTypes.object, // file can be null or an object
    setFile: PropTypes.func.isRequired,
    setImage: PropTypes.func.isRequired
};

//styles:

const Container = styled(Box)`
    height: 5.5rem;
    background: #f0f2f5;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 2.5rem;
    & > * {
        margin: 0.5rem;
        color: #919191;
    }
`;

const Search = styled(Box)`
    border-radius: 1.8rem;
    background-color: #FFFFFF;
    width: calc(94% - 10rem);
    display: flex;
    align-items: center;
`;

const InputField = styled(InputBase)`
    width: 100%;
    padding: 2rem;
    padding-left: 2.5rem;
    font-size: 1.4rem;
    height: 2rem;
`;

const ClipIcon = styled(AttachFile)`
    transform: rotate(40deg);
`;

const EmojiPickerContainer = styled(Box)`
    position: absolute;
    bottom: 5rem; 
    z-index: 1; 
`;