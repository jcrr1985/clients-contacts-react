import tw from 'twin.macro'
import { css } from '@emotion/css'
import Box from '@mui/material/Box'
import {
  TextFieldElement,
  FormContainer,
  FormContainerProps,
} from 'react-hook-form-mui'

const SupplierEditor = (props: FormContainerProps) => {
  const { onSuccess, ...restProps } = props

  return (
    <Box
      component={FormContainer}
      FormProps={{
        noValidate: true,
        autoComplete: 'off',
        className: css([
          tw`flex flex-col border rounded`,
          {
            '& .MuiTextField-root': tw`m-1 min-w-min`,
          },
        ]),
      }}
      onSuccess={onSuccess}
      {...restProps}
    >
      <TextFieldElement
        id="supplier-name"
        name="firstName"
        label="Name"
        required
        variant="standard"
      />
      <TextFieldElement
        id="supplier-website"
        name="website"
        label="Website"
        variant="standard"
      />
      <TextFieldElement
        id="supplier-comment"
        name="comment"
        label="Kommentar"
        multiline
        minRows={5}
      />
      <TextFieldElement
        id="supplier-delivery-time"
        name="deliveryTime"
        label="Lieferzeit"
        variant="standard"
      />
    </Box>
  )
}

export default SupplierEditor
