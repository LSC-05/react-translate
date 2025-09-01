import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Stack, Paper, Button } from '@mui/material';
import { Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { DispatchContext } from '../providers/DispatchContext';
import { getTranslate } from '../providers/TranslateAPI';
import { countries } from './Countries';

export const TranslateForm = () => {
  const dispatch = useContext(DispatchContext);

  const [text, setText] = useState({
    fromText: "りんご",
    toText: "",
  });

  const[lang, setLang] = useState({
    fromLang: "ja-JP",
    toLang: "en-US",
  });

  const handleChangeText=(e)=>{
    setText({
      ...text,
      [e.target.id]: e.target.value,
    })
  }

  const handleChangeLang=(e)=>{
    setLang({
      ...lang,
      [e.target.id]: e.target.value,
    })
  }

  const handleClickTranslate=(e)=>{
    (async ()=>{
      if(fromText === ""){
        return;
      }
      const data = await getTranslate(text.fromText, lang.fromLang, lang.toLang);
      
      let result = data.responseData.translatedText;
      
      data.matches.forEach(data => {
        if(data.id === 0){
          result = data.translation;
        }
      });
      
      setText({
        ...text,
        toText: result,
      })

      dispatch({
        type: "save",
        payload:{
          data: {
            fromText: text.fromText,
            toText: result,
            fromLang: lang.fromLang,
            toLang: lang.toLang,
          }
        }
      })
    })();
  }

  return (
    <Container maxWidth="sm" sx={{ my: 5 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Box sx={{ width: 200 }}>
          <TextField
            variant="outlined"
            rows={6}
            multiline
            id="fromText"
            label="翻訳前の言葉"
            sx={{ backgroundColor: '#ffffff' }}
            onChange={handleChangeText}
            value={text['fromText']}
          />
          <FormControl sx={{ my: 2 }} fullWidth size="small">
            <InputLabel id="from-text-input-label">翻訳前の言語</InputLabel>
            <Select
              labelId="from-text-input-label"
              label="翻訳前の言語"
              id="fromLang"
              name="fromLang"
              sx={{ backgroundColor: '#ffffff' }}
              onChange={handleChangeLang}
              defaultValue={lang.fromLang}
            >
              {Object.keys(countries).map((key) => {
                return (
                  <MenuItem key={key} value={key}>
                    {countries[key]}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
        <Button variant="contained" color="secondary" onClick={handleClickTranslate}>
          翻訳
          <ArrowForwardIosIcon fontSize="small" />
        </Button>
        <Box sx={{ width: 200 }}>
          <TextField
            id="to-text"
            label="翻訳後の言葉"
            multiline
            rows={6}
            variant="outlined"
            sx={{ backgroundColor: '#ffffff' }}
            aria-readonly
            value={text['toText']}
          />
          <FormControl sx={{ my: 2 }} fullWidth size="small">
            <InputLabel id="to-text-input-label">翻訳後の言語</InputLabel>
            <Select
              labelId="to-text-input-label"
              label="翻訳後の言語"
              id="toLang"
              name="toLang"
              sx={{ backgroundColor: '#ffffff' }}
              onChange={handleChangeLang}
              defaultValue={lang.toLang}
            >
              {Object.keys(countries).map((key) => {
                return (
                  <MenuItem key={key} value={key}>
                    {countries[key]}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
      </Stack>
    </Container>
  );
};
