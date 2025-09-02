import { useState, useContext, useEffect } from 'react';
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
import { Co2Sharp } from '@mui/icons-material';

const synth = window.speechSynthesis;

export const TranslateForm = () => {
  const dispatch = useContext(DispatchContext);

  // 読み上げるボイス
  const [voiceURI, setVoiceURI] = useState({
    fromVoice: "",
    toVoice: "",
  });
  // 対応可能なボイス一覧
  const [voices, setVoices] = useState([]);

  useEffect(() => {
    // ボイス一覧取得
    const vs = synth.getVoices().filter(v => Object.keys(countries).includes(v.lang));
    setVoices(vs);
    setVoiceURI({
      ...voiceURI,
      fromVoice: switchReadLang("ja-JP"),
    })
  }, []);

  const handleClick = (e) => {
    let utterance;
    // 発声用オブジェクト作成
    if(e.target.id === "fromVoice"){
      utterance = new window.SpeechSynthesisUtterance(text.fromText);
    }
    else{
      utterance = new window.SpeechSynthesisUtterance(text.toText);
    }

    const voice = voices.find(v => v.voiceURI === voiceURI[e.target.id]);

    utterance.voice = voice;
    synth.speak(utterance);
  };

  const [text, setText] = useState({
    fromText: "りんご",
    toText: "",
  });

  const[lang, setLang] = useState({
    fromLang: "ja-JP",
    toLang: "en-US",
  });

  const switchReadLang =(value)=> {
    switch(value){
      case "ja-JP":
        return "Microsoft Ayumi - Japanese (Japan)";

      case "en-US":
        return "Microsoft Aria Online (Natural) - English (United States))";

      case "es-ES":
        return "Microsoft Elvira Online (Natural) - Spanish (Spain)";

      case "fr-FR":
        return "Microsoft Denise Online (Natural) - French (France)";

      case "it-IT":
        return "Microsoft Elsa Online (Natural) - Italian (Italy)";

      case "ko-KR":
        return "Microsoft SunHi Online (Natural) - Korean (Korea)";

      case "ru-RU":
        return "Microsoft Ekaterina Online - Russian (Russia)";
    }
  }

  const handleChangeText=(e)=>{
    setText({
      ...text,
      [e.target.id]: e.target.value,
    })
  }

  const handleChangeLang=(e)=>{
    setLang({
      ...lang,
      [e.target.name]: e.target.value,
    })
    let voiceId = "";
    if(e.target.name === "fromLang"){
      voiceId = "fromVoice";
    }
    else{
      voiceId = "toVoice";
    }
    const voice = switchReadLang(e.target.value);

    setVoiceURI({
      ...voiceURI,
      [voiceId]: voice,
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
        <Box sx={{ width: 200, display: "flex", justifyContent: "center", alignItems:"center", flexDirection:"column"}}>
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
              value={lang.fromLang}
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
          <Button variant="contained" color="secondary" onClick={handleClick} id='fromVoice'>
            読み上げ            
          </Button>
        </Box>
        <Button variant="contained" color="secondary" onClick={handleClickTranslate}>
          翻訳
          <ArrowForwardIosIcon fontSize="small" />
        </Button>
        <Box sx={{ width: 200, display: "flex", justifyContent: "center", alignItems:"center", flexDirection:"column" }}>
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
              value={lang.toLang}
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
          <Button variant="contained" color="secondary" onClick={handleClick} id='toVoice'>
            読み上げ
          </Button>
        </Box>
      </Stack>
    </Container>
  );
};
