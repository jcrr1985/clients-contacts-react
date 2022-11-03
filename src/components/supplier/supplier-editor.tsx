import tw from 'twin.macro'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

export default function ValidationTextFields() {
  return (
    <Box
      component="form"
      css={[
        tw`flex flex-col border rounded`,
        {
          '& .MuiTextField-root': tw`m-1 min-w-min`,
        },
      ]}
      noValidate
      autoComplete="off"
    >
      <TextField id="supplier-name" label="Name" required />
      <TextField id="supplier-website" label="Website" />
      <TextField
        id="supplier-comments"
        label="Kommentar"
        multiline
        minRows={5}
      />
      <TextField id="supplier-delivery-time" label="Lieferzeit" />
    </Box>
  )
}
