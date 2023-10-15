import {
    Stack,
    Button,
    IconButton,
    ButtonGroup,
    ToggleButtonGroup,
    ToggleButton,
  } from "@mui/material";
  
  import SendIcon from "@mui/icons-material/Send";
  import FormatBoldIcon from "@mui/icons-material/FormatBold";
  import FormatItalicIcon from "@mui/icons-material/FormatItalic";
  import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
  import { useState } from "react";
  // contained => login or register
  // outlined =>  // CANCEL OR GO BACK
  const MuiButton = () => {
    const [formats, setFormats] = useState<string[]>([]);
    console.log(formats);
    const handleFormatChange = (
      _event: React.MouseEvent<HTMLElement>,
      updatedFormat: string[]
    ) => {
      setFormats(updatedFormat);
    };
    return (
      <Stack spacing={4}>
        <Stack spacing={2} direction="row">
          <Button variant="text" href="https://google.com" size="small">
            Text
          </Button>
  
          <Button variant="contained" size="medium">
            Cotained
          </Button>
  
          <Button variant="outlined" size="large">
            Outlined
          </Button>
        </Stack>
        <Stack spacing={4} direction="row">
          <Button variant="contained" color="primary">
            primary
          </Button>
          <Button variant="contained" color="error"></Button>
          <Button variant="contained" color="warning"></Button>
        </Stack>
        <Stack spacing={2} direction="row">
          <Button variant="contained" startIcon={<SendIcon />}>
            {" "}
            send
          </Button>
          <Button variant="contained" endIcon={<SendIcon />}></Button>
          <IconButton aria-label="send" color="success" size="small">
            <SendIcon />
          </IconButton>
        </Stack>
        <Stack direction="row">
          <ButtonGroup
            variant="contained"
            orientation="horizontal"
            size="small"
            color="secondary"
            aria-label="alignment button group"
          >
            <Button onClick={() => alert("left clicked")}>left</Button>
            <Button>center</Button>
            <Button>right</Button>
          </ButtonGroup>
        </Stack>
        <Stack direction="row">
          <ToggleButtonGroup
            aria-label="text formatting"
            value={formats}
            onChange={handleFormatChange}
          >
            <ToggleButton value="bold" aria-label="bold">
              <FormatBoldIcon></FormatBoldIcon>
            </ToggleButton>
            <ToggleButton value="italic" aria-label="italic">
              <FormatItalicIcon></FormatItalicIcon>
            </ToggleButton>
            <ToggleButton value="underlined" aria-label="underlined">
              <FormatUnderlinedIcon></FormatUnderlinedIcon>
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>
      </Stack>
    );
  };
  
  export default MuiButton;