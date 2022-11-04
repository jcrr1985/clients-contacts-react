import * as React from 'react'
import tw from 'twin.macro'
import { css } from '@emotion/css'
import Box from '@mui/material/Box'
import {
  FormContainer,
  FormContainerProps,
  TextFieldElement,
  RadioButtonGroup,
} from 'react-hook-form-mui'

const ContactEditor: React.FC<FormContainerProps> = (props) => {
  const { onSuccess, ...restProps } = props
  return (
    <Box
      component={FormContainer}
      FormProps={{
        noValidate: true,
        autoComplete: 'off',
        className: css({
          '& .MuiTextField-root': tw`m-1 w-80`,
        }),
      }}
      defaultValues={{
        genre: 'm',
      }}
      onSuccess={onSuccess}
      {...restProps}
    >
      <div>
        <RadioButtonGroup
          label="Anrede"
          name="genre"
          row
          options={[
            { id: 'm', label: 'Herr' },
            { id: 'f', label: 'Frau' },
          ]}
          required
        />
      </div>
      <div>
        <TextFieldElement
          id="contact-first-name"
          name="firstName"
          label="Vorname"
          required
          variant="standard"
          margin="dense"
        />
        <TextFieldElement
          id="contact-last-name"
          name="lastName"
          label="Nachname"
          required
          variant="standard"
          margin="dense"
        />
      </div>
      <div>
        <TextFieldElement
          id="contact-position"
          name="position"
          label="Position"
          variant="standard"
          margin="dense"
        />
        <TextFieldElement
          id="contact-idioma"
          name="idioma"
          label="Sprache"
          variant="standard"
          margin="dense"
        />
      </div>
      <div>
        <TextFieldElement
          id="contact-phone"
          name="phoneNumber"
          label="Telefon"
          variant="standard"
          margin="dense"
        />
        <TextFieldElement
          id="contact-email"
          name="email"
          label="E-Mail"
          variant="standard"
          margin="dense"
        />
      </div>
    </Box>
  )
}

export default ContactEditor
