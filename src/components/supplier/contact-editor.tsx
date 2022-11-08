import { blueGrey } from '@mui/material/colors'
import Box from '@mui/material/Box'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import FormControlLabel from '@mui/material/FormControlLabel'
import { DevTool } from '@hookform/devtools'
import { useForm } from 'react-hook-form'
import { useTheme } from '@mui/material/styles'
import { Button } from '@mui/material'

const ContactEditor: React.FC<any> = (props) => {
  const { contact = {}, onSuccess, sx, ...restProps } = props
  const theme = useTheme()
  const defaultValues = Object.assign(
    {
      genre: 'm',
      firstName: '',
      lastName: '',
      position: '',
      email: '',
      lang: '',
      phoneNumber: '',
    },
    contact,
  )

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitSuccessful: isValid },
  } = useForm({ defaultValues })

  return (
    <Box
      component="form"
      autoComplete="off"
      sx={{
        minWidth: theme.spacing(40),
        flex: 1,
        '& .MuiTextField-root': { flex: 1 },
        ...sx,
      }}
      onSubmit={handleSubmit(onSuccess)}
      {...restProps}
    >
      <DevTool control={control} placement="top-right" />

      <Stack border={1} borderColor={theme.palette.grey['300']}>
        <Box bgcolor={theme.palette.grey['300']} px={3} py={1}>
          <Typography
            variant="h5"
            color={blueGrey['800']}
            fontSize={{
              xs: theme.typography.body1.fontSize,
              md: theme.typography.h5.fontSize,
            }}
            fontWeight={theme.typography.fontWeightBold}
          >
            Ansprechpartner
          </Typography>
        </Box>
        <Stack paddingY={theme.spacing(3)} spacing={theme.spacing(3)}>
          <Stack
            paddingX={theme.spacing(3)}
            spacing={1}
            sx={{
              '& > *': { flexGrow: 1, gap: theme.spacing(2) },
            }}
          >
            <Stack direction={'row'}>
              <FormControl required>
                <FormLabel id="genre-label">Anrede</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="genre-label"
                  {...register('genre', { required: true })}
                >
                  <FormControlLabel
                    value="m"
                    control={<Radio />}
                    label="Herr"
                  />
                  <FormControlLabel
                    value="f"
                    control={<Radio />}
                    label="Frau"
                  />
                </RadioGroup>
              </FormControl>
            </Stack>
            <Stack direction={'row'}>
              <TextField
                id="contact-first-name"
                {...register('firstName', { required: true })}
                required
                label="Vorname"
                variant="standard"
                margin="dense"
              />
              <TextField
                id="contact-last-name"
                {...register('lastName', { required: true })}
                required
                label="Nachname"
                variant="standard"
                margin="dense"
              />
            </Stack>
            <Stack direction={'row'}>
              <TextField
                id="contact-position"
                {...register('position')}
                label="Position"
                variant="standard"
                margin="dense"
              />
              <TextField
                id="contact-lang"
                {...register('lang')}
                label="Sprache"
                variant="standard"
                margin="dense"
              />
            </Stack>
            <Stack direction={'row'}>
              <TextField
                id="contact-phone"
                {...register('phoneNumber')}
                label="Telefon"
                variant="standard"
                margin="dense"
              />
              <TextField
                id="contact-email"
                {...register('email', { required: true })}
                required
                label="E-Mail"
                variant="standard"
                margin="dense"
              />
            </Stack>
          </Stack>
          <Pagination
            count={10}
            size="small"
            showFirstButton
            showLastButton
            sx={{ alignSelf: 'center' }}
          />
          <Stack direction="row" spacing={1} alignSelf="center">
            <Button variant="outlined">ABBRECHEN</Button>
            <Button variant="contained">SPEICHERN</Button>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  )
}

export default ContactEditor
