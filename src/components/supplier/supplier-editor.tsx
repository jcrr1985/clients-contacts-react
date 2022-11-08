import { blueGrey } from '@mui/material/colors'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import { DevTool } from '@hookform/devtools'
import { useForm } from 'react-hook-form'
import { useTheme } from '@mui/material/styles'
import { Button, FormControlLabel } from '@mui/material'

const SupplierEditor: React.FC<any> = (props) => {
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
        flex: 1,
        minWidth: theme.spacing(30),
        ...sx,
      }}
      onSubmit={handleSubmit(onSuccess)}
      {...restProps}
    >
      <DevTool control={control} placement="top-right" />
      <Stack>
        <Stack spacing={1}>
          <TextField
            id="supplier-name"
            {...register('name', { required: true })}
            label="Name"
            required
            variant="standard"
          />
          <TextField
            id="supplier-website"
            {...register('website')}
            label="Website"
            variant="standard"
          />
          <FormControl>
            <Stack>
              <FormLabel
                id="supplier-comment-label"
                sx={{
                  marginLeft: theme.spacing(1),
                  marginTop: theme.spacing(3),
                }}
              >
                Kommentar
              </FormLabel>
              <TextField
                id="supplier-comment"
                aria-labelledby="supplier-comment-label"
                {...register('comment')}
                multiline
                minRows={5}
              />
            </Stack>
          </FormControl>
          <TextField
            id="supplier-delivery-time"
            {...register('deliveryTime')}
            label="Lieferzeit"
            variant="standard"
          />
        </Stack>
      </Stack>
    </Box>
  )
}

export default SupplierEditor
