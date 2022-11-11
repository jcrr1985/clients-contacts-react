import React from 'react'
import { blueGrey } from '@mui/material/colors'
import { css } from '@emotion/css'
import Box from '@mui/material/Box'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add'
import { DevTool } from '@hookform/devtools'
import { useForm, SubmitHandler } from 'react-hook-form'
import {
  TextFieldElement,
  RadioButtonGroup,
  FormContainer,
} from 'react-hook-form-mui'
import { useTheme } from '@mui/material/styles'

import { Contact } from '@/types'
import useSupplierStore from '@/stores/supplier.store'

const defaultValues = {
  genre: 'm',
  firstName: '',
  lastName: '',
  position: '',
  email: '',
  lang: '',
  phoneNumber: '',
}

interface ContactEditorProps {
  onSuccess?: SubmitHandler<Contact>
  [restProps: string]: any
}

const ContactEditor: React.ForwardRefExoticComponent<ContactEditorProps> =
  React.forwardRef((props, ref) => {
    const { onSuccess = () => {}, ...restProps } = props

    const theme = useTheme()
    const supplierStore = useSupplierStore()
    const { currentContact, currentSupplier } = supplierStore
    const contactCount = currentSupplier?.contacts?.length || 0
    const [isCreateMode, setIsCreateMode] = React.useState(contactCount === 0)
    const [prevContact, setPrevContact] = React.useState<Contact | undefined>(
      undefined,
    )

    const formContext = useForm({ defaultValues })
    const { handleSubmit, control, reset, formState } = formContext

    React.useEffect(() => {
      if (contactCount === 0) setIsCreateMode(true)
      if (currentContact?._id !== undefined) setIsCreateMode(false)
      const values = Object.assign({}, defaultValues, currentContact)
      reset(values)
    }, [currentContact])

    const handleOnSave: SubmitHandler<any> = (values: any, e) => {
      const contact: Contact = {
        ...values,
      }
      setIsCreateMode(false)
      reset()
      onSuccess(contact)
    }

    const handleCancel = () => {
      supplierStore.setCurrentContact(
        isCreateMode ? prevContact ?? ({} as Contact) : currentContact,
      )
      setIsCreateMode(false)
      reset()
    }

    const handleCreateMode = () => {
      setIsCreateMode(true)
      setPrevContact(currentContact)
      supplierStore.setCurrentContact({} as Contact)
      reset(defaultValues)
    }

    const handleContactNavigation = (
      event: React.ChangeEvent<unknown>,
      page: number,
    ) => {
      const contact = currentSupplier?.contacts?.[page - 1]
      supplierStore.setCurrentContact(contact as Contact)
    }

    const isSaveButtonEnabled = formState.isDirty
    const isCancelButtonEnabled =
      (isCreateMode && contactCount > 0) || formState.isDirty

    return (
      <FormContainer
        formContext={formContext}
        handleSubmit={handleSubmit(handleOnSave)}
        FormProps={{
          autoComplete: 'off',
          className: css({
            flex: 1,
            minWidth: theme.spacing(40),
            [theme.breakpoints.up('md')]: { maxWidth: theme.spacing(70) },
            '& .MuiTextField-root': { flex: 1 },
          }),
        }}
        {...restProps}
      >
        <DevTool control={control} placement="bottom-right" />
        <Stack border={1} borderColor={theme.palette.grey['300']}>
          <Stack
            direction="row"
            justifyContent="space-between"
            bgcolor={theme.palette.grey['300']}
            px={3}
            py={1}
          >
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
              <Box display={isCreateMode ? 'inline' : 'none'}>{' (new)'}</Box>
            </Typography>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleCreateMode}
              edge="start"
              size="small"
              sx={{
                height: '30px',
                width: '30px',
                color: 'common.black',
                alignSelf: 'center',
                display: isCreateMode ? 'none' : 'block',
              }}
            >
              <AddIcon />
            </IconButton>
          </Stack>
          <Stack paddingY={theme.spacing(3)} spacing={theme.spacing(3)}>
            <Stack
              paddingX={theme.spacing(3)}
              spacing={1}
              sx={{
                '& > *': { flexGrow: 1, gap: theme.spacing(2) },
              }}
            >
              <RadioButtonGroup
                name="genre"
                label="Anrede"
                row
                options={[
                  { id: 'm', label: 'Herr' },
                  { id: 'f', label: 'Frau' },
                ]}
                aria-labelledby="genre-label"
                required
              />
              <Stack direction={{ sm: 'row', md: 'column', lg: 'row' }}>
                <TextFieldElement
                  id="contact-first-name"
                  name="firstName"
                  required
                  label="Vorname"
                  variant="standard"
                  margin="dense"
                />
                <TextFieldElement
                  id="contact-last-name"
                  name="lastName"
                  required
                  label="Nachname"
                  variant="standard"
                  margin="dense"
                />
              </Stack>
              <Stack direction={{ sm: 'row', md: 'column', lg: 'row' }}>
                <TextFieldElement
                  id="contact-position"
                  name="position"
                  label="Position"
                  variant="standard"
                  margin="dense"
                />
                <TextFieldElement
                  id="contact-lang"
                  name="lang"
                  label="Sprache"
                  variant="standard"
                  margin="dense"
                />
              </Stack>
              <Stack direction={{ sm: 'row', md: 'column', lg: 'row' }}>
                <TextFieldElement
                  id="contact-phone"
                  type="tel"
                  name="phoneNumber"
                  validation={{
                    pattern: {
                      value: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,
                      message: 'Invalid phone number',
                    },
                  }}
                  label="Telefon"
                  variant="standard"
                  margin="dense"
                />
                <TextFieldElement
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  label="E-Mail"
                  variant="standard"
                  margin="dense"
                />
              </Stack>
            </Stack>
            <Pagination
              count={contactCount}
              disabled={isCreateMode}
              size="small"
              showFirstButton
              showLastButton
              page={
                (currentSupplier?.contacts?.indexOf(currentContact) || 0) + 1
              }
              onChange={handleContactNavigation}
              sx={{ alignSelf: 'center' }}
            />
            <Stack direction="row" spacing={1} alignSelf="center">
              <Button
                disabled={!isCancelButtonEnabled}
                variant="outlined"
                onClick={handleCancel}
              >
                ABBRECHEN
              </Button>
              <Button
                disabled={!isSaveButtonEnabled}
                variant="contained"
                type="submit"
              >
                SPEICHERN
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </FormContainer>
    )
  })

export default ContactEditor
