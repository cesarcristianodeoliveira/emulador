import React, { useState } from 'react';
import { Grid, Box, Paper, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { client } from '../client';
import Loading from './Loading';

import { categories, systems } from '../utils/data';

const CreateGame = ({ user }) => {
    
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [system, setSystem] = useState('arcade')
    const [loading, setLoading] = useState(false)
    const [fields, setFields] = useState();
    const [category, setCategory] = useState('Arcade');
    const [imageAsset, setImageAsset] = useState();
    const [romAsset, setRomAsset] = useState()
    
    const navigate = useNavigate()
    
    const uploadImage = (e) => {
        const selectedFile = e.target.files[0];

        if (selectedFile.type === 'image/png' || selectedFile.type === 'image/svg' || selectedFile.type === 'image/jpeg' || selectedFile.type === 'image/gif' || selectedFile.type === 'image/tiff') {
            setLoading(true);
            client.assets
                .upload('image', selectedFile, { contentType: selectedFile.type, filename: selectedFile.name })
                    .then((document) => {
                    setImageAsset(document);
                    setLoading(false);
                })
                .catch((error) => {
                console.log('Erro ao enviar imagem:', error.message);
            });
        }
    }

    const uploadRom = (e) => {
        const selectedFile = e.target.files[0];
        client.assets
            .upload('file', selectedFile, { contentType: selectedFile.type, filename: selectedFile.name })
                .then((document) => {
                setRomAsset(document);
            })
            .catch((error) => {
            console.log('Erro ao enviar rom:', error.message);
        });
    }

    const saveGame = () => {
        if(title && content && romAsset?._id && imageAsset?._id && category && system) {
            const doc = {
                _type: 'game',
                title,
                content,
                image: {
                    _type: 'image',
                    asset: {
                        _type: 'reference',
                        _ref: imageAsset?._id
                    }
                },
                rom: {
                    _type: 'file',
                    asset: {
                        _type: 'reference',
                        _ref: romAsset?._id
                    }
                },
                userId: user._id,
                postedBy: {
                    _type: 'postedBy',
                    _ref: user._id,
                },
                category,
                system
            }

            client.create(doc)
            .then(() => {
                navigate('/')
            })
        } else {
            setFields(true)

            setTimeout(() => setFields(false), 2000)
        }
    }

    return (
        <Grid container sx={{ height: '100vh', pt: 8 }}>
            {!imageAsset ? (
                <Grid
                    item
                    sm={4}
                    md={7}
                    sx={{ 
                        display: { xs: 'none', sm: 'flex' }, 
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: (t) => t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    }}
                >
                    {loading ? (
                        <Loading />
                    ) : (
                        <Box display='flex' flexDirection='column' alignItems='center'>
                            <input type='file' name='upload-image' onChange={uploadImage} />
                            <Typography variant='subtitle2' sx={{ mt: 2, fontSize: '0.85rem', fontWeight: 500, lineHeight: 1.57 }}>JPG, SVG, PNG, GIF ou TIFF menor que 20MB.</Typography>
                        </Box>
                    )}
                </Grid>
            ) : (
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        display: { xs: 'none', sm: 'flex' },
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundImage: `url(${imageAsset?.url})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <Button 
                        variant='contained'
                        disableElevation 
                        startIcon={<DeleteIcon />}
                        onClick={() => setImageAsset(null)}
                    >
                        Remover
                    </Button>
                </Grid>
            )}
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Typography variant="h5" align='center'>
                        Publicar
                    </Typography>
                    {fields && (
                        <Typography variant="subtitle2" color='primary' align='center' sx={{ mt: 1 }}>
                            Preencha todos os campos para publicar.
                        </Typography> 
                    )}
                    <TextField
                        autoFocus
                        fullWidth
                        required
                        name="title"
                        label="Título"
                        margin="normal"
                        variant='standard'
                        autoComplete='off'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        required
                        multiline
                        name='content'
                        label="Descrição"
                        margin="normal"
                        variant="standard"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <Box sx={{ width: '100%', overflow: 'hidden', mt: 2, mb: 1 }}>
                        <input type='file' name='upload-rom' onChange={uploadRom} />
                    </Box>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth margin='normal'>
                                <InputLabel id="category-label">Categoria</InputLabel>
                                <Select
                                    labelId="category-label"
                                    label="Categoria"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >   
                                    {categories.map((category) => (
                                        <MenuItem key={category.name} value={category.fullName}>{category.fullName}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth margin='normal'>
                                <InputLabel id="system-label">Sistema</InputLabel>
                                <Select
                                    labelId="system-label"
                                    label="Sistema"
                                    value={system}
                                    onChange={(e) => setSystem(e.target.value)}
                                >
                                    {systems.map((system) => (
                                        <MenuItem key={system.name} value={system.name}>{system.fullName}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Button
                        fullWidth
                        disableElevation
                        type="submit"
                        variant="contained"
                        sx={{ my: 2 }}
                        onClick={saveGame}
                    >
                        Publicar
                    </Button>
                </Box>
            </Grid>
        </Grid>
    )
};

export default CreateGame;
